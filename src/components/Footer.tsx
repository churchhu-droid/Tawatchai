import React from 'react';
import { Mail, MapPin, ExternalLink, GraduationCap, Building2 } from 'lucide-react';
import { PROFESSOR_PROFILE } from '../data/professorData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Faculty & Department */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <GraduationCap className="w-5 h-5 text-emerald-400" />
              <span>คณะเภสัชศาสตร์ มหาวิทยาลัยศิลปากร</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              สาขาวิชาเภสัชกรรมอุตสาหการ มุ่งเน้นการสร้างสรรค์นวัตกรรมระบบนำส่งยา 
              เทคโนโลยีการตั้งสูตรตำรับ และการพัฒนาผลิตภัณฑ์ยาและเวชสำอางที่ได้มาตรฐานระดับสากล
            </p>
            <p className="text-slate-500 font-mono text-[11px]">
              Faculty of Pharmacy, Silpakorn University, Sanam Chandra Palace Campus, Nakhon Pathom, Thailand
            </p>
          </div>

          {/* Col 2: Professor Contact */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              ข้อมูลติดต่ออาจารย์
            </span>
            <div className="space-y-1.5 text-xs">
              <p className="text-slate-300 font-medium">{PROFESSOR_PROFILE.nameTh}</p>
              <p className="text-slate-400">{PROFESSOR_PROFILE.academicTitleTh} ({PROFESSOR_PROFILE.departmentTh})</p>
              <div className="flex items-center gap-1.5 text-slate-300 font-mono pt-1">
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <a href={`mailto:${PROFESSOR_PROFILE.email}`} className="hover:underline text-emerald-300">
                  {PROFESSOR_PROFILE.email}
                </a>
              </div>
              <div className="flex items-start gap-1.5 text-slate-400 pt-1">
                <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>ชั้น 4 อาคาร 4 คณะเภสัชศาสตร์ ม.ศิลปากร</span>
              </div>
            </div>
          </div>

          {/* Col 3: Academic Repositories */}
          <div className="space-y-2">
            <span className="text-white font-semibold block text-xs uppercase tracking-wider">
              แหล่งข้อมูลวิชาการ
            </span>
            <ul className="space-y-1.5">
              <li>
                <a
                  href={PROFESSOR_PROFILE.scopusUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>Scopus Author Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.pharmacy.su.ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>คณะเภสัชศาสตร์ ม.ศิลปากร</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.su.ac.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 inline-flex items-center gap-1 transition-colors"
                >
                  <span>มหาวิทยาลัยศิลปากร</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
          <p>© {new Date().getFullYear()} Faculty of Pharmacy, Silpakorn University. All rights reserved.</p>
          <p className="font-mono text-[11px]">
            Personnel ID: 5448 · Scopus h-index 31 (205 Documents)
          </p>
        </div>
      </div>
    </footer>
  );
};
