import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";


const Market = () => {
  const { language } = useLanguage();
  const t = translations[language].market;

  const priceHistory = [
    { date: "Jan", wheat: 2200, rice: 3000, cotton: 5200, soybean: 4000 },
    { date: "Feb", wheat: 2300, rice: 3100, cotton: 5400, soybean: 4100 },
    { date: "Mar", wheat: 2250, rice: 3050, cotton: 5300, soybean: 3950 },
    { date: "Apr", wheat: 2400, rice: 3200, cotton: 5600, soybean: 4200 },
    { date: "May", wheat: 2350, rice: 3150, cotton: 5500, soybean: 4150 },
    { date: "Jun", wheat: 2450, rice: 3100, cotton: 5800, soybean: 4000 },
  ];

  const marketData = [
    { 
      crop: "Wheat", 
      currentPrice: 2450, 
      previousPrice: 2350, 
      change: 4.3,
      volume: "1250 quintals",
      market: "Nashik APMC"
    },
    { 
      crop: "Rice", 
      currentPrice: 3100, 
      previousPrice: 3150, 
      change: -1.6,
      volume: "980 quintals",
      market: "Pune APMC"
    },
    { 
      crop: "Cotton", 
      currentPrice: 5800, 
      previousPrice: 5500, 
      change: 5.5,
      volume: "2100 quintals",
      market: "Jalgaon APMC"
    },
    { 
      crop: "Soybean", 
      currentPrice: 4000, 
      previousPrice: 4150, 
      change: -3.6,
      volume: "1680 quintals",
      market: "Latur APMC"
    },
    { 
      crop: "Sugarcane", 
      currentPrice: 3200, 
      previousPrice: 3150, 
      change: 1.6,
      volume: "3200 quintals",
      market: "Kolhapur APMC"
    },
    { 
      crop: "Onion", 
      currentPrice: 2800, 
      previousPrice: 2650, 
      change: 5.7,
      volume: "890 quintals",
      market: "Nashik APMC"
    },
  ];

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

        {/* Price History Chart */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              {t.priceHistory}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <AreaChart data={priceHistory}>
                <defs>
                  <linearGradient id="colorWheat" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorRice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "hsl(var(--card))", 
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "var(--radius)"
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="wheat" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1}
                  fill="url(#colorWheat)"
                  name="Wheat"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="rice" 
                  stroke="hsl(var(--secondary))" 
                  fillOpacity={1}
                  fill="url(#colorRice)"
                  name="Rice"
                  strokeWidth={2}
                />
                <Area 
                  type="monotone" 
                  dataKey="cotton" 
                  stroke="hsl(var(--accent))" 
                  fill="transparent"
                  name="Cotton"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Current Market Prices */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">{t.currentPrices}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {marketData.map((item, index) => (
              <Card key={index} className="shadow-soft hover:shadow-glow transition-smooth">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-foreground">{item.crop}</h3>
                      <div className={`flex items-center gap-1 ${
                        item.change >= 0 ? "text-primary" : "text-destructive"
                      }`}>
                        {item.change >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-semibold">{Math.abs(item.change)}%</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-foreground">
                          ₹{item.currentPrice}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {language === 'en' ? '/quintal' : language === 'hi' ? '/क्विंटल' : '/क्विंटल'}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {language === 'en' ? 'Previous' : language === 'hi' ? 'पिछला' : 'मागील'}: ₹{item.previousPrice}
                      </p>
                    </div>

                    <div className="pt-3 border-t space-y-1">
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {language === 'en' ? 'Volume' : language === 'hi' ? 'मात्रा' : 'प्रमाण'}:
                        </span> {item.volume}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">
                          {language === 'en' ? 'Market' : language === 'hi' ? 'बाजार' : 'बाजार'}:
                        </span> {item.market}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Market;