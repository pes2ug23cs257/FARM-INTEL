import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { MapPin, Navigation } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import cropFieldImage from '@/assets/crop-field.jpg';

const Onboarding = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [location, setLocation] = useState({ lat: 0, lng: 0, address: '' });
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const handleNameSubmit = () => {
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    localStorage.setItem('userName', name);
    setStep(2);
  };

  const handleUseLocation = () => {
    if (navigator.geolocation) {
      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            address: `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`,
          };
          setLocation(newLocation);
          setManualLocation(''); // Clear manual input if GPS succeeds
          setIsGettingLocation(false);
          toast.success('Location captured successfully!');
        },
        (error) => {
          setIsGettingLocation(false);
          toast.error('Unable to get location. Please enter manually below.');
          console.error('Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      toast.error('Geolocation is not supported. Please enter manually.');
    }
  };

  const handleManualLocationSubmit = () => {
    if (!manualLocation.trim()) {
      toast.error('Please enter your location');
      return;
    }
    setLocation({
      lat: 0,
      lng: 0,
      address: manualLocation,
    });
    toast.success('Location saved!');
  };

  const handleConfirmLocation = () => {
    const finalLocation = location.address || manualLocation;
    if (!finalLocation) {
      toast.error('Please select a location or enter manually');
      return;
    }
    
    localStorage.setItem('farmLocation', JSON.stringify({
      ...location,
      address: finalLocation
    }));
    toast.success('Onboarding complete!');
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cropFieldImage})` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md glass-premium p-8 shadow-2xl">
          {/* Step 1: Name */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-glass-heading mb-2">
                  {t('onboarding.step1Title')}
                </h2>
                <div className="flex justify-center gap-2 mt-4">
                  <div className="h-2 w-12 rounded-full bg-white/60" />
                  <div className="h-2 w-12 rounded-full bg-white/30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-semibold text-glass-premium">
                  {t('profile.name')}
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={t('onboarding.step1Placeholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12 text-lg"
                  autoFocus
                />
              </div>

              <Button
                onClick={handleNameSubmit}
                className="w-full h-12 text-lg gradient-primary hover:opacity-90"
                size="lg"
              >
                {t('onboarding.next')}
              </Button>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-glass-heading mb-2">
                  {t('onboarding.step2Title')}
                </h2>
                <p className="text-sm text-glass-premium mb-4">
                  Hello, {name}!
                </p>
                <div className="flex justify-center gap-2 mt-4">
                  <div className="h-2 w-12 rounded-full bg-white/30" />
                  <div className="h-2 w-12 rounded-full bg-white/60" />
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleUseLocation}
                  disabled={isGettingLocation}
                  className="w-full h-14 text-lg gradient-secondary hover:opacity-90 flex items-center justify-center gap-3"
                  size="lg"
                >
                  <Navigation className="h-5 w-5" />
                  {isGettingLocation ? t('common.loading') : t('onboarding.useLocation')}
                </Button>

                {location.address && (
                  <div className="p-4 glass-card border-2 border-success/50 rounded-lg flex items-start gap-3 animate-in fade-in">
                    <MapPin className="h-5 w-5 text-success mt-0.5" />
                    <div>
                      <p className="font-semibold text-success drop-shadow-md">{t('common.success')}</p>
                      <p className="text-sm text-glass-premium">{location.address}</p>
                    </div>
                  </div>
                )}

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/30" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="glass-effect px-3 py-1 rounded-full text-glass-premium uppercase font-semibold">
                      OR
                    </span>
                  </div>
                </div>

                {/* Manual Location Entry */}
                <div className="space-y-2">
                  <Label htmlFor="manual-location" className="text-base font-semibold text-glass-premium">
                    Type Your Location
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="manual-location"
                      type="text"
                      placeholder="e.g., Village, District, State"
                      value={manualLocation}
                      onChange={(e) => setManualLocation(e.target.value)}
                      className="h-12 text-lg flex-1"
                    />
                    <Button
                      onClick={handleManualLocationSubmit}
                      variant="outline"
                      className="h-12 px-4"
                      disabled={!manualLocation.trim()}
                    >
                      <MapPin className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-glass-subtle">
                    Enter your farm location manually if GPS doesn't work
                  </p>
                </div>

                {manualLocation && !location.address && (
                  <div className="p-4 glass-card border-2 border-info/50 rounded-lg flex items-start gap-3 animate-in fade-in">
                    <MapPin className="h-5 w-5 text-info mt-0.5" />
                    <div>
                      <p className="font-semibold text-info drop-shadow-md">Manual Location Set</p>
                      <p className="text-sm text-glass-premium">{manualLocation}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setStep(1)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  {t('navigation.back')}
                </Button>
                <Button
                  onClick={handleConfirmLocation}
                  className="flex-1 h-12 text-lg gradient-primary hover:opacity-90"
                  disabled={!location.address && !manualLocation}
                >
                  {t('onboarding.confirmLocation')}
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
