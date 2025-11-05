import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Users, Database, Bell, Upload, Settings } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";


const Admin = () => {
  const { language } = useLanguage();
  const t = translations[language].admin;

  const stats = [
    { label: t.totalUsers, value: "2,847", icon: Users, change: "+12%" },
    { label: t.activeCrops, value: "247", icon: Database, change: "+5%" },
    { label: t.totalListings, value: "156", icon: Database, change: "+8%" },
    { label: t.apiCalls, value: "1,243", icon: Database, change: "+15%" },
  ];

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
                      {stat.change} {language === 'en' ? 'from last month' : language === 'hi' ? 'पिछले महीने से' : 'मागील महिन्यापासून'}
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
                {t.uploadSoilData}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en' 
                  ? 'Upload CSV files containing soil analysis data for different districts and blocks.'
                  : language === 'hi'
                  ? 'विभिन्न जिलों और ब्लॉकों के लिए मिट्टी विश्लेषण डेटा युक्त CSV फाइलें अपलोड करें।'
                  : 'विविध जिल्हे आणि ब्लॉक्ससाठी माती विश्लेषण डेटा असलेल्या CSV फाइल्स अपलोड करा।'}
              </p>
              <Button className="w-full">
                {language === 'en' ? 'Upload CSV' : language === 'hi' ? 'CSV अपलोड करें' : 'CSV अपलोड करा'}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {t.managePrices}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Manually update market prices or configure automatic updates from APMC data sources.'
                  : language === 'hi'
                  ? 'मैन्युअल रूप से बाजार मूल्य अपडेट करें या APMC डेटा स्रोतों से स्वचालित अपडेट कॉन्फ़िगर करें।'
                  : 'मॅन्युअली बाजार किंमती अपडेट करा किंवा APMC डेटा स्रोतांकडून स्वयंचलित अपडेट कॉन्फिगर करा।'}
              </p>
              <Button className="w-full">
                {language === 'en' ? 'Update Prices' : language === 'hi' ? 'मूल्य अपडेट करें' : 'किंमती अपडेट करा'}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                {t.editCatalog}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Add, edit, or remove crops from the catalog. Update crop details and requirements.'
                  : language === 'hi'
                  ? 'सूची में फसलें जोड़ें, संपादित करें या हटाएं। फसल विवरण और आवश्यकताओं को अपडेट करें।'
                  : 'सूचीमध्ये पिके जोडा, संपादित करा किंवा काढून टाका। पीक तपशील आणि आवश्यकता अपडेट करा।'}
              </p>
              <Button className="w-full">
                {language === 'en' ? 'Manage Catalog' : language === 'hi' ? 'सूची प्रबंधित करें' : 'सूची व्यवस्थापित करा'}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                {t.sendAlerts}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Send weather alerts, price notifications, or advisory messages to farmers.'
                  : language === 'hi'
                  ? 'किसानों को मौसम अलर्ट, मूल्य सूचनाएं या सलाह संदेश भेजें।'
                  : 'शेतकऱ्यांना हवामान सूचना, किंमत सूचना किंवा सल्ला संदेश पाठवा।'}
              </p>
              <Button className="w-full">
                {language === 'en' ? 'Create Alert' : language === 'hi' ? 'अलर्ट बनाएं' : 'सूचना तयार करा'}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart className="h-5 w-5 text-primary" />
                {t.viewAnalytics}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'View detailed analytics about user activity, popular crops, and system usage.'
                  : language === 'hi'
                  ? 'उपयोगकर्ता गतिविधि, लोकप्रिय फसलों और सिस्टम उपयोग के बारे में विस्तृत विश्लेषण देखें।'
                  : 'वापरकर्ता क्रियाकलाप, लोकप्रिय पिके आणि सिस्टम वापर बद्दल तपशीलवार विश्लेषण पहा।'}
              </p>
              <Button className="w-full">
                {language === 'en' ? 'View Reports' : language === 'hi' ? 'रिपोर्ट देखें' : 'अहवाल पहा'}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-soft hover:shadow-glow transition-smooth">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5 text-primary" />
                {t.systemSettings}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {language === 'en'
                  ? 'Configure API keys, system parameters, and other administrative settings.'
                  : language === 'hi'
                  ? 'API कुंजी, सिस्टम पैरामीटर और अन्य प्रशासनिक सेटिंग्स कॉन्फ़िगर करें।'
                  : 'API की, सिस्टम पॅरामीटर्स आणि इतर प्रशासकीय सेटिंग्ज कॉन्फिगर करा।'}
              </p>
              <Button className="w-full">
                {language === 'en' ? 'Open Settings' : language === 'hi' ? 'सेटिंग्स खोलें' : 'सेटिंग्ज उघडा'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle>
              {language === 'en' ? 'Recent Activity' : language === 'hi' ? 'हाल की गतिविधि' : 'अलीकडील क्रियाकलाप'}
            </CardTitle>
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
                    <p className="text-sm text-muted-foreground">
                      {language === 'en' ? 'by' : language === 'hi' ? 'द्वारा' : 'द्वारे'} {activity.user}
                    </p>
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