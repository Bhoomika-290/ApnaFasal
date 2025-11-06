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
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface NewListing {
  type: "buy" | "sell";
  crop: string;
  quantity: number;
  price: number;
  location: string;
  seller: string;
  contact: string;
}

interface PostListingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (listing: NewListing) => void;
}

export const PostListingDialog = ({ open, onOpenChange, onSubmit }: PostListingDialogProps) => {
  const { toast } = useToast();
  const [type, setType] = useState<"buy" | "sell">("sell");
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [location, setLocation] = useState("");
  const [seller, setSeller] = useState("");
  const [contact, setContact] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!crop || !quantity || !price || !seller) {
      toast({ title: "Error", description: "Please fill required fields", variant: "destructive" });
      return;
    }

    const newListing: NewListing = { type, crop, quantity, price, location, seller, contact };
    onSubmit(newListing);

    toast({ title: "Success", description: "Listing posted" });

    // reset
    setType("sell");
    setCrop("");
    setQuantity(0);
    setPrice(0);
    setLocation("");
    setSeller("");
    setContact("");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Post Listing</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as "buy" | "sell") }>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sell">Sell</SelectItem>
                <SelectItem value="buy">Buy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Crop *</Label>
            <Input value={crop} onChange={(e) => setCrop(e.target.value)} />
          </div>

          <div>
            <Label>Quantity *</Label>
            <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
          </div>

          <div>
            <Label>Price (₹/quintal) *</Label>
            <Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          </div>

          <div>
            <Label>Location</Label>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>

          <div>
            <Label>Seller *</Label>
            <Input value={seller} onChange={(e) => setSeller(e.target.value)} />
          </div>

          <div>
            <Label>Contact</Label>
            <Input value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit">Post Listing</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
