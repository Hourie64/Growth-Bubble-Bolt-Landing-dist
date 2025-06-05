import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Video, MessageCircle, ArrowRight, History, RefreshCw, PencilLine } from 'lucide-react';
import { Radar } from 'react-chartjs-2';
import { createClient } from '@supabase/supabase-js';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  gender: string;
  familyStatus: string;
  children: string;
  profession: string;
  jobTitle: string;
  growth_completed_at: string | null;
  growth_results: any;
};

type RadarData = {
  physical: number;
  emotional: number;
  social: number;
  esteem: number;
  motivation: number;
  professional: number;
};

type TestHistory = {
  date: string;
  data: RadarData;
};

const genderLabels: Record<string, string> = {
  'H': 'Homme',
  'F': 'Femme',
  'A': 'Autre',
  'N': 'Non précisé'
};

const familyStatusLabels: Record<string, string> = {
  'single': 'Célibataire',
  'couple': 'En couple',
  'married': 'Marié(e)',
  'divorced': 'Divorcé(e)',
  'widowed': 'Veuf(ve)'
};

const professionLabels: Record<string, string> = {
  'student': 'Étudiant',
  'employee': 'Employé',
  'executive': 'Cadre',
  'freelance': 'Indépendant',
  'retired': 'Retraité'
};

export default function UserProfile() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to safely get initials
  const getInitials = (firstName: string, lastName: string) => {
    const firstInitial = firstName && firstName.length > 0 ? firstName[0] : '';
    const lastInitial = lastName && lastName.length > 0 ? lastName[0] : '';
    return firstInitial + lastInitial || '?';
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/auth');
          return;
        }

        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        // Map database fields to UserData properties with default values
        setUserData({
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: data.email || '',
          age: data.age || 0,
          gender: data.gender || 'N',
          familyStatus: data.family_status || 'single',
          children: data.children || '0',
          profession: data.profession || 'employee',
          jobTitle: data.job_title || '',
          growth_completed_at: data.growth_completed_at,
          growth_results: data.growth_results
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleRetakeTest = async () => {
    if (showConfirmation) {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) throw new Error('User not authenticated');

        const { error } = await supabase
          .from('users')
          .update({
            growth_completed_at: null,
            growth_results: null
          })
          .eq('id', user.id);

        if (error) throw error;

        navigate('/questionnaire');
      } catch (error) {
        console.error('Error clearing results:', error);
      }
    } else {
      setShowConfirmation(true);
    }
  };

  if (isLoading || !userData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    );
  }

  const chartData = userData.growth_results ? {
    labels: [
      'Vitalité physique',
      'Équilibre émotionnel',
      'Relations sociales',
      'Estime & Sens',
      'Motivation & Vision',
      'Stabilité pro'
    ],
    datasets: [
      {
        label: 'Mon profil GROWTH',
        data: Object.values(userData.growth_results),
        backgroundColor: 'rgba(37, 99, 235, 0.2)',
        borderColor: 'rgba(37, 99, 235, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(37, 99, 235, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(37, 99, 235, 1)'
      }
    ]
  } : null;

  const chartOptions = {
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 5
      }
    },
    plugins: {
      legend: {
        display: false
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">
                  {getInitials(userData.firstName, userData.lastName)}
                </span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {userData.firstName} {userData.lastName}
                </h1>
                <p className="text-gray-600">{userData.jobTitle}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/profile/edit')}
              className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
            >
              <PencilLine className="w-4 h-4" />
              Modifier
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Informations personnelles</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Email</dt>
                  <dd className="text-gray-900">{userData.email}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Âge</dt>
                  <dd className="text-gray-900">{userData.age} ans</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Genre</dt>
                  <dd className="text-gray-900">{genderLabels[userData.gender]}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Situation familiale</dt>
                  <dd className="text-gray-900">{familyStatusLabels[userData.familyStatus]}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Enfants</dt>
                  <dd className="text-gray-900">{userData.children}</dd>
                </div>
              </dl>
            </div>
            
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Informations professionnelles</h3>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm text-gray-500">Catégorie socio-professionnelle</dt>
                  <dd className="text-gray-900">{professionLabels[userData.profession]}</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-500">Poste actuel</dt>
                  <dd className="text-gray-900">{userData.jobTitle}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        {/* GROWTH Results Section */}
        {userData.growth_completed_at ? (
          <>
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">Votre radar GROWTH</h2>
                {showConfirmation ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleRetakeTest}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors shadow"
                    >
                      Confirmer
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleRetakeTest}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow inline-flex items-center gap-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Repasser le test
                  </button>
                )}
              </div>
              
              <div className="text-sm text-gray-600 mb-4">
                Dernier test complété le {new Date(userData.growth_completed_at).toLocaleDateString()}
              </div>

              {chartData && (
                <div className="aspect-square max-w-xl mx-auto">
                  <Radar data={chartData} options={chartOptions} />
                </div>
              )}
            </div>

            {/* Recommendations Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Vos recommandations personnalisées
              </h2>
              
              <div className="space-y-6">
                <div className="p-6 bg-blue-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Brain className="w-8 h-8 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-blue-900 mb-2">Conseil prioritaire</h3>
                      <p className="text-blue-800">
                        Concentrez-vous sur votre équilibre émotionnel cette semaine. 
                        Prenez 10 minutes chaque matin pour méditer ou respirer profondément.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <Video className="w-8 h-8 text-gray-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-gray-900 mb-2">Contenu suggéré</h3>
                      <a 
                        href="#"
                        className="text-blue-600 hover:underline flex items-center gap-2"
                      >
                        "5 exercices de respiration pour gérer son stress"
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-rose-50 rounded-xl">
                  <div className="flex items-start gap-4">
                    <MessageCircle className="w-8 h-8 text-rose-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-rose-900 mb-2">Question introspective</h3>
                      <p className="text-rose-800">
                        Qu'est-ce qui vous donne le plus d'énergie dans votre travail actuel ?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <Brain className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Découvrez votre profil GROWTH
            </h2>
            <p className="text-gray-600 mb-6">
              Répondez à notre questionnaire pour obtenir une analyse personnalisée de votre bien-être
            </p>
            <button
              onClick={() => navigate('/questionnaire')}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow inline-flex items-center gap-2"
            >
              Commencer le questionnaire
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}