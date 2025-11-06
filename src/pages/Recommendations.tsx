import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertCircle, Calendar, MapPin } from "lucide-react";
import { RecommendationDetailDialog } from "@/components/RecommendationDetailDialog";
import { useTranslation } from "@/hooks/useTranslation";

// Define the crop data type
interface CropData {
  name: string;
  reason: string;
  soilSuitability: string;
  marketTrend: string;
}

const Recommendations = () => {
  const { t } = useTranslation();
  const tr = (k: string) => t(`recommendations.${k}`);
  const [selectedRec, setSelectedRec] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Get crop data from translations with proper typing
  const getCropData = (cropKey: string): CropData => {
    const cropData = t(`recommendations.crops.${cropKey}`) as any;
    return cropData || {
      name: cropKey,
      reason: "",
      soilSuitability: "",
      marketTrend: ""
    };
  };

  const recommendations = [
    {
      rank: 1,
      cropKey: "cotton",
      crop: getCropData("cotton").name || "Cotton",
      score: 8.7,
      expectedProfit: "₹85,000 per hectare",
      risk: "Medium",
      soilSuitability: getCropData("cotton").soilSuitability || "Excellent",
      marketTrend: getCropData("cotton").marketTrend || "Strong upward",
      sowingWindow: "June - July 2024",
      reason: getCropData("cotton").reason || "Black soil perfect for cotton. Prices up 8.5% with strong demand from textile mills.",
      districts: ["Jalgaon", "Akola", "Yavatmal"]
    },
    {
      rank: 2,
      cropKey: "soybean",
      crop: getCropData("soybean").name || "Soybean",
      score: 8.4,
      expectedProfit: "₹65,000 per hectare",
      risk: "Low",
      soilSuitability: getCropData("soybean").soilSuitability || "Very Good",
      marketTrend: getCropData("soybean").marketTrend || "Stable",
      sowingWindow: "June - July 2024",
      reason: getCropData("soybean").reason || "Low water requirement suits current forecast. Stable export demand ensures good returns.",
      districts: ["Latur", "Beed", "Nanded"]
    },
    {
      rank: 3,
      cropKey: "onion",
      crop: getCropData("onion").name || "Onion (Kharif)",
      score: 8.1,
      expectedProfit: "₹75,000 per hectare",
      risk: "High",
      soilSuitability: getCropData("onion").soilSuitability || "Good",
      marketTrend: getCropData("onion").marketTrend || "Volatile but positive",
      sowingWindow: "June - July 2024",
      reason: getCropData("onion").reason || "High-risk, high-reward. Recent price spike of 5.7% indicates strong demand.",
      districts: ["Nashik", "Pune", "Ahmednagar"]
    },
    {
      rank: 4,
      cropKey: "maize",
      crop: getCropData("maize").name || "Maize",
      score: 7.8,
      expectedProfit: "₹58,000 per hectare",
      risk: "Low",
      soilSuitability: getCropData("maize").soilSuitability || "Good",
      marketTrend: getCropData("maize").marketTrend || "Steady",
      sowingWindow: "June - July 2024",
      reason: getCropData("maize").reason || "Safe choice with consistent demand. Good for risk-averse farmers.",
      districts: ["Ahmednagar", "Pune", "Satara"]
    },
    {
      rank: 5,
      cropKey: "groundnut",
      crop: getCropData("groundnut").name || "Groundnut",
      score: 7.5,
      expectedProfit: "₹62,000 per hectare",
      risk: "Medium",
      soilSuitability: getCropData("groundnut").soilSuitability || "Very Good",
      marketTrend: getCropData("groundnut").marketTrend || "Moderate positive",
      sowingWindow: "June - July 2024",
      reason: getCropData("groundnut").reason || "Good soil match. Oil mills offering premium for quality produce.",
      districts: ["Solapur", "Osmanabad", "Sangli"]
    },
  ];

  const getRiskColor = (risk: string) => {
    if (risk === "Low") return "bg-primary/10 text-primary border-primary/20";
    if (risk === "Medium") return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const getRiskText = (risk: string) => {
    if (risk === "Low") return tr("lowRisk");
    if (risk === "Medium") return tr("mediumRisk");
    return tr("highRisk");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{tr("title")}</h1>
          <p className="text-lg text-muted-foreground">
            {tr("subtitle")}
          </p>
        </div>

        {/* Info Card */}
        <Card className="shadow-soft border-l-4 border-primary">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {tr("infoTitle")}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tr("infoDesc")}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recommendations List */}
        <div className="space-y-4">
          {recommendations.map((rec) => (
            <Card 
              key={rec.rank} 
              className={`shadow-soft hover:shadow-glow transition-smooth ${
                rec.rank === 1 ? "border-2 border-primary" : ""
              }`}
            >
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-primary text-primary-foreground text-2xl font-bold">
                      {rec.rank}
                    </div>
                    <div>
                      <CardTitle className="text-2xl flex items-center gap-2">
                        {rec.crop}
                        {rec.rank === 1 && (
                          <Badge className="bg-gradient-accent text-accent-foreground">
                            {tr("topPick")}
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {tr("score")}: {rec.score}/10
                        </Badge>
                        <Badge className={getRiskColor(rec.risk)}>
                          {getRiskText(rec.risk)} {tr("risk")}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{tr("expectedProfit")}</p>
                    <p className="text-2xl font-bold text-primary">{rec.expectedProfit}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{tr("soilSuitability")}</p>
                    <p className="font-semibold text-foreground">{rec.soilSuitability}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{tr("marketTrend")}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-foreground">{rec.marketTrend}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{tr("sowingWindow")}</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold text-foreground">{rec.sowingWindow}</p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <div className="flex flex-col">
                    <p className="text-sm text-muted-foreground mb-1">{tr("reason")}</p>
                    <p className="text-sm text-foreground">{rec.reason}</p>
                  </div>
                </div>

                {/* Districts */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{tr("suitableDistricts")}:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {rec.districts.map((district, idx) => (
                      <Badge key={idx} variant="secondary">
                        {district}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <Button 
                  className="w-full md:w-auto"
                  onClick={() => {
                    setSelectedRec(rec);
                    setDetailOpen(true);
                  }}
                >
                  {tr("viewDetailedAnalysis")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <RecommendationDetailDialog
        recommendation={selectedRec}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />
    </div>
  );
};

export default Recommendations;