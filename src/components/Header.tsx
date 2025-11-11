import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  const navLinks = ['Hero', 'Benefits', 'How It Works', 'Pricing', 'FAQ'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 bg-[#F5F7FA] transition-shadow duration-300 ${
        isScrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-[#1E1E2F]">AutoDispute</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="text-[#1E1E2F] hover:text-[#3366FF] transition-colors duration-200 text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <button className="px-6 py-2.5 bg-[#3366FF] text-white rounded-lg font-medium hover:bg-[#28C76F] transition-all duration-200 shadow-sm hover:shadow-md transform hover:-translate-y-0.5">
              Start Free Trial
            </button>
          </div>

          <button
            className="md:hidden text-[#1E1E2F]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#E0E6ED]">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className="block text-[#1E1E2F] hover:text-[#3366FF] transition-colors duration-200 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link}
              </a>
            ))}
            <button className="w-full px-6 py-2.5 bg-[#3366FF] text-white rounded-lg font-medium hover:bg-[#28C76F] transition-colors duration-200">
              Start Free Trial
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
