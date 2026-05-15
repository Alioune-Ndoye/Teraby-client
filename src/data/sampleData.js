// ─── Services ───────────────────────────────────────────────────────────────
export const services = [
  {
    id: 1,
    icon: 'Home',
    title: 'Nettoyage Résidentiel',
    subtitle: 'Votre sanctuaire, sublimé',
    description:
      'Un nettoyage méticuleux de fond en comble, adapté à votre domicile. Nous traitons chaque surface avec soin pour restaurer l\'environnement pristine que vous méritez.',
    features: ['Cuisine & Salles de bain', 'Chambres & Séjour', 'Sols & Fenêtres', 'Demandes personnalisées'],
    price: 'À partir de 149 €',
    duration: '2–4 h',
    popular: false,
  },
  {
    id: 2,
    icon: 'Sparkles',
    title: 'Nettoyage en Profondeur',
    subtitle: 'La remise à neuf ultime',
    description:
      'Notre service phare. Chaque coin, recoin et surface reçoit une attention obsessionnelle. Le grand nettoyage qui remet votre espace à zéro.',
    features: ['Intérieur des appareils', 'Joints & Carrelage', 'Intérieur des placards', 'Plinthes & Ventilations'],
    price: 'À partir de 299 €',
    duration: '4–8 h',
    popular: true,
  },
  {
    id: 3,
    icon: 'Truck',
    title: 'Emménagement / Déménagement',
    subtitle: 'Transitions sans stress',
    description:
      'Arrivez dans un logement impeccable ou laissez-en un derrière vous. Nos spécialistes s\'assurent que chaque centimètre est prêt — protégeant votre caution et votre tranquillité.',
    features: ['Focus bien vide', 'Inspection détaillée', 'Nettoyage des appareils', 'Disponible le jour même'],
    price: 'À partir de 249 €',
    duration: '3–6 h',
    popular: false,
  },
  {
    id: 4,
    icon: 'Building2',
    title: 'Nettoyage Commercial',
    subtitle: 'Élevez votre espace de travail',
    description:
      'Les environnements professionnels exigent des standards professionnels. Nous gardons vos bureaux, commerces et locaux impeccables — avant, pendant ou après les heures d\'ouverture.',
    features: ['Espaces de bureaux', 'Commerces & Showrooms', 'Service hors horaires', 'Contrats hebdomadaires'],
    price: 'Devis personnalisé',
    duration: 'Flexible',
    popular: false,
  },
]

const GOOGLE_REVIEWS_URL = 'https://www.google.com/search?sca_esv=1ff17551be336d16&sxsrf=ANbL-n40-ErvDBRlVb6uw5SO505ULmuiCg:1778694056333&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOQ-rWS6izsO1y5hXnGvjjt9Cj-qcvHt0zKgDIharmM-QYBO_YqdnO_hNUY8dKuWkrLVozRgykxW8rLaHfOSBBDmYWYgR&q=Teraby+SAS+Reviews&sa=X&ved=2ahUKEwjOg5Hb57aUAxW7jYkEHRApGwsQ0bkNegQIIxAH&biw=2048&bih=1192&dpr=2'

// ─── Testimonials ────────────────────────────────────────────────────────────
export { GOOGLE_REVIEWS_URL }
export const testimonials = [
  {
    id: 1,
    name: 'Mathieu D',
    role: 'Hôte Airbnb',
    avatar: 'https://ui-avatars.com/api/?name=Mathieu+D&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'Teraby gère mon Airbnb et je suis extrêmement satisfait. Leur travail est impeccable : toujours irréprochable, très réactifs et d\'un professionnalisme constant. Depuis que j\'utilise leurs services, je reçois énormément de retours positifs de mes voyageurs.',
    service: 'Gestion Airbnb',
    date: 'avril 2026',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 2,
    name: 'Hala Diouri',
    role: 'Propriétaire Airbnb',
    avatar: 'https://ui-avatars.com/api/?name=Hala+D&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'La société de nettoyage Teraby se spécialise vraiment dans le nettoyage des biens Airbnb. Le nettoyage et le linge sont réalisés de façon professionnelle. Ils sont réactifs et peuvent intervenir en urgence. Je suis satisfaite de leurs services.',
    service: 'Nettoyage Airbnb',
    date: 'mars 2026',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 3,
    name: 'Oumayma B',
    role: 'Guide Local · 39 avis',
    avatar: 'https://ui-avatars.com/api/?name=Oumayma+B&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'J\'ai fait appel à la société pour le nettoyage de mon canapé. Babacar a été minutieux et très méticuleux : un travail sérieux et efficace. Mon canapé est comme neuf ! Il y avait des taches de café, de lait, des cernes ainsi que des zones décolorées et jaunies ; aujourd\'hui, il a retrouvé sa beauté d\'origine.',
    service: 'Nettoyage Canapé',
    date: 'août 2025',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 4,
    name: 'Assi J',
    role: 'Guide Local · 18 avis',
    avatar: 'https://ui-avatars.com/api/?name=Assi+J&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'Je recommande à 100%, mon canapé est comme neuf. D\'autant plus que je l\'ai contacté la veille pour le lendemain, il a été réactif, très professionnel et méticuleux. Babacar a été à l\'écoute de mes besoins. Et en plus, il a même nettoyé des coussins qui n\'étaient pas inclus dans la prestation. Allez-y les yeux fermés.',
    service: 'Nettoyage Canapé',
    date: 'septembre 2025',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 5,
    name: 'Hatou Diarra',
    role: 'Cliente · 11 avis',
    avatar: 'https://ui-avatars.com/api/?name=Hatou+D&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'J\'ai utilisé Teraby pour nettoyer mon canapé et je suis ravie du résultat ! Babacar a effectué le travail et a fait un travail impeccable, avec beaucoup de professionnalisme et de soin. Tout s\'est parfaitement passé, du premier contact jusqu\'à la fin de la prestation. Je recommande vivement cette société pour la qualité de son service.',
    service: 'Nettoyage Canapé',
    date: 'août 2025',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 6,
    name: 'M C',
    role: 'Cliente · 11 avis',
    avatar: 'https://ui-avatars.com/api/?name=M+C&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'Entreprise de nettoyage très efficace. Babacar et son équipe étaient ponctuels et ont travaillé efficacement ; ils sont très professionnels. Ils sont très aimables et ont même aidé pour d\'autres tâches. Je les recommande vivement. On leur a confié le nettoyage de deux appartements, dont un après chantier, et tout était impeccable !',
    service: 'Nettoyage Appartement',
    date: 'mars 2025',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 7,
    name: 'Kaltoum Younous',
    role: 'Cliente · 2 avis',
    avatar: 'https://ui-avatars.com/api/?name=Kaltoum+Y&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'J\'ai eu l\'occasion de faire appel à TERABY pour plusieurs prestations de nettoyage et j\'ai été très satisfaite. Babacar est très professionnel. Il est méticuleux et travaille avec passion.',
    service: 'Nettoyage Résidentiel',
    date: 'septembre 2024',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
  {
    id: 8,
    name: 'Jessica Ndjiki',
    role: 'Cliente · 5 avis',
    avatar: 'https://ui-avatars.com/api/?name=Jessica+N&background=CC5500&color=fff&size=120&bold=true',
    rating: 5,
    text: 'Nettoyage complet de l\'appartement après déménagement, au top.',
    service: 'Nettoyage Déménagement',
    date: 'avril 2025',
    googleUrl: GOOGLE_REVIEWS_URL,
  },
]

// ─── Team Members ────────────────────────────────────────────────────────────
export const teamMembers = [
  {
    id: 1,
    name: 'Elena Vasquez',
    role: 'Fondatrice & PDG',
    bio: 'Forte de 15 ans dans l\'hôtellerie de luxe, Elena a fondé Teraby pour apporter les standards cinq étoiles aux espaces résidentiels et commerciaux.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&crop=face',
    specialties: ['Vision & Stratégie', 'Standards Premium', 'Relations Clients'],
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Directeur des Opérations',
    bio: 'Michael orchestre notre équipe de plus de 40 personnes avec une précision militaire, garantissant que chaque réservation est exécutée parfaitement et dans les délais.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face',
    specialties: ['Management d\'Équipe', 'Contrôle Qualité', 'Logistique'],
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Spécialiste Principale',
    bio: 'Priya est notre spécialiste la plus demandée — reconnue pour son approche perfectionniste du nettoyage en profondeur et sa connaissance encyclopédique des surfaces haut de gamme.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=face',
    specialties: ['Nettoyage en Profondeur', 'Surfaces Premium', 'Services Déménagement'],
  },
  {
    id: 4,
    name: 'David Laurent',
    role: 'Directeur Commercial',
    bio: 'Ancien responsable des opérations hôtelières de luxe, David apporte des protocoles dignes de l\'hôtellerie à chaque client commercial de notre portefeuille.',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face',
    specialties: ['Comptes Commerciaux', 'Gestion SLA', 'Services Hors Horaires'],
  },
]

// ─── Gallery Items ───────────────────────────────────────────────────────────
export const galleryItems = [
  {
    id: 1,
    category: 'residential',
    title: 'Villa en Bord de Mer',
    location: 'Côte d\'Azur',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    service: 'Nettoyage en Profondeur',
  },
  {
    id: 2,
    category: 'commercial',
    title: 'Bureau en Centre-Ville',
    location: 'Paris, La Défense',
    before: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&h=600&fit=crop',
    service: 'Nettoyage Commercial',
  },
  {
    id: 3,
    category: 'residential',
    title: 'Suite Penthouse',
    location: 'Paris 8e',
    before: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop',
    service: 'Nettoyage Résidentiel',
  },
  {
    id: 4,
    category: 'move',
    title: 'Déménagement Appartement Premium',
    location: 'Lyon, Presqu\'île',
    before: 'https://images.unsplash.com/photo-1489171078254-c3365d6e359f?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
    service: 'Nettoyage Déménagement',
  },
  {
    id: 5,
    category: 'commercial',
    title: 'Cuisine de Restaurant',
    location: 'Bordeaux',
    before: 'https://images.unsplash.com/photo-1556909190-59b5c4e67f3f?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=800&h=600&fit=crop',
    service: 'Nettoyage Commercial Profond',
  },
  {
    id: 6,
    category: 'residential',
    title: 'Maison Familiale',
    location: 'Marseille',
    before: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?w=800&h=600&fit=crop',
    after: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
    service: 'Nettoyage Résidentiel',
  },
]

// ─── FAQ ─────────────────────────────────────────────────────────────────────
export const faqItems = [
  {
    q: 'Comment réserver un service de nettoyage ?',
    a: 'Vous pouvez réserver via notre site web, nous appeler au 01 55 55 01 88, ou utiliser notre assistant en ligne. Nous confirmerons votre rendez-vous dans les 30 minutes.',
  },
  {
    q: 'Quels produits utilisez-vous ?',
    a: 'Nous utilisons exclusivement des produits de nettoyage premium certifiés écologiques, sûrs pour votre famille, vos animaux et l\'environnement — tout en offrant des résultats professionnels.',
  },
  {
    q: 'Vos agents sont-ils vérifiés ?',
    a: 'Absolument. Chaque spécialiste Teraby fait l\'objet d\'une vérification rigoureuse des antécédents, d\'une formation professionnelle et est entièrement assuré.',
  },
  {
    q: 'Dois-je être présent pendant le nettoyage ?',
    a: 'Pas du tout. De nombreux clients nous confient une clé ou un code d\'accès. Nous gérons tout en toute sécurité et vous envoyons un rapport de fin d\'intervention avec photos.',
  },
  {
    q: 'Proposez-vous des remises pour les services récurrents ?',
    a: 'Oui — les clients hebdomadaires économisent 20 %, bimensuels 15 % et mensuels 10 %. La fidélité mérite récompense.',
  },
  {
    q: 'Quelle est votre politique d\'annulation ?',
    a: 'Nous demandons un préavis de 24 heures pour les annulations. La vie peut être imprévisible — nous le comprenons et nous travaillons avec vous pour reprogrammer sans pénalité.',
  },
]

// ─── Stats ───────────────────────────────────────────────────────────────────
export const stats = [
  { value: '1 200+', label: 'Logements Nettoyés' },
  { value: '98 %', label: 'Clients Satisfaits' },
  { value: '7+', label: 'Ans d\'Excellence' },
  { value: '40+', label: 'Spécialistes Certifiés' },
]

// ─── Service Cards (Home page Services section) ───────────────────────────────
export const serviceCards = [
  {
    slug: 'regular-cleaning',
    tag: 'Résidentiel',
    title: 'Nettoyage Régulier',
    subtitle: 'Votre intérieur, toujours impeccable',
    description: 'Un nettoyage soigné de fond en comble, adapté à votre domicile. Du studio à la grande maison, chaque espace est traité avec le soin qu\'il mérite.',
    features: ['Cuisine & Salles de bain', 'Chambres & Séjour', 'Sols & Fenêtres', 'Demandes personnalisées'],
    href: '/services/regular-cleaning',
    image: '/bathroom-regular.jpg',
    popular: false,
  },
  {
    slug: 'airbnb-cleaning',
    tag: 'Short-Term Rental',
    title: 'Airbnb & Location Courte Durée',
    subtitle: '5 étoiles à chaque check-out',
    description: 'Conçu pour les hôtes et gestionnaires de biens. Intervention rapide entre deux séjours avec options linge, consommables et check-in tardif.',
    features: ['Rotation rapide', 'Linge & Consommables', 'Check-in tardif', 'Rapport photo inclus'],
    href: '/services/airbnb-cleaning',
    image: '/airbnb-room.jpg',
    popular: true,
  },
  {
    slug: 'commercial-cleaning',
    tag: 'Commercial',
    title: 'Nettoyage Commercial',
    subtitle: 'Des standards cinq étoiles pour vos locaux',
    description: 'Bureaux, commerces, showrooms. Nous maintenons vos espaces professionnels au niveau d\'excellence qu\'ils méritent, avant, pendant ou après les heures d\'ouverture.',
    features: ['Bureaux & Coworking', 'Commerces & Showrooms', 'Hors des heures d\'ouverture', 'Contrats récurrents'],
    href: '/services/commercial-cleaning',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&fit=crop&q=60',
    popular: false,
  },
]

// ─── Nav Links ───────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Accueil', href: '#home' },
  {
    label: 'Services',
    children: [
      { label: 'Nettoyage Régulier', href: '/services/regular-cleaning', desc: 'Domicile & Résidentiel' },
      { label: 'Airbnb & Court-Séjour', href: '/services/airbnb-cleaning', desc: 'Short-Term Rental' },
      { label: 'Commercial', href: '/services/commercial-cleaning', desc: 'Bureaux & Locaux' },
    ],
  },
  { label: 'Réservation', href: '#booking' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Équipe', href: '#team' },
  { label: 'Avis', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]
