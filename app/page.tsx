import Hero from "@/components/Hero";
import { Shield, FileText, MessageSquare, Cpu, Upload, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Hero Section */}
      <Hero />

      {/* Feature Highlights (compact row) */}
      <section className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-12 mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {[{icon: Shield, title: 'Compliance & Risk', desc: 'Detect clauses that increase exposure and compliance gaps.'}, {icon: FileText, title: 'Summaries', desc: 'Readable, accurate briefs of long documents.'}, {icon: MessageSquare, title: 'Q&A', desc: 'Ask anything and get citations-backed answers.'}].map(({icon:Icon,title,desc},i)=> (
            <div key={i} className="graphite-card rounded-xl p-6">
              <div className="w-10 h-10 bg-accent/10 rounded-md flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-gray-300" />
              </div>
              <h3 className="text-lg font-semibold mb-1 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-12 mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-6">How it works</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[{icon: Upload, title: 'Upload', desc: 'Drag & drop or import from drive/cloud.'}, {icon: Cpu, title: 'Analyze', desc: 'Our models extract risks, terms, and key facts.'}, {icon: Zap, title: 'Act', desc: 'Export summaries, share findings, or ask follow-ups.'}].map(({icon:Icon,title,desc},i)=> (
            <div key={i} className="rounded-xl p-6 border border-white/10 bg-white/[0.02]">
              <Icon className="w-6 h-6 mb-3 text-gray-300" />
              <h3 className="font-semibold mb-1 text-foreground">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Integration/CTA strip */}
      <section className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-12 mx-auto">
        <div className="graphite-card rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold">Works with your docs</h3>
            <p className="text-sm text-muted-foreground mt-1">PDF, DOCX, TXT and more. SOC2-friendly processing.</p>
          </div>
          <a href="/analyze" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#6c47ff] to-[#7f6cff] text-black font-semibold">
            Try it now
          </a>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 max-w-6xl w-full px-4 sm:px-6 lg:px-12 py-16 mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold">Turn documents into decisions</h2>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Start for free and upgrade when you’re ready. No credit card required.</p>
        <div className="mt-6">
          <a href="/signup" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#6c47ff] to-[#7f6cff] text-black font-semibold">Get started</a>
        </div>
      </section>
    </div>
  );
}
