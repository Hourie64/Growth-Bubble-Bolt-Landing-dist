import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { 
  MessageCircle, 
  Calendar, 
  CheckSquare, 
  Users, 
  Heart, 
  Brain,
  Plane,
  Coffee,
  Target,
  ArrowRight,
  Youtube,
  CheckCircle,
  Sparkles
} from 'lucide-react';

export default function LandingPerso() {
  const navigate = useNavigate();
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [projectType, setProjectType] = useState('');
  const [duration, setDuration] = useState('');
  const [needs, setNeeds] = useState<string[]>([]);

  const prompts = [
    "Je veux arrêter de fumer",
    "Je prépare un voyage à Barcelone",
    "Je veux reprendre le sport 3x/semaine",
    "On organise un EVJF",
    "J'aimerais mieux gérer mon temps"
  ];

  // Auto-rotate prompts
  useState(() => {
    const interval = setInterval(() => {
      setCurrentPromptIndex((prev) => (prev + 1) % prompts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const problems = [
    {
      problem: "Discussions éclatées (WhatsApp, mails…)",
      solution: "Espace centralisé",
      icon: MessageCircle
    },
    {
      problem: "Pas de suivi des idées",
      solution: "Todo, calendrier partagé",
      icon: Calendar
    },
    {
      problem: "Oubli des tâches",
      solution: "Rappels doux, suivi auto",
      icon: CheckSquare
    },
    {
      problem: "Mauvaise répartition",
      solution: "Gestion des rôles",
      icon: Users
    },
    {
      problem: "Pas d'inspiration",
      solution: "Contenus inspirants",
      icon: Brain
    },
    {
      problem: "Manque de sens",
      solution: "Vision et valeurs partagées",
      icon: Heart
    }
  ];

  const lifeGoals = [
    "Je veux arrêter de fumer",
    "Je veux mieux m'organiser",
    "Je veux reprendre confiance",
    "Je veux me remettre au sport"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-rose-50">
      {/* Hero Section */}
      <div 
        className="relative min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-light text-white mb-8 leading-tight">
            Et si organiser sa vie devenait un plaisir ?
          </h1>
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg inline-flex items-center gap-2"
          >
            Lancer mon projet avec GROWTH
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* AI Assistant Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Et si une app comprenait vraiment ce que tu vis ?
          </h2>
          <p className="text-xl text-gray-600 mb-12 leading-relaxed">
            Growth ne sert pas juste à organiser.<br />
            Il comprend ce que tu vis.<br />
            Tape une envie, un besoin, un défi…<br />
            et l'IA t'organise un espace adapté en quelques secondes.
          </p>
          <div className="bg-gray-50 p-6 rounded-xl shadow-inner mb-8">
            <p className="text-2xl text-blue-600 font-light animate-fade-in">
              "{prompts[currentPromptIndex]}"
            </p>
          </div>
          <button
            onClick={() => navigate('/auth')}
            className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Créer mon espace de vie
          </button>
        </div>
      </div>

      {/* Life Management Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-white via-rose-50/30 to-blue-50/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-6 animate-pulse" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Et si une application t'aidait à devenir la meilleure version de toi-même ?
            </h2>
            <p className="text-xl text-gray-600">
              GROWTH t'écoute, te comprend, t'oriente.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Exprime ton besoin</h3>
              <ul className="space-y-3">
                {lifeGoals.map((goal, index) => (
                  <li key={index} className="flex items-center gap-3 text-gray-700">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    {goal}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-4">GROWTH te répond avec</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span>Un plan d'action personnalisé</span>
                </li>
                <li className="flex items-start gap-3">
                  <Youtube className="w-5 h-5 text-red-600 flex-shrink-0 mt-1" />
                  <span>Des vidéos YouTube de qualité (sélection humaine)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <span>Des outils adaptés : planning, tracker, checklist, etc.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
                  <span>Et si besoin : un professionnel validé par notre équipe</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center space-y-6">
            <p className="text-xl text-gray-600">
              GROWTH devient ton compagnon de progression —<br />
              disponible le week-end, au travail, ou dans les moments où tu veux avancer.
            </p>
            <button
              onClick={() => navigate('/assistant')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Lancer mon assistant de vie
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Problems & Solutions Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-50 to-rose-50">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {problems.map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-4">
                  <item.icon className="w-6 h-6 text-blue-600 flex-shrink-0" />
                  <div>
                    <p className="text-gray-600 mb-2">{item.problem}</p>
                    <p className="text-lg font-medium text-gray-900">{item.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img
                src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg"
                alt="Happy couple planning"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <blockquote className="text-xl text-gray-700 italic mb-4">
                "Grâce à Growth, on a pu organiser notre mariage sans stress.
                Chacun avait ses tâches, et on a même ajouté nos photos après."
              </blockquote>
              <p className="text-gray-600">Marie & Thomas, jeunes mariés</p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive QCM Section */}
      <div className="py-20 px-4 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Crée ton espace gratuitement
          </h2>
          
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">
                Quel type de projet ou groupe veux-tu lancer ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Mariage', 'Équipe sportive', 'Coloc', 'Famille', 'Voyage', 'Autre'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setProjectType(type)}
                    className={`p-4 rounded-lg border transition-colors ${
                      projectType === type
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">
                Combien de temps va durer ce projet ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['1 jour', '1 week-end', '1 semaine', 'Long terme'].map((time) => (
                  <button
                    key={time}
                    onClick={() => setDuration(time)}
                    className={`p-4 rounded-lg border transition-colors ${
                      duration === time
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-medium mb-4">
                De quoi as-tu besoin ?
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[
                  'Tableau',
                  'Calendrier',
                  'Messagerie',
                  'Règles de groupe',
                  'Documents',
                  'Portefeuille partagé'
                ].map((need) => (
                  <button
                    key={need}
                    onClick={() => setNeeds(prev => 
                      prev.includes(need)
                        ? prev.filter(n => n !== need)
                        : [...prev, need]
                    )}
                    className={`p-4 rounded-lg border transition-colors ${
                      needs.includes(need)
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-200 hover:border-blue-600'
                    }`}
                  >
                    {need}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/auth')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
              >
                Lancer mon espace avec IA
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="py-20 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">
            Et si tu te servais de GROWTH tous les jours ?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/auth')}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg"
            >
              Créer mon groupe maintenant
            </button>
            <button
              onClick={() => navigate('/entreprise')}
              className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors"
            >
              En parler à mon entreprise
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