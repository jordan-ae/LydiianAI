"use client"

import { useState, useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Bold, Italic, Underline, Plus, Heading1, Heading2, List, ListOrdered, Code, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface InlineControlsProps {
  editor: Editor
  position: { top: number; left: number; bottom: number }
}

export function InlineControls({ editor, position }: InlineControlsProps) {
  const [visible, setVisible] = useState(true)
  const controlsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(event.target as Node)) {
        setVisible(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  if (!visible) return null

  const addNewParagraph = (type: string) => {
    if (!editor) return

    try {
      // Get the current selection
      const { from } = editor.state.selection

      // Find the end of the current paragraph
      const $pos = editor.state.doc.resolve(from)
      const endOfNode = $pos.after()

      // Insert the new node type at the end of the current paragraph
      switch (type) {
        case "paragraph":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, { type: "paragraph", content: [{ type: "text", text: "" }] })
            .run()
          break
        case "heading1":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, { type: "heading", attrs: { level: 1 }, content: [{ type: "text", text: "" }] })
            .run()
          break
        case "heading2":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "" }] })
            .run()
          break
        case "bulletList":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, {
              type: "bulletList",
              content: [
                {
                  type: "listItem",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
                },
              ],
            })
            .run()
          break
        case "orderedList":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, {
              type: "orderedList",
              content: [
                {
                  type: "listItem",
                  content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
                },
              ],
            })
            .run()
          break
        case "codeBlock":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, { type: "codeBlock", content: [{ type: "text", text: "" }] })
            .run()
          break
        case "blockquote":
          editor
            .chain()
            .focus()
            .insertContentAt(endOfNode, {
              type: "blockquote",
              content: [{ type: "paragraph", content: [{ type: "text", text: "" }] }],
            })
            .run()
          break
      }

      // Hide the controls after adding a new paragraph
      setVisible(false)
    } catch (error) {
      console.debug("Error in addNewParagraph:", error)
    }
  }

  return (
    <div
      ref={controlsRef}
      className="absolute z-10 flex items-center gap-1 bg-background border rounded-lg shadow-md p-1"
      style={{
        top: `${position.bottom + 5}px`, // Position just below the selection
        left: `${position.left}px`,
        transform: "translateX(-50%)", // Center horizontally
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={() => editor.chain().focus().toggleBold().run()}
        data-active={editor.isActive("bold")}
      >
        <Bold className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        data-active={editor.isActive("italic")}
      >
        <Italic className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-md"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        data-active={editor.isActive("underline")}
      >
        <Underline className="h-4 w-4" />
      </Button>

      <div className="w-px h-6 bg-border mx-1"></div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <DropdownMenuItem onClick={() => addNewParagraph("paragraph")}>
            <span className="mr-2">¶</span>
            <span>Paragraph</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewParagraph("heading1")}>
            <Heading1 className="mr-2 h-4 w-4" />
            <span>Heading 1</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewParagraph("heading2")}>
            <Heading2 className="mr-2 h-4 w-4" />
            <span>Heading 2</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewParagraph("bulletList")}>
            <List className="mr-2 h-4 w-4" />
            <span>Bullet List</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewParagraph("orderedList")}>
            <ListOrdered className="mr-2 h-4 w-4" />
            <span>Numbered List</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewParagraph("codeBlock")}>
            <Code className="mr-2 h-4 w-4" />
            <span>Code Block</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => addNewParagraph("blockquote")}>
            <Quote className="mr-2 h-4 w-4" />
            <span>Blockquote</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

