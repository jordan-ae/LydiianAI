"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { BookOpen, Plus, Search, Copy, Trash2 } from "lucide-react"

type Reference = {
  id: string
  title: string
  authors: string
  year: string
  journal?: string
  url?: string
}

export function ReferenceManager() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for references
  const references: Reference[] = [
    {
      id: "1",
      title: "Artificial Intelligence: A Modern Approach",
      authors: "Stuart Russell, Peter Norvig",
      year: "2020",
      journal: "Pearson",
    },
    {
      id: "2",
      title: "Deep Learning",
      authors: "Ian Goodfellow, Yoshua Bengio, Aaron Courville",
      year: "2016",
      journal: "MIT Press",
    },
    {
      id: "3",
      title: "The Elements of Statistical Learning",
      authors: "Trevor Hastie, Robert Tibshirani, Jerome Friedman",
      year: "2009",
      journal: "Springer",
    },
  ]

  const filteredReferences = references.filter(
    (ref) =>
      ref.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ref.authors.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const copyReference = (ref: Reference) => {
    // Format the reference in APA style
    const citation = `${ref.authors} (${ref.year}). ${ref.title}. ${ref.journal || ""}`
    navigator.clipboard.writeText(citation)
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>References</SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="mb-4 flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search references..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button size="icon" variant="outline">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <SidebarMenu>
          {filteredReferences.map((ref) => (
            <SidebarMenuItem key={ref.id}>
              <SidebarMenuButton className="flex-col items-start">
                <div className="flex w-full items-center">
                  <BookOpen className="h-4 w-4 shrink-0" />
                  <span className="ml-2 font-medium">{ref.title}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {ref.authors} ({ref.year})
                </div>
              </SidebarMenuButton>
              <div className="absolute right-2 top-2 flex gap-1">
                <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => copyReference(ref)}>
                  <Copy className="h-3 w-3" />
                </Button>
                <Button size="icon" variant="ghost" className="h-6 w-6 text-destructive">
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

