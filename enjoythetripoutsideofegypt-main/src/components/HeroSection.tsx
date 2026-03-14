/**
 * 🎬 القسم الترحيبي (Hero Section)
 * أول حاجة الزائر يشوفها - صورة كبيرة مع عنوان ترحيبي
 * وأزرار للتنقل السريع (خريطة، شات، تخطيط الزيارة)
 */
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, MessageCircle, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-museum.jpg';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onNavigate }) => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/40 to-background" />
      {/* Background Pattern */}
      <div className="absolute inset-0 hieroglyphic-pattern opacity-20" />

      {/* Floating Elements */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gold/20 blur-2xl"
        animate={{ y: [0, -20, 0], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-32 h-32 rounded-full bg-pharaoh/30 blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      />

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Decorative Element */}
          <motion.div
            className="w-24 h-1 mx-auto mb-8 rounded-full gold-shimmer"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
          />

          {/* Main Heading */}
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 text-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gradient-gold">{t('welcome')}</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-card/90 mb-12 max-w-2xl mx-auto drop-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {t('heroSubtitle')}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Button
              size="lg"
              className="btn-royal text-primary-foreground px-8 py-6 text-lg font-semibold rounded-xl gap-2 min-w-[200px]"
              onClick={() => onNavigate('map')}
            >
              <MapPin className="w-5 h-5" />
              {t('exploreMap')}
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gold bg-card/10 backdrop-blur-sm text-card hover:bg-gold/20 px-8 py-6 text-lg font-semibold rounded-xl gap-2 min-w-[200px]"
              onClick={() => onNavigate('chat')}
            >
              <MessageCircle className="w-5 h-5" />
              {t('startChat')}
            </Button>

            <Button
              size="lg"
              variant="ghost"
              className="text-card hover:text-gold hover:bg-gold/10 backdrop-blur-sm px-8 py-6 text-lg font-semibold rounded-xl gap-2 min-w-[200px]"
              onClick={() => onNavigate('tips')}
            >
              <Calendar className="w-5 h-5" />
              {t('planVisit')}
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-12 rounded-full border-2 border-gold/50 flex items-start justify-center p-2">
            <motion.div
              className="w-2 h-2 rounded-full bg-gold"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
