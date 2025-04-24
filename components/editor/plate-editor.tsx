'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { useCreateEditor } from './use-create-editor'
import { Plate } from '@udecode/plate/react'
import { Editor, EditorContainer } from '../plate-ui/editor'
import { SettingsDialog } from './settings'
import { supabase } from '@/lib/supabase-client'
import { Value } from '@udecode/plate'

export type PlateEditorProps = {
  initialContent?: Value
  docId: string
}

export function PlateEditor({ initialContent, docId }: PlateEditorProps) {
  const editor = useCreateEditor()

  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (initialContent) {
      editor.children = initialContent
    } else {
      editor.children = [{ type: 'p', children: [{ text: 'Type a paragraph' }] }]
    }

    setIsReady(true)
  }, [editor, initialContent])

  const handleChange = useCallback(async () => {
    const contentText = JSON.stringify(editor.children) 

    const { error } = await supabase
      .from('research_documents')
      .update({ content: contentText })
      .eq('id', docId)

    if (error) {
      console.error('Error saving content:', error)
    }
  }, [editor.children, docId])

  if (!isReady) {
    return null
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