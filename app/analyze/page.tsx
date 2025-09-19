import DocumentAnalyzer from "@/components/DocumentAnalyzer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Document Analysis Platform</h1>
            <p className="text-muted-foreground text-lg">
              Upload documents and analyze them for risks, get summaries, and ask questions
            </p>
          </div>
          <DocumentAnalyzer />
        </div>
      </div>
    </div>
  )
}
