import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './layout/Header';
import LandingPageGeneral from './landing/LandingPageGeneral';
import LandingPro from './landing/LandingPro';
import LandingPerso from './landing/LandingPerso';
import HomePro from './pages/HomePro';
import HugoAdvice from './pages/HugoAdvice';
import GrowthQuestionnaire from './components/questionnaire/GrowthQuestionnaire';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-blue-50">
        <Header />
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<LandingPageGeneral />} />
            <Route path="/entreprise" element={<LandingPro />} />
            <Route path="/perso" element={<LandingPerso />} />
            <Route path="/dashboard-entreprise" element={<HomePro />} />
            <Route path="/testimonials/hugo" element={<HugoAdvice />} />
            <Route path="/questionnaire" element={<GrowthQuestionnaire />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}