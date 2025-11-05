import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Droplets, Sprout } from "lucide-react";

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

interface CropDetailDialogProps {
  crop: Crop | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CropDetailDialog = ({ crop, open, onOpenChange }: CropDetailDialogProps) => {
  if (!crop) return null;

  const getSeasonColor = (season: string) => {
    if (season === "Kharif") return "bg-primary/10 text-primary border-primary/20";
    if (season === "Rabi") return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    return "bg-accent/10 text-accent-foreground border-accent/20";
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <DialogTitle className="text-2xl">{crop.name}</DialogTitle>
              <Badge className={`mt-1 ${getSeasonColor(crop.season)}`}>
                {crop.season}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Duration</span>
              </div>
              <p className="font-medium">{crop.duration}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span>Water Requirement</span>
              </div>
              <p className="font-medium">{crop.waterRequirement}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>Suitable Regions</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {crop.regions.map((region, idx) => (
                <Badge key={idx} variant="secondary">
                  {region}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Soil Type</p>
            <p className="font-medium">{crop.soilType}</p>
          </div>

          {crop.description && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Description</p>
              <p className="text-sm text-muted-foreground">{crop.description}</p>
            </div>
          )}

          {crop.seedCost && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Seed Cost</p>
              <p className="font-medium">{crop.seedCost}</p>
            </div>
          )}

          {crop.expectedYield && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Expected Yield</p>
              <p className="font-medium">{crop.expectedYield}</p>
            </div>
          )}

          {crop.bestPractices && crop.bestPractices.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Best Practices</p>
              <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                {crop.bestPractices.map((practice, idx) => (
                  <li key={idx}>{practice}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
