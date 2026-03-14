/**
 * 🚀 نقطة البداية - الملف الرئيسي اللي بيشغل الموقع كله
 * ده أول ملف بيتنفذ لما الموقع يفتح
 */
import { createRoot } from "react-dom/client"; // مكتبة React لعرض المكونات في المتصفح
import App from "./App.tsx"; // المكون الرئيسي للتطبيق
import "./index.css"; // ملف التصميم والألوان

// بنعمل render للتطبيق جوه عنصر root في index.html
createRoot(document.getElementById("root")!).render(<App />);
