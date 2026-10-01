import React, { useState } from 'react';
import { Menu, X, FileSpreadsheet, Send, ExternalLink, Award } from 'lucide-react';

interface NavbarProps {
  onOpenConsultation: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConsultation, onScrollToSection }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-left font-bold text-slate-900 tracking-tight text-lg hover:text-emerald-800 transition-colors whitespace-nowrap shrink-0"
          >
            ศ. ดร. ภก.ธวัชชัย แพชมัด
          </button>

          {/* Zone 2: 4-6 clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-600">
            <button
              onClick={() => handleNavClick('profile')}
              className="hover:text-emerald-800 transition-colors py-1 hover:border-b-2 hover:border-emerald-600 whitespace-nowrap"
            >
              ประวัติและสังกัด
            </button>
            <button
              onClick={() => handleNavClick('expertise')}
              className="hover:text-emerald-800 transition-colors py-1 hover:border-b-2 hover:border-emerald-600 whitespace-nowrap"
            >
              ความเชี่ยวชาญ
            </button>
            <button
              onClick={() => handleNavClick('publications')}
              className="hover:text-emerald-800 transition-colors py-1 hover:border-b-2 hover:border-emerald-600 whitespace-nowrap"
            >
              ผลงานวิจัย (Scopus)
            </button>
            <button
              onClick={() => handleNavClick('instruments')}
              className="hover:text-emerald-800 transition-colors py-1 hover:border-b-2 hover:border-emerald-600 whitespace-nowrap"
            >
              เครื่องมือวิจัย
            </button>
            <button
              onClick={() => handleNavClick('budget-calculator')}
              className="text-emerald-800 font-semibold hover:text-emerald-950 transition-colors py-1 border-b-2 border-emerald-600 whitespace-nowrap"
            >
              คำนวณงบวิจัยและตำรับยา
            </button>
          </nav>

          {/* Zone 3: 1-2 primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('budget-calculator')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors whitespace-nowrap border border-emerald-200"
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>ประมาณการงบประมาณ</span>
            </button>
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-md transition-colors whitespace-nowrap shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>ขอคำปรึกษาวิจัย</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={() => handleNavClick('budget-calculator')}
              className="px-2.5 py-1 text-xs font-medium text-emerald-800 bg-emerald-50 rounded-md border border-emerald-200"
            >
              งบประมาณ
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            onClick={() => handleNavClick('profile')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            ประวัติอาจารย์และสังกัด
          </button>
          <button
            onClick={() => handleNavClick('expertise')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            ความเชี่ยวชาญ & เทคโนโลยีนำส่งยา
          </button>
          <button
            onClick={() => handleNavClick('publications')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            ผลงานวิจัยและตีพิมพ์ (Scopus 205 เรื่อง)
          </button>
          <button
            onClick={() => handleNavClick('instruments')}
            className="block w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
          >
            เครื่องมือวิทยาศาสตร์ในห้องปฏิบัติการ
          </button>
          <button
            onClick={() => handleNavClick('budget-calculator')}
            className="block w-full text-left px-3 py-2 text-sm font-semibold text-emerald-800 bg-emerald-50 rounded-md"
          >
            เครื่องคำนวณงบสารเคมี & ประเมินตำรับยา (10,000 - 20,000 บาท)
          </button>
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full text-center px-4 py-2 text-sm font-medium text-white bg-emerald-800 hover:bg-emerald-900 rounded-md"
            >
              ติดต่อขอรับคำปรึกษาและเสนอหัวข้อวิจัย
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
