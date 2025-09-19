import DocumentAnalyzer from "@/components/DocumentAnalyzer";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-10 sm:py-12 mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold mb-2 text-foreground">Document Analysis Platform</h1>
          <p className="text-lg text-muted-foreground">
            Upload documents and analyze them for risks, get summaries, and ask questions
          </p>
        </div>
        <div className="graphite-card rounded-2xl p-4 sm:p-6 md:p-8">
          <DocumentAnalyzer />
        </div>
      </div>
    </div>
  );
}
