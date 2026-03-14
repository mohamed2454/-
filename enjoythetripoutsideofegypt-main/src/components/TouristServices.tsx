/**
 * 🧳 خدمات السياح - TouristServices
 * قسم شامل بيساعد السائح في كل حاجة:
 * - حجز التذاكر مع روابط شغالة
 * - المواصلات (أوبر/كريم/تاكسي/مترو)
 * - أرقام الطوارئ والسفارات
 * - الأماكن القريبة (أهرامات/فنادق/مطاعم)
 * - معلومات العملة والطقس
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket, Car, MapPin, Phone, ExternalLink, CreditCard, Clock, Users,
  AlertTriangle, Globe, Wifi, Headphones, ShoppingBag, Sun, DollarSign,
  Hotel, UtensilsCrossed, Landmark, Shield, Smartphone, Info, Navigation,
  Train
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const TouristServices: React.FC = () => {
  const { language, t } = useLanguage();

  // === بيانات التذاكر ===
  const ticketData = {
    ar: {
      title: 'حجز التذاكر',
      desc: 'احجز تذكرتك مسبقاً لتجنب الطوابير',
      prices: [
        { type: 'البالغين (مصريين)', price: '60 جنيه', note: '' },
        { type: 'البالغين (أجانب)', price: '600 جنيه', note: '≈ $12' },
        { type: 'الطلاب (مصريين)', price: '30 جنيه', note: 'بكارنيه الجامعة' },
        { type: 'الطلاب (أجانب)', price: '300 جنيه', note: 'بكارنيه ISIC' },
        { type: 'الأطفال (أقل من 6 سنوات)', price: 'مجاناً', note: '' },
        { type: 'قاعة المومياوات (إضافي)', price: '200 جنيه', note: 'للأجانب' },
      ],
      hours: '⏰ مواعيد العمل: 9 صباحاً - 5 مساءً (آخر دخول 4 مساءً)',
      tip: '💡 احجز أونلاين قبل الزيارة بيوم على الأقل. يوم الجمعة والسبت الأكثر ازدحاماً.',
      bookBtn: 'احجز من الموقع الرسمي',
      payMethods: 'طرق الدفع: فيزا / ماستركارد / نقداً عند الشباك',
    },
    en: {
      title: 'Book Tickets',
      desc: 'Book your ticket in advance to skip the queues',
      prices: [
        { type: 'Adults (Egyptian)', price: '60 EGP', note: '' },
        { type: 'Adults (Foreign)', price: '600 EGP', note: '≈ $12' },
        { type: 'Students (Egyptian)', price: '30 EGP', note: 'University ID required' },
        { type: 'Students (Foreign)', price: '300 EGP', note: 'ISIC card required' },
        { type: 'Children (under 6)', price: 'Free', note: '' },
        { type: 'Mummies Hall (extra)', price: '200 EGP', note: 'For foreigners' },
      ],
      hours: '⏰ Opening Hours: 9 AM - 5 PM (Last entry 4 PM)',
      tip: '💡 Book online at least a day before. Fridays & Saturdays are the busiest.',
      bookBtn: 'Book from Official Website',
      payMethods: 'Payment: Visa / Mastercard / Cash at the counter',
    },
    fr: {
      title: 'Réserver des Billets',
      desc: 'Réservez à l\'avance pour éviter les files d\'attente',
      prices: [
        { type: 'Adultes (Égyptiens)', price: '60 EGP', note: '' },
        { type: 'Adultes (Étrangers)', price: '600 EGP', note: '≈ 12$' },
        { type: 'Étudiants (Égyptiens)', price: '30 EGP', note: 'Carte universitaire' },
        { type: 'Étudiants (Étrangers)', price: '300 EGP', note: 'Carte ISIC requise' },
        { type: 'Enfants (moins de 6 ans)', price: 'Gratuit', note: '' },
        { type: 'Salle des Momies (sup.)', price: '200 EGP', note: 'Pour étrangers' },
      ],
      hours: '⏰ Heures d\'ouverture: 9h - 17h (Dernière entrée 16h)',
      tip: '💡 Réservez en ligne au moins un jour avant. Vendredi et samedi sont les plus chargés.',
      bookBtn: 'Réserver sur le site officiel',
      payMethods: 'Paiement: Visa / Mastercard / Espèces au guichet',
    },
  };

  // === بيانات المواصلات ===
  const transportData = {
    ar: {
      title: 'المواصلات',
      desc: 'طرق الوصول للمتحف',
      uber: {
        title: 'أوبر / كريم',
        steps: [
          'افتح تطبيق أوبر أو كريم على موبايلك',
          'اكتب "Grand Egyptian Museum" في الوجهة',
          'متوسط السعر: 150-300 جنيه من وسط القاهرة',
          'الرحلة: 30-60 دقيقة حسب الزحمة',
        ],
      },
      metro: {
        title: 'المترو + أتوبيس',
        desc: 'انزل محطة "المريوطية" (الخط 3) ثم أتوبيس أو ميكروباص للمتحف',
      },
      taxi: {
        title: 'التاكسي الأبيض',
        tip: 'اتفق على السعر قبل الركوب أو اطلب تشغيل العداد',
      },
      location: '📍 طريق الفيوم، الرماية، الجيزة (بجوار أهرامات الجيزة)',
    },
    en: {
      title: 'Transportation',
      desc: 'How to reach the museum',
      uber: {
        title: 'Uber / Careem',
        steps: [
          'Open Uber or Careem app on your phone',
          'Search "Grand Egyptian Museum" as destination',
          'Average cost: 150-300 EGP ($3-6) from downtown Cairo',
          'Trip duration: 30-60 minutes depending on traffic',
        ],
      },
      metro: {
        title: 'Metro + Bus',
        desc: 'Take Metro Line 3 to "El Maryouteya" station, then bus/microbus to museum',
      },
      taxi: {
        title: 'White Taxi',
        tip: 'Agree on the price before getting in or ask for the meter',
      },
      location: '📍 Al Fayoum Road, Al Remaya, Giza (next to Giza Pyramids)',
    },
    fr: {
      title: 'Transport',
      desc: 'Comment atteindre le musée',
      uber: {
        title: 'Uber / Careem',
        steps: [
          'Ouvrez l\'app Uber ou Careem sur votre téléphone',
          'Recherchez "Grand Egyptian Museum" comme destination',
          'Coût moyen: 150-300 EGP (3-6$) depuis le centre du Caire',
          'Durée: 30-60 minutes selon le trafic',
        ],
      },
      metro: {
        title: 'Métro + Bus',
        desc: 'Prenez la ligne 3 du métro jusqu\'à "El Maryouteya", puis bus vers le musée',
      },
      taxi: {
        title: 'Taxi Blanc',
        tip: 'Convenez du prix avant de monter ou demandez le compteur',
      },
      location: '📍 Route de Fayoum, Al Remaya, Gizeh (à côté des Pyramides)',
    },
  };

  // === أرقام الطوارئ ===
  const emergencyData = {
    ar: {
      title: 'أرقام مهمة',
      items: [
        { label: 'الطوارئ العامة', value: '122', icon: Shield },
        { label: 'الإسعاف', value: '123', icon: Phone },
        { label: 'شرطة السياحة', value: '126', icon: Shield },
        { label: 'الاستعلامات الدولية', value: '+20 2 3377 1010', icon: Globe },
        { label: 'خط نجدة السياح', value: '19654', icon: Phone },
      ],
    },
    en: {
      title: 'Important Numbers',
      items: [
        { label: 'General Emergency', value: '122', icon: Shield },
        { label: 'Ambulance', value: '123', icon: Phone },
        { label: 'Tourist Police', value: '126', icon: Shield },
        { label: 'International Inquiries', value: '+20 2 3377 1010', icon: Globe },
        { label: 'Tourist Hotline', value: '19654', icon: Phone },
      ],
    },
    fr: {
      title: 'Numéros Importants',
      items: [
        { label: 'Urgences Générales', value: '122', icon: Shield },
        { label: 'Ambulance', value: '123', icon: Phone },
        { label: 'Police Touristique', value: '126', icon: Shield },
        { label: 'Renseignements Internationaux', value: '+20 2 3377 1010', icon: Globe },
        { label: 'Ligne d\'Aide Touristique', value: '19654', icon: Phone },
      ],
    },
  };

  // === معلومات إضافية ===
  const extraInfo = {
    ar: {
      title: 'معلومات مفيدة',
      items: [
        { icon: Wifi, label: 'واي فاي', desc: 'واي فاي مجاني متاح في المتحف' },
        { icon: Headphones, label: 'دليل صوتي', desc: 'متوفر بـ 8 لغات - 150 جنيه للإيجار' },
        { icon: ShoppingBag, label: 'سوفينير شوب', desc: 'محل هدايا عند المخرج - هدايا فرعونية أصلية' },
        { icon: UtensilsCrossed, label: 'مطاعم وكافيهات', desc: '3 مطاعم + كافيه بانوراما مع إطلالة على الأهرامات' },
        { icon: Sun, label: 'الطقس', desc: 'حار صيفاً (35-42°C) - معتدل شتاءً (15-25°C). خذ كاب وماء' },
        { icon: DollarSign, label: 'العملة', desc: '1 دولار ≈ 50 جنيه مصري. الصرافات متوفرة في المتحف' },
      ],
    },
    en: {
      title: 'Useful Info',
      items: [
        { icon: Wifi, label: 'Wi-Fi', desc: 'Free Wi-Fi available inside the museum' },
        { icon: Headphones, label: 'Audio Guide', desc: 'Available in 8 languages - 150 EGP rental' },
        { icon: ShoppingBag, label: 'Gift Shop', desc: 'Souvenir store at the exit - authentic Egyptian gifts' },
        { icon: UtensilsCrossed, label: 'Dining', desc: '3 restaurants + Panorama Café with Pyramids view' },
        { icon: Sun, label: 'Weather', desc: 'Hot in summer (35-42°C) - mild in winter (15-25°C). Bring a hat & water' },
        { icon: DollarSign, label: 'Currency', desc: '1 USD ≈ 50 EGP. ATMs available inside the museum' },
      ],
    },
    fr: {
      title: 'Infos Utiles',
      items: [
        { icon: Wifi, label: 'Wi-Fi', desc: 'Wi-Fi gratuit disponible dans le musée' },
        { icon: Headphones, label: 'Audioguide', desc: 'Disponible en 8 langues - 150 EGP location' },
        { icon: ShoppingBag, label: 'Boutique', desc: 'Boutique de souvenirs à la sortie - cadeaux authentiques' },
        { icon: UtensilsCrossed, label: 'Restauration', desc: '3 restaurants + Café Panorama avec vue sur les Pyramides' },
        { icon: Sun, label: 'Météo', desc: 'Chaud en été (35-42°C) - doux en hiver (15-25°C). Prenez un chapeau' },
        { icon: DollarSign, label: 'Monnaie', desc: '1 USD ≈ 50 EGP. Distributeurs disponibles dans le musée' },
      ],
    },
  };

  // === أماكن قريبة ===
  const nearbyPlaces = {
    ar: {
      title: 'أماكن قريبة تستحق الزيارة',
      places: [
        { name: 'أهرامات الجيزة وأبو الهول', dist: '5 دقائق', mapQ: 'Giza+Pyramids', icon: '🏛️' },
        { name: 'منطقة سقارة الأثرية', dist: '30 دقيقة', mapQ: 'Saqqara+Egypt', icon: '🏺' },
        { name: 'ممفيس (ميت رهينة)', dist: '25 دقيقة', mapQ: 'Memphis+Egypt', icon: '🗿' },
        { name: 'شارع الهرم (مطاعم وكافيهات)', dist: '10 دقائق', mapQ: 'Al+Haram+Street+Giza', icon: '🍽️' },
      ],
    },
    en: {
      title: 'Nearby Places Worth Visiting',
      places: [
        { name: 'Giza Pyramids & Sphinx', dist: '5 min', mapQ: 'Giza+Pyramids', icon: '🏛️' },
        { name: 'Saqqara Archaeological Site', dist: '30 min', mapQ: 'Saqqara+Egypt', icon: '🏺' },
        { name: 'Memphis (Mit Rahina)', dist: '25 min', mapQ: 'Memphis+Egypt', icon: '🗿' },
        { name: 'Al Haram Street (Dining)', dist: '10 min', mapQ: 'Al+Haram+Street+Giza', icon: '🍽️' },
      ],
    },
    fr: {
      title: 'Lieux à Proximité',
      places: [
        { name: 'Pyramides de Gizeh & Sphinx', dist: '5 min', mapQ: 'Giza+Pyramids', icon: '🏛️' },
        { name: 'Site Archéologique de Saqqara', dist: '30 min', mapQ: 'Saqqara+Egypt', icon: '🏺' },
        { name: 'Memphis (Mit Rahina)', dist: '25 min', mapQ: 'Memphis+Egypt', icon: '🗿' },
        { name: 'Rue Al Haram (Restaurants)', dist: '10 min', mapQ: 'Al+Haram+Street+Giza', icon: '🍽️' },
      ],
    },
  };

  const ticket = ticketData[language];
  const transport = transportData[language];
  const emergency = emergencyData[language];
  const extra = extraInfo[language];
  const nearby = nearbyPlaces[language];

  // === تابات العرض ===
  const tabLabels = {
    ar: { tickets: 'التذاكر', transport: 'المواصلات', info: 'معلومات', nearby: 'أماكن قريبة', emergency: 'طوارئ' },
    en: { tickets: 'Tickets', transport: 'Transport', info: 'Info', nearby: 'Nearby', emergency: 'Emergency' },
    fr: { tickets: 'Billets', transport: 'Transport', info: 'Infos', nearby: 'À Proximité', emergency: 'Urgences' },
  };
  const tabs = tabLabels[language];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
            {t('touristServices')}
          </h2>
          <div className="w-20 h-1 mx-auto rounded-full gold-shimmer" />
        </motion.div>

        {/* تابات الأقسام */}
        <Tabs defaultValue="tickets" className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8 h-auto">
            <TabsTrigger value="tickets" className="flex flex-col gap-1 py-3 text-xs sm:text-sm">
              <Ticket className="w-4 h-4" />
              {tabs.tickets}
            </TabsTrigger>
            <TabsTrigger value="transport" className="flex flex-col gap-1 py-3 text-xs sm:text-sm">
              <Car className="w-4 h-4" />
              {tabs.transport}
            </TabsTrigger>
            <TabsTrigger value="info" className="flex flex-col gap-1 py-3 text-xs sm:text-sm">
              <Info className="w-4 h-4" />
              {tabs.info}
            </TabsTrigger>
            <TabsTrigger value="nearby" className="flex flex-col gap-1 py-3 text-xs sm:text-sm">
              <Landmark className="w-4 h-4" />
              {tabs.nearby}
            </TabsTrigger>
            <TabsTrigger value="emergency" className="flex flex-col gap-1 py-3 text-xs sm:text-sm">
              <AlertTriangle className="w-4 h-4" />
              {tabs.emergency}
            </TabsTrigger>
          </TabsList>

          {/* ====== تاب التذاكر ====== */}
          <TabsContent value="tickets">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center">
                      <Ticket className="w-7 h-7 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{ticket.title}</CardTitle>
                      <CardDescription>{ticket.desc}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 space-y-4">
                  {/* الأسعار */}
                  <div className="space-y-2">
                    {ticket.prices.map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{item.type}</span>
                          {item.note && <span className="text-xs text-muted-foreground">({item.note})</span>}
                        </div>
                        <Badge variant="secondary" className="font-semibold">{item.price}</Badge>
                      </div>
                    ))}
                  </div>

                  {/* المواعيد */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                    <Clock className="w-4 h-4 shrink-0" />
                    {ticket.hours}
                  </div>

                  {/* نصيحة */}
                  <div className="bg-accent/50 border border-accent p-3 rounded-lg text-sm text-accent-foreground">
                    {ticket.tip}
                  </div>

                  {/* طرق الدفع */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CreditCard className="w-4 h-4" />
                    {ticket.payMethods}
                  </div>

                  {/* زر الحجز - رابط حقيقي */}
                  <Button
                    className="w-full gap-2"
                    size="lg"
                    onClick={() => window.open('https://gem.eg-booking.world/', '_blank', 'noopener,noreferrer')}
                  >
                    <CreditCard className="w-4 h-4" />
                    {ticket.bookBtn}
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ====== تاب المواصلات ====== */}
          <TabsContent value="transport">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
              {/* أوبر/كريم */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-foreground rounded-lg flex items-center justify-center">
                      <span className="text-background font-bold text-sm">U</span>
                    </div>
                    <h3 className="font-bold text-lg">{transport.uber.title}</h3>
                  </div>
                  <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside mb-4">
                    {transport.uber.steps.map((s, i) => <li key={i}>{s}</li>)}
                  </ol>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => window.open('https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[formatted_address]=Grand%20Egyptian%20Museum&dropoff[latitude]=29.9931986&dropoff[longitude]=31.1244409', '_blank', 'noopener,noreferrer')}
                    >
                      <Car className="w-4 h-4" />
                      Uber
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 gap-2"
                      onClick={() => window.open('https://www.careem.com', '_blank', 'noopener,noreferrer')}
                    >
                      <Car className="w-4 h-4" />
                      Careem
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* المترو والتاكسي */}
              <div className="grid sm:grid-cols-2 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Train className="w-5 h-5 text-primary" />
                      <h4 className="font-bold">{transport.metro.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{transport.metro.desc}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Car className="w-5 h-5 text-primary" />
                      <h4 className="font-bold">{transport.taxi.title}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">⚠️ {transport.taxi.tip}</p>
                  </CardContent>
                </Card>
              </div>

              {/* الموقع + خرائط جوجل */}
              <Card>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">{transport.location}</p>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 gap-2"
                      onClick={() => window.open('https://www.google.com/maps/place/Grand+Egyptian+Museum/@29.9931585,31.1244984,20.97z/data=!4m14!1m7!3m6!1s0x14584534984a8ad1:0x45764c5bc4ec261a!2sGrand+Egyptian+Museum!8m2!3d29.9931986!4d31.1244409!16zL20vMGRoOTN3!3m5!1s0x14584534984a8ad1:0x45764c5bc4ec261a!8m2!3d29.9931986!4d31.1244409!16zL20vMGRoOTN3', '_blank', 'noopener,noreferrer')}
                    >
                      <MapPin className="w-4 h-4" />
                      Google Maps
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="secondary"
                      className="flex-1 gap-2"
                      onClick={() => window.open('https://www.google.com/maps/place/Grand+Egyptian+Museum/@29.9931585,31.1244984,20.97z/data=!4m14!1m7!3m6!1s0x14584534984a8ad1:0x45764c5bc4ec261a!2sGrand+Egyptian+Museum!8m2!3d29.9931986!4d31.1244409!16zL20vMGRoOTN3!3m5!1s0x14584534984a8ad1:0x45764c5bc4ec261a!8m2!3d29.9931986!4d31.1244409!16zL20vMGRoOTN3', '_blank', 'noopener,noreferrer')}
                    >
                      <Navigation className="w-4 h-4" />
                      {language === 'ar' ? 'ابدأ التنقل' : language === 'fr' ? 'Itinéraire' : 'Get Directions'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          {/* ====== تاب المعلومات ====== */}
          <TabsContent value="info">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {extra.items.map((item, i) => (
                  <Card key={i} className="hover:shadow-elevated transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{item.label}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* ====== تاب أماكن قريبة ====== */}
          <TabsContent value="nearby">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h3 className="text-lg font-bold text-foreground mb-4">{nearby.title}</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {nearby.places.map((place, i) => (
                  <Card key={i} className="hover:shadow-elevated transition-shadow cursor-pointer"
                    onClick={() => window.open(`https://www.google.com/maps/search/${place.mapQ}`, '_blank', 'noopener,noreferrer')}
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{place.icon}</span>
                          <div>
                            <h4 className="font-bold text-sm">{place.name}</h4>
                            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                              <Clock className="w-3 h-3" /> {place.dist}
                            </p>
                          </div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          </TabsContent>

          {/* ====== تاب الطوارئ ====== */}
          <TabsContent value="emergency">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="border-destructive/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <AlertTriangle className="w-5 h-5 text-destructive" />
                    {emergency.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emergency.items.map((item, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
                      <div className="flex items-center gap-3">
                        <item.icon className="w-5 h-5 text-muted-foreground" />
                        <span className="text-sm font-medium">{item.label}</span>
                      </div>
                      <a
                        href={`tel:${item.value.replace(/\s/g, '')}`}
                        className="font-mono text-sm font-bold text-primary hover:underline"
                        dir="ltr"
                      >
                        📞 {item.value}
                      </a>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default TouristServices;
