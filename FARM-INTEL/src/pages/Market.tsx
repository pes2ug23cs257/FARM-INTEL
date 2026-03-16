import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import BottomNav from '@/components/BottomNav';
import marketImage from '@/assets/market.jpg';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Market = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  const marketData = [
    { 
      name: 'Tomato', 
      price: '₹2,500', 
      trend: 'up', 
      forecast: [
        { day: 'Mon', price: 2300 },
        { day: 'Tue', price: 2400 },
        { day: 'Wed', price: 2500 },
        { day: 'Thu', price: 2700 },
        { day: 'Fri', price: 2900 },
      ]
    },
    { 
      name: 'Potato', 
      price: '₹1,800', 
      trend: 'down', 
      forecast: [
        { day: 'Mon', price: 2000 },
        { day: 'Tue', price: 1950 },
        { day: 'Wed', price: 1800 },
        { day: 'Thu', price: 1750 },
        { day: 'Fri', price: 1700 },
      ]
    },
    { 
      name: 'Onion', 
      price: '₹3,200', 
      trend: 'up', 
      forecast: [
        { day: 'Mon', price: 2800 },
        { day: 'Tue', price: 2900 },
        { day: 'Wed', price: 3200 },
        { day: 'Thu', price: 3400 },
        { day: 'Fri', price: 3600 },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${marketImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-white/80 mb-2 font-medium">{t('market.livePrices')}</p>
          <h1 className="text-5xl font-bold mb-2">{t('market.title')}</h1>
          <p className="text-white/90 text-lg font-light">{t('market.trackPrices')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder={t('market.searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 text-base border-border bg-card shadow-sm focus:shadow-md transition-shadow"
          />
        </div>

        {/* My Crops Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-1">{t('market.myCrops')}</h2>
            <p className="text-muted-foreground">{t('market.monitorPrices')}</p>
          </div>
          <div className="grid gap-5">
            {marketData.map((crop, index) => (
              <Card key={crop.name} className="overflow-hidden glass-card-strong border-2 border-white/30 hover:border-primary/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-2xl font-bold text-foreground">{crop.name}</h3>
                        <Badge variant={crop.trend === 'up' ? 'default' : 'secondary'} className="h-6">
                          {crop.trend === 'up' ? (
                            <><TrendingUp className="h-3 w-3 mr-1" /> Rising</>
                          ) : (
                            <><TrendingDown className="h-3 w-3 mr-1" /> Falling</>
                          )}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{t('market.currentPrice')}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-4xl font-bold text-foreground">{crop.price}</p>
                      <p className="text-xs text-muted-foreground mt-1">per quintal</p>
                    </div>
                  </div>

                  <div className="bg-muted/30 rounded-xl p-4 mb-5">
                    <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">7-Day Price Forecast</p>
                    <ResponsiveContainer width="100%" height={160}>
                      <LineChart data={crop.forecast}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.2} />
                        <XAxis 
                          dataKey="day" 
                          stroke="hsl(var(--muted-foreground))" 
                          style={{ fontSize: '11px' }}
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="hsl(var(--muted-foreground))" 
                          style={{ fontSize: '11px' }}
                          tickLine={false}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--popover))', 
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px',
                            padding: '8px 12px',
                            fontSize: '12px'
                          }}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="price" 
                          stroke={crop.trend === 'up' ? 'hsl(var(--success))' : 'hsl(var(--warning))'} 
                          strokeWidth={2.5}
                          dot={{ fill: crop.trend === 'up' ? 'hsl(var(--success))' : 'hsl(var(--warning))', strokeWidth: 0, r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className={`p-4 rounded-lg ${crop.trend === 'up' ? 'bg-success/5 border border-success/20' : 'bg-warning/5 border border-warning/20'}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${crop.trend === 'up' ? 'bg-success/10' : 'bg-warning/10'}`}>
                        <span className="text-lg">{crop.trend === 'up' ? '📈' : '📉'}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold mb-1 text-foreground">AI Market Insight</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {crop.trend === 'up' 
                            ? `${crop.name} prices are trending upward. Favorable conditions for selling your produce.` 
                            : `${crop.name} prices are declining. Consider holding inventory or exploring alternate markets.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

export default Market;
