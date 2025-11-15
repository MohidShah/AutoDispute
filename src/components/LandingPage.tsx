import { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import Partners from './Partners';
import Benefits from './Benefits';
import HowItWorks from './HowItWorks';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import CTA from './CTA';
import Footer from './Footer';
import About from './About';
import Contact from './Contact';
import Blog from './Blog';
import Privacy from './Privacy';
import Terms from './Terms';
import Security from './Security';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

export default function LandingPage({ onNavigate }: LandingPageProps) {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigate = (page: string) => {
    if (page === 'login' || page === 'signup' || page === 'forgot-password' || page === 'dashboard') {
      onNavigate(page);
<<<<<<< HEAD
    } else if (page === 'benefits-page' || page === 'how-it-works-page' || page === 'pricing-page') {
      // Navigate to the separate pages
      onNavigate(page);
=======
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
    } else {
      setCurrentPage(page);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <About />
            <Footer onNavigate={handleNavigate} />
          </>
        );
      case 'contact':
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <Contact />
            <Footer onNavigate={handleNavigate} />
          </>
        );
      case 'blog':
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <Blog />
            <Footer onNavigate={handleNavigate} />
          </>
        );
      case 'privacy':
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <Privacy />
            <Footer onNavigate={handleNavigate} />
          </>
        );
      case 'terms':
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <Terms />
            <Footer onNavigate={handleNavigate} />
          </>
        );
      case 'security':
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <Security />
            <Footer onNavigate={handleNavigate} />
          </>
        );
      case 'home':
      default:
        return (
          <>
            <Header onNavigate={handleNavigate} />
            <Hero />
            <Partners />
            <Benefits />
            <HowItWorks />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTA />
            <Footer onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return <div className="min-h-screen bg-[#0A0D14]">{renderPage()}</div>;
<<<<<<< HEAD
}
=======
}
>>>>>>> 4c0ab23ab285bdc6612085aae4e1f6f50f30c714
