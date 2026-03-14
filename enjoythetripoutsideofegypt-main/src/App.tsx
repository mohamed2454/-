/**
 * 📱 المكون الرئيسي للتطبيق - App
 * بيربط كل الصفحات ببعض وبيوفر الخدمات الأساسية زي:
 * - التنقل بين الصفحات (Router)
 * - إشعارات المستخدم (Toaster)
 * - إدارة البيانات (QueryClient)
 */
import { Toaster } from "@/components/ui/toaster"; // مكون الإشعارات
import { Toaster as Sonner } from "@/components/ui/sonner"; // مكون إشعارات إضافي
import { TooltipProvider } from "@/components/ui/tooltip"; // مزود التلميحات
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"; // إدارة طلبات البيانات
import { BrowserRouter, Routes, Route } from "react-router-dom"; // نظام التنقل بين الصفحات
import Index from "./pages/Index"; // الصفحة الرئيسية
import NotFound from "./pages/NotFound"; // صفحة 404 - مش موجود
import Documentation from "./pages/Documentation"; // صفحة توثيق الكود

// إنشاء عميل لإدارة البيانات والكاش
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* الصفحة الرئيسية */}
          <Route path="/" element={<Index />} />
          {/* صفحة توثيق الكود */}
          <Route path="/docs" element={<Documentation />} />
          {/* أي رابط تاني مش موجود هيروح لصفحة 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
