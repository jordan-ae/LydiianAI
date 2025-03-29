"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Sparkles, RefreshCw, Copy } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function AITools() {
  const { toast } = useToast()
  const [selectedTool, setSelectedTool] = useState<string>("paraphrase")
  const [inputText, setInputText] = useState<string>("")
  const [outputText, setOutputText] = useState<string>("")
  const [tone, setTone] = useState<string>("academic")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleGenerate = () => {
    if (!inputText.trim()) {
      toast({
        title: "Input required",
        description: "Please enter some text to process.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    // Simulate AI processing
    setTimeout(() => {
      if (selectedTool === "paraphrase") {
        setOutputText(getParaphraseOutput(inputText, tone))
      } else if (selectedTool === "outline") {
        setOutputText(getOutlineOutput(inputText))
      }
      setIsLoading(false)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(outputText)
    toast({
      title: "Copied to clipboard",
      description: "The generated text has been copied to your clipboard.",
    })
  }

  // Mock paraphrase function
  const getParaphraseOutput = (text: string, tone: string): string => {
    if (tone === "academic") {
      return `The research indicates that ${text.toLowerCase().replace("i ", "researchers ")}. Furthermore, the evidence suggests significant implications for the field.`
    } else if (tone === "simple") {
      return `In simple terms, ${text.toLowerCase().replace("the ", "")}. This means that the basic idea is easy to understand.`
    } else {
      return `${text.split(" ").reverse().join(" ")}`
    }
  }

  // Mock outline generator
  const getOutlineOutput = (topic: string): string => {
    return `# Research Outline: ${topic}

## 1. Introduction
   - Background and context
   - Research question
   - Significance of the study

## 2. Literature Review
   - Theoretical framework
   - Previous research
   - Gaps in existing literature

## 3. Methodology
   - Research design
   - Data collection methods
   - Analysis approach

## 4. Expected Results
   - Preliminary findings
   - Data interpretation

## 5. Discussion
   - Implications for theory and practice
   - Limitations
   - Future research directions

## 6. Conclusion
   - Summary of key points
   - Final thoughts`
  }

  return (
    <div className="space-y-4">
      <Select value={selectedTool} onValueChange={setSelectedTool}>
        <SelectTrigger>
          <SelectValue placeholder="Select a tool" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="paraphrase">
            <div className="flex items-center">
              <RefreshCw className="mr-2 h-4 w-4" />
              Paraphrase & Rewrite
            </div>
          </SelectItem>
          <SelectItem value="outline">
            <div className="flex items-center">
              <FileText className="mr-2 h-4 w-4" />
              Paper Outline Builder
            </div>
          </SelectItem>
        </SelectContent>
      </Select>

      {selectedTool === "paraphrase" && (
        <Select value={tone} onValueChange={setTone}>
          <SelectTrigger>
            <SelectValue placeholder="Select tone" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="academic">Academic</SelectItem>
            <SelectItem value="simple">Simple</SelectItem>
            <SelectItem value="creative">Creative</SelectItem>
          </SelectContent>
        </Select>
      )}

      <Textarea
        placeholder={
          selectedTool === "paraphrase" ? "Enter text to paraphrase..." : "Enter research topic for outline..."
        }
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="min-h-[100px]"
      />

      <Button onClick={handleGenerate} className="w-full" disabled={isLoading}>
        {isLoading ? (
          <>
            <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-4 w-4" />
            Generate
          </>
        )}
      </Button>

      {outputText && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Generated Output</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="whitespace-pre-wrap text-sm">{outputText}</pre>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" className="ml-auto" onClick={handleCopy}>
              <Copy className="mr-2 h-3 w-3" />
              Copy
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

