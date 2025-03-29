"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { AIAutoComplete } from "@/components/ai-autocomplete"
import { BlockControls } from "@/components/editor/block-controls"
import { InlineControls } from "@/components/editor/inline-controls"
import { useState, useCallback, useRef, useEffect } from "react"

export function Editor() {
  const [hoveredNodePos, setHoveredNodePos] = useState<number | null>(null)
  const [hoveredNodeDom, setHoveredNodeDom] = useState<HTMLElement | null>(null)
  const [selectionRange, setSelectionRange] = useState<{ top: number; left: number; bottom: number } | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading"
          }
          return 'Type "/" for commands...'
        },
        includeChildren: true,
      }),
      AIAutoComplete,
    ],
    content:
      "<h1>My Research Document</h1><p>Start writing here...</p><p>Hover over this paragraph to see the block controls.</p><p>Select some text to see the inline formatting controls.</p>",
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert focus:outline-none max-w-none px-8 py-6 tiptap",
      },
      handleClick(view, pos, event) {
        try {
          const { state } = view
          const $pos = state.doc.resolve(pos)

          // Update selection range for inline controls when text is selected
          setTimeout(() => {
            if (!view.state.selection.empty) {
              const { from, to } = view.state.selection
              const start = view.coordsAtPos(from)
              const end = view.coordsAtPos(to)

              setSelectionRange({
                top: Math.min(start.bottom, end.bottom),
                left: Math.min(start.left, end.left) + Math.abs(end.left - start.left) / 2,
                bottom: Math.max(start.bottom, end.bottom),
              })
            } else {
              setSelectionRange(null)
            }
          }, 0)
        } catch (error) {
          console.debug("Error in handleClick:", error)
        }

        return false
      },
    },
    onSelectionUpdate: ({ editor }) => {
      try {
        const { state } = editor
        const { selection } = state

        if (!selection.empty) {
          const { from, to } = selection
          const start = editor.view.coordsAtPos(from)
          const end = editor.view.coordsAtPos(to)

          setSelectionRange({
            top: Math.min(start.bottom, end.bottom),
            left: Math.min(start.left, end.left) + Math.abs(end.left - start.left) / 2,
            bottom: Math.max(start.bottom, end.bottom),
          })
        } else {
          setSelectionRange(null)
        }
      } catch (error) {
        console.debug("Error in onSelectionUpdate:", error)
      }
    },
  })

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!editor) return

      try {
        const { view } = editor
        const pos = view.posAtCoords({ left: e.clientX, top: e.clientY })

        if (pos) {
          const $pos = view.state.doc.resolve(pos.pos)

          if ($pos.parent.isBlock) {
            // Find the DOM node for this position
            let domNode = null

            // For top-level nodes
            if ($pos.depth === 0) {
              const nodePos = $pos.start()
              const node = view.nodeDOM(nodePos)
              if (node && node instanceof HTMLElement) {
                domNode = node
                setHoveredNodePos(nodePos)
              }
            } else {
              // For nested nodes
              const nodePos = $pos.before($pos.depth)
              const node = view.nodeDOM(nodePos)
              if (node && node instanceof HTMLElement) {
                domNode = node
                setHoveredNodePos(nodePos)
              }
            }

            if (domNode) {
              setHoveredNodeDom(domNode)
            }
          }
        }
      } catch (error) {
        console.debug("Error in handleMouseMove:", error)
      }
    },
    [editor],
  )

  useEffect(() => {
    const editorElement = editorRef.current
    if (editorElement) {
      editorElement.addEventListener("mousemove", handleMouseMove)
    }

    return () => {
      if (editorElement) {
        editorElement.removeEventListener("mousemove", handleMouseMove)
      }
    }
  }, [handleMouseMove])

  // Ensure editor is initialized before rendering controls
  if (!editor) {
    return (
      <div className="notion-editor w-full max-w-4xl mx-auto">
        <div className="relative pl-14">
          <div className="min-h-[70vh] border rounded-md p-4 animate-pulse bg-gray-100">Loading editor...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="notion-editor w-full max-w-4xl mx-auto">
      <div ref={editorRef} className="relative pl-14">
        {editor && hoveredNodePos !== null && hoveredNodeDom && (
          <BlockControls editor={editor} nodePos={hoveredNodePos} nodeDom={hoveredNodeDom} />
        )}
        {editor && selectionRange && !editor.view.state.selection.empty && (
          <InlineControls editor={editor} position={selectionRange} />
        )}
        <EditorContent editor={editor} className="min-h-[70vh] border-0" />
      </div>
    </div>
  )
}

