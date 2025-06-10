"use client"

import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useTheme } from "next-themes"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className={`h-4 w-4 ${isDark ? "text-gray-400" : "text-gray-500"}`} />
      </div>
      <Input
        type="search"
        placeholder="Search concepts or keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`pl-10 ${
          isDark
            ? "bg-gray-800 bg-opacity-80 border-gray-700 text-white placeholder-gray-400 focus:ring-amber-500 focus:border-amber-500"
            : "bg-white bg-opacity-90 border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-indigo-500 focus:border-indigo-500"
        }`}
      />
    </div>
  )
}
