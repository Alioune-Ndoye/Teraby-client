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

// ─── Testimonials ────────────────────────────────────────────────────────────
export const testimonials = [
  {
    id: 1,
    name: 'Isabelle Fontaine',
    role: 'Propriétaire, Paris 16e',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b60c?w=120&h=120&fit=crop&crop=face',
    rating: 5,
    text: 'Teraby a transformé mon appartement en quelque chose digne d\'un magazine d\'architecture. Leur souci du détail est extraordinaire — ils ont remarqué des choses que j\'avais négligées depuis des années.',
    service: 'Nettoyage en Profondeur',
  },
  {
    id: 2,
    name: 'Marc Wellington',
    role: 'PDG, Groupe Wellington',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face',
    rating: 5,
    text: 'Nous faisons appel à Teraby pour l\'ensemble de notre complexe de bureaux. La constance, le professionnalisme et la qualité sont incomparables. La productivité de notre équipe s\'est visiblement améliorée.',
    service: 'Nettoyage Commercial',
  },
  {
    id: 3,
    name: 'Sophie Reyes',
    role: 'Designer d\'Intérieur',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=120&h=120&fit=crop&crop=face',
    rating: 5,
    text: 'En tant que professionnelle du design, j\'ai des exigences extrêmement élevées. Teraby les dépasse à chaque fois. Ils comprennent que la propreté est le fondement du luxe.',
    service: 'Nettoyage Résidentiel',
  },
  {
    id: 4,
    name: 'Jacques Thornton',
    role: 'Promoteur Immobilier',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&h=120&fit=crop&crop=face',
    rating: 5,
    text: 'Pour tous mes nettoyages avant et après location, Teraby est le seul appel que je passe. Ils ont permis à plusieurs de mes clients de récupérer leur dépôt de garantie.',
    service: 'Emménagement / Déménagement',
  },
  {
    id: 5,
    name: 'Amara Okafor',
    role: 'Hôte Airbnb Luxe',
    avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=120&h=120&fit=crop&crop=face',
    rating: 5,
    text: 'Mes voyageurs attribuent systématiquement 5 étoiles à la propreté depuis que je travaille avec Teraby. Ils ont transformé mon bien en une expérience cinq étoiles.',
    service: 'Nettoyage Résidentiel',
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
    specialties: ['Vision & Stratégie', 'Standards Luxe', 'Relations Clients'],
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
    title: 'Déménagement Appartement Luxe',
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

// ─── Nav Links ───────────────────────────────────────────────────────────────
export const navLinks = [
  { label: 'Accueil', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Réservation', href: '#booking' },
  { label: 'Galerie', href: '/gallery' },
  { label: 'Équipe', href: '#team' },
  { label: 'Avis', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
]
