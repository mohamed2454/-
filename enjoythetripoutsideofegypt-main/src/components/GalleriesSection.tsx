import React from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { galleries, Gallery } from '@/data/museumData';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface GalleriesSectionProps {
  onSelectGallery: (gallery: Gallery) => void;
}

const GalleriesSection: React.FC<GalleriesSectionProps> = ({ onSelectGallery }) => {
  const { language, t } = useLanguage();

  const getLocalizedText = (item: any, field: string) => {
    const langKey = field + language.charAt(0).toUpperCase() + language.slice(1);
    return item[langKey] || item[field + 'En'];
  };

  return (
    <section id="galleries" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('mainHalls')}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full gold-shimmer" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleries.map((gallery, index) => (
            <motion.div
              key={gallery.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full group hover:shadow-elevated transition-all duration-300 overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-card transition-transform group-hover:scale-110"
                      style={{ backgroundColor: gallery.color }}
                    >
                      {gallery.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-serif font-semibold text-lg text-foreground">
                        {getLocalizedText(gallery, 'name')}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <Badge variant="outline" className="text-xs">
                          <MapPin className="w-3 h-3 mr-1" />
                          {t('floor')} {gallery.floor}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          <Clock className="w-3 h-3 mr-1" />
                          {gallery.duration}m
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {getLocalizedText(gallery, 'description')}
                  </p>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    className="w-full group/btn hover:bg-primary/10 hover:text-primary"
                    onClick={() => onSelectGallery(gallery)}
                  >
                    {t('viewDetails')}
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleriesSection;
