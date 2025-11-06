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

interface UpdatePricesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const UpdatePricesDialog = ({ open, onOpenChange }: UpdatePricesDialogProps) => {
  const { toast } = useToast();
  const [apmc, setApmc] = useState("");
  const [crop, setCrop] = useState("");
  const [price, setPrice] = useState<number | "">("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apmc || !crop || !price) {
      toast({ title: "Error", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    toast({ title: "Updated", description: `Price for ${crop} in ${apmc} updated to ₹${price}` });
    onOpenChange(false);
    setApmc("");
    setCrop("");
    setPrice("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Update Market Price</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>APMC</Label>
            <Input value={apmc} onChange={(e) => setApmc(e.target.value)} />
          </div>
          <div>
            <Label>Crop</Label>
            <Input value={crop} onChange={(e) => setCrop(e.target.value)} />
          </div>
          <div>
            <Label>Price (₹)</Label>
            <Input type="number" value={price === "" ? "" : price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Update</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
