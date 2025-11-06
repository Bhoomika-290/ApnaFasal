import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";

interface Transaction {
  id: number;
  crop: string;
  type: "buy" | "sell";
  quantity: number;
  price: number;
  date: string;
}

interface UserItem {
  id: number;
  name: string;
  status: "active" | "completed";
}

interface TransactionHistoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactions: Transaction[];
  users: UserItem[];
}

export const TransactionHistoryDialog = ({ open, onOpenChange, transactions, users }: TransactionHistoryDialogProps) => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [tab, setTab] = useState("transactions");

  const activeUsers = users.filter(u => u.status === "active");
  const completedUsers = users.filter(u => u.status === "completed");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{t("admin.transactionHistory")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="transactions">{t("admin.transactionsTab")} ({transactions.length})</TabsTrigger>
              <TabsTrigger value="users">{t("admin.usersTab")}</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions">
              <div className="space-y-2">
                {transactions.length === 0 ? (
                  <p className="text-sm text-muted-foreground">{t("admin.noTransactions")}</p>
                ) : (
                  transactions.map((tx) => (
                    <div key={tx.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">{tx.crop} — {tx.type.toUpperCase()}</p>
                        <p className="text-sm text-muted-foreground">{tx.quantity} quintals • ₹{tx.price}</p>
                      </div>
                      <div className="text-sm text-muted-foreground">{tx.date}</div>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>

            <TabsContent value="users">
              <div className="space-y-2">
                <div>
                  <h4 className="font-medium">{t("admin.activeUsers")} ({activeUsers.length})</h4>
                  {activeUsers.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-2 border rounded my-1">
                      <div>{u.name}</div>
                <div className="text-sm text-muted-foreground">{t("admin.activeUsers")}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <h4 className="font-medium">{t("admin.completedUsers")} ({completedUsers.length})</h4>
                  {completedUsers.map(u => (
                    <div key={u.id} className="flex items-center justify-between p-2 border rounded my-1">
                      <div>{u.name}</div>
                      <div className="text-sm text-muted-foreground">{t("admin.completedUsers")}</div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>{t("common.close")}</Button>
          <Button onClick={() => toast({ title: t("admin.export"), description: t("admin.noTransactions") })}>{t("admin.export")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
