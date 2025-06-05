import { PlayCircle, FileText, Calendar, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HugoAdvice() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              🧠 Le talent interne du mois : Hugo
            </h1>
            <p className="text-xl text-blue-600 italic mb-6">
              "Et si on humanisait nos scripts de relation client ?"
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/3">
              <div className="w-48 h-48 rounded-full overflow-hidden mx-auto">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg"
                  alt="Hugo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:w-2/3">
              <blockquote className="text-lg text-gray-700 mb-6">
                "Je n'ai pas fait d'école de commerce, mais je suis passionné par la relation client. 
                Chez Blue Valet, je travaille sur des scripts d'approche plus humains, plus impactants. 
                Si vous voulez découvrir comment on attire de nouveaux clients de manière naturelle et efficace, 
                je vous partage mes 3 clés..."
              </blockquote>
            </div>
          </div>
        </div>

        {/* Objectives Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            ➡️ Objectif : Transmettre l'expérience terrain d'Hugo à toute l'équipe
          </h2>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              🎯 Ce module vous permettra de :
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Améliorer vos prises de contact client
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Rendre vos relances plus efficaces
              </li>
              <li className="flex items-center gap-3 text-gray-700">
                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                Créer un lien humain dès le 1er échange
              </li>
            </ul>
          </div>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Video Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <PlayCircle className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              🎬 Vidéo explicative
            </h3>
            <p className="text-gray-600 mb-4">
              Hugo vous explique ses 3 techniques de communication impactante
            </p>
            <button
              onClick={() => navigate('/videos/hugo-techniques')}
              className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
            >
              Regarder la vidéo
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Resources Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <FileText className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📄 Ressources
            </h3>
            <p className="text-gray-600 mb-4">
              Scripts d'appel avant/après - Exemples concrets et modèles
            </p>
            <button
              onClick={() => navigate('/resources/hugo-scripts')}
              className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
            >
              Télécharger les scripts
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Workshop Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <Calendar className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              📆 Atelier pratique
            </h3>
            <p className="text-gray-600 mb-4">
              Session collective avec Hugo pour tester les nouvelles approches
            </p>
            <button
              onClick={() => navigate('/events/hugo-workshop')}
              className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
            >
              S'inscrire à l'atelier
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}