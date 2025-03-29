"use client"

import { useState, useEffect } from "react"
import { Editor } from "@/components/editor"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

export function ResearchAssistant() {
  const { theme, setTheme } = useTheme()
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen)
  }

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Don't render UI until client-side hydration is complete
  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Initializing Lydiian AI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full">
      {/* Left Sidebar */}
      <div className={`border-r transition-all duration-300 ${leftSidebarOpen ? "w-64" : "w-0"}`}>
        {leftSidebarOpen && <LeftSidebar />}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleLeftSidebar}>
              {leftSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            <h1 className="text-xl font-semibold">Untitled Document</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => console.log('Export clicked')}>
              Export
            </Button>
            <Button onClick={() => console.log('Publish clicked')}>
              Publish
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleRightSidebar}>
              {rightSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Editor />
        </main>
      </div>

      {/* Right Sidebar */}
      <div className={`border-l transition-all duration-300 ${rightSidebarOpen ? "w-80" : "w-0"}`}>
        {rightSidebarOpen && <RightSidebar />}
      </div>
    </div>
  )
}

