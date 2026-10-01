import React, { useState, useMemo } from 'react';
import { Search, Filter, ExternalLink, BookCheck, FlaskConical, Beaker, CheckCircle2 } from 'lucide-react';
import { RESEARCH_AREAS, PUBLICATIONS_DATA } from '../data/professorData';

export const ResearchSection: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredPublications = useMemo(() => {
    return PUBLICATIONS_DATA.filter((pub) => {
      const matchesSearch =
        searchQuery === '' ||
        pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pub.journal.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesYear =
        selectedYear === 'all' || pub.year.toString() === selectedYear;

      const matchesCat =
        selectedCategory === 'all' || pub.category === selectedCategory;

      return matchesSearch && matchesYear && matchesCat;
    });
  }, [searchQuery, selectedYear, selectedCategory]);

  return (
    <section id="expertise" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Research Expertise & Innovation
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            ความเชี่ยวชาญและทิศทางงานวิจัยทางเภสัชกรรมอุตสาหการ
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            มุ่งเน้นการบูรณาการองค์ความรู้ด้านเคมีกายภาพของพอลิเมอร์ วัสดุชีวภาพจากธรรมชาติ 
            และเทคโนโลยีการแปรรูปยา เพื่อพัฒนาระบบนำส่งยาขั้นสูง (Advanced Drug Delivery Systems)
          </p>
        </div>

        {/* 4 Core Research Pillars Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {RESEARCH_AREAS.map((area, index) => (
            <div
              key={area.id}
              className="bg-white rounded-xl border border-slate-200 p-6 hover:border-emerald-300 transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-mono text-emerald-800 font-semibold">0{index + 1}. RESEARCH FOCUS</span>
                  <span>Industrial Pharmacy</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900">
                  {area.titleTh}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-0.5">
                  {area.titleEn}
                </p>

                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  {area.descriptionTh}
                </p>

                {/* Formulation Prototype Highlight */}
                <div className="mt-4 p-3 bg-emerald-50/60 rounded-lg border border-emerald-100">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900">
                    <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
                    <span>ตัวอย่างระบบและสูตรตำรับต้นแบบ (Representative Formulation):</span>
                  </div>
                  <p className="mt-1 font-mono text-xs text-emerald-800">
                    {area.sampleFormulation}
                  </p>
                </div>
              </div>

              {/* Keywords unboxed metadata */}
              <div className="mt-5 pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400 block mb-1">คีย์เวิร์ดงานวิจัย:</span>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600">
                  {area.keywords.map((kw, i) => (
                    <React.Fragment key={kw}>
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700">{kw}</span>
                      {i < area.keywords.length - 1 && <span className="text-slate-300">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Publications Explorer Section */}
        <div id="publications" className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Scopus Indexed Publications
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">
                ผลงานวิจัยตีพิมพ์ในวารสารวิชาการระดับนานาชาติ
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                รวมผลงาน 205 เรื่อง ในฐานข้อมูล Scopus (คัดเลือกผลงานวิจัยเด่นปี 2026, 2025 และผลงานที่มีการอ้างอิงสูง)
              </p>
            </div>

            {/* Total count indicator */}
            <div className="text-sm font-medium text-slate-600">
              แสดง <span className="font-bold text-emerald-800 font-mono-numbers">{filteredPublications.length}</span> จาก 205 ผลงาน
            </div>
          </div>

          {/* Search & Filter Controls */}
          <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อผลงาน, วารสาร, หรือตัวยา เช่น borneol, in situ, periodontal, clotrimazole..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>

              {/* Year filter buttons */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg">
                <button
                  onClick={() => setSelectedYear('all')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedYear === 'all'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  ทุกปี
                </button>
                <button
                  onClick={() => setSelectedYear('2026')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedYear === '2026'
                      ? 'bg-white text-emerald-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2026 (ล่าสุด)
                </button>
                <button
                  onClick={() => setSelectedYear('2025')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedYear === '2025'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2025
                </button>
                <button
                  onClick={() => setSelectedYear('2024')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                    selectedYear === '2024'
                      ? 'bg-white text-slate-900 shadow-xs font-semibold'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  2024
                </button>
              </div>
            </div>

            {/* Category filter tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs text-slate-600">
              <span className="text-slate-400 shrink-0 font-medium">หมวดหมู่:</span>
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === 'all' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                ทั้งหมด
              </button>
              <button
                onClick={() => setSelectedCategory('in-situ-gels')}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === 'in-situ-gels' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                In Situ Gels & Matrices
              </button>
              <button
                onClick={() => setSelectedCategory('periodontal')}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === 'periodontal' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                Periodontal & Dental Delivery
              </button>
              <button
                onClick={() => setSelectedCategory('controlled-release')}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === 'controlled-release' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                Matrix Tablets & Drug Release
              </button>
              <button
                onClick={() => setSelectedCategory('herbal-cosmetics')}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === 'herbal-cosmetics' ? 'bg-slate-900 text-white font-semibold' : 'bg-slate-100 hover:bg-slate-200'
                }`}
              >
                Herbal Extracts & In Situ Paint
              </button>
            </div>
          </div>

          {/* Publications List */}
          <div className="mt-4 space-y-3">
            {filteredPublications.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                <BookCheck className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-medium text-slate-700">ไม่พบผลงานวิจัยที่ตรงกับคำค้นหา</p>
                <p className="text-xs text-slate-400 mt-1">ลองเปลี่ยนคำค้นหาหรือเลือกหมวดหมู่อื่น</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedYear('all');
                    setSelectedCategory('all');
                  }}
                  className="mt-3 px-3 py-1.5 text-xs text-emerald-800 font-semibold bg-emerald-50 rounded border border-emerald-200"
                >
                  ล้างตัวกรองทั้งหมด
                </button>
              </div>
            ) : (
              filteredPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 transition-all shadow-xs"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1.5 flex-1">
                      
                      {/* Quiet Unboxed Metadata Bar */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                        <span className="font-mono font-semibold text-emerald-800">{pub.type}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-semibold text-slate-700">{pub.journal}</span>
                        <span aria-hidden="true">·</span>
                        <span className="font-mono-numbers">ปี {pub.year}</span>
                        {pub.volume && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-slate-500">Vol. {pub.volume}</span>
                          </>
                        )}
                        {pub.highlight && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="text-amber-800 font-semibold text-xs">Featured Research</span>
                          </>
                        )}
                      </div>

                      {/* Publication Title */}
                      <h4 className="text-base font-bold text-slate-900 leading-snug hover:text-emerald-900 transition-colors">
                        {pub.title}
                      </h4>

                      {/* Author Line */}
                      <p className="text-xs text-slate-500">
                        ศ. ดร. ภก.ธวัชชัย แพชมัด และคณะวิจัย · สาขาวิชาเภสัชกรรมอุตสาหการ คณะเภสัชศาสตร์ ม.ศิลปากร
                      </p>
                    </div>

                    {/* Citations metric & Scopus link */}
                    <div className="sm:text-right shrink-0 pt-1 sm:pt-0 border-t sm:border-t-0 border-slate-100 flex sm:flex-col items-center sm:items-end justify-between">
                      <div className="text-xs text-slate-500">
                        <span className="font-mono-numbers font-bold text-slate-900 text-sm">
                          {pub.citations}
                        </span>
                        <span className="ml-1 text-slate-400">อ้างอิง</span>
                      </div>
                      <a
                        href="https://www.scopus.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 text-xs font-semibold text-emerald-800 hover:text-emerald-950 inline-flex items-center gap-1"
                      >
                        <span>Scopus Entry</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
