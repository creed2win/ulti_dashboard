"use client"

import type React from "react"

import { useState, useEffect, type ComponentType, Children } from "react"
import { Button } from "~/components/ui/button"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import {
  Settings,
  Cloud,
  Map,
  Calendar,
  Trash2,
  type LucideIcon,
} from "lucide-react"
import WeatherWidget from "./WeatherWidget"
import RadarWidget from "./RadarWidget"
// import CafeteriaMenu from "./cafeteria-menu"
import { ButtonScrape } from "./ButtonScrape"


type WidgetComponent = {
  component: ComponentType<any>,
  name: string,
}

type WidgetComponents = {
  weatherForecast: WidgetComponent,
  weatherRadar: WidgetComponent,
  // menu: WidgetComponent,
  loadMenuButton: WidgetComponent,
}

type Widgets = {
  weatherForecast: boolean;
  weatherRadar: boolean;
  // menu: boolean;
  loadMenuButton: boolean;
  [key: string]: boolean
}

export default function Dashboard({ children }: { children: React.ReactNode }) {

  const childrenArray = Children.toArray(children)
  console.log(childrenArray)

  const widgets: WidgetComponents = {
    weatherForecast: { component: WeatherWidget, name: "Předpověď" },
    weatherRadar: { component: RadarWidget, name: "Radar" },
    // menu: { component: CafeteriaMenu, name: "Jídelníček"},
    loadMenuButton: { component: ButtonScrape, name: "Načtení jídelníčku" },
  }

  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const [enabledWidgets, setEnabledWidgets] = useState<number[]>([0])

  const toggleWidget = (index: number) => {
    setEnabledWidgets(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
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

  const enabledCount = Object.values(enabledWidgets).filter(Boolean).length

  return (
    < div className="min-h-screen flex" >
      {/* Settings Sidebar */}
      < div className="border-r p-6 overflow-y-auto flex-shrink-0" style={{ width: `${sidebarWidth}px` }
      }>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Widget Settings</h2>
            <p className="text-sm text-muted-foreground">Toggle widgets on or off to customize your dashboard</p>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Widgets</span>
            <Badge variant="secondary">{enabledCount}</Badge>
          </div>

          <Separator />

          <div className="space-y-4">
            {Object.entries(childrenArray).map(([id, name], index) => {
              return (
                <div key={id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
                      test
                    </Label>
                  </div>
                  <Switch id={id} checked={!enabledWidgets[index]} onCheckedChange={() => toggleWidget(index)} />
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
                setEnabledWidgets([childrenArray.length])
              }}
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() => {
                setEnabledWidgets([0])
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Disable All
            </Button>
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
      < div className="flex-1 p-6 min-w-0" >
        {/* Header */}
        < div className="mb-6" >
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {enabledCount} widget{enabledCount !== 1 ? "s" : ""} active
          </p>
        </div >

        {/* Widgets Grid */}
        {/* {
          enabledCount === 0 ? (
            // When no widgets are visible
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-medium mb-2">No widgets enabled</h3>
                <p className="text-muted-foreground mb-4">Enable some widgets using the settings panel on the left</p>
              </div>
            </div>
          ) : (
            // when there is at least one widget
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(widgets).map(([id, widget]) => {
                if (!enabledWidgets[id]) return null
                const WidgetComponent = widget.component
                return (
                  <div key={id} className="min-h-[200px]">
                    <WidgetComponent />
                  </div>
                )
              })}
            </div>
          )
        } */}
        <p>Conditional experiment</p>
        {childrenArray.map((child) => {
          return (
            <div className="p-4">
              {child}
            </div>
          )
        })}
      </div>


    </div>

  )
}
