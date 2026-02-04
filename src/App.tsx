import { useState } from 'react';
import { 
  Navigation, 
  HeroSection, 
  TrustBadges,
  WorldsSection,
  TransformacoesSection,
  CommanderSection,
  TechArsenal,
  Testimonials,
  BlogPreview,
  FAQSection,
  Footer,
  FloatingParticles,
  WhatsAppFAB,
  DisneyConstellations,
  SoundToggle,
  LoadingScreen,
  MagicTicketModal,
} from './components';

function App() {
  // State for Magic Ticket Modal
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  // Function to open modal - will be passed to buttons
  const openTicketModal = () => setIsTicketModalOpen(true);
  const closeTicketModal = () => setIsTicketModalOpen(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-royal-950">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Magic Ticket Modal */}
      <MagicTicketModal 
        isOpen={isTicketModalOpen} 
        onClose={closeTicketModal} 
      />

      {/* Background Gradient - cobre toda a página */}
      <div 
        className="fixed inset-0 z-0"
        style={{ 
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)',
        }}
      />
      
      {/* Disney Constellations Background */}
      <DisneyConstellations />

      {/* Sound Toggle */}
      <SoundToggle />

      {/* Additional Background Effects - behind content */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <FloatingParticles />
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0 stars-bg opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation onAgendarClick={openTicketModal} />
        
        <main className="overflow-x-hidden">
          {/* Hero Section */}
          <section id="hero">
            <HeroSection onAgendarClick={openTicketModal} />
          </section>

          {/* Trust Badges - Credenciais */}
          <TrustBadges />

          {/* Worlds Section */}
          <section id="worlds">
            <WorldsSection />
          </section>

          {/* Transformações - Antes/Depois */}
          <TransformacoesSection />

          {/* Commander Section */}
          <section id="about">
            <CommanderSection />
          </section>

          {/* Tech Arsenal */}
          <section id="tech">
            <TechArsenal />
          </section>

          {/* Testimonials */}
          <section id="testimonials">
            <Testimonials />
          </section>

          {/* Blog Preview */}
          <BlogPreview />

          {/* FAQ Section */}
          <FAQSection />
        </main>

        {/* Footer com Mapa - Pass the modal opener */}
        <Footer onAgendarClick={openTicketModal} />
      </div>

      {/* WhatsApp FAB */}
      <WhatsAppFAB />

      {/* Vignette Overlay - very subtle */}
      <div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at 50% 50%, transparent 50%, rgba(15, 23, 42, 0.2) 100%)'
        }}
      />
    </div>
  );
}

export default App;
