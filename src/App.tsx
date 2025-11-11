import { useState } from 'react';
import LandingPage from './components/LandingPage';
import DashboardApp from './components/DashboardApp';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  return (
    <div>
      {showDashboard ? (
        <DashboardApp />
      ) : (
        <LandingPage />
      )}

      <button
        onClick={() => setShowDashboard(!showDashboard)}
        className="fixed top-20 right-8 px-4 py-2 bg-gray-800 text-white text-sm rounded-lg shadow-lg hover:bg-gray-700 transition-colors z-50"
      >
        {showDashboard ? 'View Landing Page' : 'View Dashboard'}
      </button>
    </div>
  );
}

export default App;
