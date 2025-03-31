"use client"

import { useState, useRef, useEffect } from "react"
import type { Editor } from "@tiptap/react"
import {
  Plus,
  GripVertical,
  Heading1,
  Heading2,
  List,
  ListOrdered,
  Code,
  Table,
  Image,
  MessageSquare,
  Edit3,
  BookOpen,
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlockControlsProps {
  editor: Editor
  nodePos: number
  nodeDom: HTMLElement
}

export function BlockControls({ editor, nodePos, nodeDom }: BlockControlsProps) {
  const [showControls, setShowControls] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)
  const [controlsPosition, setControlsPosition] = useState({ top: 0, height: 0 })

  useEffect(() => {
    if (!editor || nodePos === null || !nodeDom) return

    try {
      const rect = nodeDom.getBoundingClientRect()
      const editorRect = editor.view.dom.getBoundingClientRect()

      setControlsPosition({
        top: rect.top - editorRect.top,
        height: rect.height,
      })
    } catch (error) {
      console.debug("Error in BlockControls useEffect:", error)
    }
  }, [editor, nodePos, nodeDom])

  if (!editor) return null

  const addBlock = (type: string) => {
    if (!editor) return

    try {
      const { state } = editor
      const node = state.doc.nodeAt(nodePos)

      if (!node) return

      const pos = nodePos + node.nodeSize

      switch (type) {
        case "heading1":
          editor
            .chain()
            .focus()
            .insertContentAt(pos, { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "" }] })
            .run()
          break
        case "heading2":
          editor
            .chain()
            .focus()
            .insertContentAt(pos, { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "" }] })
            .run()
          break
        case "bulletList":
          editor
            .chain()
            .focus()
            .insertContentAt(pos, {
              type: "bulletList",
              content: [{ type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }] }],
            })
            .run()
          break
        case "orderedList":
          editor
            .chain()
            .focus()
            .insertContentAt(pos, {
              type: "orderedList",
              content: [{ type: "listItem", content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }] }],
            })
            .run()
          break
        case "codeBlock":
          editor
            .chain()
            .focus()
            .insertContentAt(pos, { type: "codeBlock", content: [{ type: "text", text: "" }] })
            .run()
          break
        case "table":
          // Simple 2x2 table
          editor
            .chain()
            .focus()
            .insertContentAt(pos, {
              type: "table",
              content: [
                {
                  type: "tableRow",
                  content: [
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }] },
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }] },
                  ],
                },
                {
                  type: "tableRow",
                  content: [
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }] },
                    { type: "tableCell", content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }] },
                  ],
                },
              ],
            })
            .run()
          break
        case "image":
          // In a real app, you'd open a file picker here
          const url = prompt("Enter image URL")
          if (url) {
            editor
              .chain()
              .focus()
              .insertContentAt(pos, { type: "image", attrs: { src: url, alt: "" } })
              .run()
          }
          break
        case "paragraph":
        default:
          editor
            .chain()
            .focus()
            .insertContentAt(pos, { type: "paragraph", content: [{ type: "text", text: "" }] })
            .run()
          break
      }
    } catch (error) {
      console.debug("Error in addBlock:", error)
    }
  }

  const formatBlock = (action: string) => {
    if (!editor) return

    try {
      switch (action) {
        case "cite":
          // Open citation dialog (placeholder)
          alert("Citation feature would open here")
          break
        case "chat":
          // Open chat with AI about this block (placeholder)
          alert("Chat about this block would open here")
          break
        case "aiEdit":
          // Open AI editing options (placeholder)
          alert("AI editing options would open here")
          break
        case "bold":
          editor.chain().focus().toggleBold().run()
          break
        case "italic":
          editor.chain().focus().toggleItalic().run()
          break
        case "alignLeft":
          // Would need a text align extension
          break
        case "alignCenter":
          // Would need a text align extension
          break
        case "alignRight":
          // Would need a text align extension
          break
        default:
          break
      }
    } catch (error) {
      console.debug("Error in formatBlock:", error)
    }
  }

  return (
    <div
      ref={controlsRef}
      className="absolute left-0 flex items-center pointer-events-none z-10 -pl-[80px]"
      style={{
        top: `${controlsPosition.top}px`,
        height: `${controlsPosition.height}px`,
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <div
        className={cn(
          "flex gap-1 transition-opacity duration-200 pointer-events-auto",
          showControls ? "opacity-100" : "opacity-30",
        )}
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full bg-background shadow-sm hover:bg-background"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => addBlock("heading1")}>
              <Heading1 className="mr-2 h-4 w-4" />
              <span>Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("heading2")}>
              <Heading2 className="mr-2 h-4 w-4" />
              <span>Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => addBlock("bulletList")}>
              <List className="mr-2 h-4 w-4" />
              <span>Bullet List</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("orderedList")}>
              <ListOrdered className="mr-2 h-4 w-4" />
              <span>Numbered List</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => addBlock("codeBlock")}>
              <Code className="mr-2 h-4 w-4" />
              <span>Code Block</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("table")}>
              <Table className="mr-2 h-4 w-4" />
              <span>Table</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("image")}>
              <Image className="mr-2 h-4 w-4" />
              <span>Image</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

