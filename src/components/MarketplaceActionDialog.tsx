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
import { useTranslation } from "@/hooks/useTranslation";

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
  const { t } = useTranslation();
  const tx = (k: string) => t(`marketplace.${k}`);
  const [message, setMessage] = useState("");
  const [offerPrice, setOfferPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (type === "offer" && !offerPrice) {
      toast({
        title: tx('toast.errorTitle') ?? 'Error',
        description: tx('validations.enterOfferPrice') ?? 'Please enter an offer price',
        variant: "destructive",
      });
      return;
    }

    if (!message) {
      toast({
        title: tx('toast.errorTitle') ?? 'Error',
        description: tx('validations.enterMessage') ?? 'Please enter a message',
        variant: "destructive",
      });
      return;
    }

    const successTitle = tx('toast.successTitle') ?? 'Success';
    const successDesc =
      type === 'contact'
        ? (tx('success.contactSent') || 'Message sent to {seller}').replace('{seller}', listing?.seller || '')
        : (tx('success.offerSent') || 'Offer of ₹{price}/quintal sent to {seller}')
            .replace('{price}', offerPrice)
            .replace('{seller}', listing?.seller || '');

    toast({
      title: successTitle,
      description: successDesc,
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
            {type === "contact" ? tx('contactSeller') : tx('makeOffer')}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <p className="text-sm text-muted-foreground">{tx('fields.crop')}</p>
            <p className="font-medium">{listing.crop}</p>
            <p className="text-sm text-muted-foreground mt-2">{tx('fields.seller')}</p>
            <p className="font-medium">{listing.seller}</p>
            <p className="text-sm text-muted-foreground mt-2">{tx('fields.contact')}</p>
            <p className="font-medium">{listing.contact}</p>
            {type === "offer" && (
              <>
                <p className="text-sm text-muted-foreground mt-2">{tx('fields.currentPrice')}</p>
                <p className="font-medium">₹{listing.price}/quintal</p>
              </>
            )}
          </div>

          {type === "offer" && (
            <div className="space-y-2">
              <Label htmlFor="offerPrice">{tx('fields.offerPriceLabel')}</Label>
              <Input
                id="offerPrice"
                type="number"
                value={offerPrice}
                onChange={(e) => setOfferPrice(e.target.value)}
                placeholder={tx('placeholders.offerPrice')}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="message">{tx('fields.message')}{' *'}</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={type === "contact" ? tx('placeholders.contactMessage') : tx('placeholders.offerMessage')}
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              {t('common.cancel')}
            </Button>
            <Button type="submit">
              {type === "contact" ? tx('buttons.sendMessage') : tx('buttons.sendOffer')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
