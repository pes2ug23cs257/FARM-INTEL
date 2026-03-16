import { useState, useEffect } from 'react';
import { Mic, MicOff, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';

export const VoiceAssistant = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      
      const lang = localStorage.getItem('language') || 'en';
      const langMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
      };
      recognitionInstance.lang = langMap[lang] || 'en-IN';

      recognitionInstance.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);
        
        if (event.results[current].isFinal) {
          handleVoiceCommand(transcriptText);
        }
      };

      recognitionInstance.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast.error('Voice recognition error. Please try again.');
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const handleVoiceCommand = (command: string) => {
    const lowerCommand = command.toLowerCase();
    
    // Simple command routing
    if (lowerCommand.includes('market') || lowerCommand.includes('price') || lowerCommand.includes('बाजार') || lowerCommand.includes('ಮಾರುಕಟ್ಟೆ')) {
      window.location.href = '/market';
    } else if (lowerCommand.includes('land') || lowerCommand.includes('soil') || lowerCommand.includes('भूमि') || lowerCommand.includes('ಭೂಮಿ')) {
      window.location.href = '/land-analysis';
    } else if (lowerCommand.includes('crop') || lowerCommand.includes('fertilizer') || lowerCommand.includes('फसल') || lowerCommand.includes('ಬೆಳೆ')) {
      window.location.href = '/crop-recommendation';
    } else if (lowerCommand.includes('community') || lowerCommand.includes('समुदाय') || lowerCommand.includes('ಸಮುದಾಯ')) {
      window.location.href = '/community';
    } else if (lowerCommand.includes('profile') || lowerCommand.includes('प्रोफाइल') || lowerCommand.includes('ಪ್ರೊಫೈಲ್')) {
      window.location.href = '/profile';
    } else {
      // Speak the response
      speakResponse(t('voice.processing'));
    }
    
    setIsOpen(false);
    setTranscript('');
  };

  const speakResponse = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const lang = localStorage.getItem('language') || 'en';
      const langMap: Record<string, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        kn: 'kn-IN',
        ta: 'ta-IN',
        te: 'te-IN',
      };
      utterance.lang = langMap[lang] || 'en-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if (recognition) {
      setTranscript('');
      setIsListening(true);
      recognition.start();
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-glow gradient-primary animate-pulse-glow z-50"
        size="icon"
      >
        <Mic className="h-6 w-6 text-white" />
      </Button>

      {/* Voice Interface Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          {/* Realistic farming background with blur */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: 'url(https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80)',
              filter: 'blur(8px) brightness(0.4)'
            }}
          />
          
          {/* Glass overlay */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsOpen(false)} />
          
          {/* Voice Assistant Content */}
          <div className="relative glass-premium rounded-3xl p-10 max-w-md w-full shadow-2xl border-2 border-white/40 animate-scale-in">
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20 rounded-full"
            >
              <X className="h-6 w-6" />
            </Button>

            <div className="text-center space-y-6">
              <div className="relative inline-block">
                <div className={`p-8 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 backdrop-blur-sm ${isListening ? 'animate-pulse-glow' : ''}`}>
                  {isListening ? (
                    <Mic className="h-16 w-16 text-white animate-pulse" />
                  ) : (
                    <MicOff className="h-16 w-16 text-white/80" />
                  )}
                </div>
                {isListening && (
                  <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                )}
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  {isListening ? t('voice.listening') : t('voice.title')}
                </h3>
                <p className="text-white/80 text-sm">
                  {isListening ? t('voice.speak') : t('voice.tapToSpeak')}
                </p>
              </div>

              {transcript && (
                <div className="glass-card p-4 rounded-xl border-2 border-white/30">
                  <p className="text-white text-sm">{transcript}</p>
                </div>
              )}

              <Button
                onClick={isListening ? stopListening : startListening}
                className={`w-full h-14 text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ${
                  isListening 
                    ? 'bg-destructive hover:bg-destructive/90 text-white' 
                    : 'gradient-primary text-white hover:opacity-90 hover:scale-105'
                }`}
              >
                {isListening ? (
                  <><MicOff className="h-5 w-5 mr-2" /> {t('voice.stopListening')}</>
                ) : (
                  <><Mic className="h-5 w-5 mr-2" /> {t('voice.startListening')}</>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
