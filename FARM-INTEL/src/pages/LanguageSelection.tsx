import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heroImage from '@/assets/hero-farm.jpg';

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
];

const LanguageSelection = () => {
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('language', langCode);
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-4 animate-float">
            <Globe className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {t('app.title')}
          </h1>
          <p className="text-xl text-white/90">
            {t('app.tagline')}
          </p>
        </div>

        <Card className="w-full max-w-2xl glass-premium p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-center mb-6 text-glass-heading">
            {t('splash.selectLanguage')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {languages.map((lang) => (
              <Button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="h-auto py-6 flex flex-col items-center gap-2 gradient-primary text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105"
                size="lg"
              >
                <span className="text-2xl font-bold">{lang.nativeName}</span>
                <span className="text-sm opacity-90">{lang.name}</span>
              </Button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LanguageSelection;
