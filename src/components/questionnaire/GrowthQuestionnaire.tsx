import { useState, useCallback } from 'react';
import { ArrowLeft, Brain, Heart, Users, Star, Target, Briefcase, RefreshCw } from 'lucide-react';

type Question = {
  id: number;
  text: string;
  category: 'physical' | 'emotional' | 'social' | 'esteem' | 'motivation' | 'professional';
  isInverted?: boolean;
};

type CategoryResult = {
  score: number;
  interpretation: string;
  recommendations: string[];
};

const categoryLabels = {
  physical: 'Santé Physique',
  emotional: 'Équilibre Émotionnel',
  social: 'Relations Sociales',
  esteem: 'Estime de Soi & Sens',
  motivation: 'Motivation & Vision',
  professional: 'Stabilité Professionnelle'
};

const categoryIcons = {
  physical: Heart,
  emotional: Brain,
  social: Users,
  esteem: Star,
  motivation: Target,
  professional: Briefcase
};

const generateQuestionsForCategory = (category: string): Question[] => {
  switch (category) {
    case 'physical':
      return [
        { id: 1, text: "Je déborde d'énergie tout au long de la journée", category: "physical" },
        { id: 2, text: "Mon sommeil est réparateur et de qualité", category: "physical" },
        { id: 3, text: "Il m'arrive souvent de sauter des repas", category: "physical", isInverted: true },
        { id: 4, text: "Je me sens en forme physiquement", category: "physical" },
        { id: 5, text: "Je ressens une fatigue chronique", category: "physical", isInverted: true },
        { id: 6, text: "Je prends suffisamment soin de mon corps", category: "physical" },
        { id: 7, text: "Mon niveau d'énergie est stable au quotidien", category: "physical" },
        { id: 8, text: "Je maintiens un bon équilibre vie pro/perso", category: "physical" },
      ];
    case 'emotional':
      return [
        { id: 9, text: "Je gère bien mes émotions au quotidien", category: "emotional" },
        { id: 10, text: "Je me sens serein(e) la plupart du temps", category: "emotional" },
        { id: 11, text: "Je sais gérer mon stress efficacement", category: "emotional" },
        { id: 12, text: "Je suis optimiste pour l'avenir", category: "emotional" },
        { id: 13, text: "Je me sens en paix avec moi-même", category: "emotional" },
        { id: 14, text: "Je sais exprimer mes émotions", category: "emotional" },
        { id: 15, text: "Je gère bien les conflits", category: "emotional" },
        { id: 16, text: "Je suis à l'écoute de mes besoins émotionnels", category: "emotional" },
      ];
    case 'social':
      return [
        { id: 17, text: "J'ai des relations sociales satisfaisantes", category: "social" },
        { id: 18, text: "Je communique efficacement avec les autres", category: "social" },
        { id: 19, text: "Je me sens intégré(e) socialement", category: "social" },
        { id: 20, text: "J'ai un bon réseau de soutien", category: "social" },
        { id: 21, text: "Je participe à des activités sociales", category: "social" },
        { id: 22, text: "Je maintiens des amitiés durables", category: "social" },
        { id: 23, text: "Je suis à l'aise en groupe", category: "social" },
        { id: 24, text: "Je crée facilement des liens", category: "social" },
      ];
    case 'esteem':
      return [
        { id: 25, text: "J'ai confiance en moi", category: "esteem" },
        { id: 26, text: "Je me sens utile", category: "esteem" },
        { id: 27, text: "Je connais mes valeurs", category: "esteem" },
        { id: 28, text: "Je suis fier(e) de mes réalisations", category: "esteem" },
        { id: 29, text: "Je me sens respecté(e)", category: "esteem" },
        { id: 30, text: "J'ai un bon sens de ma valeur", category: "esteem" },
        { id: 31, text: "Je vis en accord avec mes valeurs", category: "esteem" },
        { id: 32, text: "Je me sens authentique", category: "esteem" },
      ];
    case 'motivation':
      return [
        { id: 33, text: "J'ai des objectifs clairs", category: "motivation" },
        { id: 34, text: "Je suis motivé(e) au quotidien", category: "motivation" },
        { id: 35, text: "J'ai des projets qui m'animent", category: "motivation" },
        { id: 36, text: "Je progresse vers mes objectifs", category: "motivation" },
        { id: 37, text: "Je suis passionné(e) par ce que je fais", category: "motivation" },
        { id: 38, text: "J'ai une vision claire de mon avenir", category: "motivation" },
        { id: 39, text: "Je prends des initiatives", category: "motivation" },
        { id: 40, text: "Je reste motivé(e) face aux obstacles", category: "motivation" },
      ];
    case 'professional':
      return [
        { id: 41, text: "Je suis satisfait(e) de mon travail", category: "professional" },
        { id: 42, text: "Je me sens compétent(e) professionnellement", category: "professional" },
        { id: 43, text: "J'ai des perspectives d'évolution", category: "professional" },
        { id: 44, text: "Je me sens stable dans mon emploi", category: "professional" },
        { id: 45, text: "Je suis reconnu(e) pour mon travail", category: "professional" },
        { id: 46, text: "J'ai un bon équilibre pro/perso", category: "professional" },
        { id: 47, text: "Je développe mes compétences", category: "professional" },
        { id: 48, text: "Je me sens épanoui(e) au travail", category: "professional" },
      ];
    default:
      return [];
  }
};

const getResultInterpretation = (score: number): string => {
  if (score >= 4.5) return "Excellent";
  if (score >= 4) return "Très bon";
  if (score >= 3.5) return "Bon";
  if (score >= 3) return "Moyen";
  if (score >= 2) return "À améliorer";
  return "Attention requise";
};

const getRecommendations = (category: string, score: number): string[] => {
  if (score >= 4) return [
    "Continuez sur cette lancée !",
    "Partagez votre expérience avec d'autres",
    "Fixez-vous de nouveaux défis"
  ];

  const recommendations: Record<string, string[]> = {
    physical: [
      "Établissez une routine de sommeil régulière",
      "Pratiquez une activité physique régulière",
      "Adoptez une alimentation équilibrée"
    ],
    emotional: [
      "Pratiquez la méditation ou la respiration profonde",
      "Tenez un journal émotionnel",
      "Consultez un professionnel si nécessaire"
    ],
    social: [
      "Rejoignez des groupes d'intérêt",
      "Planifiez des activités sociales régulières",
      "Développez vos compétences en communication"
    ],
    esteem: [
      "Célébrez vos petites victoires",
      "Fixez-vous des objectifs réalisables",
      "Travaillez sur votre dialogue intérieur"
    ],
    motivation: [
      "Définissez des objectifs SMART",
      "Visualisez votre réussite",
      "Trouvez un mentor ou un coach"
    ],
    professional: [
      "Identifiez vos opportunités d'évolution",
      "Développez de nouvelles compétences",
      "Élargissez votre réseau professionnel"
    ]
  };

  return recommendations[category] || [];
};

export default function GrowthQuestionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [showingResults, setShowingResults] = useState(false);
  const [currentCategory, setCurrentCategory] = useState('physical');
  const [questions, setQuestions] = useState(generateQuestionsForCategory('physical'));

  const categoryOrder = ['physical', 'emotional', 'social', 'esteem', 'motivation', 'professional'];

  const calculateResults = useCallback(() => {
    const results: Record<string, CategoryResult> = {};
    
    categoryOrder.forEach(category => {
      const categoryQuestions = generateQuestionsForCategory(category);
      const categoryAnswers = categoryQuestions.map(q => {
        const answer = answers[q.id] || 0;
        return q.isInverted ? 6 - answer : answer;
      });
      
      const score = categoryAnswers.reduce((a, b) => a + b, 0) / categoryAnswers.length;
      
      results[category] = {
        score,
        interpretation: getResultInterpretation(score),
        recommendations: getRecommendations(category, score)
      };
    });

    return results;
  }, [answers]);

  const handleAnswer = (rating: number) => {
    const question = questions[currentQuestion];
    setAnswers(prev => ({ ...prev, [question.id]: rating }));
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      const currentCategoryIndex = categoryOrder.indexOf(currentCategory);
      if (currentCategoryIndex < categoryOrder.length - 1) {
        const nextCategory = categoryOrder[currentCategoryIndex + 1];
        setCurrentCategory(nextCategory);
        setQuestions(generateQuestionsForCategory(nextCategory));
        setCurrentQuestion(0);
      } else {
        setShowingResults(true);
      }
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleRestartTest = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setCurrentCategory('physical');
    setQuestions(generateQuestionsForCategory('physical'));
    setShowingResults(false);
  };

  if (showingResults) {
    const results = calculateResults();
    const globalScore = Object.values(results).reduce((sum, r) => sum + r.score, 0) / 6;

    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Votre bilan GROWTH
            </h2>
            
            <div className="mb-8 text-center">
              <div className="text-5xl font-bold text-blue-600 mb-2">
                {globalScore.toFixed(1)}/5
              </div>
              <p className="text-xl text-gray-600">
                Score global
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {categoryOrder.map(category => {
                const result = results[category];
                const CategoryIcon = categoryIcons[category as keyof typeof categoryIcons];
                
                return (
                  <div key={category} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <CategoryIcon className="w-6 h-6 text-blue-600" />
                      <h3 className="text-lg font-medium text-gray-900">
                        {categoryLabels[category as keyof typeof categoryLabels]}
                      </h3>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {result.score.toFixed(1)}/5
                      </div>
                      <div className="text-blue-600 font-medium">
                        {result.interpretation}
                      </div>
                    </div>

                    <div className="space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <p key={index} className="text-gray-600 text-sm">
                          • {rec}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={handleRestartTest}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Refaire le test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const answerOptions = [
    { value: 1, label: 'Pas du tout' },
    { value: 2, label: 'Un peu' },
    { value: 3, label: 'Moyennement' },
    { value: 4, label: 'Beaucoup' },
    { value: 5, label: 'Totalement' }
  ];

  const totalQuestions = categoryOrder.reduce((acc, cat) => 
    acc + generateQuestionsForCategory(cat).length, 0
  );
  
  const completedQuestions = Object.keys(answers).length;
  const progress = (completedQuestions / totalQuestions) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="w-full bg-gray-200 h-1">
          <div 
            className="bg-blue-600 h-1 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="px-4 py-2 flex items-center justify-between">
          {currentQuestion > 0 && (
            <button
              onClick={handlePreviousQuestion}
              className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour
            </button>
          )}
          <div className="text-sm text-gray-600">
            {Math.round(progress)}% complété
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full p-4">
        <div className="mb-6 pt-4">
          <p className="text-blue-600 font-medium mb-2 text-center">
            {categoryLabels[questions[currentQuestion].category as keyof typeof categoryLabels]}
          </p>
          <h2 className="text-xl md:text-2xl font-medium text-gray-900 text-center">
            {questions[currentQuestion].text}
          </h2>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2">
          {answerOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleAnswer(option.value)}
              className="p-3 text-left rounded-lg border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-colors flex items-center justify-between group"
            >
              <span className="group-hover:text-blue-700">{option.label}</span>
              <span className="text-blue-600 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                {option.value}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}