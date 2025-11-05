import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalcIcon, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";

const Calculator = () => {
  const [area, setArea] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [seedCost, setSeedCost] = useState("");
  const [fertilizerCost, setFertilizerCost] = useState("");
  const [laborCost, setLaborCost] = useState("");
  const [otherCost, setOtherCost] = useState("");
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
      toast.error("Please fill all required fields");
      return;
    }

    const areaNum = parseFloat(area);
    const totalCost = 
      parseFloat(seedCost) + 
      parseFloat(fertilizerCost) + 
      parseFloat(laborCost) + 
      (parseFloat(otherCost) || 0);
    
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

    toast.success("Calculation complete!");
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Production Cost Calculator</h1>
          <p className="text-lg text-muted-foreground">
            Calculate your production costs, expected yield, and profit margins
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Form */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalcIcon className="h-5 w-5 text-primary" />
                Input Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="area">Cultivation Area (Hectares) *</Label>
                <Input
                  id="area"
                  type="number"
                  placeholder="Enter area in hectares"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  min="0"
                  step="0.1"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="crop">Select Crop *</Label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger id="crop">
                    <SelectValue placeholder="Choose a crop" />
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

              <div className="space-y-2">
                <Label htmlFor="seedCost">Seed Cost (₹) *</Label>
                <Input
                  id="seedCost"
                  type="number"
                  placeholder="Enter seed cost"
                  value={seedCost}
                  onChange={(e) => setSeedCost(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fertilizerCost">Fertilizer & Chemicals (₹) *</Label>
                <Input
                  id="fertilizerCost"
                  type="number"
                  placeholder="Enter fertilizer cost"
                  value={fertilizerCost}
                  onChange={(e) => setFertilizerCost(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="laborCost">Labor & Machinery (₹) *</Label>
                <Input
                  id="laborCost"
                  type="number"
                  placeholder="Enter labor cost"
                  value={laborCost}
                  onChange={(e) => setLaborCost(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="otherCost">Other Costs (₹)</Label>
                <Input
                  id="otherCost"
                  type="number"
                  placeholder="Transport, storage, etc."
                  value={otherCost}
                  onChange={(e) => setOtherCost(e.target.value)}
                  min="0"
                />
              </div>

              <Button onClick={calculateProfit} className="w-full">
                Calculate Profit
              </Button>
            </CardContent>
          </Card>

          {/* Results */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {result ? (
                <div className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Total Cost</span>
                      <span className="text-xl font-bold text-foreground">
                        ₹{result.totalCost.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Estimated Yield</span>
                      <span className="text-xl font-bold text-foreground">
                        {result.estimatedYield.toFixed(1)} quintals
                      </span>
                    </div>
                  </div>

                  <div className="p-4 rounded-lg bg-primary/5 border-2 border-primary/20 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Expected Revenue</span>
                      <span className="text-2xl font-bold text-primary">
                        ₹{result.estimatedRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Net Profit</span>
                      <span className={`text-2xl font-bold ${
                        result.profit >= 0 ? "text-primary" : "text-destructive"
                      }`}>
                        ₹{result.profit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Profit Margin</span>
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
                      <span className="font-semibold text-foreground">Break-Even Point</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      You need to sell at least{" "}
                      <span className="font-bold text-accent">
                        {result.breakEven.toFixed(1)} quintals
                      </span>{" "}
                      to recover your costs
                    </p>
                  </div>

                  {result.profit < 0 && (
                    <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                      <p className="text-sm text-destructive font-medium">
                        ⚠️ Warning: Current market prices may result in losses. Consider alternative crops or wait for better market conditions.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <CalcIcon className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">
                    Fill in the form to calculate your production costs and expected profits
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
