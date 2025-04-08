'use client';

import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';

interface PlateEditorProps {
  initialContent?: string;
}

export function PlateEditor({ initialContent }: PlateEditorProps) {
  const editor = useCreateEditor();

  if (initialContent) {
    try {
      editor.children = [
        {
          type: 'p',
          children: [{ text: initialContent }]
        }
      ];
    } catch (error) {
      console.error('Error setting initial content:', error);
      editor.children = [{ type: 'p', children: [{ text: 'Start writing here...' }] }];
    }
  } else {
    editor.children = [{ type: 'p', children: [{ text: 'Start writing here...' }] }];
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate 
        editor={editor}
      >
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>
        <SettingsDialog />
      </Plate>
    </DndProvider>
  );
}
