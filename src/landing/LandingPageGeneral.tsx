import { useNavigate } from 'react-router-dom';
import { Heart, ArrowRight, Users, Brain, Youtube, Smile, Lightbulb, MessageCircle, Trophy } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default function LandingPageGeneral() {
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const [hasCompletedTest, setHasCompletedTest] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkTestStatus = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data } = await supabase
            .from('users')
            .select('growth_completed_at')
            .eq('id', user.id)
            .single();

          setHasCompletedTest(!!data?.growth_completed_at);
        } else {
          setHasCompletedTest(null); // User not logged in
        }
      } catch (error) {
        console.error('Error checking test status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkTestStatus();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100', 'translate-y-0');
        }
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const bubbles = [
    { icon: Brain, text: 'Développement personnel' },
    { icon: Trophy, text: 'Reconnaissance entre collègues' },
    { icon: Youtube, text: 'Formations YouTube de qualité' },
    { icon: Smile, text: 'Bien-être pro/perso' },
    { icon: Lightbulb, text: 'Projets inspirants' },
    { icon: MessageCircle, text: 'Communication positive' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-rose-50">
      {/* Test Status Banner */}
      {hasCompletedTest === false && (
        <div className="fixed top-16 left-0 right-0 bg-blue-600 text-white py-3 px-4 z-40">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <p className="text-sm md:text-base">
              Passez le test GROWTH pour débloquer votre espace personnel !
            </p>
            <button
              onClick={() => navigate('/questionnaire')}
              className="px-4 py-1 bg-white text-blue-600 rounded-full text-sm font-medium hover:bg-blue-50 transition-colors"
            >
              Commencer le test
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div 
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/60" />
        
        <div 
          ref={heroRef}
          className="relative text-center px-4 transform transition-all duration-1000 opacity-0 translate-y-10"
        >
          <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
            Et si votre travail devenait un moteur de vie ?
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12">
            Ensemble, on est meilleurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!hasCompletedTest && (
              <button
                onClick={() => navigate('/questionnaire')}
                className="px-8 py-4 bg-white text-gray-800 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                Passer le test GROWTH
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => navigate('/entreprise')}
              className={`px-8 py-4 ${
                hasCompletedTest 
                  ? 'bg-white text-gray-800 hover:bg-gray-100'
                  : 'bg-transparent border-2 border-white text-white hover:bg-white/10'
              } rounded-full font-medium transition-colors shadow-lg`}
            >
              Découvrir l'espace entreprise
            </button>
          </div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="py-20 px-4 bg-white">
        <h2 className="text-2xl md:text-4xl text-center text-gray-800 mb-12 max-w-4xl mx-auto">
          GROWTH n'est pas un réseau social, GROWTH est votre lieu d'évolution.
        </h2>
        <div className="flex gap-6 overflow-x-auto pb-6 px-4 max-w-6xl mx-auto">
          {bubbles.map((bubble, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 h-48 rounded-full bg-gradient-to-br from-blue-50 to-rose-50 flex flex-col items-center justify-center p-6 text-center shadow-lg hover:transform hover:scale-105 transition-transform"
            >
              <bubble.icon className="w-8 h-8 text-blue-600 mb-3" />
              <p className="text-sm text-gray-700">{bubble.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-blue-50 to-rose-50">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-xl md:text-2xl text-gray-700 italic mb-8">
            "Grâce à GROWTH, j'ai retrouvé du sens dans mon travail, et même mes collègues m'ont aidé à atteindre mes objectifs de vie."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <img
              src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150"
              alt="Sophie Martin"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="font-medium text-gray-900">Sophie Martin</p>
              <p className="text-sm text-gray-600">Responsable Marketing</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => navigate('/entreprise')}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-left"
            >
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Je suis salarié ou dirigeant</h3>
              <p className="text-gray-600 mb-4">Découvrez l'espace pro et transformez votre entreprise</p>
              <span className="text-blue-600 flex items-center gap-2">
                En savoir plus <ArrowRight className="w-4 h-4" />
              </span>
            </button>
            <button
              onClick={() => navigate('/perso')}
              className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow text-left"
            >
              <Users className="w-12 h-12 text-rose-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Je suis un particulier</h3>
              <p className="text-gray-600 mb-4">Créez un groupe d'amis ou de famille</p>
              <span className="text-rose-600 flex items-center gap-2">
                Commencer gratuitement <ArrowRight className="w-4 h-4" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="flex items-center justify-center gap-2 text-gray-600 mb-8">
            Créé avec <Heart className="w-5 h-5 text-red-500" /> pour faire grandir les humains
          </p>
          <div className="flex justify-center gap-8 text-sm text-gray-500">
            <a href="/mentions-legales" className="hover:text-gray-700">Mentions légales</a>
            <a href="/confidentialite" className="hover:text-gray-700">Politique de confidentialité</a>
            <a href="/contact" className="hover:text-gray-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}