"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function FileUploader() {
  const { toast } = useToast()
  const [isDragging, setIsDragging] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFiles(files)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      handleFiles(files)
    }
  }

  const handleFiles = (files: File[]) => {
    // Here you would upload the files to Supabase storage
    // For now, we'll just show a toast
    toast({
      title: "Files uploaded",
      description: `${files.length} file(s) uploaded successfully.`,
    })
  }

  return (
    <div
      className={`mb-4 mt-2 rounded-lg border-2 border-dashed p-4 transition-colors ${
        isDragging ? "border-primary bg-primary/10" : "border-border"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center gap-2 text-center">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <p className="text-sm font-medium">Drag & drop files or click to upload</p>
        <p className="text-xs text-muted-foreground">Supports PDF, DOCX, TXT, and more</p>
        <label htmlFor="file-upload">
          <Button size="sm" variant="outline" className="mt-2" asChild>
            <span>
              Browse Files
              <input id="file-upload" type="file" multiple className="sr-only" onChange={handleFileChange} />
            </span>
          </Button>
        </label>
      </div>
    </div>
  )
}

