"use client"

import { useTheme } from "next-themes"

export default function LegendPanel() {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const legendItems = [
    {
      color: isDark ? "#6366f1" : "#4f46e5", // Indigo
      label: "PDF Source",
      description: "Concepts extracted from PDF documents",
    },
    {
      color: isDark ? "#10b981" : "#059669", // Emerald
      label: "Article Source",
      description: "Concepts extracted from web articles",
    },
    {
      color: isDark ? "#f59e0b" : "#d97706", // Amber
      label: "Highlighted",
      description: "Currently selected or hovered item",
    },
  ]

  const relationshipTypes = [
    "includes",
    "related_to",
    "specialization",
    "applied_in",
    "contributes_to",
    "analyzes",
    "uses",
    "enables",
    "raises_concerns",
    "technique_of",
    "addresses",
    "depends_on",
    "underlies",
    "complements",
  ]

  return (
    <div className="absolute bottom-4 right-4 z-10 p-4 rounded-lg bg-black/70 backdrop-blur-sm max-w-xs">
      <h3 className="text-sm font-medium mb-3 text-gray-300">LEGEND</h3>

      <div className="space-y-2 mb-4">
        {legendItems.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
            <div>
              <span className="text-xs font-medium text-white">{item.label}</span>
              <p className="text-xs text-gray-400">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-xs font-medium mb-2 text-gray-300">RELATIONSHIP TYPES</h3>
      <div className="flex flex-wrap gap-1">
        {relationshipTypes.map((type, index) => (
          <span key={index} className="text-xs px-1.5 py-0.5 rounded-full bg-gray-800 text-gray-300">
            {type.replace(/_/g, " ")}
          </span>
        ))}
      </div>
    </div>
  )
}
