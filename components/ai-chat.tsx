"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useToast } from "@/hooks/use-toast"

type Message = {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export function AIChat() {
  const { toast } = useToast()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm your research assistant. How can I help you today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simulate AI response
      setTimeout(() => {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: getAIResponse(input),
          role: "assistant",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, aiMessage])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      })
      setIsLoading(false)
    }
  }

  // Simple mock AI response function
  const getAIResponse = (query: string): string => {
    if (query.toLowerCase().includes("research")) {
      return "I can help with your research! You can upload papers, ask me questions about them, or have me generate outlines for your work."
    } else if (query.toLowerCase().includes("paper") || query.toLowerCase().includes("outline")) {
      return "I can help you create a paper outline. Just tell me your research topic and I'll suggest a structure with sections and subsections."
    } else if (query.toLowerCase().includes("paraphrase") || query.toLowerCase().includes("rewrite")) {
      return "I can paraphrase or rewrite text for you. Just paste the text you want to rephrase and specify the tone you'd like."
    } else {
      return "I'm here to assist with your research needs. I can help with paper outlines, paraphrasing, reference management, and answering questions about your research materials."
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`flex max-w-[80%] items-start gap-2 rounded-lg p-3 ${
                  message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {message.role === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                </div>
                <div>
                  <p className="text-sm">{message.content}</p>
                  <p className="mt-1 text-xs opacity-70">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Textarea
            placeholder="Ask about your research..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  )
}

