import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  message?: string
}

export default function LoadingScreen({ message = "Processing..." }: LoadingScreenProps) {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-primary/20"></div>
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-foreground">Processing Document</h3>
            <p className="text-muted-foreground text-sm">{message}</p>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full animate-pulse" style={{ width: "60%" }}></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
