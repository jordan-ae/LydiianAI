"use client"

import { useState, useMemo, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, Stars } from "@react-three/drei"
import { mockGraphData } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Sun, Moon, HelpCircle, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

import { Concept } from "@/lib/types"
import ForceGraph from "./force-graph"
import { useTheme } from "next-themes"
import LegendPanel from "./legend-panel"
import HelpModal from "./help-modal"
import ConceptDetailModal from "./concept-details-modal"
import SearchBar from "./search-bar"

export default function ConceptGraph() {
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [graphData, setGraphData] = useState(mockGraphData)
  const [showHelp, setShowHelp] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(300)
  const { theme, setTheme } = useTheme()
  const [firstVisit, setFirstVisit] = useState(true)

  useEffect(() => {
    if (firstVisit) {
      const timer = setTimeout(() => {
        setShowHelp(true)
        setFirstVisit(false)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [firstVisit])

  const filteredData = useMemo(() => {
    if (!searchQuery) return graphData

    const filteredNodes = graphData.nodes.filter(
      (node) =>
        node.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.keywords?.some((keyword) => keyword.toLowerCase().includes(searchQuery.toLowerCase())),
    )

    const filteredNodeIds = new Set(filteredNodes.map((node) => node.id))

    const filteredLinks = graphData.links.filter(
      (link) => filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target),
    )

    return {
      nodes: filteredNodes,
      links: filteredLinks,
    }
  }, [graphData, searchQuery])

  const handleNodeClick = (concept: Concept) => {
    setSelectedConcept(concept)
  }

  const handleCloseModal = () => {
    setSelectedConcept(null)
  }

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.max(prev - 30, 50))
  }

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.min(prev + 30, 300))
  }

  const handleResetView = () => {
    setZoomLevel(150)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="relative w-full h-full bg-black">
      {/* Top Controls */}
      <div className="absolute top-4 left-4 z-10 w-64">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
      </div>

      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleTheme}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          className="bg-black/50 border-gray-700 hover:bg-black/70"
        >
          {theme === "dark" ? (
            <Sun className="h-[1.2rem] w-[1.2rem] text-white" />
          ) : (
            <Moon className="h-[1.2rem] w-[1.2rem] text-white" />
          )}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowHelp(true)}
          title="Help"
          className="bg-black/50 border-gray-700 hover:bg-black/70"
        >
          <HelpCircle className="h-[1.2rem] w-[1.2rem] text-white" />
        </Button>
      </div>

      {/* Side Controls */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomIn}
          title="Zoom In"
          className="bg-black/50 border-gray-700 hover:bg-black/70"
        >
          <ZoomIn className="h-[1.2rem] w-[1.2rem] text-white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleZoomOut}
          title="Zoom Out"
          className="bg-black/50 border-gray-700 hover:bg-black/70"
        >
          <ZoomOut className="h-[1.2rem] w-[1.2rem] text-white" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleResetView}
          title="Reset View"
          className="bg-black/50 border-gray-700 hover:bg-black/70"
        >
          <RotateCcw className="h-[1.2rem] w-[1.2rem] text-white" />
        </Button>
      </div>

      {/* Legend */}
      <LegendPanel />

      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, zoomLevel], fov: 60 }}>
        {/* Space background with stars */}
        <Stars radius={300} depth={100} count={5000} factor={4} saturation={0} fade speed={1} />

        {/* Ambient lighting for the scene */}
        <ambientLight intensity={0.3} />

        {/* Directional lights to highlight the stars */}
        <directionalLight position={[10, 10, 10]} intensity={0.5} />
        <directionalLight position={[-10, -10, -10]} intensity={0.3} />

        {/* The main force-directed graph */}
        <ForceGraph data={filteredData} onNodeClick={handleNodeClick} theme={theme || 'dark'} />

        {/* Controls for navigating the 3D space */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={40}
          maxDistance={600}
          makeDefault
        />
      </Canvas>

      {/* Modals */}
      {selectedConcept && <ConceptDetailModal concept={selectedConcept} onClose={handleCloseModal} />}
      {showHelp && <HelpModal onClose={() => setShowHelp(false)} />}

      {/* User Guidance */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 text-center">
        <p className="text-sm text-gray-300">Click and drag to rotate • Scroll to zoom • Click on stars to explore</p>
      </div>
    </div>
  )
}