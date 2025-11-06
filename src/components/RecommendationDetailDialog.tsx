import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Calendar, MapPin, AlertCircle, Sprout } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface Recommendation {
  rank: number;
  crop: string;
  score: number;
  expectedProfit: string;
  risk: string;
  soilSuitability: string;
  marketTrend: string;
  sowingWindow: string;
  reason: string;
  districts: string[];
}

interface RecommendationDetailDialogProps {
  recommendation: Recommendation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const RecommendationDetailDialog = ({
  recommendation,
  open,
  onOpenChange,
}: RecommendationDetailDialogProps) => {
  const { t } = useTranslation();  
  if (!recommendation) return null;

 const getRiskColor = (risk: string) => {
  const lowerRisk = risk.toLowerCase();
  if (lowerRisk.includes("low") || lowerRisk.includes("कम") || lowerRisk.includes("कमी")) {
    return "bg-primary/10 text-primary border-primary/20";
  }
  if (lowerRisk.includes("medium") || lowerRisk.includes("मध्यम")) {
    return "bg-secondary/10 text-secondary-foreground border-secondary/20";
  }
  return "bg-destructive/10 text-destructive border-destructive/20";
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold">
              {recommendation.rank}
            </div>
            <div>
              <DialogTitle className="text-2xl">{recommendation.crop}</DialogTitle>
              <div className="flex items-center gap-2 mt-1">
               <Badge className="bg-primary/10 text-primary border-primary/20">
  {t("recommendations.score")}: {recommendation.score}/10
</Badge>
<Badge className={getRiskColor(recommendation.risk)}>
  {recommendation.risk} {t("recommendations.risk")}
</Badge>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <p className="text-2xl font-bold text-primary mb-1">
              {recommendation.expectedProfit}
            </p>
            <p className="text-sm text-muted-foreground">{t("recommendations.expectedProfitPerHectare")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-primary" />
                <p className="font-medium">{t("recommendations.soilSuitability")}</p>
              </div>
              <p className="text-lg">{recommendation.soilSuitability}</p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <p className="font-medium">{t("recommendations.marketTrend")}</p>
              </div>
              <p className="text-lg">{recommendation.marketTrend}</p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <p className="font-medium">{t("recommendations.sowingWindow")}</p>
              </div>
              <p className="text-lg">{recommendation.sowingWindow}</p>
            </div>

            <div className="space-y-2 p-4 rounded-lg bg-muted/30">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                <p className="font-medium">{t("recommendations.riskLevel")}</p>
              </div>
              <p className="text-lg">{recommendation.risk}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium mb-1">{t("recommendations.whyThisCrop")}</p>
                <p className="text-sm text-muted-foreground">{recommendation.reason}</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <p className="font-medium">{t("recommendations.suitableDistricts")}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {recommendation.districts.map((district, idx) => (
                <Badge key={idx} variant="secondary">
                  {district}
                </Badge>
              ))}
            </div>
          </div>

         <div className="p-4 rounded-lg bg-muted/30 space-y-2">
  <p className="font-medium">{t("recommendations.additionalAnalysis")}</p>
  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
    <li>{t("recommendations.analysis.item1")}</li>
    <li>{t("recommendations.analysis.item2")}</li>
    <li>{t("recommendations.analysis.item3")}</li>
    <li>{t("recommendations.analysis.item4")}</li>
    <li>{t("recommendations.analysis.item5")}</li>
  </ul>
</div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
