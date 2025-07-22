"use client"

import type React from "react"

import { useState, useEffect, type ComponentType } from "react"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card"
import { Switch } from "~/components/ui/switch"
import { Label } from "~/components/ui/label"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import {
  Settings,
  Cloud,
  CheckSquare,
  Map,
  Rss,
  Calendar,
  Clock,
  StickyNote,
  Activity,
  Thermometer,
  MapPin,
  Plus,
  Trash2,
  type LucideIcon,
} from "lucide-react"



// Widget Components
const WeatherWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Cloud className="h-5 w-5" />
        Weather
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">72°F</span>
          <Thermometer className="h-6 w-6 text-orange-500" />
        </div>
        <p className="text-sm text-muted-foreground">Partly cloudy</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" />
          San Francisco, CA
        </div>
      </div>
    </CardContent>
  </Card>
)


const TasksWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <CheckSquare className="h-5 w-5" />
        Tasks
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Review project proposal</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded" defaultChecked />
          <span className="text-sm line-through text-muted-foreground">Update documentation</span>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" className="rounded" />
          <span className="text-sm">Call client meeting</span>
        </div>
        <Button variant="ghost" size="sm" className="w-full mt-2">
          <Plus className="h-4 w-4 mr-1" />
          Add task
        </Button>
      </div>
    </CardContent>
  </Card>
)


const MapsWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Map className="h-5 w-5" />
        Maps
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="bg-muted rounded-lg h-32 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Interactive map view</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const RSSWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Rss className="h-5 w-5" />
        RSS Feeds
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Tech News Update</h4>
          <p className="text-xs text-muted-foreground">New AI breakthrough announced...</p>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Design Trends 2024</h4>
          <p className="text-xs text-muted-foreground">Minimalism continues to dominate...</p>
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-medium">Industry Report</h4>
          <p className="text-xs text-muted-foreground">Market analysis shows...</p>
        </div>
      </div>
    </CardContent>
  </Card>
)

const CalendarWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Calendar
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="text-sm">
          <div className="font-medium">Today&apos;s Events</div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-xs">Team standup - 9:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs">Client call - 2:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs">Project review - 4:30 PM</span>
            </div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const ClockWidget = () => {
  const [time, setTime] = useState(new Date())

  useState(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  })

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Clock
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <div className="text-2xl font-mono font-bold">{time.toLocaleTimeString()}</div>
          <div className="text-sm text-muted-foreground mt-1">{time.toLocaleDateString()}</div>
        </div>
      </CardContent>
    </Card>
  )
}

const NotesWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <StickyNote className="h-5 w-5" />
        Notes
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-2">
        <div className="bg-yellow-100 dark:bg-yellow-900/20 p-2 rounded text-sm">Remember to backup project files</div>
        <div className="bg-blue-100 dark:bg-blue-900/20 p-2 rounded text-sm">Meeting notes: Discuss new features</div>
        <div className="bg-green-100 dark:bg-green-900/20 p-2 rounded text-sm">Ideas: Dashboard improvements</div>
      </div>
    </CardContent>
  </Card>
)

const SystemStatsWidget = () => (
  <Card className="h-full">
    <CardHeader className="pb-2">
      <CardTitle className="text-lg flex items-center gap-2">
        <Activity className="h-5 w-5" />
        System Stats
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>CPU Usage</span>
            <span>45%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Memory</span>
            <span>68%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: "68%" }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between text-sm mb-1">
            <span>Storage</span>
            <span>23%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-orange-500 h-2 rounded-full" style={{ width: "23%" }}></div>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
)

const widgets: WidgetComponents = {
  weather: { component: WeatherWidget, name: "Weather", icon: Cloud },
  tasks: { component: TasksWidget, name: "Tasks", icon: CheckSquare },
  maps: { component: MapsWidget, name: "Maps", icon: Map },
  rss: { component: RSSWidget, name: "RSS Feeds", icon: Rss },
  calendar: { component: CalendarWidget, name: "Calendar", icon: Calendar },
  clock: { component: ClockWidget, name: "Clock", icon: Clock },
  notes: { component: NotesWidget, name: "Notes", icon: StickyNote },
  stats: { component: SystemStatsWidget, name: "System Stats", icon: Activity },
}


type WidgetComponent = {
  component: ComponentType,
  name: string,
  icon: LucideIcon,
}

type WidgetComponents = {
  weather: WidgetComponent,
  tasks: WidgetComponent,
  maps: WidgetComponent,
  rss: WidgetComponent,
  calendar: WidgetComponent,
  clock: WidgetComponent,
  notes: WidgetComponent,
  stats: WidgetComponent,
}


type Widgets = {
  weather: boolean;
  tasks: boolean;
  maps: boolean;
  rss: boolean;
  calendar: boolean;
  clock: boolean;
  notes: boolean;
  stats: boolean;
  [key: string]: boolean;
}

export default function Dashboard() {
  const [sidebarWidth, setSidebarWidth] = useState(320)
  const [isResizing, setIsResizing] = useState(false)
  const [enabledWidgets, setEnabledWidgets] = useState<Widgets>({
    weather: true,
    tasks: true,
    maps: true,
    rss: true,
    calendar: false,
    clock: false,
    notes: false,
    stats: false,
  })

  const toggleWidget = (widgetId: string) => {
    setEnabledWidgets((prev) => ({
      ...prev,
      [widgetId]: !prev[widgetId],
    }))
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
    <div className="min-h-screen bg-background flex">
      {/* Settings Sidebar */}
      <div className="bg-card border-r p-6 overflow-y-auto flex-shrink-0" style={{ width: `${sidebarWidth}px` }}>
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
            {Object.entries(widgets).map(([id, widget]) => {
              const IconComponent = widget.icon
              return (
                <div key={id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <IconComponent className="h-4 w-4" />
                    <Label htmlFor={id} className="text-sm font-medium cursor-pointer">
                      {widget.name}
                    </Label>
                  </div>
                  <Switch id={id} checked={enabledWidgets[id]} onCheckedChange={() => toggleWidget(id)} />
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
                const allEnabled: Widgets = {
                  weather: true,
                  tasks: true,
                  maps: true,
                  rss: true,
                  calendar: true,
                  clock: true,
                  notes: true,
                  stats: true,
                }
                setEnabledWidgets(allEnabled)
              }}
            >
              Enable All
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full bg-transparent"
              onClick={() => {
                const allDisabled: Widgets = {
                  weather: false,
                  tasks: false,
                  maps: false,
                  rss: false,
                  calendar: false,
                  clock: false,
                  notes: false,
                  stats: false,
                }
                setEnabledWidgets(allDisabled)
              }}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Disable All
            </Button>
          </div>
        </div>
      </div>

      {/* Resize Handle */}
      <div
        className="w-1 bg-border hover:bg-primary/20 cursor-col-resize flex-shrink-0 transition-colors relative group"
        onMouseDown={handleMouseDown}
      >
        <div className="absolute inset-y-0 -left-1 -right-1 group-hover:bg-primary/10" />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 min-w-0">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            {enabledCount} widget{enabledCount !== 1 ? "s" : ""} active
          </p>
        </div>

        {/* Widgets Grid */}
        {enabledCount === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No widgets enabled</h3>
              <p className="text-muted-foreground mb-4">Enable some widgets using the settings panel on the left</p>
            </div>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  )
}
