import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import React, { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";


const Market = () => {
  const { language } = useLanguage();
  const t = translations[language].market;

  const priceHistory = [
    { date: "Jan", wheat: 2200, rice: 3000, cotton: 5200, soybean: 4000, sugarcane: 3100, onion: 2600, maize: 2100, potato: 1800, groundnut: 3500, sunflower: 3700, mustard: 2800, bajra: 1500, chilli: 4200 },
    { date: "Feb", wheat: 2300, rice: 3100, cotton: 5400, soybean: 4100, sugarcane: 3150, onion: 2700, maize: 2150, potato: 1850, groundnut: 3550, sunflower: 3750, mustard: 2850, bajra: 1520, chilli: 4300 },
    { date: "Mar", wheat: 2250, rice: 3050, cotton: 5300, soybean: 3950, sugarcane: 3200, onion: 2650, maize: 2120, potato: 1825, groundnut: 3520, sunflower: 3725, mustard: 2825, bajra: 1510, chilli: 4250 },
    { date: "Apr", wheat: 2400, rice: 3200, cotton: 5600, soybean: 4200, sugarcane: 3300, onion: 2750, maize: 2200, potato: 1900, groundnut: 3600, sunflower: 3800, mustard: 2900, bajra: 1550, chilli: 4350 },
    { date: "May", wheat: 2350, rice: 3150, cotton: 5500, soybean: 4150, sugarcane: 3250, onion: 2850, maize: 2180, potato: 1880, groundnut: 3580, sunflower: 3775, mustard: 2875, bajra: 1540, chilli: 4400 },
    { date: "Jun", wheat: 2450, rice: 3100, cotton: 5800, soybean: 4000, sugarcane: 3350, onion: 2900, maize: 2250, potato: 1920, groundnut: 3650, sunflower: 3850, mustard: 2950, bajra: 1580, chilli: 4450 },
  ];

  const crops = [
    { key: "wheat", label: t.cropLabels?.wheat ?? "Wheat" },
    { key: "rice", label: t.cropLabels?.rice ?? "Rice" },
    { key: "cotton", label: t.cropLabels?.cotton ?? "Cotton" },
    { key: "soybean", label: t.cropLabels?.soybean ?? "Soybean" },
    { key: "sugarcane", label: t.cropLabels?.sugarcane ?? "Sugarcane" },
    { key: "onion", label: t.cropLabels?.onion ?? "Onion" },
    { key: "maize", label: t.cropLabels?.maize ?? "Maize" },
    { key: "potato", label: t.cropLabels?.potato ?? "Potato" },
    { key: "groundnut", label: t.cropLabels?.groundnut ?? "Groundnut" },
    { key: "sunflower", label: t.cropLabels?.sunflower ?? "Sunflower" },
    { key: "mustard", label: t.cropLabels?.mustard ?? "Mustard" },
    { key: "bajra", label: t.cropLabels?.bajra ?? "Bajra" },
    { key: "chilli", label: t.cropLabels?.chilli ?? "Chilli" },
  ];

  const [selectedCrop, setSelectedCrop] = useState<string>(crops[0].key);
  const [compareMode, setCompareMode] = useState<boolean>(false);
  const [selectedCompare, setSelectedCompare] = useState<string[]>(crops.slice(0, 3).map((c) => c.key));
  
  const colorForCrop = (key: string) => {
    switch (key) {
      case "wheat": return "hsl(var(--primary))";
      case "rice": return "hsl(var(--secondary))";
      case "cotton": return "hsl(var(--accent))";
      case "soybean": return "hsl(var(--muted-foreground))";
      case "sugarcane": return "hsl(48 95% 50%)";
      case "onion": return "hsl(10 80% 50%)";
      case "maize": return "hsl(42 90% 48%)";
      case "potato": return "hsl(30 20% 40%)";
      case "groundnut": return "hsl(34 85% 48%)";
      case "sunflower": return "hsl(45 95% 50%)";
      case "mustard": return "hsl(48 90% 40%)";
      case "bajra": return "hsl(25 30% 45%)";
      case "chilli": return "hsl(5 85% 45%)";
      default: return "hsl(var(--primary))";
    }
  };

  const translateCropName = (cropKey: string): string => {
    const key = cropKey.toLowerCase();
    return t.cropLabels?.[key as keyof typeof t.cropLabels] ?? cropKey;
  };

  const translateMarketName = (marketName: string): string => {
    const districtName = marketName.replace(/\s+APMC$/i, '').trim().toLowerCase();
    const translatedDistrict = t.districts?.[districtName as keyof typeof t.districts] ?? districtName;
    return `${translatedDistrict} ${t.apmc || 'APMC'}`;
  };

  const marketData = [
    { cropKey: "wheat", crop: translateCropName("wheat"), currentPrice: 2450, previousPrice: 2350, change: 4.3, volume: "1250", market: translateMarketName("Nashik APMC") },
    { cropKey: "rice", crop: translateCropName("rice"), currentPrice: 3100, previousPrice: 3150, change: -1.6, volume: "980", market: translateMarketName("Pune APMC") },
    { cropKey: "cotton", crop: translateCropName("cotton"), currentPrice: 5800, previousPrice: 5500, change: 5.5, volume: "2100", market: translateMarketName("Jalgaon APMC") },
    { cropKey: "soybean", crop: translateCropName("soybean"), currentPrice: 4000, previousPrice: 4150, change: -3.6, volume: "1680", market: translateMarketName("Latur APMC") },
    { cropKey: "sugarcane", crop: translateCropName("sugarcane"), currentPrice: 3200, previousPrice: 3150, change: 1.6, volume: "3200", market: translateMarketName("Kolhapur APMC") },
    { cropKey: "onion", crop: translateCropName("onion"), currentPrice: 2800, previousPrice: 2650, change: 5.7, volume: "890", market: translateMarketName("Nashik APMC") },
    { cropKey: "maize", crop: translateCropName("maize"), currentPrice: 2250, previousPrice: 2180, change: 3.2, volume: "1400", market: translateMarketName("Nagpur APMC") },
    { cropKey: "potato", crop: translateCropName("potato"), currentPrice: 1900, previousPrice: 1850, change: 2.7, volume: "2600", market: translateMarketName("Pune APMC") },
    { cropKey: "groundnut", crop: translateCropName("groundnut"), currentPrice: 3600, previousPrice: 3520, change: 2.3, volume: "920", market: translateMarketName("Solapur APMC") },
    { cropKey: "sunflower", crop: translateCropName("sunflower"), currentPrice: 3850, previousPrice: 3725, change: 3.5, volume: "540", market: translateMarketName("Akola APMC") },
    { cropKey: "mustard", crop: translateCropName("mustard"), currentPrice: 2950, previousPrice: 2875, change: 2.6, volume: "600", market: translateMarketName("Amravati APMC") },
    { cropKey: "bajra", crop: translateCropName("bajra"), currentPrice: 1580, previousPrice: 1540, change: 2.6, volume: "720", market: translateMarketName("Nanded APMC") },
    { cropKey: "chilli", crop: translateCropName("chilli"), currentPrice: 4450, previousPrice: 4400, change: 1.1, volume: "310", market: translateMarketName("Jalna APMC") },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.subtitle}</p>
        </div>

        {/* Price History Chart */}
        <Card className="shadow-soft">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {t.priceHistory}
            </CardTitle>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-2">{language === 'en' ? 'Crop' : language === 'hi' ? 'फसल' : 'पिक'}</span>
              <Select value={selectedCrop} onValueChange={(v) => setSelectedCrop(v)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((c) => (
                    <SelectItem key={c.key} value={c.key}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <button
                type="button"
                onClick={() => {
                  setCompareMode((s) => {
                    const next = !s;
                    if (next && selectedCompare.length < 2) {
                      setSelectedCompare(crops.slice(0, 3).map((c) => c.key));
                    }
                    return next;
                  });
                }}
                className={`ml-3 px-3 py-1 rounded-md text-sm border ${compareMode ? 'bg-primary text-primary-foreground border-transparent' : 'bg-transparent'}`}>
                {compareMode ? (language === 'en' ? `Compare: ${selectedCompare.length}` : language === 'hi' ? `तुलना: ${selectedCompare.length}` : `तुलना: ${selectedCompare.length}`) : (language === 'en' ? 'Single' : language === 'hi' ? 'एकल' : 'एकल')}
              </button>
            </div>
          </CardHeader>
          {compareMode && (
            <div className="px-4 pb-2">
              <div className="flex flex-wrap gap-2">
                {crops.map((c) => {
                  const selected = selectedCompare.includes(c.key);
                  return (
                    <button
                      key={c.key}
                      type="button"
                      onClick={() => {
                        setSelectedCompare((prev) => {
                          if (prev.includes(c.key)) return prev.filter((k) => k !== c.key);
                          if (prev.length >= 4) return prev;
                          return [...prev, c.key];
                        });
                      }}
                      className={`px-3 py-1 rounded-full text-sm border ${selected ? 'bg-primary text-primary-foreground border-transparent' : 'bg-transparent'}`}>
                      {c.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={priceHistory}>
                <defs>
                  {crops.map((c) => {
                    const color = colorForCrop(c.key);
                    const id = `color-${c.key}`;
                    return (
                      <linearGradient key={id} id={id} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={color} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={color} stopOpacity={0} />
                      </linearGradient>
                    );
                  })}
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)",
                  }}
                />
                <Legend />
                {compareMode ? (
                  selectedCompare.map((key, idx) => {
                    const c = crops.find((cc) => cc.key === key);
                    if (!c) return null;
                    return (
                      <React.Fragment key={`series-${c.key}`}>
                        <Area
                          type="monotone"
                          dataKey={c.key}
                          stroke={colorForCrop(c.key)}
                          fillOpacity={0.16}
                          fill={`url(#color-${c.key})`}
                          name={c.label}
                          strokeWidth={2}
                          isAnimationActive={true}
                          animationDuration={800 + idx * 100}
                        />
                        <Line
                          type="monotone"
                          dataKey={c.key}
                          stroke={colorForCrop(c.key)}
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={true}
                          animationDuration={600 + idx * 80}
                        />
                      </React.Fragment>
                    );
                  })
                ) : (
                  <>
                    <Area
                      type="monotone"
                      dataKey={selectedCrop}
                      stroke={colorForCrop(selectedCrop)}
                      fillOpacity={0.25}
                      fill={`url(#color-${selectedCrop})`}
                      name={crops.find((c) => c.key === selectedCrop)?.label}
                      strokeWidth={2}
                      isAnimationActive={true}
                      animationDuration={800}
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedCrop}
                      stroke={colorForCrop(selectedCrop)}
                      strokeWidth={3}
                      dot={{ r: 3 }}
                      isAnimationActive={true}
                      animationDuration={600}
                    />
                  </>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* NEW: Current Mandi Prices Header */}
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-foreground">{t.currentPrices}</h2>
          <p className="text-muted-foreground">{t.currentPricesSubtitle}</p>
        </div>

        {/* Current Prices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketData.map((m) => (
            <Card key={m.crop}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{m.crop}</span>
                  <div className={`flex items-center gap-2 ${m.change >= 0 ? "text-primary" : "text-destructive"}`}>
                    {m.change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="font-semibold">{Math.abs(m.change)}%</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">₹{m.currentPrice}</span>
                    <span className="text-sm text-muted-foreground">{language === 'en' ? '/quintal' : language === 'hi' ? '/क्विंटल' : '/क्विंटल'}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{language === 'en' ? 'Previous' : language === 'hi' ? 'पिछला' : 'मागील'}: ₹{m.previousPrice}</p>
                  <div className="pt-3 border-t space-y-1">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{t.volume}:</span> {m.volume} {t.quintals}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">{t.marketLabel}:</span> {m.market}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Market;