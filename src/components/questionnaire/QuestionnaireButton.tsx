import { Brain, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function QuestionnaireButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/questionnaire')}
      className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2 text-lg"
    >
      <Brain className="w-6 h-6" />
      Faire mon bilan bien-être GROWTH
      <ArrowRight className="w-5 h-5" />
    </button>
  );
}