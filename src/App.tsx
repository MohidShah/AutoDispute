import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './components/LandingPage';
import DashboardApp from './components/DashboardApp';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';
<<<<<<< HEAD
// Import the new separate pages
import BenefitsPage from './components/BenefitsPage';
import HowItWorksPage from './components/HowItWorksPage';
import PricingPage from './components/PricingPage';

function App() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'forgot-password' | 'dashboard' | 'benefits-page' | 'how-it-works-page' | 'pricing-page'>('landing');

  useEffect(() => {
    if (!isLoading) {
      // Removed the automatic redirection to dashboard when user is logged in
      // This allows accessing the dashboard without login for demo purposes
    }
  }, [isLoading]);
=======

function App() {
  const { user, isLoading } = useAuth();
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'forgot-password' | 'dashboard'>('landing');

  useEffect(() => {
    if (!isLoading) {
      if (user && currentView === 'landing') {
        setCurrentView('dashboard');
      } else if (!user && currentView === 'dashboard') {
        setCurrentView('landing');
      }
    }
  }, [user, isLoading, currentView]);
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714

  const handleNavigate = (page: string) => {
    if (page === 'home') {
      setCurrentView('landing');
    } else if (page === 'login') {
      setCurrentView('login');
    } else if (page === 'signup') {
      setCurrentView('signup');
    } else if (page === 'forgot-password') {
      setCurrentView('forgot-password');
    } else if (page === 'dashboard') {
<<<<<<< HEAD
      // Allow access to dashboard without login for demo purposes
      setCurrentView('dashboard');
    } else if (page === 'benefits-page') {
      setCurrentView('benefits-page');
    } else if (page === 'how-it-works-page') {
      setCurrentView('how-it-works-page');
    } else if (page === 'pricing-page') {
      setCurrentView('pricing-page');
=======
      if (user) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('login');
      }
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {currentView === 'landing' && <LandingPage onNavigate={handleNavigate} />}
      {currentView === 'login' && <LoginPage onNavigate={handleNavigate} />}
      {currentView === 'signup' && <SignupPage onNavigate={handleNavigate} />}
      {currentView === 'forgot-password' && <ForgotPasswordPage onNavigate={handleNavigate} />}
<<<<<<< HEAD
      {currentView === 'dashboard' && <DashboardApp onLogout={() => { setCurrentView('landing'); }} onNavigate={handleNavigate} />}
      {currentView === 'benefits-page' && <BenefitsPage onNavigate={handleNavigate} />}
      {currentView === 'how-it-works-page' && <HowItWorksPage onNavigate={handleNavigate} />}
      {currentView === 'pricing-page' && <PricingPage onNavigate={handleNavigate} />}
=======
      {currentView === 'dashboard' && user && <DashboardApp onLogout={() => { setCurrentView('landing'); }} onNavigate={handleNavigate} />}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714

      {!user && currentView === 'landing' && (
        <button
          onClick={() => setCurrentView('login')}
          className="fixed top-20 right-8 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-sm rounded-lg shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-colors z-50"
        >
          Sign In
        </button>
      )}
    </div>
  );
}

<<<<<<< HEAD
export default App;
=======
export default App;
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
