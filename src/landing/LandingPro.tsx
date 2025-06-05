import { useNavigate } from 'react-router-dom';
import { Users, Target, MessageCircle, Brain, Heart, Handshake, Fullscreen as Bullseye, MessageSquare, GraduationCap, Trophy, Club, PenTool as Tool, Medal, Mail, Share, ArrowRight } from 'lucide-react';

export default function LandingPro() {
  const navigate = useNavigate();

  const cultureBullets = [
    {
      icon: Handshake,
      text: "Je me connecte à mes collègues humainement"
    },
    {
      icon: Bullseye,
      text: "Je connais ma mission et mon rôle"
    },
    {
      icon: MessageSquare,
      text: "Je partage, j'écoute, je réagis"
    },
    {
      icon: GraduationCap,
      text: "J'apprends et je progresse"
    },
    {
      icon: Trophy,
      text: "Je me sens utile, reconnu et soutenu"
    }
  ];

  const pillars = [
    {
      title: "Carte vivante de l'entreprise",
      description: "Visualisez qui fait quoi, où, avec quelles passions et compétences. Une vraie carte humaine, vivante et consultable à tout moment.",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg",
      icon: Users
    },
    {
      title: "Objectifs visibles",
      description: "Chaque collaborateur connaît ses missions, celles de son équipe, et les objectifs de l'entreprise. Transparence radicale inspirée de la stratégie Prométhée.",
      image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
      icon: Target
    },
    {
      title: "Réseau social d'entreprise",
      description: "Un vrai mur d'échange : textes, liens, vidéos, remerciements. Tag par thème. Vue publique ou privée. Bienveillance et simplicité.",
      image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
      icon: MessageCircle
    },
    {
      title: "Clubs & communautés internes",
      description: "Créez ou rejoignez des clubs de passion : sport, parentalité, lecture, crypto… L'émulsion dépasse les silos métier.",
      image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg",
      icon: Club
    },
    {
      title: "Projets collaboratifs",
      description: "Participez à des chantiers internes volontaires : RSE, QVT, innovation, outils… avec boards, tâches, discussions.",
      image: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg",
      icon: Tool
    },
    {
      title: "Valorisez vos collègues",
      description: "Badges \"Merci\", \"Top entraide\", \"Belle énergie\"… une culture de la reconnaissance simple et motivante.",
      image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg",
      icon: Medal
    },
    {
      title: "Mur de la direction",
      description: "News, stratégie, projets en cours. Mais aussi questions anonymes ou publiques. Une parole incarnée et transparente.",
      image: "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg",
      icon: Mail
    },
    {
      title: "Savoirs & tutoriels internes",
      description: "Chaque expert peut publier une vidéo, une procédure ou une astuce. La base de connaissances devient vivante et incarnée.",
      image: "https://images.pexels.com/photos/3182765/pexels-photo-3182765.jpeg",
      icon: Brain
    },
    {
      title: "Feedback ouvert et utile",
      description: "Boîte à idées, sondages anonymes, question du mois. L'entreprise s'améliore grâce à ses talents.",
      image: "https://images.pexels.com/photos/3182772/pexels-photo-3182772.jpeg",
      icon: Share
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Emotional Reflection Section */}
      <section className="w-full bg-gradient-to-b from-[#f9fafb] to-white py-16 relative">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10">
          {/* Image à gauche */}
          <div className="w-full md:w-1/2">
            <img
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
              alt="Équipe heureuse au travail"
              className="rounded-2xl shadow-lg max-w-full h-auto object-cover"
            />
          </div>

          {/* Bloc texte à droite */}
          <div className="w-full md:w-1/2 group relative cursor-pointer">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 transition-all duration-300 group-hover:text-blue-600">
              Et si on se réconciliait avec notre travail ?
            </h2>
            
            {/* Texte masqué par défaut */}
            <div className="overflow-hidden max-h-0 group-hover:max-h-[800px] transition-all duration-500 ease-in-out">
              <p className="text-gray-700 text-md leading-relaxed mb-4">
                De nombreux salariés érigent une barrière entre leur vie professionnelle et personnelle. Pourtant, les recherches en psychologie du travail (modèle de Karasek, travaux de M.-F. Hirigoyen) montrent que l'épanouissement au travail passe par l'autonomie, le sens et le lien humain.
              </p>
              <p className="text-gray-700 text-md leading-relaxed mb-4">
                Growth n'impose rien. Il harmonise. Il sécurise. Il donne des clés pour transformer le travail en terrain d'expérience, de soutien et de croissance personnelle.
              </p>
              <p className="text-sm italic text-gray-500">
                "On ne te demande pas de tout mélanger. On t'ouvre juste une porte."  
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <div className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg"
            alt="Collaboration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </div>
        
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 text-white">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-light mb-6 leading-tight">
              GROWTH, la colonne vertébrale sociale et opérationnelle de votre entreprise
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              Donnez une âme à votre organisation. Connectez vos équipes, clarifiez vos missions, partagez la vision.
            </p>
            <button
              onClick={() => navigate('/dashboard-entreprise')}
              className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Créer mon espace entreprise
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Culture Transformation Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Pourquoi GROWTH transforme votre culture d'entreprise ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {cultureBullets.map((bullet, index) => (
              <div 
                key={index}
                className="bg-gray-50 p-8 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <bullet.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <p className="text-gray-700">{bullet.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Nine Pillars Section */}
      <div className="py-20 bg-gradient-to-br from-blue-50 to-rose-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Découvrez tout ce que vos collaborateurs pourront vivre avec GROWTH PRO
          </h2>
          <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
            Une plateforme complète qui réunit tous les aspects de la vie d'entreprise
          </p>

          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 mb-16 last:mb-0`}
            >
              <div className="w-full md:w-1/2">
                <div className="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
                  <pillar.icon className="w-12 h-12 text-blue-600 mb-6" />
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">
                    {pillar.title}
                  </h3>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>
            </div>
          ))}

          <div className="mt-20 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Donnez une voix et un socle à vos équipes
            </h3>
            <button
              onClick={() => navigate('/dashboard-entreprise')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Créer mon espace entreprise
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center gap-8 text-sm text-gray-500 mb-8">
            <a href="/mentions-legales" className="hover:text-gray-700">
              Mentions légales
            </a>
            <a href="/confidentialite" className="hover:text-gray-700">
              Politique de confidentialité
            </a>
            <a href="/contact" className="hover:text-gray-700">
              Contact
            </a>
          </div>
          <p className="flex items-center justify-center gap-2 text-gray-600">
            Créé avec <Heart className="w-5 h-5 text-red-500" /> pour faire grandir les humains
          </p>
        </div>
      </footer>
    </div>
  );
}