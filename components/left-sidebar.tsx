"use client"

import { useState } from "react"
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
} from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUploader } from "@/components/file-uploader"
import { ReferenceManager } from "@/components/reference-manager"
import { FileText, FolderOpen, BookOpen, FileUp, User, Settings } from "lucide-react"

export function LeftSidebar() {
  const [activeTab, setActiveTab] = useState("files")

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader className="p-4">
        <Tabs defaultValue="files" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="files">Files</TabsTrigger>
            <TabsTrigger value="references">References</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
          </TabsList>

          <SidebarContent>
            <TabsContent value="files" className="mt-0">
              <SidebarGroup>
                <SidebarGroupLabel>My Files</SidebarGroupLabel>
                <SidebarGroupContent>
                  <FileUploader />
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <FileText className="h-4 w-4" />
                        <span>Research Paper.docx</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <FileText className="h-4 w-4" />
                        <span>Literature Review.pdf</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    <SidebarMenuItem>
                      <SidebarMenuButton>
                        <FolderOpen className="h-4 w-4" />
                        <span>Research Materials</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </TabsContent>

            <TabsContent value="references" className="mt-0">
              <ReferenceManager />
            </TabsContent>

            <TabsContent value="tools" className="mt-0">
              <SidebarGroup>
                <SidebarGroupLabel>Research Tools</SidebarGroupLabel>
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
              </SidebarGroup>
            </TabsContent>
          </SidebarContent>
        </Tabs>
      </SidebarHeader>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <User className="h-4 w-4" />
              <span>Account</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </div>
  )
}

