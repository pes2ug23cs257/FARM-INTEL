import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Leaf, TrendingUp, DollarSign, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import BottomNav from '@/components/BottomNav';
import cropFieldImage from '@/assets/crop-field.jpg';

const CropRecommendation = () => {
  const { t } = useTranslation();
  const [selectedCrop, setSelectedCrop] = useState('Tomato');

  const cropRecommendations = [
    { name: 'Tomato', yield: '25 tons/acre', demand: t('crop.high'), suitability: '95%' },
    { name: 'Potato', yield: '22 tons/acre', demand: t('crop.high'), suitability: '90%' },
    { name: 'Onion', yield: '20 tons/acre', demand: t('crop.high'), suitability: '85%' },
  ];

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
              <h1 className="text-xl font-bold text-foreground">{t('crop.title')}</h1>
              <p className="text-sm text-muted-foreground">{t('crop.aiPlanning')}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Hero Section */}
        <Card className="overflow-hidden shadow-2xl border-2 border-success/30 card-hover">
          <div 
            className="h-56 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${cropFieldImage})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm opacity-90 mb-2 font-semibold">{t('crop.usingDataFrom')}</p>
              <Badge className="bg-gradient-to-r from-primary to-success text-white shadow-glow px-3 py-1">
                <Sparkles className="h-4 w-4 mr-1 animate-pulse" />
                AI Powered
              </Badge>
            </div>
          </div>
        </Card>

        {/* Tabs */}
        <Tabs defaultValue="crops" className="w-full">
          <TabsList className="grid w-full grid-cols-3 h-auto">
            <TabsTrigger value="crops" className="py-3">
              {t('crop.topRecommendation')}
            </TabsTrigger>
            <TabsTrigger value="fertilizer" className="py-3">
              {t('crop.fertilizerPlan')}
            </TabsTrigger>
            <TabsTrigger value="rotation" className="py-3">
              {t('crop.cropRotation')}
            </TabsTrigger>
          </TabsList>

          {/* Crop Recommendations Tab */}
          <TabsContent value="crops" className="space-y-4 mt-4">
            <h3 className="font-bold text-lg">{t('crop.topRecommendation')}</h3>
            {cropRecommendations.map((crop, index) => (
              <Card 
                key={crop.name}
                className={`p-5 glass-card-strong shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                  index === 0 ? 'border-primary/50 shadow-glow' : 'border-white/30'
                }`}
                onClick={() => setSelectedCrop(crop.name)}
              >
                {index === 0 && (
                  <Badge className="mb-3 bg-primary text-primary-foreground">
                    {t('crop.topRecommendation')}
                  </Badge>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-success/20 rounded-full">
                      <Leaf className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <h4 className="font-bold text-xl">{crop.name}</h4>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div className="text-center p-2 bg-success/10 rounded-lg">
                    <TrendingUp className="h-4 w-4 mx-auto mb-1 text-success" />
                    <p className="text-xs text-muted-foreground">{t('crop.expectedYield')}</p>
                    <p className="font-bold text-sm">{crop.yield}</p>
                  </div>
                  <div className="text-center p-2 bg-primary/10 rounded-lg">
                    <DollarSign className="h-4 w-4 mx-auto mb-1 text-primary" />
                    <p className="text-xs text-muted-foreground">{t('crop.marketDemand')}</p>
                    <p className="font-bold text-sm">{crop.demand}</p>
                  </div>
                  <div className="text-center p-2 bg-accent/10 rounded-lg">
                    <Sparkles className="h-4 w-4 mx-auto mb-1 text-accent" />
                    <p className="text-xs text-muted-foreground">{t('crop.soilSuitability')}</p>
                    <p className="font-bold text-sm">{crop.suitability}</p>
                  </div>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Fertilizer Plan Tab */}
          <TabsContent value="fertilizer" className="space-y-4 mt-4">
            <Card className="p-6 glass-card-strong shadow-lg border-2 border-white/30">
              <h3 className="font-bold text-lg mb-4">
                {t('crop.fertilizerFor')} {selectedCrop}
              </h3>
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg border border-primary/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('crop.recommendedType')}</p>
                  <p className="font-bold text-lg">NPK 19:19:19</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg border border-success/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('crop.optimalDosage')}</p>
                  <p className="font-bold text-lg">25 kg/acre</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg border border-accent/30">
                  <p className="text-sm text-muted-foreground mb-1">{t('crop.applicationSchedule')}</p>
                  <p className="font-bold">Week 1, Week 4, Week 8</p>
                  <p className="text-sm text-muted-foreground mt-2">Apply during early morning or evening</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Crop Rotation Tab */}
          <TabsContent value="rotation" className="space-y-4 mt-4">
            <Card className="p-6 glass-card-strong shadow-lg border-2 border-white/30">
              <h3 className="font-bold text-lg mb-4">{t('crop.sustainablePlan')}</h3>
              <div className="space-y-3">
                <div className="p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <p className="text-sm text-muted-foreground mb-1">{t('crop.currentSeason')}</p>
                  <p className="font-bold text-lg">Tomato</p>
                </div>
                <div className="p-4 bg-success/10 rounded-lg border-l-4 border-success">
                  <p className="text-sm text-muted-foreground mb-1">{t('crop.nextSeason')}</p>
                  <p className="font-bold text-lg">Legumes (Peas)</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg border-l-4 border-accent">
                  <p className="text-sm text-muted-foreground mb-1">{t('crop.season3')}</p>
                  <p className="font-bold text-lg">Leafy Vegetables</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-info/10 rounded-lg border border-info/30">
                <p className="font-semibold mb-2">{t('crop.whyThisPlan')}</p>
                <p className="text-sm text-muted-foreground">
                  {t('crop.rotationBenefit')}
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

export default CropRecommendation;
