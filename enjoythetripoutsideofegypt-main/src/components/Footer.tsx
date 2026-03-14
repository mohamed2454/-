/**
 * 🔻 تذييل الصفحة (Footer)
 * بيعرض اسم المتحف وحقوق النشر
 */
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-gold flex items-center justify-center shadow-gold">
              <span className="text-2xl">🏛️</span>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg">{t('siteName')}</h3>
              <p className="text-sm text-secondary-foreground/70">
                {language === 'ar'
                  ? 'أكبر متحف أثري في العالم'
                  : language === 'fr'
                  ? 'Le plus grand musée archéologique du monde'
                  : 'The largest archaeological museum in the world'}
              </p>
            </div>
          </div>

          <div className="text-center md:text-end text-sm text-secondary-foreground/70">
            <p>
              {language === 'ar'
                ? '© 2024 المتحف المصري الكبير. جميع الحقوق محفوظة.'
                : language === 'fr'
                ? '© 2024 Grand Musée Égyptien. Tous droits réservés.'
                : '© 2024 Grand Egyptian Museum. All rights reserved.'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
