"use client"

import type React from "react"

import { useState } from "react"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, FileText, AlertTriangle, MessageSquare, Loader2 } from "lucide-react"
import RiskCard from "./RiskCard"
import LoadingScreen from "./LoadingScreen"
import ReactMarkdown from "react-markdown"

interface RiskItem {
  risk_category: string
  explanation: string
  quote: string
}

export default function DocumentAnalyzer() {
  const [isUploading, setIsUploading] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [hasDocument, setHasDocument] = useState(false)
  const [uploadType, setUploadType] = useState<"file" | "url">("file")
  const [questions, setQuestions] = useState("")
  const [results, setResults] = useState<{
    type: "questions" | "summary" | "risks"
    data: any
  } | null>(null)

  const handleUpload = async (formData: FormData) => {
    setIsUploading(true)
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Upload failed")
      }

      setHasDocument(true)
      setResults(null)
      toast.success("Document uploaded and processed successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Upload failed")
    } finally {
      setIsUploading(false)
    }
  }

  const handleFileUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await handleUpload(formData)
  }

  const handleUrlUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await handleUpload(formData)
  }

  const handleAskQuestions = async () => {
    if (!questions.trim()) {
      toast.error("Please enter at least one question")
      return
    }

    setIsProcessing(true)
    try {
      const questionList = questions.split("\n").filter((q) => q.trim() !== "")
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questions: questionList }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get answers")
      }

      setResults({ type: "questions", data: { questions: questionList, answers: data.answers } })
      toast.success("Questions answered successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to get answers")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleGetSummary = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/summarize", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to get summary")
      }

      setResults({ type: "summary", data: { summary: data.summary } })
      toast.success("Summary generated successfully!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to get summary")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleAnalyzeRisks = async () => {
    setIsProcessing(true)
    try {
      const response = await fetch("/api/analyze-risks", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze risks")
      }

      setResults({ type: "risks", data: { risks: data.risks } })
      toast.success("Risk analysis completed!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to analyze risks")
    } finally {
      setIsProcessing(false)
    }
  }

  if (isUploading) {
    return <LoadingScreen message="Uploading and processing your document..." />
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Upload Document
          </CardTitle>
          <CardDescription>Upload a document or provide a URL to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={uploadType} onValueChange={(value) => setUploadType(value as "file" | "url")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="file">Upload File</TabsTrigger>
              <TabsTrigger value="url">From URL</TabsTrigger>
            </TabsList>

            <TabsContent value="file" className="space-y-4">
              <form onSubmit={handleFileUpload} className="space-y-4">
                <div>
                  <Label htmlFor="file">Select Document</Label>
                  <Input id="file" name="file" type="file" accept=".pdf,.doc,.docx,.txt" required className="mt-1" />
                </div>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Upload & Process"
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="url" className="space-y-4">
              <form onSubmit={handleUrlUpload} className="space-y-4">
                <div>
                  <Label htmlFor="url">Document URL</Label>
                  <Input
                    id="url"
                    name="url"
                    type="url"
                    placeholder="https://example.com/document.pdf"
                    required
                    className="mt-1"
                  />
                </div>
                <Button type="submit" disabled={isUploading}>
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Upload & Process"
                  )}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Analysis Section */}
      {hasDocument && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Ask Questions Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <MessageSquare className="h-5 w-5" />
                Ask Questions
              </CardTitle>
              <CardDescription>Ask specific questions about your document</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="questions">Questions (one per line)</Label>
                <Textarea
                  id="questions"
                  placeholder="What is the main clause?&#10;Who are the parties involved?"
                  value={questions}
                  onChange={(e) => setQuestions(e.target.value)}
                  className="mt-1 min-h-[100px]"
                />
              </div>
              <Button onClick={handleAskQuestions} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Ask Questions"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Summary Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <FileText className="h-5 w-5" />
                Document Summary
              </CardTitle>
              <CardDescription>Get a comprehensive summary of your document</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleGetSummary} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Get Summary"
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Risk Analysis Card */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-card-foreground">
                <AlertTriangle className="h-5 w-5" />
                Risk Analysis
              </CardTitle>
              <CardDescription>Scan for potential financial or legal risks</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleAnalyzeRisks} disabled={isProcessing} className="w-full">
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Risks"
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Results Section */}
      {results && (
        <Card>
          <CardHeader>
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            {results.type === "questions" && (
              <div className="space-y-4">
                {results.data.questions.map((question: string, index: number) => (
                  <div key={index} className="border-l-4 border-primary pl-4">
                    <h4 className="font-semibold text-foreground">
                      Q{index + 1}: {question}
                    </h4>
                    <div className="text-muted-foreground mt-1 prose prose-invert max-w-none whitespace-pre-wrap">
                      <ReactMarkdown>{results.data.answers[index]}</ReactMarkdown>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {results.type === "summary" && (
              <div className="prose prose-invert max-w-none">
                <h3 className="text-foreground">Document Summary</h3>
                <div className="prose prose-invert max-w-none text-muted-foreground whitespace-pre-wrap">
                  <ReactMarkdown>{results.data.summary}</ReactMarkdown>
                </div>
              </div>
            )}

            {results.type === "risks" && (
              <div className="space-y-4">
                <h3 className="text-foreground font-semibold">Risk Analysis Results</h3>
                {results.data.risks && results.data.risks.length > 0 ? (
                  <div className="grid gap-4">
                    {results.data.risks.map((risk: RiskItem, index: number) => (
                      <RiskCard key={index} risk={risk} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-green-500 text-4xl mb-2">✅</div>
                    <p className="text-muted-foreground">No major risks detected in your document.</p>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
