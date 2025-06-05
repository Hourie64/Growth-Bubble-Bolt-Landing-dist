import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  age: string;
  gender: string;
  familyStatus: string;
  children: string;
  profession: string;
  jobTitle: string;
};

export default function SignupForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    age: '',
    gender: '',
    familyStatus: '',
    children: '',
    profession: '',
    jobTitle: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle form submission
    // For now, we'll just navigate to the self-assessment
    navigate('/questionnaire/self-assessment');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">
          Commencez votre bilan personnel gratuitement
        </h1>
        <p className="text-gray-600 text-center mb-8">
          C'est gratuit, sans engagement et vos données restent confidentielles. 
          Cela nous permet simplement de personnaliser votre expérience.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Prénom
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Âge
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="18"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
                Genre
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Sélectionner</option>
                <option value="H">Homme</option>
                <option value="F">Femme</option>
                <option value="A">Autre</option>
                <option value="N">Préfère ne pas dire</option>
              </select>
            </div>

            <div>
              <label htmlFor="familyStatus" className="block text-sm font-medium text-gray-700">
                Situation familiale
              </label>
              <select
                id="familyStatus"
                name="familyStatus"
                required
                value={formData.familyStatus}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Sélectionner</option>
                <option value="single">Célibataire</option>
                <option value="couple">En couple</option>
                <option value="married">Marié(e)</option>
                <option value="divorced">Divorcé(e)</option>
                <option value="widowed">Veuf(ve)</option>
              </select>
            </div>

            <div>
              <label htmlFor="children" className="block text-sm font-medium text-gray-700">
                Nombre d'enfants
              </label>
              <select
                id="children"
                name="children"
                required
                value={formData.children}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="0">0</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3 ou plus</option>
              </select>
            </div>

            <div>
              <label htmlFor="profession" className="block text-sm font-medium text-gray-700">
                Catégorie socio-professionnelle
              </label>
              <select
                id="profession"
                name="profession"
                required
                value={formData.profession}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="">Sélectionner</option>
                <option value="student">Étudiant</option>
                <option value="employee">Employé</option>
                <option value="executive">Cadre</option>
                <option value="freelance">Indépendant</option>
                <option value="retired">Retraité</option>
              </select>
            </div>

            <div>
              <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">
                Poste occupé
              </label>
              <input
                type="text"
                id="jobTitle"
                name="jobTitle"
                required
                value={formData.jobTitle}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Ex: Développeur web"
              />
            </div>
          </div>

          <div className="flex justify-center pt-6">
            <button
              type="submit"
              className="px-8 py-4 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors shadow-lg inline-flex items-center gap-2"
            >
              Commencer mon bilan
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}