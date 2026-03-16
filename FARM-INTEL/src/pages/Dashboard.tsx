import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Cloud, Droplets, Sun, Sprout, Leaf, ShoppingCart, Users } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import BottomNav from '@/components/BottomNav';
import heroImage from '@/assets/hero-farm.jpg';

const Dashboard = () => {
  const { t } = useTranslation();
  const userName = localStorage.getItem('userName') || 'Farmer';
  
  // Get actual weather data (mock for now, can be replaced with API)
  const getWeatherData = () => {
    return {
      temperature: Math.floor(Math.random() * 10) + 25, // 25-35°C
      humidity: Math.floor(Math.random() * 20) + 60, // 60-80%
      rainfall: (Math.random() * 5).toFixed(1), // 0-5mm
    };
  };
  
  const weather = getWeatherData();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <div 
        className="relative h-96 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white max-w-7xl mx-auto">
          <div className="space-y-3 backdrop-blur-sm bg-black/20 p-6 rounded-2xl border border-white/10 inline-block">
            <p className="text-sm uppercase tracking-wider text-white/90 font-semibold">{t('dashboard.welcomeBack')}</p>
            <h1 className="text-5xl md:text-6xl font-bold animate-fade-in">
              {t('dashboard.greeting')}, {userName}
            </h1>
            <p className="text-white/90 text-xl font-light">{t('dashboard.optimizeFarm')}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Weather Widget */}
        <Card className="overflow-hidden border-0 glass-card-strong shadow-2xl hover:shadow-3xl transition-all duration-300">
          <div className="bg-gradient-to-br from-primary/10 via-transparent to-accent/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 md:mb-8 gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 glass-card rounded-xl shadow-sm">
                  <Cloud className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{t('dashboard.weather')}</h2>
                  <p className="text-sm text-muted-foreground">{t('dashboard.currentConditions')}</p>
                </div>
              </div>
              <div className="px-4 py-1.5 glass-card rounded-full border border-primary/20">
                <span className="text-xs font-bold text-primary tracking-wide">● {t('dashboard.liveStatus').toUpperCase()}</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="glass-card p-6 rounded-2xl border-2 border-white/30 shadow-md hover:shadow-lg hover:border-warning/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-warning/10 rounded-full mb-4 shadow-sm">
                    <Sun className="h-10 w-10 text-warning" />
                  </div>
                  <p className="text-4xl font-bold text-foreground mb-2">{weather.temperature}°C</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{t('dashboard.temperature')}</p>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border-2 border-white/30 shadow-md hover:shadow-lg hover:border-info/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-info/10 rounded-full mb-4 shadow-sm">
                    <Droplets className="h-10 w-10 text-info" />
                  </div>
                  <p className="text-4xl font-bold text-foreground mb-2">{weather.humidity}%</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{t('dashboard.humidity')}</p>
                </div>
              </div>
              <div className="glass-card p-6 rounded-2xl border-2 border-white/30 shadow-md hover:shadow-lg hover:border-info/30 transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <div className="p-4 bg-info/10 rounded-full mb-4 shadow-sm">
                    <Cloud className="h-10 w-10 text-info" />
                  </div>
                  <p className="text-4xl font-bold text-foreground mb-2">{weather.rainfall} mm</p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">{t('dashboard.rainfall')}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-6">{t('dashboard.quickActions')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/land-analysis" className="block group">
              <Card className="glass-card-strong p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-primary/50">
                <div className="flex items-start gap-4">
                  <div className="p-4 glass-card rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Sprout className="h-8 w-8 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {t('land.title')}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/crop-recommendation" className="block group">
              <Card className="glass-card-strong p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-success/50">
                <div className="flex items-start gap-4">
                  <div className="p-4 glass-card rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Leaf className="h-8 w-8 text-success" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-success transition-colors">
                      {t('crop.title')}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/market" className="block group">
              <Card className="glass-card-strong p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-warning/50">
                <div className="flex items-start gap-4">
                  <div className="p-4 glass-card rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <ShoppingCart className="h-8 w-8 text-warning" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-warning transition-colors">
                      {t('market.title')}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>

            <Link to="/community" className="block group">
              <Card className="glass-card-strong p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl border-2 border-white/30 hover:border-accent/50">
                <div className="flex items-start gap-4">
                  <div className="p-4 glass-card rounded-2xl group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {t('community.title')}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

export default Dashboard;
