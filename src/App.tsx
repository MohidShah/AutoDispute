import { useState } from 'react';
import LandingPage from './components/LandingPage';
import DashboardApp from './components/DashboardApp';
import LoginPage from './components/Auth/LoginPage';
import SignupPage from './components/Auth/SignupPage';
import ForgotPasswordPage from './components/Auth/ForgotPasswordPage';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'signup' | 'forgot-password' | 'dashboard'>('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleSignup = () => {
    setIsAuthenticated(true);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentView('landing');
  };

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
      if (isAuthenticated) {
        setCurrentView('dashboard');
      } else {
        setCurrentView('login');
      }
    }
  };

  return (
    <div>
      {currentView === 'landing' && <LandingPage />}
      {currentView === 'login' && <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />}
      {currentView === 'signup' && <SignupPage onNavigate={handleNavigate} onSignup={handleSignup} />}
      {currentView === 'forgot-password' && <ForgotPasswordPage onNavigate={handleNavigate} />}
      {currentView === 'dashboard' && isAuthenticated && <DashboardApp onLogout={handleLogout} />}

      {!isAuthenticated && currentView === 'landing' && (
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

export default App;
