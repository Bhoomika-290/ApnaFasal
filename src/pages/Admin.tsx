import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Database, Bell, Upload, Settings } from "lucide-react";
import { useState, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useToast } from "@/hooks/use-toast";
import { ManageCatalogDialog } from "@/components/ManageCatalogDialog";
import { UpdatePricesDialog } from "@/components/UpdatePricesDialog";
import { CreateAlertDialog } from "@/components/CreateAlertDialog";
import { ViewReportsDialog } from "@/components/ViewReportsDialog";
import { TransactionHistoryDialog } from "@/components/TransactionHistoryDialog";
import { supabase } from "@/integrations/supabase/client";


const Admin = () => {
  const { t, language } = useTranslation();
  const { toast } = useToast();
  const [manageOpen, setManageOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [reportsOpen, setReportsOpen] = useState(false);
  const [transactionOpen, setTransactionOpen] = useState(false);

  // Mock transactions and users for the demo
  const [transactions] = useState<Array<{ id: number; crop: string; type: 'buy' | 'sell'; quantity: number; price: number; date: string }>>([
    { id: 1, crop: "Wheat", type: "sell", quantity: 50, price: 2500, date: "2025-11-01" },
    { id: 2, crop: "Rice", type: "buy", quantity: 30, price: 1800, date: "2025-11-02" },
  ]);

  // Try to fetch live transaction count from Supabase; fall back to mock data if not available
  const [transactionCount, setTransactionCount] = useState<number>(transactions.length);

  useEffect(() => {
    let mounted = true;
    const loadCount = async () => {
      try {
          const client: any = supabase;
          const res = await client.from('transactions').select('id', { count: 'exact', head: true });
          // supabase v2 returns { count } when head: true and count requested
          const count = res.count ?? (res.data && Array.isArray(res.data) ? res.data.length : undefined);
          if (mounted && typeof count === 'number') setTransactionCount(count);
        } catch (err) {
        // ignore and keep mock
      }
    };
    loadCount();
    return () => { mounted = false; };
  }, []);

  // Compute today's buys/sells breakdown from mock transactions; if none for today, fall back to totals
  const todayStr = new Date().toISOString().slice(0, 10);
  const todays = transactions.filter((tr) => tr.date === todayStr);
  const sourceForBreakdown = todays.length > 0 ? todays : transactions;
  const buysCount = sourceForBreakdown.filter((tr) => tr.type === 'buy').length;
  const sellsCount = sourceForBreakdown.filter((tr) => tr.type === 'sell').length;
  const breakdownTotal = sourceForBreakdown.length || transactionCount;

  const [users] = useState<Array<{ id: number; name: string; status: 'active' | 'completed' }>>([
    { id: 1, name: "Rahul", status: "active" },
    { id: 2, name: "Sonia", status: "completed" },
    { id: 3, name: "Asha", status: "active" },
  ]);

  const stats = [
    { label: t("admin.totalUsers"), value: "2,847", icon: Users, change: "+12%" },
    { label: t("admin.activeCrops"), value: "247", icon: Database, change: "+5%" },
    { label: t("admin.totalListings"), value: "156", icon: Database, change: "+8%" },
    { label: t("admin.transactionsToday") ?? t("admin.transactionHistory"), value: String(transactionCount), icon: Database, change: "+0%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">{t("admin.title")}</h1>
          <p className="text-lg text-muted-foreground">
            {t("admin.subtitle")}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-soft">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground mt-1">{stat.value}</p>
                    <p className="text-sm text-primary mt-1">
                      {stat.change} {t("admin.fromLastMonth")}
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-gradient-primary">
                    <stat.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                {t("admin.uploadSoilData")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("admin.uploadCsvDesc")}</p>
              <Button className="w-full" onClick={() => toast({ title: t("admin.uploadCsvBtn"), description: t("admin.uploadCsvDesc") } )}>
                {t("admin.uploadCsvBtn")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {t("admin.managePrices")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("admin.managePricesDesc")}</p>
              <Button className="w-full" onClick={() => setUpdateOpen(true)}>
                {t("admin.updatePricesBtn")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {t("admin.editCatalog")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("admin.editCatalogDesc")}</p>
              <Button className="w-full" onClick={() => setManageOpen(true)}>
                {t("admin.manageCatalogBtn")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                {t("admin.sendAlerts")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("admin.sendAlertsDesc")}</p>
              <Button className="w-full" onClick={() => setAlertOpen(true)}>
                {t("admin.createAlertBtn")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                {t("admin.viewAnalytics")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("admin.viewAnalyticsDesc")}</p>
              <Button className="w-full" onClick={() => setReportsOpen(true)}>
                {t("admin.viewReportsBtn")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {t("admin.transactionHistory")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{t("admin.transactionHistoryDesc")}</p>
              <Button className="w-full" onClick={() => setTransactionOpen(true)}>
                {t("admin.viewTransactionsBtn")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>{t("admin.recentActivity")}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Price data updated", time: "2 minutes ago", user: "System" },
                { action: "New alert created", time: "1 hour ago", user: "Admin" },
                { action: "Soil data uploaded", time: "3 hours ago", user: "Admin" },
                { action: "Crop catalog updated", time: "1 day ago", user: "Admin" },
                { action: "User report generated", time: "2 days ago", user: "System" },
              ].map((activity, idx) => (
                <div key={idx} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{t("admin.by")} {activity.user}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        </div>

      <ManageCatalogDialog open={manageOpen} onOpenChange={setManageOpen} />
      <UpdatePricesDialog open={updateOpen} onOpenChange={setUpdateOpen} />
      <CreateAlertDialog open={alertOpen} onOpenChange={setAlertOpen} />
    <ViewReportsDialog open={reportsOpen} onOpenChange={setReportsOpen} transactionsToday={transactionCount} transactionsBreakdown={{ buys: buysCount, sells: sellsCount, total: breakdownTotal }} />
      <TransactionHistoryDialog
        open={transactionOpen}
        onOpenChange={setTransactionOpen}
        transactions={transactions}
        users={users}
      />
    </div>
  );
};

export default Admin;