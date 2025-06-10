"use client"

import { useState, useEffect } from "react"
import { X, ExternalLink, BookOpen, FileText, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useTheme } from "next-themes"
import { Concept } from "@/lib/types"

interface ConceptDetailModalProps {
  concept: Concept
  onClose: () => void
}

export default function ConceptDetailModal({ concept, onClose }: ConceptDetailModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  useEffect(() => {
    // Fade-in animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 10)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(onClose, 300) // Wait for fade-out animation
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className={`absolute inset-0 ${
          isDark ? "bg-black bg-opacity-50" : "bg-gray-500 bg-opacity-30"
        } backdrop-blur-sm`}
        onClick={handleClose}
      />

      <div
        className={`relative w-full max-w-2xl ${
          isDark ? "bg-gray-800 bg-opacity-90" : "bg-white bg-opacity-95"
        } backdrop-blur-md rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div
          className={`flex items-center justify-between p-6 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}
        >
          <div className="flex items-center">
            <div
              className={`mr-3 p-2 rounded-full ${
                concept.type === "pdf"
                  ? isDark
                    ? "bg-indigo-500 bg-opacity-20"
                    : "bg-indigo-100"
                  : isDark
                    ? "bg-emerald-500 bg-opacity-20"
                    : "bg-emerald-100"
              }`}
            >
              {concept.type === "pdf" ? (
                <BookOpen className={isDark ? "text-indigo-300" : "text-indigo-600"} size={20} />
              ) : (
                <FileText className={isDark ? "text-emerald-300" : "text-emerald-600"} size={20} />
              )}
            </div>
            <div>
              <h2 className={`text-2xl font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{concept.name}</h2>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                    concept.type === "pdf"
                      ? isDark
                        ? "bg-indigo-500 text-white"
                        : "bg-indigo-100 text-indigo-800"
                      : isDark
                        ? "bg-emerald-500 text-white"
                        : "bg-emerald-100 text-emerald-800"
                  }`}
                >
                  {concept.type === "pdf" ? "PDF Source" : "Article Source"}
                </span>
                <span className={`ml-2 text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  Importance: {(concept.importance * 100).toFixed(0)}%
                </span>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className={isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-800"}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <Tabs defaultValue="summary" className="p-6">
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="summary">Summary</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
            <TabsTrigger value="connections">Connections</TabsTrigger>
          </TabsList>

          <TabsContent value="summary" className={isDark ? "text-gray-200" : "text-gray-700"}>
            <p className="mb-6 leading-relaxed">{concept.summary}</p>

            <h3 className={`text-sm font-medium mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>KEYWORDS</h3>
            <div className="flex flex-wrap gap-2">
              {concept.keywords?.map((keyword, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-sm ${isDark ? "bg-gray-700" : "bg-gray-100"}`}
                >
                  {keyword}
                </span>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="references">
            <div className="space-y-4">
              {concept.references?.map((reference, index) => (
                <div key={index} className={`p-4 rounded-lg ${isDark ? "bg-gray-700 bg-opacity-50" : "bg-gray-100"}`}>
                  <div className="flex justify-between items-start">
                    <h3 className={`font-medium mb-2 ${isDark ? "text-white" : "text-gray-800"}`}>{reference.title}</h3>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      <span className="text-xs">Open</span>
                    </Button>
                  </div>
                  <p className={`text-sm mb-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{reference.context}</p>
                  <div className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Source: {concept.type === "pdf" ? "PDF Document" : "Web Article"}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="connections">
            <div className="space-y-4">
              {concept.connections?.map((connection, index) => (
                <div key={index} className={`p-4 rounded-lg ${isDark ? "bg-gray-700 bg-opacity-50" : "bg-gray-100"}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Share2 className={`h-4 w-4 mr-2 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
                      <h3 className={`font-medium ${isDark ? "text-white" : "text-gray-800"}`}>
                        {connection.targetName}
                      </h3>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${isDark ? "bg-gray-600" : "bg-gray-200"}`}>
                      {connection.relationshipType}
                    </span>
                  </div>
                  <p className={`text-sm mt-2 ${isDark ? "text-gray-300" : "text-gray-600"}`}>
                    {connection.description}
                  </p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className={`p-4 flex justify-end ${isDark ? "border-t border-gray-700" : "border-t border-gray-200"}`}>
          <Button variant="outline" size="sm" className="mr-2" onClick={handleClose}>
            Close
          </Button>
          <Button size="sm">Explore Related</Button>
        </div>
      </div>
    </div>
  )
}
