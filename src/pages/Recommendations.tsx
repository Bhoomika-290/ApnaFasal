import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, AlertCircle, Calendar, MapPin } from "lucide-react";
import { RecommendationDetailDialog } from "@/components/RecommendationDetailDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const Recommendations = () => {
  const { language } = useLanguage();
  const t = translations[language].recommendations;
  const [selectedRec, setSelectedRec] = useState<any>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const recommendations = [
    {
      rank: 1,
      crop: "Cotton",
      score: 8.7,
      expectedProfit: "₹85,000 per hectare",
      risk: "Medium",
      soilSuitability: "Excellent",
      marketTrend: "Strong upward",
      sowingWindow: "June - July 2024",
      reason: "Black soil perfect for cotton. Prices up 8.5% with strong demand from textile mills.",
      districts: ["Jalgaon", "Akola", "Yavatmal"]
    },
    {
      rank: 2,
      crop: "Soybean",
      score: 8.4,
      expectedProfit: "₹65,000 per hectare",
      risk: "Low",
      soilSuitability: "Very Good",
      marketTrend: "Stable",
      sowingWindow: "June - July 2024",
      reason: "Low water requirement suits current forecast. Stable export demand ensures good returns.",
      districts: ["Latur", "Beed", "Nanded"]
    },
    {
      rank: 3,
      crop: "Onion (Kharif)",
      score: 8.1,
      expectedProfit: "₹75,000 per hectare",
      risk: "High",
      soilSuitability: "Good",
      marketTrend: "Volatile but positive",
      sowingWindow: "June - July 2024",
      reason: "High-risk, high-reward. Recent price spike of 5.7% indicates strong demand.",
      districts: ["Nashik", "Pune", "Ahmednagar"]
    },
    {
      rank: 4,
      crop: "Maize",
      score: 7.8,
      expectedProfit: "₹58,000 per hectare",
      risk: "Low",
      soilSuitability: "Good",
      marketTrend: "Steady",
      sowingWindow: "June - July 2024",
      reason: "Safe choice with consistent demand. Good for risk-averse farmers.",
      districts: ["Ahmednagar", "Pune", "Satara"]
    },
    {
      rank: 5,
      crop: "Groundnut",
      score: 7.5,
      expectedProfit: "₹62,000 per hectare",
      risk: "Medium",
      soilSuitability: "Very Good",
      marketTrend: "Moderate positive",
      sowingWindow: "June - July 2024",
      reason: "Good soil match. Oil mills offering premium for quality produce.",
      districts: ["Solapur", "Osmanabad", "Sangli"]
    },
  ];

  const getRiskColor = (risk: string) => {
    if (risk === "Low") return "bg-primary/10 text-primary border-primary/20";
    if (risk === "Medium") return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    return "bg-destructive/10 text-destructive border-destructive/20";
  };

  const getRiskText = (risk: string) => {
    if (risk === "Low") return t.lowRisk;
    if (risk === "Medium") return t.mediumRisk;
    return t.highRisk;
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
          <p className="text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Info Card */}
        <Card className="shadow-soft border-l-4 border-primary">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="h-6 w-6 text-primary mt-1" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {t.infoTitle}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {t.infoDesc}
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
                            {t.topPick}
                          </Badge>
                        )}
                      </CardTitle>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge className="bg-primary/10 text-primary border-primary/20">
                          {t.score}: {rec.score}/10
                        </Badge>
                        <Badge className={getRiskColor(rec.risk)}>
                          {getRiskText(rec.risk)} {t.risk}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{t.expectedProfit}</p>
                    <p className="text-2xl font-bold text-primary">{rec.expectedProfit}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg bg-muted/30">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.soilSuitability}</p>
                    <p className="font-semibold text-foreground">{rec.soilSuitability}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.marketTrend}</p>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="font-semibold text-foreground">{rec.marketTrend}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{t.sowingWindow}</p>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <p className="font-semibold text-foreground">{rec.sowingWindow}</p>
                    </div>
                  </div>
                </div>

                {/* Reason */}
                <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
                  <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-foreground">{rec.reason}</p>
                </div>

                {/* Districts */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{t.suitableDistricts}:</span>
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
                  {t.viewDetailedAnalysis}
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
