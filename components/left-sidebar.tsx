"use client";

import { useState, useEffect, useMemo } from "react";
import {
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/file-uploader";
import { ReferenceManager } from "@/components/reference-manager";
import {
  FileText,
  FolderOpen,
  BookOpen,
  FileUp,
  User,
  Settings,
  ChevronDown,
  PlusIcon,
} from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { supabase } from "@/lib/supabase-client";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState("files");
  const [documents, setDocuments] = useState<{ id: string; title: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const storedUser = useMemo(() => JSON.parse(localStorage.getItem('user') || 'null'), []);
  const pathname = usePathname();
  const currentDocumentId = pathname.split('/')[2];
  
  useEffect(() => {
    const fetchDocuments = async () => {
      const { data, error } = await supabase
        .from("research_documents")
        .select("*")
        .eq("user_id", storedUser?.id);

      if (error) {
        console.error(error);
      } else {
        setDocuments(data);
      }
      setLoading(false);
    };

    if (storedUser?.id) {
      fetchDocuments();
    }
  }, [storedUser?.id]);

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/avatars/user.png" />
            <AvatarFallback>
              {storedUser
                ? (storedUser.name?.slice(0, 2) || storedUser.email?.slice(0, 2)).toUpperCase()
                : 'JD'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start">
            <span className="text-sm font-medium max-w-[160px] overflow-hidden whitespace-nowrap">
              {storedUser.email.length > 20 ? `${storedUser.email.slice(0, 20)}...` : storedUser.email}
            </span>
            <Button
              variant="link"
              className="h-auto p-0 text-xs text-muted-foreground"
            >
              View Profile
            </Button>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <Collapsible defaultOpen className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel>
              <CollapsibleTrigger>
                Files
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent className="mt-3">
              <SidebarGroupContent>
                <Button
                  variant="ghost"
                  className="w-full bg-muted hover:bg-muted/80"
                  size="sm"
                  onClick={async () => {
                    if (!storedUser?.id) return;
                    
                    const { data: newDocument, error } = await supabase
                      .from('research_documents')
                      .insert({ 
                        title: 'Untitled Document',
                        user_id: storedUser.id 
                      })
                      .select('id')
                      .single();

                    if (!error && newDocument) {
                      window.location.href = `/editor/${newDocument.id}`;
                    }
                  }}
                >
                  <PlusIcon className="h-4 w-4" />
                  New Document
                </Button>
                <SidebarMenu>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    documents.map((doc) => (
                      <SidebarMenuItem className="mt-1" key={doc.id}>
                        <Link href={`/editor/${doc.id}`} className="w-full">
                          <SidebarMenuButton className={doc.id === currentDocumentId ? 'bg-muted' : ''}>
                            <FileText className="h-4 w-4" />
                            <span>{doc.title}</span>
                          </SidebarMenuButton>
                        </Link>
                      </SidebarMenuItem>
                    ))
                  )}
                </SidebarMenu>
                <FileUploader />
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel>
              <CollapsibleTrigger>
                References
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <ReferenceManager />
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible>

        {/* <Collapsible className="group/collapsible">
          <SidebarGroup>
            <SidebarGroupLabel>
              <CollapsibleTrigger>
                Tools
                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
              </CollapsibleTrigger>
            </SidebarGroupLabel>
            <CollapsibleContent>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <FileUp className="h-4 w-4" />
                      <span>Paper Outline Builder</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton>
                      <BookOpen className="h-4 w-4" />
                      <span>Paraphrase & Rewrite</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </CollapsibleContent>
          </SidebarGroup>
        </Collapsible> */}
      </SidebarContent>

      <SidebarFooter className="mt-auto">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User className="h-4 w-4" />
              <span>Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  );
}
