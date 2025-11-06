import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Droplets, Sprout } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  if (!crop) return null;

  const slug = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "");

  const getSeasonColor = (season: string) => {
    const s = season.toLowerCase();
    if (s.includes("kharif")) return "bg-primary/10 text-primary border-primary/20";
    if (s.includes("rabi")) return "bg-secondary/10 text-secondary-foreground border-secondary/20";
    return "bg-accent/10 text-accent-foreground border-accent/20";
  };

  const localizeDuration = (d: string) => {
    if (!d) return d;
    let out = d;
    out = out.replace(/years?/gi, t("common.years") ?? "years");
    out = out.replace(/months?/gi, t("common.months") ?? "months");
    out = out.replace(/\(first harvest\)/gi, `(${t("crops.firstHarvest") ?? "first harvest"})`);
    return out;
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
              <DialogTitle className="text-2xl">
                {t(`market.cropLabels.${slug(crop.name)}`) ?? crop.name}
              </DialogTitle>
              <Badge className={`mt-1 ${getSeasonColor(crop.season)}`}>
                {t(`crops.seasons.${slug(crop.season)}`) ?? crop.season}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{t("crops.duration") ?? "Duration"}</span>
              </div>
              <p className="font-medium">{localizeDuration(crop.duration)}</p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Droplets className="h-4 w-4" />
                <span>{t("crops.waterRequirement") ?? "Water Requirement"}</span>
              </div>
              <p className="font-medium">
                {t(`crops.waterRequirements.${slug(crop.waterRequirement)}`) ?? crop.waterRequirement}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{t("crops.mainRegions") ?? "Suitable Regions"}</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {crop.regions.map((region, idx) => (
                <Badge key={idx} variant="secondary">
                  {t(`crops.regionLabels.${slug(region)}`) ?? region}
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{t("crops.soilType") ?? "Soil Type"}</p>
            <p className="font-medium">{t(`crops.soilTypes.${slug(crop.soilType)}`) ?? crop.soilType}</p>
          </div>

          {crop.description && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("crops.description") ?? "Description"}</p>
              <p className="text-sm text-muted-foreground">{crop.description}</p>
            </div>
          )}

          {crop.seedCost && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t("calculator.seedCost") ?? "Seed Cost"}</p>
              <p className="font-medium">{crop.seedCost}</p>
            </div>
          )}

          {crop.expectedYield && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{t("calculator.estimatedYield") ?? "Expected Yield"}</p>
              <p className="font-medium">{crop.expectedYield}</p>
            </div>
          )}

          {crop.bestPractices && crop.bestPractices.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">{t("crops.bestPractices") ?? "Best Practices"}</p>
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
