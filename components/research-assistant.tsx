"use client"

import { useState, useEffect, useRef } from "react"
import { Editor } from "@/components/editor"
import { LeftSidebar } from "@/components/left-sidebar"
import { RightSidebar } from "@/components/right-sidebar"
import { Button } from "@/components/ui/button"
import { Moon, Sun, ChevronLeft, ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"
import { supabase } from '@/lib/supabase-client';
import { useRouter } from 'next/navigation';

interface ResearchAssistantProps {
  initialDocumentId?: string | null;
  initialContent?: string;
  initialTitle?: string;
}

export function ResearchAssistant({ initialDocumentId, initialContent, initialTitle }: ResearchAssistantProps) {
  const { theme, setTheme } = useTheme()
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false)
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(initialDocumentId || null);
  const [initialContentState, setInitialContent] = useState<string>(initialContent || '');
  const [documentTitle, setDocumentTitle] = useState<string>(initialTitle || 'Untitled Document');
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);

  // Add useRef for debounce timeout
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch document content when initialDocumentId changes
  useEffect(() => {
    const fetchDocumentContent = async () => {
      if (initialDocumentId) {
        const { data, error } = await supabase
          .from('research_documents')
          .select('content, title')
          .eq('id', initialDocumentId)
          .single();

        if (!error && data) {
          setInitialContent(data.content);
          setDocumentTitle(data.title || 'Untitled Document');
          setCurrentDocumentId(initialDocumentId);
        }
      }
    };

    fetchDocumentContent();
  }, [initialDocumentId]);

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen)
  }

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const handleContentChange = async (content: string) => {
    if (currentDocumentId) {
      // Clear any existing timeout
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      
      // Set a new timeout
      debounceTimeout.current = setTimeout(async () => {
        await supabase
          .from('research_documents')
          .update({ content })
          .eq('id', currentDocumentId);
      }, 2000); // 500ms debounce delay
    }
  };

  const handleTitleChange = async (newTitle: string) => {
    if (currentDocumentId) {
      const { error } = await supabase
        .from('research_documents')
        .update({ title: newTitle })
        .eq('id', currentDocumentId);

      if (!error) {
        setDocumentTitle(newTitle);
      }
    }
  };

  // const createNewDocument = async () => {
  //   const title = 'Untitled Document';
  //   const content = '';
  //   const { data, error } = await supabase
  //     .from('research_documents')
  //     .insert([{ title, content }])
  //     .select()
  //     .single();

  //   if (!error && data) {
  //     setCurrentDocumentId(data.id);
  //   }
  // };

  // Cleanup timeout on component unmount
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  if (!mounted) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-muted-foreground">Initializing Lydiian AI...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex h-screen w-full">
      <div className={`border-r transition-all duration-300 ${leftSidebarOpen ? "w-64" : "w-0"}`}>
        {leftSidebarOpen && <LeftSidebar />}
      </div>

      <div className="flex-1 flex flex-col relative">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleLeftSidebar}>
              {leftSidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
            </Button>
            {isEditingTitle ? (
              <input
                type="text"
                value={tempTitle}
                onChange={(e) => setTempTitle(e.target.value)}
                onBlur={() => {
                  setIsEditingTitle(false);
                  handleTitleChange(tempTitle);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setIsEditingTitle(false);
                    handleTitleChange(tempTitle);
                  }
                }}
                className="text-xl font-semibold bg-transparent focus:outline-none"
                autoFocus
              />
            ) : (
              <h1 
                className="text-xl font-semibold cursor-pointer hover:bg-muted/50 px-2 py-1 rounded"
                onClick={() => {
                  setTempTitle(documentTitle);
                  setIsEditingTitle(true);
                }}
              >
                {documentTitle}
              </h1>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => console.log('Export clicked')}>
              Export
            </Button>
            <Button onClick={() => console.log('Publish clicked')}>
              Publish
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleRightSidebar}>
              {rightSidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* <Button onClick={createNewDocument}>
              New Document
            </Button> */}
          </div>
        </header>

        <main className="flex-1 overflow-auto">
          <Editor 
            documentId={currentDocumentId}
            initialContent={initialContentState}
            onContentChange={handleContentChange}
          />
        </main>
      </div>

      <div className={`border-l transition-all duration-300 ${rightSidebarOpen ? "w-80" : "w-0"}`}>
        {rightSidebarOpen && <RightSidebar />}
      </div>
    </div>
  )
}

