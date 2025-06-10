'use client'
import React, { useCallback, useEffect, useState, useMemo } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useCreateEditor } from './use-create-editor'
import { Plate } from '@udecode/plate/react'
import { Editor, EditorContainer } from '../plate-ui/editor'
import { SettingsDialog } from './settings'
import { supabase } from '@/lib/supabase-client'
import { Value } from '@udecode/plate'
import { useDebounce } from '@/hooks/use-debounce'

export type PlateEditorProps = {
  initialContent?: Value
  docId: string
}

export function PlateEditor({ initialContent, docId }: PlateEditorProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const [content, setContent] = useState<Value | null>(null)
  
  // Create editor only once and memoize it
  const editor = useCreateEditor()
  
  // Debounce content changes
  const debouncedContent = useDebounce(content, 1000)

  // Handle mounting
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Initialize editor content
  useEffect(() => {
    if (!editor || !isMounted) return
    
    try {
      const defaultContent = [{ type: 'p', children: [{ text: 'Type a paragraph' }] }]
      const editorContent = initialContent || defaultContent
      
      editor.children = editorContent
      setContent(editorContent)
      setIsReady(true)
    } catch (error) {
      console.error('Error initializing editor:', error)
    }
  }, [editor, initialContent, isMounted])

  // Save debounced content
  useEffect(() => {
    if (!debouncedContent || !isMounted) return
    
    const saveContent = async () => {
      try {
        const contentText = JSON.stringify(debouncedContent)
        const { error } = await supabase
          .from('research_documents')
          .update({ content: contentText })
          .eq('id', docId)
        
        if (error) {
          console.error('Error saving content:', error)
        }
      } catch (error) {
        console.error('Error saving content:', error)
      }
    }
    
    saveContent()
  }, [debouncedContent, docId, isMounted])

  const handleChange = useCallback(() => {
    if (!editor || !isMounted) return
    
    try {
      setContent([...editor.children])
    } catch (error) {
      console.error('Error in handleChange:', error)
    }
  }, [editor, isMounted])

  // Don't render anything until mounted and ready
  if (!isMounted || !isReady || !editor) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-gray-500">Loading editor...</div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate editor={editor} onChange={handleChange}>
        <EditorContainer>
          <Editor variant="demo" placeholder="Type a paragraph" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  )
}