import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { MessageSquare, ShoppingBag, Users, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { VoiceAssistant } from '@/components/VoiceAssistant';
import BottomNav from '@/components/BottomNav';
import communityImage from '@/assets/community.jpg';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

const Community = () => {
  const { t } = useTranslation();
  const [question, setQuestion] = useState('');
  const [searchListing, setSearchListing] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'buy' | 'sell' | 'equipment'>('all');
  const [posts, setPosts] = useState([
    { 
      id: 1, 
      user: 'Ramesh Kumar', 
      question: 'What is the best time to plant tomatoes?',
      answers: 3,
      time: '2 hours ago'
    },
    { 
      id: 2, 
      user: 'Priya Singh', 
      question: 'How to control pests organically?',
      answers: 5,
      time: '5 hours ago'
    },
  ]);

  const handlePostQuestion = () => {
    if (!question.trim()) {
      toast.error(t('common.error'), { description: 'Please enter a question' });
      return;
    }
    
    const newPost = {
      id: posts.length + 1,
      user: localStorage.getItem('userName') || 'Anonymous',
      question: question,
      answers: 0,
      time: 'Just now'
    };
    
    setPosts([newPost, ...posts]);
    setQuestion('');
    toast.success(t('common.success'), { description: 'Your question has been posted!' });
  };

  const handleViewDiscussion = (postId: number) => {
    toast.info('Discussion', { description: `Opening discussion for post ${postId}` });
  };

  const allListings = [
    { 
      id: 1, 
      type: 'sell' as const, 
      user: 'Suresh Patil', 
      item: 'Selling 50kg Fresh Tomatoes',
      price: '₹2,400',
      location: '5 km away'
    },
    { 
      id: 2, 
      type: 'buy' as const, 
      user: 'Lakshmi Reddy', 
      item: 'Looking for Tractor for rent',
      price: 'Negotiable',
      location: '8 km away'
    },
    { 
      id: 3, 
      type: 'equipment' as const, 
      user: 'Rajesh Verma', 
      item: 'Share Harvesting Machine',
      price: '₹500/day',
      location: '3 km away'
    },
  ];

  const filteredListings = allListings.filter(listing => {
    const matchesFilter = activeFilter === 'all' || listing.type === activeFilter;
    const matchesSearch = listing.item.toLowerCase().includes(searchListing.toLowerCase()) ||
                         listing.user.toLowerCase().includes(searchListing.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleContact = (user: string) => {
    toast.success('Contact', { description: `Connecting you with ${user}...` });
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div 
        className="h-64 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${communityImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="relative h-full flex flex-col justify-end p-8 text-white max-w-7xl mx-auto">
          <p className="text-sm uppercase tracking-wider text-white/80 mb-2 font-medium flex items-center gap-2">
            <Users className="h-4 w-4" />
            {t('community.communityHub')}
          </p>
          <h1 className="text-5xl font-bold mb-2">{t('community.title')}</h1>
          <p className="text-white/90 text-lg font-light">{t('community.connectTrade')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <Tabs defaultValue="forum" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-auto">
            <TabsTrigger value="forum" className="py-3">
              <MessageSquare className="h-4 w-4 mr-2" />
              {t('community.knowledgeForum')}
            </TabsTrigger>
            <TabsTrigger value="trade" className="py-3">
              <ShoppingBag className="h-4 w-4 mr-2" />
              {t('community.tradeExchange')}
            </TabsTrigger>
          </TabsList>

          {/* Knowledge Forum Tab */}
          <TabsContent value="forum" className="space-y-4 mt-4">
            {/* Ask Question Card */}
            <Card className="p-4 glass-card-strong shadow-lg border-2 border-white/30">
              <h3 className="font-bold mb-3">{t('community.askQuestion')}</h3>
              <div className="space-y-3">
                <Textarea
                  placeholder={t('community.questionPlaceholder')}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="min-h-24"
                />
                <Button 
                  onClick={handlePostQuestion}
                  className="w-full gradient-primary hover:opacity-90"
                >
                  <Send className="h-4 w-4 mr-2" />
                  {t('community.post')}
                </Button>
              </div>
            </Card>

            {/* Forum Posts */}
            {posts.map((post) => (
              <Card key={post.id} className="p-5 glass-card-strong shadow-lg border-2 border-white/30 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {post.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{post.user}</p>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                </div>
                <p className="font-medium mb-3">{post.question}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    <MessageSquare className="h-3 w-3 mr-1" />
                    {post.answers} answers
                  </Badge>
                  <Button 
                    variant="link" 
                    className="text-primary"
                    onClick={() => handleViewDiscussion(post.id)}
                  >
                    View Discussion →
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Trade Exchange Tab */}
          <TabsContent value="trade" className="space-y-4 mt-4">
            {/* Search */}
            <Input
              placeholder={t('community.searchListings')}
              value={searchListing}
              onChange={(e) => setSearchListing(e.target.value)}
              className="h-12"
            />

            {/* Filter Buttons */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button 
                variant={activeFilter === 'all' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveFilter('all')}
              >
                All
              </Button>
              <Button 
                variant={activeFilter === 'buy' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveFilter('buy')}
              >
                {t('community.buy')}
              </Button>
              <Button 
                variant={activeFilter === 'sell' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveFilter('sell')}
              >
                {t('community.sell')}
              </Button>
              <Button 
                variant={activeFilter === 'equipment' ? 'default' : 'outline'} 
                size="sm"
                onClick={() => setActiveFilter('equipment')}
              >
                {t('community.shareEquipment')}
              </Button>
            </div>

            {/* Trade Listings */}
            {filteredListings.length === 0 ? (
              <Card className="p-8 text-center gradient-card">
                <p className="text-muted-foreground">{t('common.loading')}</p>
              </Card>
            ) : (
              filteredListings.map((listing) => (
              <Card key={listing.id} className="p-5 gradient-card shadow-lg border-2 border-border/50 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start justify-between mb-3">
                  <Badge className={listing.type === 'sell' ? 'bg-success text-success-foreground' : 'bg-info text-info-foreground'}>
                    {listing.type === 'sell' ? t('community.sell') : t('community.buy')}
                  </Badge>
                  <p className="text-sm text-muted-foreground">{listing.location}</p>
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarFallback className="bg-primary/20 text-primary font-bold">
                      {listing.user.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold">{listing.user}</p>
                    <p className="text-sm mt-1">{listing.item}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <p className="font-bold text-xl text-primary">{listing.price}</p>
                  <Button 
                    onClick={() => handleContact(listing.user)}
                    className="gradient-primary hover:opacity-90"
                  >
                    Contact
                  </Button>
                </div>
              </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>

      <VoiceAssistant />
      <BottomNav />
    </div>
  );
};

export default Community;
