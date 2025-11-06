import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Droplets, Cloud, AlertTriangle } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useTranslation } from "@/hooks/useTranslation";

const Dashboard = () => {
  const priceData = [
    { crop: "Wheat", price: 2450, change: 5.2 },
    { crop: "Rice", price: 3150, change: -2.1 },
    { crop: "Cotton", price: 5800, change: 8.5 },
    { crop: "Sugarcane", price: 3200, change: 1.8 },
    { crop: "Soybean", price: 4200, change: -1.5 },
  ];

  const weatherData = [
    { day: "Mon", temp: 32, rainfall: 0 },
    { day: "Tue", temp: 31, rainfall: 5 },
    { day: "Wed", temp: 30, rainfall: 12 },
    { day: "Thu", temp: 29, rainfall: 18 },
    { day: "Fri", temp: 28, rainfall: 8 },
    { day: "Sat", temp: 30, rainfall: 0 },
    { day: "Sun", temp: 32, rainfall: 0 },
  ];

  const alerts = [
    { id: 1, type: "weather", messageKey: "dashboard.alertMessages.rainNashik", severity: "high" },
    { id: 2, type: "price", messageKey: "dashboard.alertMessages.cottonOpportunity", severity: "medium" },
    { id: 3, type: "advisory", messageKey: "dashboard.alertMessages.whiteflyJalgaon", severity: "high" },
  ];

  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Hero Section */}
        <div className="text-center space-y-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            {t("dashboard.title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("dashboard.subtitle")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("dashboard.activeCrops")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">247</div>
              <p className="text-xs text-muted-foreground mt-1">In catalogue</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("market.title")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">156</div>
              <p className="text-xs text-muted-foreground mt-1">Updated today</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("dashboard.marketListings")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">89</div>
              <p className="text-xs text-muted-foreground mt-1">Buy/Sell offers</p>
            </CardContent>
          </Card>

          <Card className="shadow-soft">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {t("dashboard.topPriceMovers")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">36</div>
              <p className="text-xs text-muted-foreground mt-1">Across Maharashtra</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Price Movers */}
          <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  {t("dashboard.topPriceMovers")}
                </CardTitle>
              </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={priceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="crop" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Bar dataKey="price" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weather Forecast */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5 text-primary" />
                {t("dashboard.weather")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weatherData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "hsl(var(--card))", 
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "var(--radius)"
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="temp" 
                    stroke="hsl(var(--accent))" 
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="rainfall" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    name="Rainfall (mm)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Advisories */}
        <Card className="shadow-soft">
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" />
              {t("dashboard.alerts")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div 
                  key={alert.id}
                  className={`p-4 rounded-lg border-l-4 ${
                    alert.severity === "high" 
                      ? "border-destructive bg-destructive/5" 
                      : "border-accent bg-accent/5"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle 
                      className={`h-5 w-5 mt-0.5 ${
                        alert.severity === "high" ? "text-destructive" : "text-accent"
                      }`} 
                    />
                    <p className="text-sm text-foreground flex-1">{t(alert.messageKey)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
