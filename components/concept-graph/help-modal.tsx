"use client"

import { useState, useEffect } from "react"
import { X, MousePointer, MousePointerClick, Search, Maximize2, RotateCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface HelpModalProps {
  onClose: () => void
}

export default function HelpModal({ onClose }: HelpModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300)
  }

  const instructions = [
    {
      icon: <MousePointer className="h-5 w-5" />,
      title: "Hover over stars",
      description: "Hover over stars to see their details and connected constellations.",
    },
    {
      icon: <MousePointerClick className="h-5 w-5" />,
      title: "Click on stars",
      description: "Click on a star to open a detailed view with summaries, references, and connections.",
    },
    {
      icon: <Search className="h-5 w-5" />,
      title: "Search concepts",
      description: "Use the search bar to find specific concepts or keywords in the cosmic map.",
    },
    {
      icon: <Maximize2 className="h-5 w-5" />,
      title: "Zoom and pan",
      description: "Use the mouse wheel to zoom in and out. Click and drag to pan around the cosmos.",
    },
    {
      icon: <RotateCw className="h-5 w-5" />,
      title: "Rotate view",
      description: "Click and drag with the right mouse button to rotate the 3D cosmic view.",
    },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={handleClose} />

      <div
        className={`relative w-full max-w-md bg-gray-900 bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">How to Navigate the Cosmic Knowledge Map</h2>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-gray-400 hover:text-white">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6">
          <p className="mb-6 text-gray-300">
            This cosmic visualization shows relationships between concepts as stars and constellations. Here's how to
            interact with it:
          </p>

          <div className="space-y-4">
            {instructions.map((instruction, index) => (
              <div key={index} className="flex items-start">
                <div className="p-2 rounded-full mr-3 bg-gray-800">{instruction.icon}</div>
                <div>
                  <h3 className="font-medium text-white">{instruction.title}</h3>
                  <p className="text-sm text-gray-400">{instruction.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 flex justify-end border-t border-gray-700">
          <Button onClick={handleClose}>Got it</Button>
        </div>
      </div>
    </div>
  )
}
