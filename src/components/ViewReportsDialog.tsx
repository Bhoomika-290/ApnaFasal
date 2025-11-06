import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

interface ViewReportsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionsToday?: number;
  transactionsBreakdown?: { buys: number; sells: number; total: number };
}

export const ViewReportsDialog = ({ open, onOpenChange, transactionsToday, transactionsBreakdown }: ViewReportsDialogProps) => {
  const { language } = useLanguage();
  const t = translations[language].admin as any;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Reports</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">Total Users</p>
              <p className="text-2xl font-bold">2,847</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">Active Listings</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">{t.transactionsToday ?? 'Transactions Today'}</p>
              <p className="text-2xl font-bold">{typeof transactionsToday === 'number' ? String(transactionsToday) : '—'}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-primary block" />
                  <span className="text-sm text-muted-foreground">{t.buys ?? 'Buys'}: <span className="font-medium text-foreground">{transactionsBreakdown?.buys ?? '—'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-destructive block" />
                  <span className="text-sm text-muted-foreground">{t.sells ?? 'Sells'}: <span className="font-medium text-foreground">{transactionsBreakdown?.sells ?? '—'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{language === 'en' ? 'Total' : language === 'hi' ? 'कुल' : 'एकूण'}: <span className="font-medium text-foreground">{transactionsBreakdown?.total ?? (typeof transactionsToday === 'number' ? String(transactionsToday) : '—')}</span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">Recent System Logs</p>
            <ul className="list-disc ml-5 mt-2 text-sm text-muted-foreground">
              <li>Price update job ran: 2 minutes ago</li>
              <li>Alert delivery: 1 hour ago</li>
              <li>Catalog sync: 3 hours ago</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
