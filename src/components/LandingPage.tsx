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

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Partners />
      <Benefits />
      <HowItWorks />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
