import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import { Mail, Lock, Loader } from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Error message translations
const errorMessages: Record<string, string> = {
  'Invalid login credentials': 'Email ou mot de passe incorrect',
  'User already registered': 'Ce compte existe déjà. Essayez de vous connecter.',
  'Email not confirmed': 'Veuillez confirmer votre email avant de vous connecter',
  'Invalid email': 'Adresse email invalide',
  'Password is too short': 'Le mot de passe doit contenir au moins 6 caractères',
  'Email rate limit exceeded': 'Trop de tentatives, veuillez réessayer plus tard'
};

export default function AuthPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (type: 'signup' | 'signin') => {
    setIsLoading(true);
    setMessage('');
    setIsError(false);

    try {
      const { data: authData, error: authError } = type === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (authError) {
        setIsError(true);
        setMessage(errorMessages[authError.message] || authError.message);
        return;
      }

      if (!authData.user) {
        throw new Error('No user data returned');
      }

      // For sign up, we don't need to check growth status
      if (type === 'signup') {
        setMessage('Compte créé avec succès!');
        navigate('/questionnaire');
        return;
      }

      // For sign in, check if user has completed GROWTH test
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('growth_completed_at')
        .eq('id', authData.user.id)
        .single();

      if (userError) throw userError;

      setMessage('Connexion réussie!');
      
      // Redirect based on test completion
      if (userData?.growth_completed_at) {
        navigate('/profile');
      } else {
        navigate('/questionnaire');
      }
    } catch (error: any) {
      setIsError(true);
      setMessage(errorMessages[error.message] || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Bienvenue sur GROWTH</h2>
          <p className="mt-2 text-gray-600">
            {isSignUp ? 'Créez votre compte' : 'Connectez-vous à votre compte'}
          </p>
        </div>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="vous@exemple.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg ${isError ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message}
            </div>
          )}

          <div className="flex flex-col gap-3">
            <button
              onClick={() => handleAuth(isSignUp ? 'signup' : 'signin')}
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {isSignUp ? 'Création en cours...' : 'Connexion en cours...'}
                </>
              ) : (
                isSignUp ? 'Créer mon compte' : 'Me connecter'
              )}
            </button>
            
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              type="button"
              className="w-full py-3 px-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {isSignUp ? 'J\'ai déjà un compte' : 'Créer un nouveau compte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}