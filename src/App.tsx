import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ResearchSection } from './components/ResearchSection';
import { LabEquipmentSection } from './components/LabEquipmentSection';
import { BudgetEstimator } from './components/BudgetEstimator';
import { BudgetProposalModal } from './components/BudgetProposalModal';
import { ConsultationModal } from './components/ConsultationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [proposalData, setProposalData] = useState<any>(null);

  const handleScrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenProposal = (data: any) => {
    setProposalData(data);
    setIsProposalModalOpen(true);
  };

  const handleOpenConsultation = () => {
    setIsConsultationModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* 3-Zone Top Navigation Bar */}
      <Navbar
        onOpenConsultation={handleOpenConsultation}
        onScrollToSection={handleScrollToSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Hero Section: Professor Profile, Academic Portrait & Scopus Metrics */}
        <HeroSection
          onScrollToSection={handleScrollToSection}
          onOpenConsultation={handleOpenConsultation}
        />

        {/* Core Research Expertise & Interactive Publications Explorer (205 Scopus Papers) */}
        <ResearchSection />

        {/* Laboratory Instrumentation & Characterization Facilities */}
        <LabEquipmentSection
          onScrollToBudget={() => handleScrollToSection('budget-calculator')}
        />

        {/* Formulation & Research Budget Estimator (10,000 - 20,000 THB Chemicals, Evaluation, Hourly Stipends) */}
        <BudgetEstimator
          onOpenProposalModal={handleOpenProposal}
          onOpenConsultation={handleOpenConsultation}
        />
      </main>

      {/* Institutional Footer */}
      <Footer />

      {/* Official Print/Export Budget Proposal Modal */}
      <BudgetProposalModal
        isOpen={isProposalModalOpen}
        onClose={() => setIsProposalModalOpen(false)}
        proposalData={proposalData}
      />

      {/* Research Supervision & Consultation Request Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        estimatedBudget={proposalData?.grandTotal || 35000}
      />
    </div>
  );
}
