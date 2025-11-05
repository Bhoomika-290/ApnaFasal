import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Sprout, Calendar, MapPin, Droplets, Plus } from "lucide-react";
import { CropDetailDialog } from "@/components/CropDetailDialog";
import { AddCropDialog } from "@/components/AddCropDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface Crop {
  id: number;
  name: string;
  season: string;
  regions: string[];
  soilType: string;
  duration: string;
  waterRequirement: string;
  description?: string;
  seedCost?: string;
  expectedYield?: string;
  bestPractices?: string[];
}

const Crops = () => {
  const { language } = useLanguage();
  const t = translations[language].crops;
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const [customCrops, setCustomCrops] = useState<Crop[]>([]);

  const defaultCrops: Crop[] = [
    {
      id: 1,
      name: "Wheat",
      season: "Rabi",
      regions: ["Nashik", "Pune", "Ahmednagar"],
      soilType: "Loamy",
      duration: "110-130 days",
      waterRequirement: "Medium"
    },
    {
      id: 2,
      name: "Rice",
      season: "Kharif",
      regions: ["Ratnagiri", "Sindhudurg", "Thane"],
      soilType: "Clay loam",
      duration: "120-150 days",
      waterRequirement: "High"
    },
    {
      id: 3,
      name: "Cotton",
      season: "Kharif",
      regions: ["Jalgaon", "Akola", "Yavatmal"],
      soilType: "Black soil",
      duration: "150-180 days",
      waterRequirement: "Medium"
    },
    {
      id: 4,
      name: "Sugarcane",
      season: "Year-round",
      regions: ["Kolhapur", "Sangli", "Satara"],
      soilType: "Loamy",
      duration: "12-18 months",
      waterRequirement: "High"
    },
    {
      id: 5,
      name: "Soybean",
      season: "Kharif",
      regions: ["Latur", "Beed", "Nanded"],
      soilType: "Medium black",
      duration: "90-110 days",
      waterRequirement: "Low"
    },
    {
      id: 6,
      name: "Onion",
      season: "Rabi/Kharif",
      regions: ["Nashik", "Pune", "Ahmednagar"],
      soilType: "Sandy loam",
      duration: "90-120 days",
      waterRequirement: "Medium"
    },
    {
      id: 7,
      name: "Grapes",
      season: "Year-round",
      regions: ["Nashik", "Sangli", "Solapur"],
      soilType: "Sandy loam",
      duration: "3-4 years (first harvest)",
      waterRequirement: "Medium"
    },
    {
      id: 8,
      name: "Mango",
      season: "Summer harvest",
      regions: ["Ratnagiri", "Sindhudurg", "Pune"],
      soilType: "Well-drained",
      duration: "3-5 years (first harvest)",
      waterRequirement: "Medium"
    },
    {
      id: 9,
      name: "Groundnut",
      season: "Kharif/Rabi",
      regions: ["Solapur", "Osmanabad", "Sangli"],
      soilType: "Sandy loam",
      duration: "100-120 days",
      waterRequirement: "Low to Medium"
    },
    {
      id: 10,
      name: "Maize",
      season: "Kharif",
      regions: ["Ahmednagar", "Pune", "Satara"],
      soilType: "Loamy",
      duration: "80-110 days",
      waterRequirement: "Medium"
    },
    {
      id: 11,
      name: "Bajra (Pearl Millet)",
      season: "Kharif",
      regions: ["Solapur", "Ahmednagar", "Beed"],
      soilType: "Sandy loam",
      duration: "70-90 days",
      waterRequirement: "Low"
    },
    {
      id: 12,
      name: "Jowar (Sorghum)",
      season: "Kharif/Rabi",
      regions: ["Parbhani", "Jalna", "Beed"],
      soilType: "Medium to heavy black",
      duration: "100-130 days",
      waterRequirement: "Low"
    },
    {
      id: 13,
      name: "Tomato",
      season: "Rabi",
      regions: ["Pune", "Nashik", "Satara"],
      soilType: "Sandy loam",
      duration: "60-90 days",
      waterRequirement: "Medium to High"
    },
    {
      id: 14,
      name: "Pomegranate",
      season: "Year-round",
      regions: ["Solapur", "Sangli", "Ahmednagar"],
      soilType: "Well-drained loamy",
      duration: "2-3 years (first harvest)",
      waterRequirement: "Medium"
    },
    {
      id: 15,
      name: "Turmeric",
      season: "Kharif",
      regions: ["Sangli", "Satara", "Kolhapur"],
      soilType: "Sandy loam to clay loam",
      duration: "7-10 months",
      waterRequirement: "High"
    }
  ];

  const allCrops = [...defaultCrops, ...customCrops];

  const filteredCrops = allCrops.filter(crop =>
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.season.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.regions.some(region => region.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getSeasonColor = (season: string) => {
    if (season === "Kharif") return "bg-primary/10 text-primary border-primary/20";
    if (season === "Rabi") return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    return "bg-accent/10 text-accent-foreground border-accent/20";
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

        {/* Search Bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            {t.addNewCrop}
          </Button>
        </div>

        {/* Crop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCrops.map((crop) => (
            <Card key={crop.id} className="shadow-soft hover:shadow-glow transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-primary">
                      <Sprout className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{crop.name}</CardTitle>
                      <Badge className={`mt-1 ${getSeasonColor(crop.season)}`}>
                        {crop.season}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t.duration}:</span>
                  <span className="font-medium">{crop.duration}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm">
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">{t.water}:</span>
                  <span className="font-medium">{crop.waterRequirement}</span>
                </div>

                <div className="flex items-start gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <span className="text-muted-foreground">{t.mainRegions}:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {crop.regions.map((region, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {region}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.soil}:</span> {crop.soilType}
                  </p>
                </div>

                <Button 
                  className="w-full mt-4"
                  onClick={() => {
                    setSelectedCrop(crop);
                    setDetailOpen(true);
                  }}
                >
                  {t.viewDetails}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <CropDetailDialog
        crop={selectedCrop}
        open={detailOpen}
        onOpenChange={setDetailOpen}
      />

      <AddCropDialog
        open={addOpen}
        onOpenChange={setAddOpen}
        onAddCrop={(crop) => setCustomCrops([...customCrops, crop])}
      />
    </div>
  );
};

export default Crops;
