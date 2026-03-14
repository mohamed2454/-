import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Coffee, Camera, Accessibility } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const VisitorTips: React.FC = () => {
  const { t } = useLanguage();

  const tips = [
    {
      icon: Clock,
      titleKey: 'bestTime',
      descKey: 'bestTimeDesc',
      color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    },
    {
      icon: Coffee,
      titleKey: 'restAreas',
      descKey: 'restAreasDesc',
      color: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
    },
    {
      icon: Camera,
      titleKey: 'photography',
      descKey: 'photographyDesc',
      color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
    },
    {
      icon: Accessibility,
      titleKey: 'accessibility',
      descKey: 'accessibilityDesc',
      color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
    },
  ];

  return (
    <section id="tips" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('visitorTips')}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full gold-shimmer" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {tips.map((tip, index) => (
            <motion.div
              key={tip.titleKey}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full text-center hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center ${tip.color}`}
                  >
                    <tip.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg mt-4">
                    {t(tip.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {t(tip.descKey)}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisitorTips;
