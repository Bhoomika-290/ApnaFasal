import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Database, Bell, Upload, Settings } from "lucide-react";

const Admin = () => {
  const stats = [
    { label: "Total Users", value: "2,847", icon: Users, change: "+12%" },
    { label: "Active Listings", value: "156", icon: Database, change: "+8%" },
    { label: "Alerts Sent", value: "423", icon: Bell, change: "+24%" },
    { label: "Data Updates", value: "89", icon: Database, change: "+5%" },
  ];

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-foreground">Admin Panel</h1>
          <p className="text-lg text-muted-foreground">
            Manage system data, users, and configurations
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
                    <p className="text-sm text-primary mt-1">{stat.change} from last month</p>
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
                Upload Soil Data
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload CSV files containing soil analysis data for different districts and blocks.
              </p>
              <Button className="w-full">Upload CSV</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Manage Prices
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Manually update market prices or configure automatic updates from APMC data sources.
              </p>
              <Button className="w-full">Update Prices</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                Crop Catalog
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Add, edit, or remove crops from the catalog. Update crop details and requirements.
              </p>
              <Button className="w-full">Manage Catalog</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                Send Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Send weather alerts, price notifications, or advisory messages to farmers.
              </p>
              <Button className="w-full">Create Alert</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                View detailed analytics about user activity, popular crops, and system usage.
              </p>
              <Button className="w-full">View Reports</Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                System Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Configure API keys, system parameters, and other administrative settings.
              </p>
              <Button className="w-full">Open Settings</Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
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
                    <p className="text-sm text-muted-foreground">by {activity.user}</p>
                  </div>
                  <span className="text-sm text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Admin;
