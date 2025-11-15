import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string) => void;
}

export default function Header({ onNavigate }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  const navLinks = [
<<<<<<< HEAD
    { label: 'Benefits', id: 'benefits-page' },
    { label: 'How It Works', id: 'how-it-works-page' },
    { label: 'Pricing', id: 'pricing-page' },
=======
    { label: 'Benefits', id: 'benefits' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Pricing', id: 'pricing' },
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
    { label: 'About', id: 'about' },
    { label: 'Blog', id: 'blog' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    if (['about', 'blog', 'contact', 'privacy', 'terms', 'security'].includes(id)) {
      onNavigate(id);
<<<<<<< HEAD
    } else if (['benefits-page', 'how-it-works-page', 'pricing-page'].includes(id)) {
      // Navigate to the separate pages
      onNavigate(id);
=======
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
    } else {
      onNavigate('home');
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#0A0D14]/95 backdrop-blur-sm transition-all duration-300 ${
        isScrolled ? 'shadow-lg border-b border-gray-800' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl font-bold text-white">AutoDispute</span>
          </button>

          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="text-gray-300 hover:text-white transition-colors duration-200 text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

<<<<<<< HEAD
          <div className="hidden lg:flex items-center space-x-4">
            <button 
              onClick={() => onNavigate('login')}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              Sign In
            </button>
            <button 
              onClick={() => onNavigate('signup')}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg"
            >
=======
          <div className="hidden lg:block">
            <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg">
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
              Start Free Trial
            </button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A0D14] border-t border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-2"
              >
                {link.label}
              </button>
            ))}
<<<<<<< HEAD
            <div className="pt-4 border-t border-gray-700 space-y-3">
              <button 
                onClick={() => onNavigate('login')}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-200 py-2"
              >
                Sign In
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors duration-200"
              >
                Start Free Trial
              </button>
            </div>
=======
            <button className="w-full px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-cyan-700 transition-colors duration-200 mt-4">
              Start Free Trial
            </button>
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
          </div>
        </div>
      )}
    </header>
  );
<<<<<<< HEAD
}
=======
}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
