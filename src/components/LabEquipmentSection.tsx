import React from 'react';
import { Microscope, Activity, ArrowRight, Gauge, Layers, Eye } from 'lucide-react';
import { LAB_INSTRUMENTS } from '../data/professorData';

// Timestamped asset generated via generate_image tool
import evalDeviceImg from '../assets/images/formulation_eval_device_1790837973346.jpg';

interface LabEquipmentSectionProps {
  onScrollToBudget: () => void;
}

export const LabEquipmentSection: React.FC<LabEquipmentSectionProps> = ({ onScrollToBudget }) => {
  return (
    <section id="instruments" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Laboratory Facilities & Characterization Infrastructure
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              เครื่องมือวิจัยและอุปกรณ์ประเมินตำรับยาขั้นสูง
            </h2>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              ห้องปฏิบัติการวิจัยเภสัชกรรมอุตสาหการ คณะเภสัชศาสตร์ มหาวิทยาลัยศิลปากร 
              เพียบพร้อมด้วยเครื่องมือวิเคราะห์ทางเคมีกายภาพสำหรับการประเมินตำรับยาแบบก่อเจลในร่างกาย 
              การวัดแรงฉีด ความหนืด การปลดปล่อยยา และการซึมผ่านเนื้อเยื่อตามมาตรฐานเภสัชตำรับสากล
            </p>
          </div>

          <div className="lg:col-span-5 flex justify-end">
            <div className="w-full max-w-sm rounded-xl overflow-hidden border border-slate-200 shadow-xs relative">
              <img
                src={evalDeviceImg}
                alt="Formulation Characterization & Franz Diffusion Cells"
                className="w-full h-48 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-3 bg-slate-900 text-white text-xs">
                <span className="font-semibold block text-emerald-300">Formulation Testing Rig</span>
                <span className="text-slate-300 text-[11px]">ชุดทดสอบ Franz Diffusion & Texture Injectability</span>
              </div>
            </div>
          </div>
        </div>

        {/* Instruments Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LAB_INSTRUMENTS.map((inst, index) => (
            <div
              key={inst.id}
              className="bg-slate-50 rounded-xl border border-slate-200 p-5 hover:border-emerald-300 hover:bg-white transition-all shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                  <span className="font-mono text-emerald-800 font-semibold">LAB-EQ-0{index + 1}</span>
                  <span className="text-[11px] text-slate-400">อัตราเฉลี่ย ~{inst.hourlyRateEstimate} ฿/ชม.</span>
                </div>

                <h3 className="text-base font-bold text-slate-900">
                  {inst.nameTh}
                </h3>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {inst.nameEn}
                </p>

                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  {inst.purposeTh}
                </p>
              </div>

              {/* Applications List */}
              <div className="mt-4 pt-3 border-t border-slate-200/80">
                <span className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                  การประยุกต์ใช้ในการประเมินตำรับยา:
                </span>
                <ul className="space-y-1 text-xs text-slate-600">
                  {inst.applications.map((app) => (
                    <li key={app} className="flex items-start gap-1.5">
                      <span className="text-emerald-700 font-bold">›</span>
                      <span>{app}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}

          {/* Quick link box to Budget Estimator */}
          <div className="bg-emerald-900 text-white rounded-xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-300 font-semibold">
                Formulation Budget Estimator
              </div>
              <h3 className="text-xl font-bold mt-2 text-white">
                ต้องการประมาณการงบสารเคมีและค่าตรวจประเมินตำรับยา?
              </h3>
              <p className="text-xs text-emerald-100 mt-2 leading-relaxed">
                ระบบคำนวณงบประมาณสารเคมีและอุปกรณ์ (ช่วง 10,000 - 20,000 บาท) 
                พร้อมค่าประเมินตำรับยา และค่าเบี้ยเลี้ยงรายชั่วโมงสำหรับโครงการวิจัย ป.ตรี / ป.โท / ป.เอก
              </p>
            </div>

            <button
              onClick={onScrollToBudget}
              className="mt-6 inline-flex items-center justify-between w-full px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              <span>เปิดระบบคำนวณงบประมาณ</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
