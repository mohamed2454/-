/**
 * 🌍 نظام اللغات - LanguageContext
 * بيدير تبديل اللغة بين العربية والإنجليزية والفرنسية
 * وبيوفر دالة t() للترجمة واتجاه النص (RTL/LTR)
 */
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'ar' | 'en' | 'fr';
type Direction = 'rtl' | 'ltr';

interface Translations {
  [key: string]: {
    ar: string;
    en: string;
    fr: string;
  };
}

const translations: Translations = {
  siteName: {
    ar: 'المتحف المصري الكبير',
    en: 'Grand Egyptian Museum',
    fr: 'Grand Musée Égyptien',
  },
  welcome: {
    ar: 'مرحباً بك في المتحف المصري الكبير',
    en: 'Welcome to the Grand Egyptian Museum',
    fr: 'Bienvenue au Grand Musée Égyptien',
  },
  heroSubtitle: {
    ar: 'اكتشف عظمة الحضارة المصرية القديمة',
    en: 'Discover the grandeur of ancient Egyptian civilization',
    fr: 'Découvrez la grandeur de la civilisation égyptienne antique',
  },
  exploreMap: {
    ar: 'استكشف الخريطة',
    en: 'Explore Map',
    fr: 'Explorer la carte',
  },
  startChat: {
    ar: 'ابدأ المحادثة',
    en: 'Start Chat',
    fr: 'Commencer le chat',
  },
  planVisit: {
    ar: 'خطط لزيارتك',
    en: 'Plan Your Visit',
    fr: 'Planifiez votre visite',
  },
  galleries: {
    ar: 'القاعات',
    en: 'Galleries',
    fr: 'Galeries',
  },
  interactiveMap: {
    ar: 'الخريطة التفاعلية',
    en: 'Interactive Map',
    fr: 'Carte Interactive',
  },
  aiAssistant: {
    ar: 'المساعد الذكي',
    en: 'AI Assistant',
    fr: 'Assistant IA',
  },
  visitorTips: {
    ar: 'نصائح للزوار',
    en: 'Visitor Tips',
    fr: 'Conseils aux visiteurs',
  },
  mainHalls: {
    ar: 'القاعات الرئيسية',
    en: 'Main Halls',
    fr: 'Halls Principaux',
  },
  tutankhamun: {
    ar: 'قاعة توت عنخ آمون',
    en: 'Tutankhamun Gallery',
    fr: 'Galerie de Toutânkhamon',
  },
  grandStaircase: {
    ar: 'السلم العظيم',
    en: 'Grand Staircase',
    fr: 'Grand Escalier',
  },
  royalMummies: {
    ar: 'قاعة المومياوات الملكية',
    en: 'Royal Mummies Hall',
    fr: 'Salle des Momies Royales',
  },
  solarBoat: {
    ar: 'قاعة مركب خوفو الشمسي',
    en: 'Solar Boat Gallery',
    fr: 'Galerie du Bateau Solaire',
  },
  childrenGallery: {
    ar: 'قاعة الأطفال',
    en: 'Children Gallery',
    fr: 'Galerie des Enfants',
  },
  suggestedRoutes: {
    ar: 'المسارات المقترحة',
    en: 'Suggested Routes',
    fr: 'Itinéraires Suggérés',
  },
  quickTour: {
    ar: 'جولة سريعة (ساعة واحدة)',
    en: 'Quick Tour (1 Hour)',
    fr: 'Visite Rapide (1 Heure)',
  },
  standardTour: {
    ar: 'جولة عادية (3 ساعات)',
    en: 'Standard Tour (3 Hours)',
    fr: 'Visite Standard (3 Heures)',
  },
  fullTour: {
    ar: 'جولة كاملة (يوم كامل)',
    en: 'Full Tour (Full Day)',
    fr: 'Visite Complète (Journée Entière)',
  },
  familyTour: {
    ar: 'جولة عائلية',
    en: 'Family Tour',
    fr: 'Visite Familiale',
  },
  academicTour: {
    ar: 'جولة أكاديمية',
    en: 'Academic Tour',
    fr: 'Visite Académique',
  },
  askQuestion: {
    ar: 'اسأل سؤالك...',
    en: 'Ask your question...',
    fr: 'Posez votre question...',
  },
  send: {
    ar: 'إرسال',
    en: 'Send',
    fr: 'Envoyer',
  },
  bestTime: {
    ar: 'أفضل وقت للزيارة',
    en: 'Best Time to Visit',
    fr: 'Meilleur Moment pour Visiter',
  },
  bestTimeDesc: {
    ar: 'الصباح الباكر من 9-11 صباحاً لتجنب الزحام',
    en: 'Early morning 9-11 AM to avoid crowds',
    fr: 'Tôt le matin 9h-11h pour éviter la foule',
  },
  restAreas: {
    ar: 'أماكن الراحة',
    en: 'Rest Areas',
    fr: 'Zones de Repos',
  },
  restAreasDesc: {
    ar: 'متوفرة في كل طابق مع مقاهي ومطاعم',
    en: 'Available on every floor with cafes and restaurants',
    fr: 'Disponibles à chaque étage avec cafés et restaurants',
  },
  photography: {
    ar: 'التصوير',
    en: 'Photography',
    fr: 'Photographie',
  },
  photographyDesc: {
    ar: 'مسموح بدون فلاش في معظم القاعات',
    en: 'Allowed without flash in most galleries',
    fr: 'Autorisée sans flash dans la plupart des galeries',
  },
  accessibility: {
    ar: 'سهولة الوصول',
    en: 'Accessibility',
    fr: 'Accessibilité',
  },
  accessibilityDesc: {
    ar: 'كراسي متحركة ومصاعد متوفرة',
    en: 'Wheelchairs and elevators available',
    fr: 'Fauteuils roulants et ascenseurs disponibles',
  },
  viewDetails: {
    ar: 'عرض التفاصيل',
    en: 'View Details',
    fr: 'Voir les Détails',
  },
  close: {
    ar: 'إغلاق',
    en: 'Close',
    fr: 'Fermer',
  },
  artifacts: {
    ar: 'القطع الأثرية',
    en: 'Artifacts',
    fr: 'Artefacts',
  },
  duration: {
    ar: 'المدة المقترحة',
    en: 'Suggested Duration',
    fr: 'Durée Suggérée',
  },
  minutes: {
    ar: 'دقيقة',
    en: 'minutes',
    fr: 'minutes',
  },
  floor: {
    ar: 'الطابق',
    en: 'Floor',
    fr: 'Étage',
  },
  highlights: {
    ar: 'أبرز المعروضات',
    en: 'Highlights',
    fr: 'Points Forts',
  },
  forChildren: {
    ar: 'للأطفال',
    en: 'For Children',
    fr: 'Pour les Enfants',
  },
  forAcademics: {
    ar: 'للباحثين',
    en: 'For Academics',
    fr: 'Pour les Chercheurs',
  },
  welcomeMessage: {
    ar: 'مرحباً! أنا مساعدك الذكي في المتحف المصري الكبير. كيف يمكنني مساعدتك اليوم؟',
    en: 'Hello! I am your AI assistant at the Grand Egyptian Museum. How can I help you today?',
    fr: 'Bonjour ! Je suis votre assistant IA au Grand Musée Égyptien. Comment puis-je vous aider aujourd\'hui?',
  },
  suggestedQuestions: {
    ar: 'أسئلة مقترحة',
    en: 'Suggested Questions',
    fr: 'Questions Suggérées',
  },
  touristServices: {
    ar: 'خدمات السياح',
    en: 'Tourist Services',
    fr: 'Services Touristiques',
  },
};

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ar');

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  React.useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = language;
  }, [language, direction]);

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
