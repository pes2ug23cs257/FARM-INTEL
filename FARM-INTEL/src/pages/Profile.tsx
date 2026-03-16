import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Phone, MapPin, Settings, Globe, Leaf, Award, LogOut, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import BottomNav from '@/components/BottomNav';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const userName = localStorage.getItem('userName') || 'Farmer';
  const userPhone = localStorage.getItem('userPhone') || '9876543210';
  
  // Get farm location
  let farmLocation = 'Not set';
  try {
    const locationData = localStorage.getItem('farmLocation');
    if (locationData) {
      const parsed = JSON.parse(locationData);
      farmLocation = parsed.address || 'Location saved';
    }
  } catch (e) {
    console.error('Error parsing location:', e);
  }

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('language', lang);
    setShowLanguageDialog(false);
    toast.success(t('common.success'), { description: 'Language updated successfully' });
  };

  const handleMyFarm = () => {
    toast.info('My Farm', { description: 'Farm management feature coming soon!' });
  };

  const handleAppSettings = () => {
    toast.info('Settings', { description: 'App settings feature coming soon!' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background pb-20">
      {/* Header Profile Card */}
      <div className="gradient-hero p-8 text-white">
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 border-4 border-white shadow-xl mb-4">
            <AvatarFallback className="bg-white text-primary text-3xl font-bold">
              {userName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <h1 className="text-2xl font-bold mb-1">{userName}</h1>
          <p className="text-white/80 flex items-center gap-1">
            <Phone className="h-4 w-4" />
            +91 {userPhone}
          </p>
        </div>
      </div>

      <div className="p-6 space-y-6 -mt-6">
        {/* User Details Card */}
        <Card className="p-6 gradient-card shadow-xl border-2 border-border/50">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/20 rounded-full">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('profile.name')}</p>
                <p className="font-semibold">{userName}</p>
              </div>
              <Button variant="ghost" size="sm">
                {t('profile.edit')}
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-success/20 rounded-full">
                <Phone className="h-5 w-5 text-success" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('profile.phone')}</p>
                <p className="font-semibold">+91 {userPhone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-accent/20 rounded-full">
                <MapPin className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">{t('profile.location')}</p>
                <p className="font-semibold text-sm">{farmLocation}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => navigate('/onboarding')}>
                {t('profile.edit')}
              </Button>
            </div>
          </div>
        </Card>

        {/* Carbon Credit Dashboard */}
        <Card className="p-6 gradient-card shadow-xl border-2 border-success/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-success/20 rounded-full">
              <Leaf className="h-6 w-6 text-success" />
            </div>
            <h2 className="text-xl font-bold">{t('profile.carbonCredit')}</h2>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-success/10 rounded-lg border-2 border-success/30">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-muted-foreground">{t('profile.ecoScore')}</p>
                <Badge className="bg-success text-success-foreground text-lg px-3 py-1">
                  85/100
                </Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-success to-success w-[85%]" />
              </div>
            </div>

            <div>
              <p className="font-semibold mb-2">{t('profile.practicesTracked')}</p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>{t('profile.usingOptimizedFertilizer')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-success" />
                  <span>{t('profile.sustainableCropRotation')}</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-primary/10 rounded-lg border border-primary/30 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t('profile.estimatedCredits')}</p>
                <p className="text-2xl font-bold text-primary">12 {t('profile.credits')}</p>
              </div>
              <Award className="h-12 w-12 text-primary" />
            </div>
          </div>
        </Card>

        {/* Settings Menu */}
        <Card className="p-2 gradient-card shadow-lg border-2 border-border/50">
          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4"
            onClick={handleMyFarm}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/20 rounded-full">
                <Leaf className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold">{t('profile.myFarm')}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4"
            onClick={handleAppSettings}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-accent/20 rounded-full">
                <Settings className="h-5 w-5 text-accent" />
              </div>
              <span className="font-semibold">{t('profile.appSettings')}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-between h-auto py-4 px-4"
            onClick={() => setShowLanguageDialog(true)}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-info/20 rounded-full">
                <Globe className="h-5 w-5 text-info" />
              </div>
              <span className="font-semibold">{t('profile.changeLanguage')}</span>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Button>
        </Card>

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full h-12 text-lg"
          size="lg"
        >
          <LogOut className="h-5 w-5 mr-2" />
          {t('profile.logout')}
        </Button>
      </div>

      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('profile.changeLanguage')}</DialogTitle>
            <DialogDescription>
              Select your preferred language
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3 py-4">
            <Button
              variant={i18n.language === 'en' ? 'default' : 'outline'}
              onClick={() => handleChangeLanguage('en')}
              className="h-16"
            >
              English
            </Button>
            <Button
              variant={i18n.language === 'hi' ? 'default' : 'outline'}
              onClick={() => handleChangeLanguage('hi')}
              className="h-16"
            >
              हिंदी
            </Button>
            <Button
              variant={i18n.language === 'kn' ? 'default' : 'outline'}
              onClick={() => handleChangeLanguage('kn')}
              className="h-16"
            >
              ಕನ್ನಡ
            </Button>
            <Button
              variant={i18n.language === 'ta' ? 'default' : 'outline'}
              onClick={() => handleChangeLanguage('ta')}
              className="h-16"
            >
              தமிழ்
            </Button>
            <Button
              variant={i18n.language === 'te' ? 'default' : 'outline'}
              onClick={() => handleChangeLanguage('te')}
              className="h-16 col-span-2"
            >
              తెలుగు
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

export default Profile;
