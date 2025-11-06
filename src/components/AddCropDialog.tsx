import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AddCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCrop: (crop: any) => void;
}

export const AddCropDialog = ({ open, onOpenChange, onAddCrop }: AddCropDialogProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    season: "",
    regions: "",
    soilType: "",
    duration: "",
    waterRequirement: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.season || !formData.soilType) {
      toast({
  title: "Error",
  description: t("crops.fillRequiredFields"),
  variant: "destructive",
});
      return;
    }

    const newCrop = {
      id: Date.now(),
      name: formData.name,
      season: formData.season,
      regions: formData.regions.split(",").map(r => r.trim()),
      soilType: formData.soilType,
      duration: formData.duration,
      waterRequirement: formData.waterRequirement,
    };

    onAddCrop(newCrop);
    toast({
  title: "Success",
  description: t("crops.cropAddedSuccess"),
});
    
    setFormData({
      name: "",
      season: "",
      regions: "",
      soilType: "",
      duration: "",
      waterRequirement: "",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("crops.addNewCrop")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
           <Label htmlFor="name">{t("crops.cropName")} *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
             placeholder="e.g., Wheat, Rice"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="season">{t("crops.season")} {"*"}</Label>
            <Input
              id="season"
              value={formData.season}
              onChange={(e) => setFormData({ ...formData, season: e.target.value })}
             placeholder="e.g., Kharif, Rabi"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regions">{t("crops.mainRegions")} ({t("crops.commaSeparated")})</Label>
            <Input
              id="regions"
              value={formData.regions}
              onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
              placeholder="e.g., Nashik, Pune"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="soilType">{t("crops.soilType")} *</Label>
            <Input
              id="soilType"
              value={formData.soilType}
              onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
              placeholder="e.g., Loamy, Black soil"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">{t("crops.duration")}</Label>
            <Input
              id="duration"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
              placeholder={t("crops.durationPlaceholder")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="waterRequirement">{t("crops.waterRequirement")}</Label>
            <Input
              id="waterRequirement"
              value={formData.waterRequirement}
              onChange={(e) => setFormData({ ...formData, waterRequirement: e.target.value })}
              placeholder="e.g., Medium, High"
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t("common.cancel")}
            </Button>
            <Button type="submit">{t("crops.addNewCrop")}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
