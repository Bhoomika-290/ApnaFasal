import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Package, MapPin, Phone, Search } from "lucide-react";
import { MarketplaceActionDialog } from "@/components/MarketplaceActionDialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface Listing {
  id: number;
  type: "buy" | "sell";
  crop: string;
  quantity: number;
  price: number;
  location: string;
  seller: string;
  contact: string;
  date: string;
}

const Marketplace = () => {
  const { language } = useLanguage();
  const t = translations[language].marketplace;
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [actionDialog, setActionDialog] = useState<{
    open: boolean;
    type: "contact" | "offer";
    listing: any;
  }>({ open: false, type: "contact", listing: null });

  const listings: Listing[] = [
    {
      id: 1,
      type: "sell",
      crop: "Wheat",
      quantity: 50,
      price: 2450,
      location: "Nashik APMC",
      seller: "Ramesh Patil",
      contact: "+91 98765 43210",
      date: "2 hours ago"
    },
    {
      id: 2,
      type: "buy",
      crop: "Rice",
      quantity: 100,
      price: 3100,
      location: "Pune APMC",
      seller: "Suresh Kulkarni",
      contact: "+91 98765 43211",
      date: "5 hours ago"
    },
    {
      id: 3,
      type: "sell",
      crop: "Cotton",
      quantity: 75,
      price: 5800,
      location: "Jalgaon APMC",
      seller: "Vijay Deshmukh",
      contact: "+91 98765 43212",
      date: "1 day ago"
    },
    {
      id: 4,
      type: "sell",
      crop: "Soybean",
      quantity: 60,
      price: 4000,
      location: "Latur APMC",
      seller: "Prakash Shinde",
      contact: "+91 98765 43213",
      date: "1 day ago"
    },
    {
      id: 5,
      type: "buy",
      crop: "Onion",
      quantity: 40,
      price: 2800,
      location: "Nashik APMC",
      seller: "Ashok Pawar",
      contact: "+91 98765 43214",
      date: "2 days ago"
    },
    {
      id: 6,
      type: "sell",
      crop: "Sugarcane",
      quantity: 200,
      price: 3200,
      location: "Kolhapur APMC",
      seller: "Ganesh Jadhav",
      contact: "+91 98765 43215",
      date: "2 days ago"
    },
  ];

  const filteredListings = listings.filter(listing => {
    const matchesType = filterType === "all" || listing.type === filterType;
    const matchesSearch = 
      listing.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesType && matchesSearch;
  });

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

        {/* Filters */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder={t.search}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allListings}</SelectItem>
                  <SelectItem value="buy">{t.buyRequests}</SelectItem>
                  <SelectItem value="sell">{t.sellOffers}</SelectItem>
                </SelectContent>
              </Select>
              <Button className="whitespace-nowrap">
                <Package className="h-4 w-4 mr-2" />
                {t.postListing}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <Card key={listing.id} className="shadow-soft hover:shadow-glow transition-smooth">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-xl">{listing.crop}</CardTitle>
                      <Badge 
                        className={
                          listing.type === "buy"
                            ? "bg-secondary/10 text-secondary-foreground border-secondary/20"
                            : "bg-primary/10 text-primary border-primary/20"
                        }
                      >
                        {listing.type === "buy" ? t.buy : t.sell}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{listing.date}</p>
                  </div>
                  {listing.type === "sell" ? (
                    <Package className="h-5 w-5 text-primary" />
                  ) : (
                    <ShoppingCart className="h-5 w-5 text-secondary-foreground" />
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-foreground">
                      ₹{listing.price}
                    </span>
                    <span className="text-sm text-muted-foreground">{t.perQuintal}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">{t.quantity}:</span> {listing.quantity} {t.quintals}
                  </p>
                </div>

                <div className="pt-3 border-t space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{listing.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{listing.seller}</span>
                  </div>
                </div>

                <Button 
                  className="w-full"
                  onClick={() => setActionDialog({
                    open: true,
                    type: listing.type === "buy" ? "offer" : "contact",
                    listing: listing
                  })}
                >
                  {listing.type === "buy" ? t.makeOffer : t.contactSeller}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredListings.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="py-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">
                {t.noListings}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <MarketplaceActionDialog
        open={actionDialog.open}
        onOpenChange={(open) => setActionDialog({ ...actionDialog, open })}
        type={actionDialog.type}
        listing={actionDialog.listing}
      />
    </div>
  );
};

export default Marketplace;
