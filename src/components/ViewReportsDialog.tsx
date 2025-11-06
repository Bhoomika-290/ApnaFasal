import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

interface ViewReportsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionsToday?: number;
  transactionsBreakdown?: { buys: number; sells: number; total: number };
}

export const ViewReportsDialog = ({ open, onOpenChange, transactionsToday, transactionsBreakdown }: ViewReportsDialogProps) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{t("admin.reportsTitle")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">{t("admin.totalUsersLabel")}</p>
              <p className="text-2xl font-bold">2,847</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">{t("admin.activeListings")}</p>
              <p className="text-2xl font-bold">156</p>
            </div>
            <div className="p-4 rounded-lg bg-muted/30">
              <p className="text-sm text-muted-foreground">{t("admin.transactionsToday")}</p>
              <p className="text-2xl font-bold">{typeof transactionsToday === 'number' ? String(transactionsToday) : '—'}</p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-primary block" />
                  <span className="text-sm text-muted-foreground">{t("admin.buys")}: <span className="font-medium text-foreground">{transactionsBreakdown?.buys ?? '—'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-sm bg-destructive block" />
                  <span className="text-sm text-muted-foreground">{t("admin.sells")}: <span className="font-medium text-foreground">{transactionsBreakdown?.sells ?? '—'}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{t("admin.totalLabel")}:
                    <span className="font-medium text-foreground">{transactionsBreakdown?.total ?? (typeof transactionsToday === 'number' ? String(transactionsToday) : '—')}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4 rounded-lg bg-muted/30">
            <p className="text-sm text-muted-foreground">{t("admin.recentSystemLogs")}</p>
            <ul className="list-disc ml-5 mt-2 text-sm text-muted-foreground">
              <li>{t("admin.recentSystemLogs")} — {t("admin.uploadCsvBtn")} example log</li>
              <li>{t("admin.uploadCsvBtn")} — {t("admin.updatePricesBtn")} example</li>
              <li>{t("admin.manageCatalogBtn")} — {t("admin.createAlertBtn")} example</li>
            </ul>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>{t("common.close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
