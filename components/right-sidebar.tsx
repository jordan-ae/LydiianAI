"use client"

import { useState } from "react"
import { SidebarContent, SidebarHeader, SidebarFooter } from "@/components/ui/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Wand2, History, Plus } from "lucide-react"
import { AIChat } from "@/components/ai-chat"
import { AITools } from "@/components/ai-tools"
import { Button } from "@/components/ui/button"

export function RightSidebar() {
  const [activeTab, setActiveTab] = useState("chat")

  return (
    <div className="h-full flex flex-col">
      <SidebarHeader className="p-4 flex items-center justify-between">
        {/* <h2 className="text-sm font-semibold">AI Assistant</h2> */}
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">
            <History className="h-4 w-4 mr-2" />
            History
          </Button>
          <Button variant="ghost" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col h-full">
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

          <TabsContent value="chat" className="flex-1 flex flex-col h-full overflow-hidden">
            <AIChat />
          </TabsContent>

          <TabsContent value="tools" className="p-4">
            <AITools />
          </TabsContent>
        </Tabs>
      </SidebarContent>

      <SidebarFooter className="p-4 text-center text-xs text-muted-foreground">Powered by GPT 4o</SidebarFooter>
    </div>
  )
}

