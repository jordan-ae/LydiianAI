'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { Plate } from '@udecode/plate/react';

import { useCreateEditor } from '@/components/editor/use-create-editor';
import { SettingsDialog } from '@/components/editor/settings';
import { Editor, EditorContainer } from '@/components/plate-ui/editor';
import { supabase } from '@/lib/supabase-client';
import { serializeHtml } from '@udecode/plate';

interface PlateEditorProps {
  documentId: string | null;
  initialContent: string;
  onContentChange: (content: string) => void;
}

export function PlateEditor({ documentId, initialContent, onContentChange }: PlateEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [initialContents, setInitialContent] = useState<string | null>(null);

  // Debounce function
  const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // Debounced content handler
  const debouncedHandleContentChange = useCallback(debounce(async (content: string) => {
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
  }, 5000), [documentId]);

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

  const editor = useCreateEditor({
    value: initialContents || initialContent || '<h1>New Document</h1><p>Start writing here...</p>',
  });

  console.log('editor', editor);

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate 
        editor={editor}
        onChange={async ({ value }) => {
          const htmlContent = await serializeHtml(editor, {
            nodes: editor.children,
          });
          setContent(htmlContent);
          onContentChange(htmlContent);
          await debouncedHandleContentChange(htmlContent); // Use debounced handler
        }}
      >
        <EditorContainer>
          <Editor variant="demo" />
        </EditorContainer>

        {/* <SettingsDialog /> */}
      </Plate>
    </DndProvider>
  );
}
