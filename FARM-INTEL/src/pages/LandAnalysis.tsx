import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import BottomNav from '@/components/BottomNav';
import landAnalysisImage from '@/assets/land-analysis.jpg';
import { Badge } from '@/components/ui/badge';

const LandAnalysis = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-30 backdrop-blur-lg bg-card/95 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 px-6 py-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="icon" className="hover:bg-accent">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground">{t('land.title')}</h1>
              <p className="text-sm text-muted-foreground">Detailed soil and land insights</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Map View */}
        <Card className="overflow-hidden shadow-2xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 glass-card-strong">
          <div 
            className="h-80 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${landAnalysisImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-white">
              <div className="flex items-center gap-3 bg-black/40 backdrop-blur-md px-4 py-3 rounded-full border border-white/20 shadow-lg">
                <MapPin className="h-6 w-6 animate-pulse" />
                <span className="font-bold text-lg">My Farm Location</span>
              </div>
              <Badge className="bg-gradient-to-r from-success to-primary text-white shadow-lg text-base px-4 py-2 border border-white/20">
                {t('land.highlySuitable')}
              </Badge>
            </div>
          </div>

          <div className="p-8 space-y-4 bg-gradient-to-br from-transparent via-transparent to-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 glass-card-strong border-2 border-primary/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-primary/20 rounded-xl shadow-sm">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{t('land.suitability')}</h3>
                  </div>
                  <div className="space-y-3 pl-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Rice</span>
                      <span className="font-bold text-success text-base">95%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-success rounded-full w-[95%]" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Wheat</span>
                      <span className="font-bold text-success text-base">88%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-success rounded-full w-[88%]" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Sugarcane</span>
                      <span className="font-bold text-warning text-base">72%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-warning rounded-full w-[72%]" />
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6 glass-card-strong border-2 border-accent/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-accent/20 rounded-xl shadow-sm">
                      <TrendingUp className="h-6 w-6 text-accent" />
                    </div>
                    <h3 className="font-bold text-lg text-foreground">{t('land.soilFertility')}</h3>
                  </div>
                  <div className="space-y-3 pl-1">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Organic Matter</span>
                      <span className="font-bold text-success text-base">3.2%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-success rounded-full w-[65%]" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">pH Level</span>
                      <span className="font-bold text-success text-base">6.5</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-success rounded-full w-[75%]" />
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground font-medium">Moisture</span>
                      <span className="font-bold text-info text-base">68%</span>
                    </div>
                    <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-info rounded-full w-[68%]" />
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </Card>

        {/* Analysis Report */}
        <Card className="p-8 glass-card-strong shadow-2xl border-2 border-white/30 hover:border-primary/30 transition-all duration-300">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
            <div className="p-3 bg-primary/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-primary" />
            </div>
            {t('land.title')}
          </h2>

          <div className="space-y-6">
            {/* Overall Suitability */}
            <div className="p-6 bg-success/10 rounded-2xl border-2 border-success/40 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-lg">{t('land.overallSuitability')}</p>
                <Badge className="bg-success text-success-foreground text-sm px-4 py-1.5">
                  {t('land.highlySuitable')}
                </Badge>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-4 overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-success to-success w-[90%] rounded-full shadow-sm" />
              </div>
              <p className="text-sm text-muted-foreground mt-3">90% match for optimal crop growth</p>
            </div>

            {/* Soil Health Score */}
            <div className="p-6 bg-primary/10 rounded-2xl border-2 border-primary/40 shadow-md hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <p className="font-bold text-lg">{t('land.soilHealthScore')}</p>
                <div className="flex items-center gap-2">
                  <span className="text-4xl font-bold text-primary">8</span>
                  <span className="text-2xl text-muted-foreground">/10</span>
                </div>
              </div>
              <div className="w-full bg-muted/50 rounded-full h-4 overflow-hidden shadow-inner">
                <div className="h-full bg-gradient-to-r from-primary to-accent w-[80%] rounded-full shadow-sm" />
              </div>
              <p className="text-sm text-muted-foreground mt-3">Excellent soil conditions detected</p>
            </div>

            {/* Key Nutrients */}
            <div>
              <h3 className="font-bold text-lg mb-4">{t('land.keyNutrients')}</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-5 bg-success/10 rounded-2xl text-center border-2 border-success/30 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">{t('land.nitrogen')}</p>
                  <p className="font-bold text-success text-xl">{t('land.good')}</p>
                  <div className="w-full bg-muted/50 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="h-full bg-success rounded-full w-[85%]" />
                  </div>
                </div>
                <div className="p-5 bg-warning/10 rounded-2xl text-center border-2 border-warning/30 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">{t('land.phosphorus')}</p>
                  <p className="font-bold text-warning text-xl">{t('land.low')}</p>
                  <div className="w-full bg-muted/50 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="h-full bg-warning rounded-full w-[45%]" />
                  </div>
                </div>
                <div className="p-5 bg-success/10 rounded-2xl text-center border-2 border-success/30 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide font-semibold">{t('land.potassium')}</p>
                  <p className="font-bold text-success text-xl">{t('land.good')}</p>
                  <div className="w-full bg-muted/50 rounded-full h-2 mt-3 overflow-hidden">
                    <div className="h-full bg-success rounded-full w-[78%]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* CTA */}
        <Link to="/crop-recommendation">
          <Button className="w-full h-20 text-xl font-bold bg-gradient-to-r from-primary via-accent to-primary text-white hover:opacity-90 shadow-2xl hover:shadow-3xl transform hover:scale-[1.02] transition-all duration-300 rounded-2xl">
            {t('land.getCropRecommendations')} 🌱
          </Button>
        </Link>
      </div>

      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

export default LandAnalysis;
