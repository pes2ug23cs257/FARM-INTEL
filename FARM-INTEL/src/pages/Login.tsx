import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import techFarmingImage from '@/assets/tech-farming.jpg';

const Login = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [showOTP, setShowOTP] = useState(false);

  const handleGetOTP = () => {
    if (phone.length !== 10) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    setShowOTP(true);
    toast.success('OTP sent successfully!');
  };

  const handleLogin = () => {
    if (otp.length !== 6) {
      toast.error('Please enter a valid 6-digit OTP');
      return;
    }
    
    // Save phone number
    localStorage.setItem('userPhone', phone);
    
    // Check if user is new
    const isNewUser = !localStorage.getItem('userName');
    
    if (isNewUser) {
      navigate('/onboarding');
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${techFarmingImage})` }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6">
        <Card className="w-full max-w-md glass-premium p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-glass-heading mb-2">
              {t('app.title')}
            </h1>
            <p className="text-glass-premium">{t('login.title')}</p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-base font-semibold text-glass-premium">
                {t('login.phoneLabel')}
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder={t('login.phonePlaceholder')}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                className="h-12 text-lg"
                maxLength={10}
              />
            </div>

            {!showOTP && (
              <Button
                onClick={handleGetOTP}
                className="w-full h-12 text-lg gradient-primary hover:opacity-90"
                size="lg"
              >
                {t('login.getOTP')}
              </Button>
            )}

            {showOTP && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="otp" className="text-base font-semibold text-glass-premium">
                    {t('login.otpLabel')}
                  </Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder={t('login.otpPlaceholder')}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="h-12 text-lg"
                    maxLength={6}
                  />
                </div>

                <Button
                  onClick={handleLogin}
                  className="w-full h-12 text-lg gradient-secondary hover:opacity-90"
                  size="lg"
                >
                  {t('login.loginButton')}
                </Button>

                <Button
                  onClick={handleGetOTP}
                  variant="ghost"
                  className="w-full text-primary hover:text-primary/80"
                >
                  {t('login.resendOTP')}
                </Button>
              </>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
