import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Layers, X, Users, BookOpen } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { galleries, routes, Gallery, Route } from '@/data/museumData';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import museumFloorPlan from '@/assets/museum-floor-plan.png';

interface InteractiveMapProps {
  onSelectGallery: (gallery: Gallery) => void;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({ onSelectGallery }) => {
  const { language, t } = useLanguage();
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [hoveredGallery, setHoveredGallery] = useState<string | null>(null);

  const getLocalizedText = (item: any, field: string) => {
    const langKey = field + language.charAt(0).toUpperCase() + language.slice(1);
    return item[langKey] || item[field + 'En'];
  };

  const isGalleryInRoute = (galleryId: string) => {
    return selectedRoute?.galleries.includes(galleryId);
  };

  return (
    <section id="map" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('interactiveMap')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {language === 'ar' 
              ? 'استكشف قاعات المتحف واختر المسار المناسب لك'
              : language === 'fr'
              ? 'Explorez les galeries du musée et choisissez votre itinéraire'
              : 'Explore museum galleries and choose your route'}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Routes Panel */}
          <div className="lg:col-span-1 space-y-4">
            <h3 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
              <Layers className="w-5 h-5 text-primary" />
              {t('suggestedRoutes')}
            </h3>
            
            {routes.map((route) => (
              <motion.div
                key={route.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedRoute?.id === route.id
                      ? 'ring-2 ring-primary shadow-gold'
                      : 'hover:shadow-elevated'
                  }`}
                  onClick={() => setSelectedRoute(selectedRoute?.id === route.id ? null : route)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: route.color }}
                        />
                        {getLocalizedText(route, 'name')}
                      </CardTitle>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        {route.duration}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {getLocalizedText(route, 'description')}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {route.galleries.map((gId) => {
                        const gallery = galleries.find((g) => g.id === gId);
                        return (
                          <Badge key={gId} variant="outline" className="text-xs">
                            {gallery?.icon} {getLocalizedText(gallery, 'name')}
                          </Badge>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Map Area */}
          <div className="lg:col-span-2">
            <div className="relative bg-card rounded-2xl border border-border p-6 min-h-[500px] overflow-hidden">
              {/* Real Museum Floor Plan */}
              <img 
                src={museumFloorPlan} 
                alt="Museum Floor Plan"
                className="absolute inset-0 w-full h-full object-cover opacity-80 rounded-xl"
              />
              {/* Floor Indicator */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                {[3, 2, 1, 0].map((floor) => (
                  <div
                    key={floor}
                    className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm font-medium"
                  >
                    {t('floor')} {floor}
                  </div>
                ))}
              </div>

              {/* Gallery Markers */}
              {galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="absolute cursor-pointer z-10"
                  style={{
                    left: `${gallery.position.x}%`,
                    top: `${gallery.position.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  onMouseEnter={() => setHoveredGallery(gallery.id)}
                  onMouseLeave={() => setHoveredGallery(null)}
                  onClick={() => onSelectGallery(gallery)}
                >
                  {/* IMPORTANT: keep positioning transform on a non-animated wrapper to avoid jumps on hover/touch */}
                  <div className="relative">
                    <div
                      className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg transition-all duration-300 ${
                        isGalleryInRoute(gallery.id)
                          ? 'ring-4 ring-offset-2 ring-primary animate-pulse-gold'
                          : ''
                      }`}
                      style={{ backgroundColor: gallery.color }}
                    >
                      {gallery.icon}
                    </div>

                    {/* Hover Tooltip - positioned to the side to avoid hover conflicts */}
                    <AnimatePresence>
                      {hoveredGallery === gallery.id && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -10 }}
                          className="absolute left-full top-1/2 -translate-y-1/2 ml-3 z-20 pointer-events-none"
                        >
                          <Card className="w-48 shadow-elevated">
                            <CardContent className="p-3">
                              <p className="font-semibold text-sm">
                                {getLocalizedText(gallery, 'name')}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3" />
                                {gallery.duration} {t('minutes')}
                              </div>
                              <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                                <MapPin className="w-3 h-3" />
                                {t('floor')} {gallery.floor}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}

              {/* Route Lines */}
              {selectedRoute && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none">
                  {selectedRoute.galleries.map((gId, index) => {
                    if (index === 0) return null;
                    const from = galleries.find((g) => g.id === selectedRoute.galleries[index - 1]);
                    const to = galleries.find((g) => g.id === gId);
                    if (!from || !to) return null;

                    return (
                      <motion.line
                        key={`${from.id}-${to.id}`}
                        x1={`${from.position.x}%`}
                        y1={`${from.position.y}%`}
                        x2={`${to.position.x}%`}
                        y2={`${to.position.y}%`}
                        stroke={selectedRoute.color}
                        strokeWidth="3"
                        strokeDasharray="10,5"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 }}
                      />
                    );
                  })}
                </svg>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 mt-6 justify-center">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="w-4 h-4" />
                {t('forChildren')}
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BookOpen className="w-4 h-4" />
                {t('forAcademics')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
