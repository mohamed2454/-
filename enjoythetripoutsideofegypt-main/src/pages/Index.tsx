/**
 * 🏠 الصفحة الرئيسية - Index
 * دي الصفحة اللي بتظهر لما حد يفتح الموقع
 * بتجمع كل المكونات (الهيدر، القاعات، الخريطة، النصائح، إلخ)
 */
import React, { useState, useRef } from 'react';
import { LanguageProvider } from '@/contexts/LanguageContext'; // مزود اللغات (عربي/إنجليزي/فرنسي)
import Header from '@/components/Header'; // شريط التنقل العلوي
import HeroSection from '@/components/HeroSection'; // القسم الترحيبي الأول
import GalleriesSection from '@/components/GalleriesSection'; // قسم القاعات
import InteractiveMap from '@/components/InteractiveMap'; // الخريطة التفاعلية
import GalleryModal from '@/components/GalleryModal'; // نافذة تفاصيل القاعة
import VisitorTips from '@/components/VisitorTips'; // نصائح للزوار
import TouristServices from '@/components/TouristServices'; // خدمات السياح (تذاكر، مواصلات)
import AIChatbot from '@/components/AIChatbot'; // المساعد الذكي (شات بوت)
import Footer from '@/components/Footer'; // تذييل الصفحة
import { Gallery } from '@/data/museumData'; // نوع بيانات القاعة

const Index: React.FC = () => {
  // حالة القاعة المختارة لعرض تفاصيلها
  const [selectedGallery, setSelectedGallery] = useState<Gallery | null>(null);
  
  // مراجع للأقسام عشان نقدر ننتقل ليها بسلاسة
  const heroRef = useRef<HTMLDivElement>(null);
  const galleriesRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const tipsRef = useRef<HTMLDivElement>(null);

  // دالة التنقل السلس للأقسام المختلفة
  const scrollToSection = (section: string) => {
    const refs: Record<string, React.RefObject<HTMLDivElement>> = {
      hero: heroRef,
      galleries: galleriesRef,
      map: mapRef,
      tips: tipsRef,
      chat: mapRef,
    };

    if (section === 'chat') {
      return; // الشات بوت بيفتح لوحده
    }

    const ref = refs[section];
    if (ref?.current) {
      const headerHeight = 80; // ارتفاع الهيدر الثابت
      const elementPosition = ref.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth', // تمرير سلس
      });
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background">
        {/* شريط التنقل العلوي الثابت */}
        <Header onNavigate={scrollToSection} />
        
        {/* القسم الترحيبي مع صورة خلفية */}
        <div ref={heroRef}>
          <HeroSection onNavigate={scrollToSection} />
        </div>
        
        {/* قسم عرض القاعات */}
        <div ref={galleriesRef}>
          <GalleriesSection onSelectGallery={setSelectedGallery} />
        </div>
        
        {/* الخريطة التفاعلية للمتحف */}
        <div ref={mapRef}>
          <InteractiveMap onSelectGallery={setSelectedGallery} />
        </div>
        
        {/* نصائح مهمة للزوار */}
        <div ref={tipsRef}>
          <VisitorTips />
        </div>
        
        {/* خدمات السياح - تذاكر ومواصلات */}
        <TouristServices />
        
        {/* تذييل الصفحة */}
        <Footer />
        
        {/* زر المساعد الذكي العائم */}
        <AIChatbot />
        
        {/* نافذة منبثقة لتفاصيل القاعة المختارة */}
        <GalleryModal
          gallery={selectedGallery}
          onClose={() => setSelectedGallery(null)}
        />
      </div>
    </LanguageProvider>
  );
};

export default Index;
