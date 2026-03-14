/**
 * 📄 صفحة التوثيق - شرح الكود الكامل
 * بتعرض شرح مفصل لكل ملفات المشروع بالعربي
 * المستخدم يقدر يطبعها كـ PDF من المتصفح
 */
import React from 'react';

const Documentation: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black p-8 max-w-4xl mx-auto print:p-4" dir="rtl">
      <style>{`
        @media print {
          body { background: white !important; }
          .no-print { display: none !important; }
          h2 { page-break-before: always; }
          h2:first-of-type { page-break-before: avoid; }
          pre { white-space: pre-wrap; word-break: break-all; font-size: 10px; }
        }
      `}</style>

      {/* زر الطباعة */}
      <div className="no-print mb-6 flex gap-4">
        <button
          onClick={() => window.print()}
          className="bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-amber-700"
        >
          📄 طباعة / حفظ كـ PDF
        </button>
        <button
          onClick={() => window.history.back()}
          className="bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-gray-700"
        >
          ← رجوع
        </button>
      </div>

      {/* العنوان الرئيسي */}
      <div className="text-center mb-12 border-b-4 border-amber-600 pb-8">
        <h1 className="text-4xl font-bold mb-4">📖 توثيق مشروع المتحف المصري الكبير</h1>
        <p className="text-xl text-gray-600">شرح تفصيلي لكل ملفات الكود البرمجي</p>
        <p className="text-sm text-gray-400 mt-2">تاريخ التوثيق: {new Date().toLocaleDateString('ar-EG')}</p>
      </div>

      {/* الفهرس */}
      <div className="bg-amber-50 p-6 rounded-lg mb-10 border border-amber-200">
        <h2 className="text-2xl font-bold mb-4 text-amber-800" style={{ pageBreakBefore: 'avoid' }}>📋 الفهرس</h2>
        <ol className="list-decimal list-inside space-y-2 text-lg">
          <li>نظرة عامة على المشروع</li>
          <li>هيكل الملفات والمجلدات</li>
          <li>نقطة البداية (main.tsx)</li>
          <li>المكون الرئيسي (App.tsx)</li>
          <li>الصفحة الرئيسية (Index.tsx)</li>
          <li>نظام اللغات (LanguageContext.tsx)</li>
          <li>بيانات المتحف (museumData.ts)</li>
          <li>المكونات (Components)</li>
          <li>المساعد الذكي (AIChatbot + Edge Function)</li>
          <li>التقنيات المستخدمة</li>
        </ol>
      </div>

      {/* 1. نظرة عامة */}
      <Section title="1. نظرة عامة على المشروع">
        <p>
          ده موقع تفاعلي للمتحف المصري الكبير في الجيزة، مصر. الموقع بيقدم للزوار معلومات شاملة عن المتحف
          وقاعاته وخريطة تفاعلية ومساعد ذكي (AI Chatbot) بيجاوب على أسئلتهم بـ 3 لغات (عربي، إنجليزي، فرنسي).
        </p>
        <h4 className="font-bold mt-4 mb-2">🎯 الميزات الأساسية:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>عرض القاعات الرئيسية للمتحف مع صور وتفاصيل</li>
          <li>خريطة تفاعلية لأدوار المتحف</li>
          <li>مساعد ذكي (Chatbot) بالذكاء الاصطناعي</li>
          <li>دعم 3 لغات (عربي / إنجليزي / فرنسي)</li>
          <li>نصائح للزوار وخدمات سياحية</li>
          <li>تصميم متجاوب مع كل الشاشات</li>
        </ul>
      </Section>

      {/* 2. هيكل الملفات */}
      <Section title="2. هيكل الملفات والمجلدات">
        <CodeBlock>{`📁 المشروع/
├── 📄 index.html              ← صفحة HTML الأساسية
├── 📄 package.json            ← المكتبات المطلوبة
├── 📄 vite.config.ts          ← إعدادات Vite (أداة البناء)
├── 📄 tailwind.config.ts      ← إعدادات Tailwind CSS
│
├── 📁 src/                    ← الكود المصدري
│   ├── 📄 main.tsx            ← ⭐ نقطة البداية
│   ├── 📄 App.tsx             ← المكون الرئيسي
│   ├── 📄 index.css           ← ملف التصميم والألوان
│   │
│   ├── 📁 pages/              ← الصفحات
│   │   ├── 📄 Index.tsx       ← الصفحة الرئيسية
│   │   └── 📄 NotFound.tsx    ← صفحة 404
│   │
│   ├── 📁 components/         ← المكونات
│   │   ├── 📄 Header.tsx      ← شريط التنقل
│   │   ├── 📄 HeroSection.tsx ← القسم الترحيبي
│   │   ├── 📄 GalleriesSection.tsx ← عرض القاعات
│   │   ├── 📄 GalleryModal.tsx    ← نافذة تفاصيل القاعة
│   │   ├── 📄 InteractiveMap.tsx  ← الخريطة التفاعلية
│   │   ├── 📄 VisitorTips.tsx     ← نصائح الزوار
│   │   ├── 📄 TouristServices.tsx ← خدمات السياح
│   │   ├── 📄 AIChatbot.tsx       ← المساعد الذكي
│   │   ├── 📄 Footer.tsx          ← تذييل الصفحة
│   │   └── 📁 ui/                 ← مكونات واجهة جاهزة (shadcn)
│   │
│   ├── 📁 contexts/           ← إدارة الحالة
│   │   └── 📄 LanguageContext.tsx ← نظام اللغات
│   │
│   ├── 📁 data/               ← البيانات
│   │   └── 📄 museumData.ts   ← بيانات القاعات
│   │
│   └── 📁 integrations/       ← ربط الخدمات الخارجية
│       └── 📁 supabase/       ← اتصال قاعدة البيانات
│
└── 📁 supabase/               ← الباك إند
    └── 📁 functions/
        └── 📁 museum-chat/    ← دالة المساعد الذكي
            └── 📄 index.ts`}</CodeBlock>
      </Section>

      {/* 3. main.tsx */}
      <Section title="3. نقطة البداية - main.tsx">
        <p>ده أول ملف بيتنفذ لما الموقع يفتح. وظيفته بسيطة:</p>
        <ol className="list-decimal list-inside space-y-2 mt-2">
          <li>بيجيب عنصر <Code>root</Code> من <Code>index.html</Code></li>
          <li>بيعمل render لمكون <Code>App</Code> جواه</li>
          <li>بيحمّل ملف التصميم <Code>index.css</Code></li>
        </ol>
        <CodeBlock>{`import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);`}</CodeBlock>
        <Note>ده الملف اللي بيشغل كل حاجة. من غيره الموقع مش هيفتح.</Note>
      </Section>

      {/* 4. App.tsx */}
      <Section title="4. المكون الرئيسي - App.tsx">
        <p>بيلف التطبيق كله بالخدمات الأساسية:</p>
        <ul className="list-disc list-inside space-y-2 mt-2">
          <li><strong>QueryClientProvider:</strong> لإدارة طلبات البيانات والكاش</li>
          <li><strong>TooltipProvider:</strong> لعرض التلميحات</li>
          <li><strong>Toaster + Sonner:</strong> لعرض الإشعارات</li>
          <li><strong>BrowserRouter:</strong> لنظام التنقل بين الصفحات</li>
        </ul>
        <CodeBlock>{`<QueryClientProvider>      ← إدارة البيانات
  <TooltipProvider>        ← التلميحات
    <Toaster />            ← إشعارات
    <BrowserRouter>        ← نظام التنقل
      <Routes>
        <Route path="/" element={<Index />} />     ← الصفحة الرئيسية
        <Route path="*" element={<NotFound />} />  ← صفحة 404
      </Routes>
    </BrowserRouter>
  </TooltipProvider>
</QueryClientProvider>`}</CodeBlock>
      </Section>

      {/* 5. Index.tsx */}
      <Section title="5. الصفحة الرئيسية - Index.tsx">
        <p>بتجمع كل المكونات في صفحة واحدة بالترتيب:</p>
        <CodeBlock>{`LanguageProvider        ← مزود اللغات (عربي/إنجليزي/فرنسي)
  ├── Header            ← شريط التنقل العلوي الثابت
  ├── HeroSection       ← القسم الترحيبي مع صورة خلفية
  ├── GalleriesSection  ← عرض القاعات الرئيسية (كاردات)
  ├── InteractiveMap    ← الخريطة التفاعلية (أدوار المتحف)
  ├── VisitorTips       ← نصائح للزوار (أوقات، تصوير، إلخ)
  ├── TouristServices   ← خدمات السياح (تذاكر، مواصلات)
  ├── Footer            ← تذييل الصفحة
  ├── AIChatbot         ← زر المساعد الذكي العائم
  └── GalleryModal      ← نافذة منبثقة لتفاصيل القاعة`}</CodeBlock>

        <h4 className="font-bold mt-4 mb-2">🔧 الوظائف المهمة:</h4>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>selectedGallery:</strong> حالة (state) بتخزن القاعة اللي المستخدم ضغط عليها</li>
          <li><strong>scrollToSection:</strong> دالة بتنقل المستخدم بسلاسة للقسم المطلوب</li>
          <li><strong>useRef:</strong> مراجع لكل قسم عشان نقدر ننتقل ليه</li>
        </ul>
      </Section>

      {/* 6. نظام اللغات */}
      <Section title="6. نظام اللغات - LanguageContext.tsx">
        <p>بيدير تبديل اللغة في كل الموقع:</p>

        <h4 className="font-bold mt-4 mb-2">📌 المكونات الأساسية:</h4>
        <ul className="list-disc list-inside space-y-2">
          <li><strong>Language:</strong> نوع اللغة (ar / en / fr)</li>
          <li><strong>Direction:</strong> اتجاه النص (rtl للعربي، ltr للإنجليزي والفرنسي)</li>
          <li><strong>translations:</strong> كائن فيه كل النصوص المترجمة</li>
          <li><strong>t(key):</strong> دالة الترجمة - بتاخد مفتاح وترجع النص بالغة الحالية</li>
        </ul>

        <h4 className="font-bold mt-4 mb-2">🔄 طريقة الاستخدام:</h4>
        <CodeBlock>{`// في أي مكون:
const { language, t, setLanguage } = useLanguage();

// لترجمة نص:
<h1>{t('welcome')}</h1>
// هيطلع: "مرحباً بك في المتحف المصري الكبير" (لو عربي)

// لتغيير اللغة:
setLanguage('en'); // هيغير كل الموقع لإنجليزي`}</CodeBlock>

        <h4 className="font-bold mt-4 mb-2">📝 مثال على الترجمات:</h4>
        <CodeBlock>{`translations = {
  welcome: {
    ar: 'مرحباً بك في المتحف المصري الكبير',
    en: 'Welcome to the Grand Egyptian Museum',
    fr: 'Bienvenue au Grand Musée Égyptien',
  },
  // ... باقي المفاتيح
}`}</CodeBlock>
      </Section>

      {/* 7. بيانات المتحف */}
      <Section title="7. بيانات المتحف - museumData.ts">
        <p>ملف البيانات اللي فيه كل معلومات القاعات:</p>
        <CodeBlock>{`// شكل بيانات كل قاعة:
interface Gallery {
  id: string;           // رقم تعريف فريد
  name: { ar, en, fr }; // الاسم بـ 3 لغات
  description: { ar, en, fr }; // الوصف بـ 3 لغات
  floor: number;        // رقم الطابق
  artifacts: number;    // عدد القطع الأثرية
  duration: number;     // المدة المقترحة بالدقائق
  highlights: [];       // أبرز المعروضات
  image: string;        // رابط الصورة
  category: string;     // التصنيف
}

// القاعات المتوفرة:
// 1. قاعة توت عنخ آمون (5,398 قطعة)
// 2. السلم العظيم (رمسيس الثاني)
// 3. قاعة المومياوات الملكية (22 مومياء)
// 4. قاعة مركب خوفو الشمسي (43.4 متر)
// 5. قاعة الأطفال (تفاعلية)`}</CodeBlock>
      </Section>

      {/* 8. المكونات */}
      <Section title="8. المكونات (Components)">
        <ComponentDoc
          name="Header.tsx - شريط التنقل"
          desc="شريط علوي ثابت فيه اسم المتحف، أزرار التنقل، ومبدل اللغة"
          features={[
            'بيثبت في أعلى الصفحة حتى لو المستخدم نزل',
            'بيتغير لونه لما المستخدم يعمل scroll لتحت',
            'فيه قائمة منسدلة للموبايل (hamburger menu)',
            'مبدل اللغة بأعلام الدول',
          ]}
        />
        <ComponentDoc
          name="HeroSection.tsx - القسم الترحيبي"
          desc="أول حاجة الزائر بيشوفها - صورة كبيرة مع نص ترحيبي وأزرار"
          features={[
            'صورة خلفية كبيرة للمتحف',
            'نص ترحيبي متحرك (animation)',
            'أزرار: استكشف الخريطة / ابدأ المحادثة',
            'إحصائيات سريعة (100,000+ قطعة، 22 مومياء، إلخ)',
          ]}
        />
        <ComponentDoc
          name="GalleriesSection.tsx - عرض القاعات"
          desc="بيعرض القاعات الخمسة في كاردات جميلة"
          features={[
            'كل كارد فيه صورة واسم ووصف مختصر',
            'لما تضغط على كارد بيفتح GalleryModal بالتفاصيل',
            'تأثيرات حركية (hover animations)',
          ]}
        />
        <ComponentDoc
          name="InteractiveMap.tsx - الخريطة التفاعلية"
          desc="خريطة المتحف اللي بتوضح أماكن القاعات في كل طابق"
          features={[
            'تبديل بين الطوابق',
            'نقاط تفاعلية على الخريطة',
            'لما تضغط على نقطة بتفتح تفاصيل القاعة',
            'مسارات مقترحة للزيارة',
          ]}
        />
        <ComponentDoc
          name="GalleryModal.tsx - نافذة تفاصيل القاعة"
          desc="نافذة منبثقة بتظهر لما المستخدم يختار قاعة"
          features={[
            'صورة القاعة + اسمها + وصف تفصيلي',
            'عدد القطع الأثرية والمدة المقترحة',
            'أبرز المعروضات',
            'زر إغلاق',
          ]}
        />
        <ComponentDoc
          name="VisitorTips.tsx - نصائح الزوار"
          desc="نصائح عملية مهمة لأي زائر"
          features={[
            'أفضل وقت للزيارة (9-11 صباحاً)',
            'أماكن الراحة والمقاهي',
            'قواعد التصوير',
            'سهولة الوصول (كراسي متحركة)',
          ]}
        />
        <ComponentDoc
          name="TouristServices.tsx - خدمات السياح"
          desc="معلومات عملية عن التذاكر والمواصلات"
          features={[
            'أسعار التذاكر (مصريين / أجانب / طلاب)',
            'طريقة الحجز أونلاين',
            'إرشادات استخدام أوبر/كريم',
            'رابط مباشر لجوجل ماب',
          ]}
        />
        <ComponentDoc
          name="Footer.tsx - تذييل الصفحة"
          desc="الجزء السفلي من الموقع"
          features={[
            'معلومات التواصل',
            'روابط سريعة',
            'حقوق الملكية',
          ]}
        />
      </Section>

      {/* 9. المساعد الذكي */}
      <Section title="9. المساعد الذكي (AI Chatbot)">
        <h4 className="font-bold mb-2">🤖 الواجهة الأمامية - AIChatbot.tsx:</h4>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>زر عائم في أسفل يمين الشاشة</li>
          <li>لما تضغطه بيفتح نافذة محادثة</li>
          <li>فيها أسئلة مقترحة جاهزة</li>
          <li>بترسل رسالة المستخدم للـ Edge Function وتعرض الرد</li>
        </ul>

        <h4 className="font-bold mb-2">⚡ الباك إند - museum-chat/index.ts:</h4>
        <p>دالة سيرفرية (Edge Function) بتشتغل على Lovable Cloud:</p>
        <CodeBlock>{`// تدفق البيانات:
المستخدم يكتب سؤال
    ↓
AIChatbot.tsx يرسل الرسالة
    ↓
Edge Function تستقبل الرسالة
    ↓
بتختار system prompt حسب اللغة (ar/en/fr)
    ↓
بترسل للـ AI model (Gemini)
    ↓
بتستقبل الرد وترجعه للمستخدم
    ↓
AIChatbot.tsx يعرض الرد في المحادثة`}</CodeBlock>

        <h4 className="font-bold mt-4 mb-2">🛡️ حماية ضد الأخطاء:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>لو الـ API بطيء → بيعرض رسالة "جاري التحميل"</li>
          <li>لو في خطأ → بيعرض رسالة خطأ مناسبة</li>
          <li>لو تم تجاوز الحد (429) → "حاول تاني بعد شوية"</li>
        </ul>
      </Section>

      {/* 10. التقنيات */}
      <Section title="10. التقنيات المستخدمة">
        <div className="grid grid-cols-2 gap-4">
          <TechCard name="React 18" desc="مكتبة بناء واجهات المستخدم" />
          <TechCard name="TypeScript" desc="JavaScript مع أنواع بيانات ثابتة" />
          <TechCard name="Vite" desc="أداة بناء سريعة جداً" />
          <TechCard name="Tailwind CSS" desc="إطار تصميم مرن" />
          <TechCard name="shadcn/ui" desc="مكونات واجهة جاهزة وجميلة" />
          <TechCard name="Framer Motion" desc="مكتبة حركات وأنيميشن" />
          <TechCard name="React Router" desc="نظام التنقل بين الصفحات" />
          <TechCard name="React Query" desc="إدارة طلبات البيانات والكاش" />
          <TechCard name="Lovable Cloud" desc="الباك إند (قاعدة بيانات + خوادم)" />
          <TechCard name="Gemini AI" desc="نموذج الذكاء الاصطناعي للشات بوت" />
        </div>
      </Section>

      {/* خاتمة */}
      <div className="mt-12 p-6 bg-amber-50 rounded-lg border border-amber-200 text-center">
        <h2 className="text-2xl font-bold text-amber-800 mb-2" style={{ pageBreakBefore: 'avoid' }}>✅ نهاية التوثيق</h2>
        <p className="text-gray-600">
          للطباعة كـ PDF: اضغط <strong>Ctrl + P</strong> (أو <strong>⌘ + P</strong> على ماك) واختار "Save as PDF"
        </p>
      </div>
    </div>
  );
};

// === مكونات مساعدة ===

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="text-2xl font-bold mb-4 text-amber-800 border-b-2 border-amber-200 pb-2">{title}</h2>
    <div className="text-lg leading-relaxed text-gray-700">{children}</div>
  </div>
);

const CodeBlock: React.FC<{ children: string }> = ({ children }) => (
  <pre className="bg-gray-900 text-green-400 p-4 rounded-lg my-4 overflow-x-auto text-sm leading-relaxed" dir="ltr">
    <code>{children}</code>
  </pre>
);

const Code: React.FC<{ children: string }> = ({ children }) => (
  <code className="bg-gray-200 text-red-600 px-1.5 py-0.5 rounded text-sm" dir="ltr">{children}</code>
);

const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-blue-50 border-r-4 border-blue-500 p-3 my-3 text-blue-800 text-base">
    💡 <strong>ملاحظة:</strong> {children}
  </div>
);

const ComponentDoc: React.FC<{ name: string; desc: string; features: string[] }> = ({ name, desc, features }) => (
  <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
    <h4 className="font-bold text-lg text-amber-700">📦 {name}</h4>
    <p className="text-gray-600 mb-2">{desc}</p>
    <ul className="list-disc list-inside space-y-1 text-sm">
      {features.map((f, i) => <li key={i}>{f}</li>)}
    </ul>
  </div>
);

const TechCard: React.FC<{ name: string; desc: string }> = ({ name, desc }) => (
  <div className="p-3 bg-gray-50 rounded-lg border text-center">
    <div className="font-bold text-amber-700">{name}</div>
    <div className="text-sm text-gray-500">{desc}</div>
  </div>
);

export default Documentation;
