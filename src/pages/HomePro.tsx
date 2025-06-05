import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Brain, RefreshCw, Users, Rocket, Heart, BookOpen, Plane, Code, Building, Wallet, PlayCircle, MessageCircle, UserPlus } from 'lucide-react';

type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
};

type Employee = {
  id: string;
  name: string;
  role: string;
  quote: string;
  image_url: string;
};

export default function HomePro() {
  const navigate = useNavigate();
  const [projects] = useState<Project[]>([
    {
      id: '1',
      title: 'Amélioration QVT',
      description: 'Mise en place d\'espaces de détente et activités bien-être',
      image_url: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg'
    },
    {
      id: '2',
      title: 'Innovation RSE',
      description: 'Réduction de notre empreinte carbone et initiatives vertes',
      image_url: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg'
    },
    {
      id: '3',
      title: 'Formation Continue',
      description: 'Programme de mentorat et parcours d\'évolution',
      image_url: 'https://images.pexels.com/photos/3184317/pexels-photo-3184317.jpeg'
    }
  ]);

  const [featuredEmployee] = useState<Employee>({
    id: '1',
    name: 'Sophie Martin',
    role: 'Responsable Innovation',
    quote: 'GROWTH m\'a permis de mieux comprendre mes objectifs et de créer des liens plus forts avec mes collègues. C\'est un véritable catalyseur de bien-être au travail.',
    image_url: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg'
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blue Valet Introduction Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-start">
            {/* Logo */}
            <img
              src="https://www.bluevalet.fr/wp-content/uploads/2021/06/logo-blue-valet.png"
              alt="Blue Valet"
              className="h-12 mb-8"
            />
            
            {/* Main Title */}
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 max-w-3xl">
              Chez Blue Valet, on ne gare pas que des voitures. On fait avancer les gens.
            </h1>
            
            {/* Inspiring Paragraph */}
            <p className="text-xl text-gray-600 mb-12 max-w-3xl">
              Notre entreprise est née d'un défi logistique. Elle est devenue un projet humain.
              Ce qui nous anime chaque jour, c'est de créer un cadre de travail stimulant, respectueux, et évolutif.
            </p>
            
            {/* Values Section */}
            <div className="w-full space-y-8">
              <h2 className="text-2xl font-medium text-gray-900">Nos valeurs</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Trust */}
                <div className="flex items-start gap-4">
                  <RefreshCw className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Confiance</h3>
                    <p className="text-gray-600">
                      On confie à nos équipes ce qu'on confie à nos clients : ce qu'on a de plus précieux.
                    </p>
                  </div>
                </div>

                {/* Initiative */}
                <div className="flex items-start gap-4">
                  <Rocket className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Esprit d'initiative</h3>
                    <p className="text-gray-600">
                      L'autonomie est notre moteur. Ici, chacun peut proposer, tester, agir.
                    </p>
                  </div>
                </div>

                {/* Authentic Relationships */}
                <div className="flex items-start gap-4">
                  <Heart className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Relation authentique</h3>
                    <p className="text-gray-600">
                      Entre collègues, avec les clients, les partenaires. On fait simple, direct et humain.
                    </p>
                  </div>
                </div>

                {/* Continuous Learning */}
                <div className="flex items-start gap-4">
                  <BookOpen className="w-8 h-8 text-blue-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Apprentissage continu</h3>
                    <p className="text-gray-600">
                      On grandit tous ensemble. Par les erreurs, par les formations, par les autres.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Projects Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              📣 Voici les grands mouvements en cours dans notre entreprise.
            </h2>
            <p className="text-gray-600">Transparence et implication collective.</p>
          </div>

          <div className="space-y-4">
            {/* Biarritz Airport Project */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">✈️</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Nouveau site Blue Valet Aéroport Biarritz
                    </h3>
                    <p className="text-gray-600">
                      Recrutement en cours pour les équipes opérationnelles.<br />
                      📅 Ouverture prévue : septembre.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/projects/expansion')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Developer Hiring */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">👨‍💻</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Arrivée de Benoît – Développeur full stack
                    </h3>
                    <p className="text-gray-600">
                      Objectif : refonte totale du portail client + création de l'application mobile.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/projects/tech-innovation')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Pessac Site */}
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className="text-2xl flex-shrink-0">🏢</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Restructuration du site de Pessac
                    </h3>
                    <p className="text-gray-600">
                      Nouveau plan d'organisation interne + modernisation des bureaux.<br />
                      Un sondage Qualité de Vie au Travail a été lancé.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => navigate('/projects/organization-hr')}
                  className="text-blue-600 hover:text-blue-700"
                >
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Monthly Development Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                📊 Thème de développement du mois
              </h2>
              <p className="text-2xl text-blue-600 font-light">
                🧠 Ce mois-ci : <em>"On apprend à faire travailler notre argent"</em>
              </p>
            </div>

            <div className="text-center mb-12">
              <p className="text-xl text-gray-800 mb-2">
                Placer 100€/mois pendant 20 ans à 8% = <strong>59 295 €</strong>
              </p>
              <p className="text-lg text-blue-600">
                ➡️ Soit plus de <strong>35 000 € d'intérêts composés</strong>.
              </p>
              <p className="text-gray-600 mt-2">
                Ce n'est pas réservé aux experts. C'est accessible. Et c'est maintenant.
              </p>
            </div>

            {/* Quiz Card */}
            <div className="bg-blue-50 rounded-xl p-8 mb-12">
              <div className="flex items-start gap-4">
                <Brain className="w-10 h-10 text-blue-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    🧪 Mini-questionnaire rapide
                  </h3>
                  <p className="text-gray-600 mb-4">
                    ➡️ Objectif : mesurer votre niveau en finance personnelle.
                  </p>
                  <button
                    onClick={() => navigate('/quiz/finance')}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
                  >
                    Faire le test
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Resources Grid */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Video Resource */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <PlayCircle className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  📘 Mini-formation vidéo
                </h4>
                <p className="text-gray-600 mb-4">
                  Comprendre un ETF en 5 minutes
                </p>
                <button
                  onClick={() => navigate('/resources/etf-video')}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
                >
                  Voir la vidéo
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Discussion Group */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <MessageCircle className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  💬 Groupe discussion
                </h4>
                <p className="text-gray-600 mb-4">
                  "Finances Perso" - Échangez avec vos collègues
                </p>
                <button
                  onClick={() => navigate('/groups/finance')}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
                >
                  Rejoindre le groupe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Expert Session */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <UserPlus className="w-8 h-8 text-blue-600 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  🧠 Expert invité du mois
                </h4>
                <p className="text-gray-600 mb-4">
                  Masterclass avec Adrien (trader indépendant)
                </p>
                <button
                  onClick={() => navigate('/events/masterclass-finance')}
                  className="text-blue-600 hover:text-blue-700 inline-flex items-center gap-2"
                >
                  S'inscrire au live
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Employee Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-12">
              Collaborateur du mois
            </h2>
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-6">
                <img
                  src={featuredEmployee.image_url}
                  alt={featuredEmployee.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {featuredEmployee.name}
              </h3>
              <p className="text-blue-600 mb-6">{featuredEmployee.role}</p>
              <blockquote className="text-xl text-gray-600 italic max-w-2xl mb-8">
                "{featuredEmployee.quote}"
              </blockquote>
              <button
                onClick={() => navigate(`/testimonials/${featuredEmployee.id}`)}
                className="px-6 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors inline-flex items-center gap-2"
              >
                Lire son témoignage
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Hugo's Testimonial Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            🎤 Le mot d'Hugo – Mettre en lumière nos talents internes
          </h2>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
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
                <div className="text-4xl mb-6">💬</div>
                <blockquote className="text-xl text-gray-700 mb-6 leading-relaxed">
                  "Je n'ai pas fait d'école de commerce, mais je suis passionné par la relation client.
                  Chez Blue Valet, je travaille sur des scripts d'approche plus humains, plus impactants.
                  Si vous voulez découvrir comment on attire de nouveaux clients de manière naturelle et efficace, je vous partage mes 3 clés…"
                </blockquote>
                <p className="text-blue-600 font-medium">Hugo, conseiller relation client</p>
              </div>
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/testimonials/hugo')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
              >
                Découvrir les conseils d'Hugo
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}