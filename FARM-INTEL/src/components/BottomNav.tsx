import { Home, ShoppingCart, Users, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const BottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: Home, label: t('navigation.home') },
    { path: '/market', icon: ShoppingCart, label: t('navigation.market') },
    { path: '/community', icon: Users, label: t('navigation.community') },
    { path: '/profile', icon: User, label: t('navigation.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-background via-muted/20 to-background border-t-2 border-primary/20 shadow-2xl backdrop-blur-lg z-40">
      <div className="grid grid-cols-4 h-16">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          const colors = ['primary', 'accent', 'success', 'warning'];
          const color = colors[index];
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-1 transition-all duration-300 relative',
                isActive
                  ? `text-${color} bg-${color}/10`
                  : 'text-muted-foreground hover:text-primary hover:bg-muted/50'
              )}
            >
              {isActive && (
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-${color} to-transparent rounded-b-full`} />
              )}
              <Icon className={cn('h-6 w-6', isActive && 'animate-pulse scale-110')} />
              <span className={cn('text-xs font-medium', isActive && 'font-bold')}>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;
