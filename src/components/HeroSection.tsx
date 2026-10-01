import React from 'react';
import { Mail, MapPin, ExternalLink, Calculator, BookOpen, Microscope, Sparkles } from 'lucide-react';
import { PROFESSOR_PROFILE } from '../data/professorData';

// Timestamped asset generated via generate_image tool
import profPortrait from '../assets/images/prof_thawatchai_portrait_1790837944167.jpg';
import labHeroBg from '../assets/images/pharmaceutical_lab_hero_1790837958241.jpg';

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenConsultation: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onScrollToSection, onOpenConsultation }) => {
  return (
    <section id="hero" className="relative bg-white border-b border-slate-200 overflow-hidden">
      {/* Subtle background ambient banner */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
        <img
          src={labHeroBg}
          alt="Pharmaceutical Technology Laboratory Background"
          className="w-full h-full object-cover filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12 sm:pt-14 sm:pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Academic Credentials & Identity (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed institutional metadata kicker */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-800">
              <span>{PROFESSOR_PROFILE.facultyTh}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span>{PROFESSOR_PROFILE.universityTh}</span>
              <span aria-hidden="true" className="text-slate-300">/</span>
              <span>{PROFESSOR_PROFILE.departmentTh}</span>
            </div>

            {/* Professor Name & Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-tight">
                {PROFESSOR_PROFILE.nameTh}
              </h1>
              <p className="mt-2 text-lg sm:text-xl font-medium text-slate-600">
                {PROFESSOR_PROFILE.nameEn}
              </p>
              <div className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-emerald-900 bg-emerald-50/80 px-3 py-1 rounded border border-emerald-200">
                <span className="w-2 h-2 rounded-full bg-emerald-600" />
                <span>ตำแหน่งทางวิชาการ: {PROFESSOR_PROFILE.academicTitleTh} ({PROFESSOR_PROFILE.academicTitleEn})</span>
              </div>
            </div>

            {/* Scholarly Bio Summary */}
            <p className="text-base text-slate-700 leading-relaxed">
              ผู้เชี่ยวชาญระดับแนวหน้าด้านการพัฒนานวัตกรรมระบบนำส่งยาแบบก่อเจลในร่างกาย (In Situ Forming Gels / Matrices) 
              การนำส่งยารักษาโรคปริทันต์ในช่องปาก การควบคุมการปลดปล่อยยาด้วยเมทริกซ์พอลิเมอร์ 
              และการยกระดับตำรับยาไทยและเวชสำอางธรรมชาติ สู่มาตรฐานสากล
            </p>

            {/* Contact Details & Official Scopus Link */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div className="truncate">
                  <span className="text-xs text-slate-400 block">อีเมลติดต่อราชการ</span>
                  <a
                    href={`mailto:${PROFESSOR_PROFILE.email}`}
                    className="font-mono text-xs font-semibold text-emerald-800 hover:underline"
                  >
                    {PROFESSOR_PROFILE.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-slate-400 block">ที่ตั้งห้องปฏิบัติการ</span>
                  <span className="text-xs text-slate-700">อาคาร 4 คณะเภสัชศาสตร์ ม.ศิลปากร วิทยาเขตพระราชวังสนามจันทร์</span>
                </div>
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => onScrollToSection('budget-calculator')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                <span>ประเมินงบประมาณสารเคมี & ตำรับยา</span>
              </button>

              <button
                onClick={() => onScrollToSection('publications')}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white hover:bg-slate-100 border border-slate-300 rounded-lg transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-slate-500" />
                <span>ดูผลงานวิจัย 205 เรื่อง</span>
              </button>

              <a
                href={PROFESSOR_PROFILE.scopusUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors"
              >
                <span>Scopus Profile</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column: Professor Portrait & Official Card (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl p-3 border border-slate-200 shadow-md">
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100">
                <img
                  src={profPortrait}
                  alt="ศาสตราจารย์ ดร. ภก.ธวัชชัย แพชมัด"
                  className="w-full h-full object-cover object-top"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent pointer-events-none" />
                
                {/* Bottom caption overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <p className="text-xs font-mono text-emerald-200 uppercase tracking-wider">Faculty of Pharmacy, Silpakorn University</p>
                  <p className="text-sm font-semibold">ศ. ดร. ภก.ธวัชชัย แพชมัด</p>
                </div>
              </div>

              {/* Research Focus Summary pill-free */}
              <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600 flex items-center justify-between">
                <span>สาขาวิชาเภสัชกรรมอุตสาหการ</span>
                <span className="font-semibold text-emerald-800">Silpakorn Pharmacy</span>
              </div>
            </div>
          </div>

        </div>

        {/* Scopus Verified Metrics Bar (Anti-Slop, Clean Tabular Numerals) */}
        <div id="profile" className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                สถิติและผลกระทบทางวิชาการ (Official Scopus Metrics)
              </h2>
              <p className="text-xs text-slate-500">ข้อมูลอ้างอิงจากฐานข้อมูลสากล Scopus เมื่อ {PROFESSOR_PROFILE.scopusStats.lastUpdated}</p>
            </div>
            <a
              href={PROFESSOR_PROFILE.scopusUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-900"
            >
              <span>ตรวจสอบสถิติบน Scopus Direct</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Metric 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">h-index (Scopus)</p>
              <p className="text-3xl font-bold font-mono-numbers text-slate-900 mt-1">
                {PROFESSOR_PROFILE.scopusStats.hIndex}
              </p>
              <p className="text-xs text-emerald-700 mt-1 font-medium">ระดับแนวหน้าของไทย</p>
            </div>

            {/* Metric 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Documents</p>
              <p className="text-3xl font-bold font-mono-numbers text-slate-900 mt-1">
                {PROFESSOR_PROFILE.scopusStats.totalDocuments}
              </p>
              <div className="text-xs text-slate-500 mt-1 flex items-center gap-1.5">
                <span>{PROFESSOR_PROFILE.scopusStats.articles} วารสารวิจัย</span>
                <span aria-hidden="true">·</span>
                <span>{PROFESSOR_PROFILE.scopusStats.conferencePapers} การประชุม</span>
              </div>
            </div>

            {/* Metric 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Citations</p>
              <p className="text-3xl font-bold font-mono-numbers text-slate-900 mt-1">
                {PROFESSOR_PROFILE.scopusStats.totalCitations.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">ยอดการอ้างอิงทั่วโลก</p>
            </div>

            {/* Metric 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Cited Documents</p>
              <p className="text-3xl font-bold font-mono-numbers text-slate-900 mt-1">
                {PROFESSOR_PROFILE.scopusStats.citedDocuments.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 mt-1">ผลงานที่ได้รับการอ้างถึง</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
