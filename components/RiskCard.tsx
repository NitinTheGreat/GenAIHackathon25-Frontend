import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle } from "lucide-react"

interface RiskItem {
  risk_category: string
  explanation: string
  quote: string
}

interface RiskCardProps {
  risk: RiskItem
}

export default function RiskCard({ risk }: RiskCardProps) {
  return (
    <Card className="bg-destructive/5 border-destructive/20">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-destructive">
          <AlertTriangle className="h-4 w-4" />
          {risk.risk_category}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <h4 className="font-medium text-foreground mb-1">Explanation</h4>
          <p className="text-muted-foreground text-sm">{risk.explanation}</p>
        </div>
        <div>
          <h4 className="font-medium text-foreground mb-1">Relevant Quote</h4>
          <blockquote className="border-l-4 border-destructive/30 pl-3 italic text-muted-foreground text-sm">
            &ldquo;{risk.quote}&rdquo;
          </blockquote>
        </div>
        <Badge variant="destructive" className="w-fit">
          Risk Identified
        </Badge>
      </CardContent>
    </Card>
  )
}
