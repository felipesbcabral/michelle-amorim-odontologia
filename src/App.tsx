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
        className="fixed inset-0 z-0 bg-gradient-to-br from-royal-950 via-indigo-950 to-purple-950"
        style={{ minHeight: '100vh' }}
      />
      
      {/* Disney Constellations Background */}
      <DisneyConstellations />

      {/* Sound Toggle */}
      <SoundToggle />

      {/* Additional Background Effects */}
      <FloatingParticles />
      <div className="fixed inset-0 grid-pattern opacity-30 z-0 pointer-events-none" />
      <div className="fixed inset-0 stars-bg opacity-40 z-0 pointer-events-none" />

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

      {/* Vignette Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-20"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(15, 23, 42, 0.4) 100%)'
        }}
      />
    </div>
  );
}

export default App;
