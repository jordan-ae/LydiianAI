"use client"

import { useState } from "react"
import { SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Wand2 } from "lucide-react"
import { AIChat } from "@/components/ai-chat"
import { AITools } from "@/components/ai-tools"

export function RightSidebar() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">AI Assistant</h2>
        <p className="text-sm text-muted-foreground">Your research companion</p>
      </SidebarHeader>

      <SidebarContent>
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat">
              <MessageSquare className="mr-2 h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="tools">
              <Wand2 className="mr-2 h-4 w-4" />
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="flex-1 overflow-hidden">
            <AIChat />
          </TabsContent>

          <TabsContent value="tools" className="p-4">
            <AITools />
          </TabsContent>
        </Tabs>
      </SidebarContent>

      <SidebarFooter className="p-4 text-center text-xs text-muted-foreground">Powered by AI</SidebarFooter>
    </div>
  )
}

