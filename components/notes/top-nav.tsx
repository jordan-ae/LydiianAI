"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"
import { Bell, ChevronRight, Moon, Search, Sun } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import UserProfile from "./user-profile"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

interface BreadcrumbItem {
  label: string
  href?: string
}

export default function TopNav() {
  const breadcrumbs: BreadcrumbItem[] = [
    { label: "lydian", href: "#" },
    { label: "Notes", href: "#" },
  ]

  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <nav className="px-3 sm:px-6 flex items-center justify-between bg-white dark:bg-[#0F0F12] h-full">
      <div className="font-medium text-sm hidden sm:flex items-center space-x-1 truncate max-w-[300px]">
        {breadcrumbs.map((item, index) => (
          <div key={item.label} className="flex items-center">
            {index > 0 && <ChevronRight className="h-4 w-4 text-gray-500 dark:text-gray-400 mx-1" />}
            {item.href ? (
              <Link
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{item.label}</span>
            )}
          </div>
        ))}
      </div>

      <div className="hidden md:flex items-center max-w-md w-full mx-4">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            type="search"
            placeholder="Search your research..."
            className="w-full pl-9 bg-gray-50 dark:bg-[#1F1F23] border-gray-200 dark:border-[#2B2B30]"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4 ml-auto">
        <button
          type="button"
          className="p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-[#1F1F23] rounded-full transition-colors"
        >
          <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 dark:text-gray-300" />
        </button>

        <Button variant="ghost" size="icon" className="h-8 w-8 sm:h-10 sm:w-10" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4 sm:h-5 sm:w-5" /> : <Moon className="h-4 w-4 sm:h-5 sm:w-5" />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Image
              src="/placeholder.svg?height=28&width=28"
              alt="User avatar"
              width={28}
              height={28}
              className="rounded-full ring-2 ring-gray-200 dark:ring-[#2B2B30] sm:w-8 sm:h-8 cursor-pointer"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-[280px] sm:w-80 bg-background border-border rounded-lg shadow-lg"
          >
            <UserProfile />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
