"use client";

import { useState, useEffect, useRef } from "react";
import { Editor } from "@/components/editor";
import { LeftSidebar } from "@/components/left-sidebar";
import { RightSidebar } from "@/components/right-sidebar";
import { Button } from "@/components/ui/button";
import {
  Moon,
  Sun,
  ChevronLeft,
  ChevronRight,
  Download,
  Upload,
} from "lucide-react";
import { useTheme } from "next-themes";
import { supabase } from "@/lib/supabase-client";
import { useRouter } from "next/navigation";
import { formatLastUpdated } from "@/utils/date-formatter";
import { PlateEditor } from "./editor/plate-editor";
import { SettingsProvider } from "./editor/settings";

interface ResearchAssistantProps {
  initialDocumentId?: string | null;
  initialContent?: string;
  initialTitle?: string;
  lastUpdatedAt?: string;
}

export function ResearchAssistant({
  initialDocumentId,
  initialTitle,
  lastUpdatedAt,
}: ResearchAssistantProps) {
  const { theme, setTheme } = useTheme();
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState<string | null>(
    initialDocumentId || null
  );
  const [documentTitle, setDocumentTitle] = useState<string>(
    initialTitle || "Untitled Document"
  );
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [tempTitle, setTempTitle] = useState(documentTitle);
  const [lastUpdated, setLastUpdated] = useState<string>(
    lastUpdatedAt || new Date().toISOString()
  );

  // Add useRef for debounce timeout
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  type TElement = { type: string; children: { text: string }[] };

  const [initialContent, setInitialContent] = useState<TElement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const { data, error } = await supabase
        .from("research_documents")
        .select("content")
        .eq("id", initialDocumentId)
        .single();

      if (error) {
        console.error("Error fetching document:", error);
        setInitialContent([]);
      } else {
        try {
          setInitialContent(
            data?.content
              ? JSON.parse(data.content)
              : [{ type: "p", children: [{ text: "" }] }]
          );
        } catch (err) {
          console.error("Error parsing document content:", err);
          setInitialContent([{ type: "p", children: [{ text: "" }] }]);
        }
      }

      setLoading(false);
    };

    fetchContent();
  }, [initialDocumentId]);

  const toggleLeftSidebar = () => {
    setLeftSidebarOpen(!leftSidebarOpen);
  };

  const toggleRightSidebar = () => {
    setRightSidebarOpen(!rightSidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleTitleChange = async (newTitle: string) => {
    if (currentDocumentId) {
      const { error } = await supabase
        .from("research_documents")
        .update({ title: newTitle, updated_at: new Date().toISOString() })
        .eq("id", currentDocumentId);

      if (!error) {
        setDocumentTitle(newTitle);
        setLastUpdated(new Date().toISOString());
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
    );
  }

  return (
    <div className="flex h-screen w-full">
      <div
        className={`fixed sm:relative z-50 h-screen border-r bg-background transition-transform transform ${
          leftSidebarOpen
            ? "translate-x-0 w-64"
            : "-translate-x-full sm:translate-x-0 sm:w-0"
        }`}
      >
        {leftSidebarOpen && <LeftSidebar />}
      </div>

      <div className="flex-1 flex flex-col relative min-w-0">
        <header className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={toggleLeftSidebar}
            >
              {leftSidebarOpen ? (
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
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
                  if (e.key === "Enter") {
                    setIsEditingTitle(false);
                    handleTitleChange(tempTitle);
                  }
                }}
                className="text-lg sm:text-xl font-semibold bg-transparent focus:outline-none"
                autoFocus
              />
            ) : (
              <div className="flex flex-col">
                <h1
                  className="text-base sm:text-base font-semibold cursor-pointer hover:bg-muted/50 px-2 py-1 rounded"
                  onClick={() => {
                    setTempTitle(documentTitle);
                    setIsEditingTitle(true);
                  }}
                >
                  {documentTitle}
                </h1>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-base sm:block text-muted-foreground px-2">
              Edited: {formatLastUpdated(lastUpdated)}
            </span>
            <span className="text-base">Share</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={toggleRightSidebar}
            >
              {rightSidebarOpen ? (
                <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
              onClick={toggleTheme}
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>
          </div>
        </header>

        <main className="flex-1 overflow-auto min-w-0">
          <SettingsProvider>
            <PlateEditor
              initialContent={initialContent}
              docId={currentDocumentId || ""}
            />
          </SettingsProvider>
        </main>
      </div>

      <div
        className={`fixed sm:relative z-50 h-screen border-l bg-background transition-transform transform ${
          rightSidebarOpen
            ? "translate-x-0 w-80"
            : "translate-x-full sm:translate-x-0 sm:w-0"
        }`}
      >
        {rightSidebarOpen && <RightSidebar />}
      </div>
    </div>
  );
}
