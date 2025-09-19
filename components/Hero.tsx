"use client"

import { Button } from "@/components/ui/button"
import { FileText, Shield, MessageSquare, Sparkles } from "lucide-react"

export default function Hero() {
  const scrollToAnalyzer = () => {
    const analyzerElement = document.getElementById("document-analyzer")
    if (analyzerElement) {
      analyzerElement.scrollIntoView({ behavior: "smooth" })
    } else {
      // Fallback: navigate to analyze page if the anchor isn't on this page
      window.location.href = "/analyze";
    }
  }

  return (
    <div className="relative">
      <div className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-16 lg:py-24 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 text-accent-foreground" />
              AI-Powered Document Intelligence
            </div>

            {/* Main heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 text-balance">
              Transform Your{" "}
              <span className="text-gray-300  bg-clip-text bg-gradient-to-r from-accent to-accent/80">
                Document Analysis
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto leading-relaxed">
              Identify risks, generate intelligent summaries, and unlock insights from your documents with
              enterprise-grade AI analysis
            </p>

            {/* CTA Button */}
            <Button
              onClick={scrollToAnalyzer}
              size="lg"
              className="text-lg px-8 py-6 mb-16 bg-gradient-to-r from-[#6c47ff] to-[#7f6cff] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Start Analyzing Documents
            </Button>

            {/* Feature cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="graphite-card rounded-xl p-6 transition-colors duration-200">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <Shield className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Risk Assessment</h3>
                <p className="text-muted-foreground text-pretty">
                  Automatically identify potential risks, compliance issues, and red flags in your documents
                </p>
              </div>

              <div className="graphite-card rounded-xl p-6 transition-colors duration-200">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <FileText className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Smart Summaries</h3>
                <p className="text-muted-foreground text-pretty">
                  Generate concise, intelligent summaries that capture the key points and critical information
                </p>
              </div>

              <div className="graphite-card rounded-xl p-6 transition-colors duration-200">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-6 h-6 text-gray-300" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-2">Interactive Q&A</h3>
                <p className="text-muted-foreground text-pretty">
                  Ask questions about your documents and get instant, contextual answers powered by AI
                </p>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}
