"use client"

import { useState, useEffect, useRef } from "react"
import type { Editor } from "@tiptap/react"
import { Bold, Italic, Underline, Plus, Heading1, Heading2, List, ListOrdered, Code, Quote, MessageSquare, Bot, Bookmark, Heading3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { AICommand } from "./ai-command"

interface InlineControlsProps {
  editor: Editor
  position: { top: number; left: number; bottom: number; position: string }
}

export function InlineControls({ editor, position }: InlineControlsProps) {
  const [visible, setVisible] = useState(false)
  const controlsRef = useRef<HTMLDivElement>(null)
  const [aiCommandOpen, setAICommandOpen] = useState(false)

  useEffect(() => {
    const handleMouseUp = () => {
      if (editor.state.selection.empty) {
        setVisible(false)
      } else {
        setVisible(true)
      }
    }

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isInsideAICommand = target.closest('.ai-command-container');
      const isAIButton = target.closest('[data-active="aiEdits"]');
      if (aiCommandOpen && !isInsideAICommand && !isAIButton) {
        setAICommandOpen(false);
      }
    }

    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [editor, aiCommandOpen])

  if (!visible) return null

  const addNewParagraph = (type: string) => {
    if (!editor) return

    try {
      switch (type) {
        case "paragraph":
          editor
            .chain()
            .focus()
            .setParagraph()
            .run()
          break
        case "heading1":
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 1 })
            .run()
          break
        case "heading2":
          editor
            .chain()
            .focus()
            .toggleHeading({ level: 2 })
            .run()
          break
        case "bulletList":
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
          break
        case "orderedList":
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
          break
        case "codeBlock":
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
          break
        case "blockquote":
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
          break
        default:
          console.warn("Unknown paragraph type:", type)
      }
      
      setVisible(false)
    } catch (error) {
      console.error("Error in addNewParagraph:", error)
    }
  }

  const handleAICommandSelect = (value: string) => {
    setAICommandOpen(false)
    console.log("Selected AI command:", value)
  } 

  return (
    <>
      <div
        ref={controlsRef}
        className="fixed z-10 flex items-center gap-1 bg-background border rounded-lg shadow-md p-1"
        style={{
          top: `${position.top + 5}px`,
          left: `${position.left}px`,
          transform: "translateX(-50%)"
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

        <Button
          variant="ghost"
          className="h-8 px-2 rounded-md flex items-center gap-2"
          onClick={() => addNewParagraph("cite")}
          data-active={editor.isActive("cite")}
        >
          <Bookmark className="h-4 w-4" />
          <span>Cite</span>
        </Button>

        <Button
          variant="ghost"
          className="h-8 px-2 rounded-md flex items-center gap-2"
          onClick={() => setAICommandOpen(true)}
          data-active={editor.isActive("aiEdits")}
        >
          <Bot className="h-4 w-4" />
          <span>AI Edits</span>
        </Button>

        <Button
          variant="ghost"
          className="h-8 px-2 rounded-md flex items-center gap-2"
          onClick={() => addNewParagraph("chat")}
          data-active={editor.isActive("chat")}
        >
          <MessageSquare className="h-4 w-4" />
          <span>Chat</span>
        </Button>

        <div className="w-px h-6 bg-border mx-1"></div>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-md">
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuItem onClick={() => {
              editor.chain().focus().setParagraph().run();
              editor.commands.unsetAllMarks();
            }}>
              <span className="mr-2">¶</span>
              <span>Normal Text</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
              <Heading1 className="mr-2 h-4 w-4" />
              <span>Heading 1</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
              <Heading2 className="mr-2 h-4 w-4" />
              <span>Heading 2</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
              <Heading3 className="mr-2 h-4 w-4" />
              <span>Heading 3</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleBulletList().run()}>
              <List className="mr-2 h-4 w-4" />
              <span>Bullet List</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleOrderedList().run()}>
              <ListOrdered className="mr-2 h-4 w-4" />
              <span>Numbered List</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
              <Code className="mr-2 h-4 w-4" />
              <span>Code Block</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => editor.chain().focus().toggleBlockquote().run()}>
              <Quote className="mr-2 h-4 w-4" />
              <span>Blockquote</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {aiCommandOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="ai-command-container rounded-lg w-full max-w-[500px] p-4">
            <AICommand onClose={() => setAICommandOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

