/**
 * 📦 بيانات المتحف - museumData
 * بيحتوي على كل بيانات القاعات والمسارات والأسئلة المقترحة
 * كل حاجة متوفرة بـ 3 لغات
 */

// واجهة بيانات القاعة
export interface Gallery {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr: string;
  floor: number;
  duration: number;
  artifactsCount: number;
  highlightsAr: string[];
  highlightsEn: string[];
  highlightsFr: string[];
  childrenInfoAr: string;
  childrenInfoEn: string;
  childrenInfoFr: string;
  academicInfoAr: string;
  academicInfoEn: string;
  academicInfoFr: string;
  position: { x: number; y: number };
  color: string;
  icon: string;
}

export interface Route {
  id: string;
  nameAr: string;
  nameEn: string;
  nameFr: string;
  duration: string;
  durationMinutes: number;
  descriptionAr: string;
  descriptionEn: string;
  descriptionFr: string;
  galleries: string[];
  type: 'quick' | 'standard' | 'full' | 'family' | 'academic';
  color: string;
}

export const galleries: Gallery[] = [
  {
    id: 'tutankhamun',
    nameAr: 'قاعة توت عنخ آمون',
    nameEn: 'Tutankhamun Gallery',
    nameFr: 'Galerie de Toutânkhamon',
    descriptionAr: 'اكتشف كنوز الفرعون الشاب توت عنخ آمون، بما في ذلك القناع الذهبي الشهير والمقتنيات الملكية.',
    descriptionEn: 'Discover the treasures of the young pharaoh Tutankhamun, including the famous golden mask and royal belongings.',
    descriptionFr: 'Découvrez les trésors du jeune pharaon Toutânkhamon, y compris le célèbre masque d\'or et les objets royaux.',
    floor: 2,
    duration: 60,
    artifactsCount: 5000,
    highlightsAr: ['القناع الذهبي', 'التابوت الذهبي', 'العرش الملكي', 'المجوهرات الملكية'],
    highlightsEn: ['Golden Mask', 'Golden Coffin', 'Royal Throne', 'Royal Jewelry'],
    highlightsFr: ['Masque d\'Or', 'Cercueil d\'Or', 'Trône Royal', 'Bijoux Royaux'],
    childrenInfoAr: 'هل تعلم أن توت عنخ آمون أصبح ملكاً وعمره 9 سنوات فقط؟ تعال واكتشف كنوزه المذهلة!',
    childrenInfoEn: 'Did you know Tutankhamun became king at just 9 years old? Come discover his amazing treasures!',
    childrenInfoFr: 'Savais-tu que Toutânkhamon est devenu roi à seulement 9 ans? Viens découvrir ses trésors incroyables!',
    academicInfoAr: 'تضم المجموعة 5398 قطعة أثرية اكتشفها هوارد كارتر عام 1922. تشمل دراسات متقدمة حول تقنيات التحنيط والفن الملكي.',
    academicInfoEn: 'The collection includes 5,398 artifacts discovered by Howard Carter in 1922. Features advanced studies on mummification techniques and royal art.',
    academicInfoFr: 'La collection comprend 5 398 artefacts découverts par Howard Carter en 1922. Comprend des études avancées sur les techniques de momification et l\'art royal.',
    position: { x: 60, y: 30 },
    color: '#D4AF37',
    icon: '👑',
  },
  {
    id: 'grand-staircase',
    nameAr: 'السلم العظيم',
    nameEn: 'Grand Staircase',
    nameFr: 'Grand Escalier',
    descriptionAr: 'السلم الرئيسي للمتحف مع تمثال رمسيس الثاني الضخم، مدخل رائع لعالم الفراعنة.',
    descriptionEn: 'The museum\'s main staircase featuring the colossal statue of Ramesses II, a magnificent entrance to the world of pharaohs.',
    descriptionFr: 'L\'escalier principal du musée avec la statue colossale de Ramsès II, une entrée magnifique dans le monde des pharaons.',
    floor: 0,
    duration: 20,
    artifactsCount: 50,
    highlightsAr: ['تمثال رمسيس الثاني', 'مسلة حتشبسوت', 'نقوش فرعونية'],
    highlightsEn: ['Ramesses II Statue', 'Hatshepsut Obelisk', 'Pharaonic Inscriptions'],
    highlightsFr: ['Statue de Ramsès II', 'Obélisque d\'Hatshepsout', 'Inscriptions Pharaoniques'],
    childrenInfoAr: 'انظر كم هو طويل تمثال رمسيس! كان ارتفاعه 11 متراً ووزنه 83 طناً!',
    childrenInfoEn: 'Look how tall Ramesses\' statue is! It was 11 meters tall and weighed 83 tons!',
    childrenInfoFr: 'Regarde comme la statue de Ramsès est grande! Elle mesurait 11 mètres et pesait 83 tonnes!',
    academicInfoAr: 'تمثال رمسيس الثاني من الجرانيت الوردي، يعود للأسرة 19، نُقل من معبد بتاح بممفيس.',
    academicInfoEn: 'Ramesses II statue made of pink granite, dating to Dynasty 19, relocated from the Ptah Temple in Memphis.',
    academicInfoFr: 'Statue de Ramsès II en granit rose, datant de la 19e dynastie, déplacée du temple de Ptah à Memphis.',
    position: { x: 50, y: 80 },
    color: '#8B4513',
    icon: '🏛️',
  },
  {
    id: 'royal-mummies',
    nameAr: 'قاعة المومياوات الملكية',
    nameEn: 'Royal Mummies Hall',
    nameFr: 'Salle des Momies Royales',
    descriptionAr: 'قاعة تحتضن مومياوات أعظم فراعنة مصر القديمة في بيئة محكمة التحكم.',
    descriptionEn: 'A hall housing the mummies of ancient Egypt\'s greatest pharaohs in a climate-controlled environment.',
    descriptionFr: 'Une salle abritant les momies des plus grands pharaons de l\'Égypte ancienne dans un environnement climatisé.',
    floor: 1,
    duration: 45,
    artifactsCount: 22,
    highlightsAr: ['مومياء رمسيس الثاني', 'مومياء حتشبسوت', 'مومياء تحتمس الثالث'],
    highlightsEn: ['Ramesses II Mummy', 'Hatshepsut Mummy', 'Thutmose III Mummy'],
    highlightsFr: ['Momie de Ramsès II', 'Momie d\'Hatshepsout', 'Momie de Thoutmôsis III'],
    childrenInfoAr: 'المومياوات هي أجساد محفوظة منذ آلاف السنين! تعلم كيف كان المصريون القدماء يحفظون الموتى.',
    childrenInfoEn: 'Mummies are preserved bodies from thousands of years ago! Learn how ancient Egyptians preserved the dead.',
    childrenInfoFr: 'Les momies sont des corps préservés depuis des milliers d\'années! Apprends comment les anciens Égyptiens préservaient les morts.',
    academicInfoAr: 'تضم القاعة 22 مومياء ملكية تم نقلها من المتحف المصري بالتحرير. تتوفر دراسات CT scan وتحليل DNA.',
    academicInfoEn: 'The hall houses 22 royal mummies relocated from the Egyptian Museum in Tahrir. CT scan and DNA analysis studies available.',
    academicInfoFr: 'La salle abrite 22 momies royales déplacées du Musée égyptien de Tahrir. Études CT scan et analyses ADN disponibles.',
    position: { x: 30, y: 50 },
    color: '#4A4A4A',
    icon: '⚱️',
  },
  {
    id: 'solar-boat',
    nameAr: 'قاعة مركب خوفو الشمسي',
    nameEn: 'Solar Boat Gallery',
    nameFr: 'Galerie du Bateau Solaire',
    descriptionAr: 'المركب الشمسي الضخم للملك خوفو، أحد أقدم وأكبر القوارب الخشبية في العالم.',
    descriptionEn: 'The massive solar boat of King Khufu, one of the oldest and largest wooden boats in the world.',
    descriptionFr: 'Le bateau solaire massif du roi Khéops, l\'un des plus anciens et plus grands bateaux en bois du monde.',
    floor: 3,
    duration: 30,
    artifactsCount: 1,
    highlightsAr: ['مركب خوفو الشمسي (43.4 متر)', 'أدوات بناء المركب', 'نماذج تفسيرية'],
    highlightsEn: ['Khufu Solar Boat (43.4m)', 'Boat Building Tools', 'Interpretive Models'],
    highlightsFr: ['Bateau Solaire de Khéops (43,4m)', 'Outils de Construction', 'Modèles Interprétatifs'],
    childrenInfoAr: 'هذا المركب أكبر من ملعب كرة السلة! بُني منذ 4600 سنة ليحمل الملك خوفو في رحلته للسماء.',
    childrenInfoEn: 'This boat is bigger than a basketball court! Built 4,600 years ago to carry King Khufu on his journey to the sky.',
    childrenInfoFr: 'Ce bateau est plus grand qu\'un terrain de basket! Construit il y a 4 600 ans pour transporter le roi Khéops vers le ciel.',
    academicInfoAr: 'اكتُشف المركب عام 1954 مفككاً إلى 1224 قطعة. أعيد تجميعه خلال 14 سنة من البحث والترميم.',
    academicInfoEn: 'The boat was discovered in 1954 dismantled into 1,224 pieces. It was reassembled over 14 years of research and restoration.',
    academicInfoFr: 'Le bateau a été découvert en 1954 démonté en 1 224 pièces. Il a été réassemblé pendant 14 ans de recherche et restauration.',
    position: { x: 75, y: 60 },
    color: '#8B7355',
    icon: '⛵',
  },
  {
    id: 'children',
    nameAr: 'قاعة الأطفال',
    nameEn: 'Children Gallery',
    nameFr: 'Galerie des Enfants',
    descriptionAr: 'قاعة تفاعلية مصممة خصيصاً للأطفال لتعلم تاريخ مصر القديمة بطريقة ممتعة.',
    descriptionEn: 'An interactive gallery designed especially for children to learn about ancient Egyptian history in a fun way.',
    descriptionFr: 'Une galerie interactive conçue spécialement pour les enfants pour apprendre l\'histoire de l\'Égypte ancienne de manière amusante.',
    floor: 1,
    duration: 45,
    artifactsCount: 200,
    highlightsAr: ['ألعاب تفاعلية', 'نماذج مصغرة', 'ورش حرف يدوية', 'مسرح عرائس'],
    highlightsEn: ['Interactive Games', 'Miniature Models', 'Craft Workshops', 'Puppet Theater'],
    highlightsFr: ['Jeux Interactifs', 'Modèles Miniatures', 'Ateliers d\'Artisanat', 'Théâtre de Marionnettes'],
    childrenInfoAr: 'هذه قاعتك الخاصة! العب، ارسم، وتعلم أسرار الفراعنة بنفسك!',
    childrenInfoEn: 'This is your special gallery! Play, draw, and learn the secrets of the pharaohs yourself!',
    childrenInfoFr: 'C\'est ta galerie spéciale! Joue, dessine et apprends les secrets des pharaons toi-même!',
    academicInfoAr: 'تتبع القاعة منهج STEAM التعليمي مع تركيز على علم الآثار والتاريخ للفئة العمرية 4-12 سنة.',
    academicInfoEn: 'The gallery follows a STEAM educational approach with focus on archaeology and history for ages 4-12.',
    academicInfoFr: 'La galerie suit une approche éducative STEAM axée sur l\'archéologie et l\'histoire pour les 4-12 ans.',
    position: { x: 20, y: 25 },
    color: '#FF6B6B',
    icon: '🎨',
  },
];

export const routes: Route[] = [
  {
    id: 'quick',
    nameAr: 'جولة سريعة',
    nameEn: 'Quick Tour',
    nameFr: 'Visite Rapide',
    duration: '1h',
    durationMinutes: 60,
    descriptionAr: 'شاهد أهم المعروضات في ساعة واحدة',
    descriptionEn: 'See the most important exhibits in one hour',
    descriptionFr: 'Voir les expositions les plus importantes en une heure',
    galleries: ['grand-staircase', 'tutankhamun'],
    type: 'quick',
    color: '#22C55E',
  },
  {
    id: 'standard',
    nameAr: 'جولة عادية',
    nameEn: 'Standard Tour',
    nameFr: 'Visite Standard',
    duration: '3h',
    durationMinutes: 180,
    descriptionAr: 'استكشف القاعات الرئيسية بتمهل',
    descriptionEn: 'Explore the main galleries at leisure',
    descriptionFr: 'Explorez les galeries principales à loisir',
    galleries: ['grand-staircase', 'royal-mummies', 'tutankhamun', 'solar-boat'],
    type: 'standard',
    color: '#3B82F6',
  },
  {
    id: 'full',
    nameAr: 'جولة كاملة',
    nameEn: 'Full Tour',
    nameFr: 'Visite Complète',
    duration: '6h+',
    durationMinutes: 360,
    descriptionAr: 'اكتشف كل ركن في المتحف',
    descriptionEn: 'Discover every corner of the museum',
    descriptionFr: 'Découvrez chaque recoin du musée',
    galleries: ['grand-staircase', 'royal-mummies', 'tutankhamun', 'solar-boat', 'children'],
    type: 'full',
    color: '#8B5CF6',
  },
  {
    id: 'family',
    nameAr: 'جولة عائلية',
    nameEn: 'Family Tour',
    nameFr: 'Visite Familiale',
    duration: '2-3h',
    durationMinutes: 150,
    descriptionAr: 'مسار مناسب للعائلات مع الأطفال',
    descriptionEn: 'A family-friendly route with children',
    descriptionFr: 'Un parcours adapté aux familles avec enfants',
    galleries: ['children', 'grand-staircase', 'tutankhamun'],
    type: 'family',
    color: '#F59E0B',
  },
  {
    id: 'academic',
    nameAr: 'جولة أكاديمية',
    nameEn: 'Academic Tour',
    nameFr: 'Visite Académique',
    duration: '4-5h',
    durationMinutes: 270,
    descriptionAr: 'للباحثين والمهتمين بالتفاصيل التاريخية',
    descriptionEn: 'For researchers and those interested in historical details',
    descriptionFr: 'Pour les chercheurs et les passionnés de détails historiques',
    galleries: ['royal-mummies', 'tutankhamun', 'solar-boat'],
    type: 'academic',
    color: '#6366F1',
  },
];

export const suggestedQuestions = {
  ar: [
    'ما هي أفضل القطع الأثرية لمشاهدتها؟',
    'كم من الوقت أحتاج لزيارة المتحف؟',
    'هل توجد قاعات مناسبة للأطفال؟',
    'أين يمكنني العثور على مومياء رمسيس الثاني؟',
    'ما هي قصة القناع الذهبي لتوت عنخ آمون؟',
  ],
  en: [
    'What are the best artifacts to see?',
    'How much time do I need to visit the museum?',
    'Are there galleries suitable for children?',
    'Where can I find the mummy of Ramesses II?',
    'What is the story of Tutankhamun\'s golden mask?',
  ],
  fr: [
    'Quels sont les meilleurs artefacts à voir?',
    'Combien de temps faut-il pour visiter le musée?',
    'Y a-t-il des galeries adaptées aux enfants?',
    'Où puis-je trouver la momie de Ramsès II?',
    'Quelle est l\'histoire du masque d\'or de Toutânkhamon?',
  ],
};
