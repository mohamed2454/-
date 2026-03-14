/**
 * 🤖 المساعد الذكي - AIChatbot
 * شات بوت يستخدم الذكاء الاصطناعي للإجابة على أسئلة الزوار
 * عن المتحف المصري الكبير بـ 3 لغات (عربي/إنجليزي/فرنسي)
 */
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // مكتبة الأنيميشن
import { MessageCircle, Send, X, Sparkles, Loader2 } from 'lucide-react'; // أيقونات
import ReactMarkdown from 'react-markdown'; // لعرض نص Markdown
import { useLanguage } from '@/contexts/LanguageContext'; // هوك اللغة
import { suggestedQuestions } from '@/data/museumData'; // أسئلة مقترحة
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { supabase } from '@/integrations/supabase/client'; // عميل التواصل مع السيرفر

// نوع الرسالة - إما من المستخدم أو من المساعد الذكي
interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AIChatbot: React.FC = () => {
  const { language, t, direction } = useLanguage();
  const [isOpen, setIsOpen] = useState(false); // حالة فتح/قفل الشات
  const [messages, setMessages] = useState<Message[]>([]); // قائمة الرسائل
  const [input, setInput] = useState(''); // النص المدخل
  const [isLoading, setIsLoading] = useState(false); // حالة التحميل
  const scrollRef = useRef<HTMLDivElement>(null); // مرجع للتمرير التلقائي

  // عند فتح الشات لأول مرة، نعرض رسالة ترحيبية
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'assistant', content: t('welcomeMessage') }]);
    }
  }, [isOpen, t]);

  // تمرير تلقائي لأسفل عند إضافة رسالة جديدة
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // دالة إرسال الرسالة للمساعد الذكي
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // إرسال الرسالة لـ Edge Function على السيرفر
      const { data, error } = await supabase.functions.invoke('museum-chat', {
        body: {
          messages: [...messages, userMessage],
          language,
        },
      });

      if (error) throw error;

      // إضافة رد المساعد الذكي
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.response },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      // رسالة خطأ بلغة المستخدم
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            language === 'ar'
              ? 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.'
              : language === 'fr'
              ? 'Désolé, une erreur s\'est produite. Veuillez réessayer.'
              : 'Sorry, an error occurred. Please try again.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // لما المستخدم يضغط على سؤال مقترح
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
  };

  const currentSuggestions = suggestedQuestions[language] || suggestedQuestions.en;

  return (
    <>
      {/* زر فتح الشات العائم - يظهر دايماً في أسفل يمين الشاشة */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full btn-royal flex items-center justify-center shadow-gold"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <MessageCircle className="w-7 h-7 text-primary-foreground" />
      </motion.button>

      {/* نافذة الشات */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden"
            dir={direction}
          >
            {/* هيدر الشات */}
            <div className="bg-gradient-royal p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{t('aiAssistant')}</h3>
                  <p className="text-xs text-white/70">{t('siteName')}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* منطقة عرض الرسائل */}
            <ScrollArea className="h-[350px] p-4" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2.5 ${
                        msg.role === 'user'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-muted text-foreground rounded-bl-sm'
                      }`}
                    >
                      <div className="prose prose-sm dark:prose-invert max-w-none">
                        <ReactMarkdown>
                        {msg.content}
                        </ReactMarkdown>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* مؤشر التحميل */}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex justify-start"
                  >
                    <div className="bg-muted rounded-2xl rounded-bl-sm px-4 py-3">
                      <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
                    </div>
                  </motion.div>
                )}
              </div>

              {/* أسئلة مقترحة - تظهر في البداية فقط */}
              {messages.length <= 1 && (
                <div className="mt-4">
                  <p className="text-xs text-muted-foreground mb-2">{t('suggestedQuestions')}</p>
                  <div className="flex flex-wrap gap-2">
                    {currentSuggestions.slice(0, 3).map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="text-xs bg-muted hover:bg-muted/80 text-foreground px-3 py-1.5 rounded-full transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </ScrollArea>

            {/* حقل إدخال الرسالة */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={t('askQuestion')}
                  className="flex-1"
                  disabled={isLoading}
                />
                <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;
