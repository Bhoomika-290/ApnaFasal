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
import { useToast } from "@/hooks/use-toast";

interface MarketplaceActionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "contact" | "offer";
  listing: {
    crop: string;
    seller: string;
    contact: string;
    price: number;
  } | null;
}

export const MarketplaceActionDialog = ({
  open,
  onOpenChange,
  type,
  listing,
}: MarketplaceActionDialogProps) => {
  const { toast } = useToast();
  const [message, setMessage] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "offer" && !offerPrice) {
      toast({
        title: "Error",
        description: "Please enter an offer price",
        variant: "destructive",
      });
      return;
    }

    if (!message) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Success",
      description: type === "contact" 
        ? `Message sent to ${listing?.seller}` 
        : `Offer of ₹${offerPrice}/quintal sent to ${listing?.seller}`,
    });

    setMessage("");
    setOfferPrice("");
    onOpenChange(false);
  };

  if (!listing) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "contact" ? "Contact Seller" : "Make Offer"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">Crop</p>
            <p className="font-medium">{listing.crop}</p>
            <p className="text-sm text-muted-foreground mt-2">Seller</p>
            <p className="font-medium">{listing.seller}</p>
            <p className="text-sm text-muted-foreground mt-2">Contact</p>
            <p className="font-medium">{listing.contact}</p>
            {type === "offer" && (
              <>
                <p className="text-sm text-muted-foreground mt-2">Current Price</p>
                <p className="font-medium">₹{listing.price}/quintal</p>
              </>
            )}
          </div>

          {type === "offer" && (
            <div className="space-y-2">
              <Label htmlFor="offerPrice">Your Offer Price (₹/quintal) *</Label>
              <Input
                id="offerPrice"
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder="Enter your offer price"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                type === "contact"
                  ? "Enter your message to the seller..."
                  : "Explain your offer..."
              }
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {type === "contact" ? "Send Message" : "Send Offer"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
