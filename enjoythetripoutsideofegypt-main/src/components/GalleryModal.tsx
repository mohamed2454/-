import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, MapPin, Sparkles, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Gallery } from '@/data/museumData';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface GalleryModalProps {
  gallery: Gallery | null;
  onClose: () => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({ gallery, onClose }) => {
  const { language, t } = useLanguage();

  if (!gallery) return null;

  const getLocalizedText = (field: string) => {
    const langKey = field + language.charAt(0).toUpperCase() + language.slice(1);
    return (gallery as any)[langKey] || (gallery as any)[field + 'En'];
  };

  const getLocalizedArray = (field: string): string[] => {
    const langKey = field + language.charAt(0).toUpperCase() + language.slice(1);
    return (gallery as any)[langKey] || (gallery as any)[field + 'En'] || [];
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-card rounded-2xl shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="relative p-6 text-white"
            style={{ backgroundColor: gallery.color }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white/80 hover:text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                {gallery.icon}
              </div>
              <div>
                <h2 className="text-2xl font-serif font-bold">
                  {getLocalizedText('name')}
                </h2>
                <div className="flex items-center gap-4 mt-2 text-white/80">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {gallery.duration} {t('minutes')}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {t('floor')} {gallery.floor}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <p className="text-foreground mb-6">
              {getLocalizedText('description')}
            </p>

            <Tabs defaultValue="highlights" className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-4">
                <TabsTrigger value="highlights" className="gap-1">
                  <Sparkles className="w-4 h-4" />
                  {t('highlights')}
                </TabsTrigger>
                <TabsTrigger value="children" className="gap-1">
                  <Users className="w-4 h-4" />
                  {t('forChildren')}
                </TabsTrigger>
                <TabsTrigger value="academic" className="gap-1">
                  <BookOpen className="w-4 h-4" />
                  {t('forAcademics')}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="highlights">
                <div className="space-y-3">
                  <h4 className="font-semibold text-foreground">{t('highlights')}</h4>
                  <div className="flex flex-wrap gap-2">
                    {getLocalizedArray('highlights').map((item, index) => (
                      <Badge key={index} variant="secondary" className="text-sm py-1.5">
                        {item}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 p-4 rounded-lg bg-muted">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-medium">{t('artifacts')}:</span> {gallery.artifactsCount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="children">
                <div className="p-4 rounded-lg bg-gradient-to-br from-pink-50 to-orange-50 dark:from-pink-950/30 dark:to-orange-950/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-pink-100 dark:bg-pink-900/50 flex items-center justify-center text-xl">
                      🧒
                    </div>
                    <p className="text-foreground flex-1">
                      {getLocalizedText('childrenInfo')}
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="academic">
                <div className="p-4 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-xl">
                      📚
                    </div>
                    <p className="text-foreground flex-1 text-sm">
                      {getLocalizedText('academicInfo')}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border flex justify-end">
            <Button onClick={onClose}>
              {t('close')}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryModal;
