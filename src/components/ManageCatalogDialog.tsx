import { useState } from "react";
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

interface ManageCatalogDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ManageCatalogDialog = ({ open, onOpenChange }: ManageCatalogDialogProps) => {
  const { toast } = useToast();
  const [cropName, setCropName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cropName) {
      toast({ title: "Error", description: "Please enter a crop name", variant: "destructive" });
      return;
    }
    toast({ title: "Added", description: `${cropName} added to catalog` });
    setCropName("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Crop Catalog</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <Label>Crop name</Label>
            <Input value={cropName} onChange={(e) => setCropName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Crop</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
