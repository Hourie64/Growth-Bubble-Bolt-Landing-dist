import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star } from 'lucide-react';

type Dimension = {
  id: string;
  name: string;
  score: number;
};

export default function SelfAssessment() {
  const navigate = useNavigate();
  const [dimensions, setDimensions] = useState<Dimension[]>([
    { id: 'physical', name: 'Vitalité physique', score: 0 },
    { id: 'emotional', name: 'Équilibre émotionnel', score: 0 },
    { id: 'social', name: 'Relations sociales', score: 0 },
    { id: 'esteem', name: 'Estime de soi & Sens', score: 0 },
    { id: 'motivation', name: 'Motivation & Vision', score: 0 },
    { id: 'professional', name: 'Stabilité professionnelle', score: 0 },
  ]);

  const handleRating = (dimensionId: string, rating: number) => {
    setDimensions(dimensions.map(dim => 
      dim.id === dimensionId ? { ...dim, score: rating } : dim
    ));
  };

  const handleSubmit = () => {
    // Here you would typically save the self-assessment scores
    navigate('/questionnaire/growth');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Avant de commencer, comment vous évaluez-vous sur ces 6 axes ?
        </h1>
        <p className="text-gray-600 text-center mb-8">
          Donnez une note de 1 à 5 étoiles pour chaque dimension
        </p>

        <div className="space-y-8">
          {dimensions.map((dimension) => (
            <div key={dimension.id} className="space-y-2">
              <label className="block text-lg font-medium text-gray-700">
                {dimension.name}
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleRating(dimension.id, rating)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        rating <= dimension.score
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button
            onClick={handleSubmit}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg"
          >
            Continuer vers le questionnaire GROWTH
          </button>
        </div>
      </div>
    </div>
  );
}