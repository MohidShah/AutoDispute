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

export default function LandingPage() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <About />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
      case 'contact':
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <Contact />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
      case 'blog':
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <Blog />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
      case 'privacy':
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <Privacy />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
      case 'terms':
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <Terms />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
      case 'security':
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <Security />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
      case 'home':
      default:
        return (
          <>
            <Header onNavigate={setCurrentPage} />
            <Hero />
            <Partners />
            <Benefits />
            <HowItWorks />
            <Pricing />
            <Testimonials />
            <FAQ />
            <CTA />
            <Footer onNavigate={setCurrentPage} />
          </>
        );
    }
  };

  return <div className="min-h-screen bg-[#0A0D14]">{renderPage()}</div>;
}
