import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import { Switch } from "@/components/ui/switch";


const Calculator = () => {
  const { language } = useLanguage();
  const t = translations[language].calculator;

  const [area, setArea] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [seedCost, setSeedCost] = useState("");
  const [fertilizerCost, setFertilizerCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [otherCost, setOtherCost] = useState("");
  const [isPerHectare, setIsPerHectare] = useState(true);
  const [result, setResult] = useState<any>(null);

  const crops = [
    { name: "Wheat", avgYield: 35, avgPrice: 2450 },
    { name: "Rice", avgYield: 40, avgPrice: 3100 },
    { name: "Cotton", avgYield: 18, avgPrice: 5800 },
    { name: "Soybean", avgYield: 25, avgPrice: 4000 },
    { name: "Sugarcane", avgYield: 800, avgPrice: 3200 },
  ];

  const calculateProfit = () => {
    if (!area || !selectedCrop || !seedCost || !fertilizerCost || !laborCost) {
      toast.error(t.fillAllFields);
      return;
    }

    const areaNum = parseFloat(area);
    // Parse inputs safely
    const perUnitCost =
      (parseFloat(seedCost) || 0) +
      (parseFloat(fertilizerCost) || 0) +
      (parseFloat(laborCost) || 0) +
      (parseFloat(otherCost) || 0);

    // If costs are entered as per-hectare, scale by area. Otherwise treat them as totals
    // for the whole provided area.
    const totalCost = isPerHectare ? perUnitCost * areaNum : perUnitCost;
    
    const crop = crops.find(c => c.name === selectedCrop);
    if (!crop) return;

    const estimatedYield = crop.avgYield * areaNum;
    const estimatedRevenue = estimatedYield * crop.avgPrice;
    const profit = estimatedRevenue - totalCost;
    const profitMargin = (profit / estimatedRevenue) * 100;

    setResult({
      totalCost,
      estimatedYield,
      estimatedRevenue,
      profit,
      profitMargin,
      breakEven: totalCost / crop.avgPrice
    });

    toast.success(t.success);
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="h-5 w-5 text-primary" />
                {t.inputDetails}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="area">{t.area} *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder={language === 'en' ? 'Enter area in hectares' : language === 'hi' ? 'हेक्टेयर में क्षेत्र दर्ज करें' : 'हेक्टरमध्ये क्षेत्रफळ प्रविष्ट करा'}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">{t.selectCrop} *</Label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger id="crop">
                    <SelectValue placeholder={language === 'en' ? 'Choose a crop' : language === 'hi' ? 'फसल चुनें' : 'पीक निवडा'} />
                  </SelectTrigger>
                  <SelectContent>
                    {crops.map((crop) => (
                      <SelectItem key={crop.name} value={crop.name}>
                        {crop.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Label className="mb-0">{t.costUnitLabel}</Label>
                  <Switch checked={isPerHectare} onCheckedChange={(v) => setIsPerHectare(Boolean(v))} />
                </div>
                <div className="text-sm text-muted-foreground">
                  {isPerHectare ? t.perHectare : t.totalForArea}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="seedCost">{t.seedCost} *</Label>
                <Input
                  id="seedCost"
                  type="number"
                  placeholder={
                    language === 'en'
                      ? `Enter seed cost (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : language === 'hi'
                      ? `बीज लागत दर्ज करें (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : `बियाणे खर्च प्रविष्ट करा (${isPerHectare ? t.perHectare : t.totalForArea})`
                  }
                  value={seedCost}
                  onChange={(e) => setSeedCost(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fertilizerCost">{t.fertilizerCost} *</Label>
                <Input
                  id="fertilizerCost"
                  type="number"
                  placeholder={
                    language === 'en'
                      ? `Enter fertilizer cost (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : language === 'hi'
                      ? `उर्वरक लागत दर्ज करें (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : `खत खर्च प्रविष्ट करा (${isPerHectare ? t.perHectare : t.totalForArea})`
                  }
                  value={fertilizerCost}
                  onChange={(e) => setFertilizerCost(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="laborCost">{t.laborCost} *</Label>
                <Input
                  id="laborCost"
                  type="number"
                  placeholder={
                    language === 'en'
                      ? `Enter labor cost (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : language === 'hi'
                      ? `श्रम लागत दर्ज करें (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : `मजुरी खर्च प्रविष्ट करा (${isPerHectare ? t.perHectare : t.totalForArea})`
                  }
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherCost">{t.otherCosts}</Label>
                <Input
                  id="otherCost"
                  type="number"
                  placeholder={
                    language === 'en'
                      ? `${language === 'en' ? 'Transport, storage, etc.' : ''} (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : language === 'hi'
                      ? `परिवहन, भंडारण, आदि (${isPerHectare ? t.perHectare : t.totalForArea})`
                      : `वाहतूक, साठवण, इ. (${isPerHectare ? t.perHectare : t.totalForArea})`
                  }
                  value={otherCost}
                  onChange={(e) => setOtherCost(e.target.value)}
                  min="0"
                />
              </div>

              <Button onClick={calculateProfit} className="w-full">
                {t.calculate}
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                {t.results}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t.totalCost}</span>
                      <span className="text-xl font-bold text-foreground">
                        ₹{result.totalCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t.estimatedYield}</span>
                      <span className="text-xl font-bold text-foreground">
                        {result.estimatedYield.toFixed(1)} {language === 'en' ? 'quintals' : language === 'hi' ? 'क्विंटल' : 'क्विंटल'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t.expectedRevenue}</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{result.estimatedRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t.profit}</span>
                      <span className={`text-2xl font-bold ${
                        result.profit >= 0 ? "text-primary" : "text-destructive"
                      }`}>
                        ₹{result.profit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">{t.profitMargin}</span>
                      <span className={`text-xl font-bold ${
                        result.profitMargin >= 0 ? "text-primary" : "text-destructive"
                      }`}>
                        {result.profitMargin.toFixed(2)}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-accent" />
                      <span className="font-semibold text-foreground">{t.breakEven}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' 
                        ? `You need to sell at least ${result.breakEven.toFixed(1)} quintals to recover your costs`
                        : language === 'hi'
                        ? `आपको अपनी लागत वसूलने के लिए कम से कम ${result.breakEven.toFixed(1)} क्विंटल बेचने की जरूरत है`
                        : `आपल्या खर्चाची भरपाई करण्यासाठी तुम्हाला किमान ${result.breakEven.toFixed(1)} क्विंटल विकावे लागतील`}
                    </p>
                  </div>

                  {result.profit < 0 && (
                    <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-destructive font-medium">
                        {language === 'en'
                          ? '⚠️ Warning: Current market prices may result in losses. Consider alternative crops or wait for better market conditions.'
                          : language === 'hi'
                          ? '⚠️ चेतावनी: वर्तमान बाजार मूल्य के परिणामस्वरूप नुकसान हो सकता है। वैकल्पिक फसलों पर विचार करें या बेहतर बाजार स्थितियों की प्रतीक्षा करें।'
                          : '⚠️ चेतावणी: सध्याच्या बाजार किंमतींमुळे तोटा होऊ शकतो. पर्यायी पिके विचारात घ्या किंवा चांगल्या बाजार परिस्थितीची प्रतीक्षा करा।'}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalcIcon className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    {language === 'en'
                      ? 'Fill in the form to calculate your production costs and expected profits'
                      : language === 'hi'
                      ? 'अपनी उत्पादन लागत और अपेक्षित लाभ की गणना करने के लिए फॉर्म भरें'
                      : 'आपल्या उत्पादन खर्च आणि अपेक्षित नफा मोजण्यासाठी फॉर्म भरा'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Calculator;