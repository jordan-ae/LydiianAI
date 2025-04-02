"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import { BlockControls } from "@/components/editor/block-controls"
import { InlineControls } from "@/components/editor/inline-controls"
import { useState, useCallback, useRef, useEffect } from "react"
import { supabase } from '@/lib/supabase-client'
import { AIAutoComplete } from "./ai-autocomplete"

interface EditorProps {
  documentId: string | null;
  initialContent: string;
  onContentChange: (content: string) => void;
}

export function Editor({ documentId, initialContent, onContentChange }: EditorProps) {
  const [hoveredNodePos, setHoveredNodePos] = useState<number | null>(null)
  const [hoveredNodeDom, setHoveredNodeDom] = useState<HTMLElement | null>(null)
  const [selectionRange, setSelectionRange] = useState<{ top: number; left: number; bottom: number; position: 'top' | 'bottom' } | null>(null)
  const editorRef = useRef<any>(null)
  const [currentText, setCurrentText] = useState('')
  const [content, setContent] = useState('')
  const [initialContents, setInitialContent] = useState<string | null>(null);

  const handleContentChange = useCallback(async (content: string) => {
    if (!documentId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error } = await supabase
        .from('research_documents')
        .update({ 
          content,
          user_id: user.id 
        })
        .eq('id', documentId);

      if (error) {
        console.error('Error updating document:', error);
      }
    } catch (err) {
      console.error('Failed to update document:', err);
    }
  }, [documentId]);

  useEffect(() => {
    const fetchDocumentContent = async () => {
      if (documentId) {
        try {
          const { data, error } = await supabase
            .from('research_documents')
            .select('content')
            .eq('id', documentId)
            .single();

          if (!error && data) {
            setInitialContent(data.content);
          } else {
            console.error('Error fetching document:', error);
            setInitialContent('<h1>New Document</h1><p>Start writing here...</p>');
          }
        } catch (err) {
          console.error('Failed to fetch document:', err);
          setInitialContent('<h1>New Document</h1><p>Start writing here...</p>');
        }
      } else {
        setInitialContent('<h1>New Document</h1><p>Start writing here...</p>');
      }
    };

    fetchDocumentContent();
  }, [documentId]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
        paragraph: {
          HTMLAttributes: {
            class: 'paragraph',
          },
        },
        hardBreak: false,
        dropcursor: {
          color: '#DBEAFE',
          width: 4,
        },
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "heading") {
            return "Heading"
          }
          return 'Start writing...'
        },
        includeChildren: true,
      }),
      AIAutoComplete,

    ],
    content: initialContent || '',
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert focus:outline-none max-w-none px-8 py-6 tiptap",
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          const { state } = view;
          const { selection } = state;
          const { $from, empty } = selection;

          if (!empty || $from.parent.type.name !== 'paragraph') {
            return false;
          }

          view.dispatch(
            state.tr
              .split($from.pos, 1)
              .scrollIntoView()
          );
          return true;
        }
        return false;
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

          const centerX = (start.left + end.left) / 2
          const selectionHeight = Math.abs(end.bottom - start.top)

          const viewportHeight = window.innerHeight
          const viewportWidth = window.innerWidth

          // Check if there's enough space below
          const spaceBelow = viewportHeight - end.bottom
          const spaceAbove = start.top

          setSelectionRange({
            top: end.bottom,
            left: centerX,
            bottom: end.bottom + selectionHeight,
            position: spaceBelow > 100 ? 'bottom' : 'top'
          })
        } else {
          setSelectionRange(null)
        }
      } catch (error) {
        console.debug("Error in onSelectionUpdate:", error)
      }
    },
    onUpdate: ({ editor }) => {
      const htmlContent = editor.getHTML();
      onContentChange(htmlContent);
      handleContentChange(htmlContent);
    },
  })

  useEffect(() => {
    if (editor && initialContent) {
      editor.commands.setContent(initialContent);
    }
  }, [initialContent]);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!editor) return

      try {
        const { view } = editor
        const pos = view.posAtCoords({ left: e.clientX, top: e.clientY })

        if (pos) {
          const $pos = view.state.doc.resolve(pos.pos)

          if ($pos.parent.isBlock) {
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
    if (!editor) return;

    const handleUpdate = () => {
      setCurrentText(editor.getText());
    };

    editor.on('update', handleUpdate);

    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (editor && !editor.state.selection.empty) {
        const { from, to } = editor.state.selection
        const start = editor.view.coordsAtPos(from)
        const end = editor.view.coordsAtPos(to)

        const centerX = (start.left + end.left) / 2
        const selectionHeight = Math.abs(end.bottom - start.top)

        setSelectionRange({
          top: end.bottom,
          left: centerX,
          bottom: end.bottom + selectionHeight,
          position: 'bottom'
        })
      }
    }

    window.addEventListener('scroll', handleScroll, true)
    return () => window.removeEventListener('scroll', handleScroll, true)
  }, [editor])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    onContentChange(newContent);
  };

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
      <div ref={editorRef} className="relative pl-14 sm:pl-0">
        {/* {editor && hoveredNodePos !== null && hoveredNodeDom && (
          <BlockControls editor={editor} nodePos={hoveredNodePos} nodeDom={hoveredNodeDom} />
        )} */}
        {editor && selectionRange && !editor.view.state.selection.empty && (
          <InlineControls editor={editor} position={selectionRange} />
        )}
        <EditorContent editor={editor} className="min-h-[70vh] border-0" />
      </div>
    </div>
  )
}

