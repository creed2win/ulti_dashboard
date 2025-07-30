"use client"

import type React from "react"

import { useState, useEffect, type ComponentType, Children, isValidElement } from "react"
import { Button } from "~/components/ui/button"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import {
  Trash2,
} from "lucide-react"
import { ButtonScrape } from "./ButtonScrape"

type ChildType = {
  props: {
    id: string;
  }
}
export default function Dashboard({ children }: { children: React.ReactNode }) {

  const childrenArray = Children.toArray(children)

  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const [enabledWidgets, setEnabledWidgets] = useState<number[]>([0, 1, 2])

  const toggleWidget = (index: number) => {
    setEnabledWidgets(prev =>
      prev.includes(index) ? prev.filter(i => i !== index).sort() : [...prev, index].sort()
    )
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsResizing(true)
    e.preventDefault()
  }

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return

    const newWidth = e.clientX
    const minWidth = 280
    const maxWidth = 500

    if (newWidth >= minWidth && newWidth <= maxWidth) {
      setSidebarWidth(newWidth)
    }
  }

  const handleMouseUp = () => {
    setIsResizing(false)
  }

  // Add useEffect for mouse events
  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = "col-resize"
      document.body.style.userSelect = "none"
    } else {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      document.body.style.cursor = ""
      document.body.style.userSelect = ""
    }
  }, [isResizing])

  return (
    < div className="min-h-screen flex" >
      {/* Settings Sidebar */}
      < div className="border-r p-6 overflow-y-auto flex-shrink-0" style={{ width: `${sidebarWidth}px` }}>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Nastavení widgetů</h2>
          </div>

          <Separator />

          <div className="space-y-4">

            {Object.entries(childrenArray).map(([_, child], index) => {
              const child2: ChildType = child as ChildType
              const indexString = index.toString()
              return (
                <div key={indexString} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Label htmlFor={indexString} className="text-sm font-medium cursor-pointer">
                      {isValidElement(child) ? child2.props.id : null}

                    </Label>
                  </div>
                  <Switch id={indexString} checked={enabledWidgets.includes(index)} onCheckedChange={() => toggleWidget(index)} />
                </div>
              )
            })}
          </div>

          <Separator />

          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() => {

                let allEnabled: number[] = new Array<number>
                childrenArray.map((_, index) => {
                  allEnabled = allEnabled.concat(index)
                })
                setEnabledWidgets(allEnabled)
              }}
            >
              Zobrazit vše
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() => {
                setEnabledWidgets([])
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Skrýt vše
            </Button>
            <div className="py-4 px-1">
              <Separator />
            </div>
            <ButtonScrape id="Nacist jidelnicek" />
          </div>
        </div>
      </div >

      {/* Resize Handle */}
      < div
        className="w-1 bg-border hover:bg-primary/20 cursor-col-resize flex-shrink-0 transition-colors relative group"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary/10" />
      </div >

      {/* Main Content */}
      < div className="p-6 min-w-0" >
        <div className="grid grid-cols-2`">
          {childrenArray.map((child, index) => {
            if (!enabledWidgets.includes(index)) return null
            return (
              <div key={index} className="p-4">
                {child}
              </div>
            )
          })}
        </div>
      </div>

    </div>

  )
}
