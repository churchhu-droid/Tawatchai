import React from 'react';
import { X, Printer, Download, Check, Building2, FlaskConical, Calculator } from 'lucide-react';
import { PROFESSOR_PROFILE } from '../data/professorData';

interface BudgetProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  proposalData: any;
}

export const BudgetProposalModal: React.FC<BudgetProposalModalProps> = ({
  isOpen,
  onClose,
  proposalData,
}) => {
  if (!isOpen || !proposalData) return null;

  const {
    chemicals,
    chemicalsSubtotal,
    evaluationModules,
    evaluationSubtotal,
    stipendConfig,
    stipendSubtotal,
    grandTotal,
    activePreset,
  } = proposalData;

  const selectedChemicals = chemicals.filter((c: any) => c.selected);
  const selectedEvaluations = evaluationModules.filter((m: any) => m.selected);

  const handlePrint = () => {
    window.print();
  };

  const currentDate = new Date().toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Top Bar (Non-printed controls) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-sm">แบบฟอร์มประมาณการงบประมาณวิจัย (Print Preview)</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-md text-xs font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>พิมพ์เอกสาร (Print / PDF)</span>
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-md cursor-pointer transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Academic Document Body */}
        <div className="p-8 sm:p-12 text-slate-800 space-y-6">
          
          {/* Institutional Document Header */}
          <div className="border-b-2 border-slate-900 pb-6 text-center">
            <div className="text-sm font-semibold uppercase tracking-widest text-slate-500">
              FACULTY OF PHARMACY · SILPAKORN UNIVERSITY
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              แบบฟอร์มประมาณการงบประมาณโครงการวิจัยและพัฒนาตำรับยา
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              สาขาวิชาเภสัชกรรมอุตสาหการ คณะเภสัชศาสตร์ มหาวิทยาลัยศิลปากร วิทยาเขตพระราชวังสนามจันทร์
            </p>
            <div className="mt-3 text-xs font-mono text-slate-500 flex items-center justify-center gap-4">
              <span>วันที่จัดทำเอกสาร: {currentDate}</span>
              <span>·</span>
              <span>อาจารย์ที่ปรึกษา: {PROFESSOR_PROFILE.nameTh}</span>
            </div>
          </div>

          {/* Project & Advisory Info Block */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div>
              <span className="text-slate-400 block">อาจารย์ที่ปรึกษาโครงการ (Academic Advisor):</span>
              <span className="font-bold text-slate-900 text-sm">{PROFESSOR_PROFILE.nameTh} ({PROFESSOR_PROFILE.academicTitleEn})</span>
              <p className="text-slate-600 mt-0.5">{PROFESSOR_PROFILE.departmentTh}, {PROFESSOR_PROFILE.facultyTh}</p>
              <p className="font-mono text-slate-500 mt-0.5">Email: {PROFESSOR_PROFILE.email}</p>
            </div>
            <div>
              <span className="text-slate-400 block">ระดับโครงการ / วัตถุประสงค์การประมาณการ:</span>
              <span className="font-bold text-slate-900 text-sm">
                {activePreset === 'senior-project'
                  ? 'โครงงานวิจัยระดับปริญญาตรี (Rx Senior Project)'
                  : activePreset === 'graduate-thesis'
                  ? 'งานวิจัยวิทยานิพนธ์ระดับบัณฑิตศึกษา (M.Sc. / Ph.D. Thesis)'
                  : 'โครงการพัฒนาตำรับยาและเวชสำอางร่วมภาคอุตสาหกรรม (Industry Prototype)'}
              </span>
              <p className="text-slate-600 mt-0.5">ระบบนำส่งยาแบบก่อเจลในร่างกายและการประเมินคุณสมบัติทางเคมีกายภาพ</p>
            </div>
          </div>

          {/* Section 1: Itemized Chemicals & Consumables */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-3">
              <h3 className="font-bold text-sm text-slate-900">
                1. ค่าสารเคมีและอุปกรณ์พื้นฐานในการเตรียมตำรับ (ช่วงประมาณการ 10,000 – 20,000 บาท)
              </h3>
              <span className="font-mono font-bold text-sm text-slate-900">
                {chemicalsSubtotal.toLocaleString()} บาท
              </span>
            </div>

            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">ลำดับ</th>
                  <th className="py-2 px-3">รายการสารเคมี / อุปกรณ์สิ้นเปลือง</th>
                  <th className="py-2 px-3 text-center">หน่วยบรรจุ</th>
                  <th className="py-2 px-3 text-right">ราคาต่อหน่วย</th>
                  <th className="py-2 px-3 text-center">จำนวน</th>
                  <th className="py-2 px-3 text-right">จำนวนเงิน (บาท)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedChemicals.map((item: any, index: number) => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">
                      {item.nameTh}
                      <span className="block text-[10px] text-slate-400 font-mono">{item.nameEn}</span>
                    </td>
                    <td className="py-2 px-3 text-center text-slate-600">{item.unit}</td>
                    <td className="py-2 px-3 text-right font-mono-numbers">{item.unitPrice.toLocaleString()}</td>
                    <td className="py-2 px-3 text-center font-mono-numbers">{item.quantity}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      {(item.unitPrice * item.quantity).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-slate-900">
                <tr>
                  <td colSpan={5} className="py-2 px-3 text-right">รวมค่าสารเคมีและอุปกรณ์เตรียมตำรับ:</td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-800">{chemicalsSubtotal.toLocaleString()} บาท</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Section 2: Formulation Evaluation Modules */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-3">
              <h3 className="font-bold text-sm text-slate-900">
                2. ค่าสารเคมีและอุปกรณ์ในการประเมินคุณสมบัติตำรับยา (Formulation Characterization)
              </h3>
              <span className="font-mono font-bold text-sm text-slate-900">
                {evaluationSubtotal.toLocaleString()} บาท
              </span>
            </div>

            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2 px-3">ลำดับ</th>
                  <th className="py-2 px-3">การทดสอบคุณสมบัติทางเคมีกายภาพ</th>
                  <th className="py-2 px-3">เครื่องมือวิเคราะห์หลัก</th>
                  <th className="py-2 px-3">สารเคมี/วัสดุเฉพาะการทดสอบ</th>
                  <th className="py-2 px-3 text-right">ค่าบริการ/ชุด (บาท)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {selectedEvaluations.map((mod: any, index: number) => (
                  <tr key={mod.id} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono text-slate-500">{index + 1}</td>
                    <td className="py-2 px-3 font-medium text-slate-900">{mod.nameTh}</td>
                    <td className="py-2 px-3 text-slate-600">{mod.equipmentUsed}</td>
                    <td className="py-2 px-3 text-slate-500 text-[11px]">{mod.requiredReagents}</td>
                    <td className="py-2 px-3 text-right font-mono font-bold text-slate-900">
                      {mod.cost.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 border-t border-slate-200 font-bold text-slate-900">
                <tr>
                  <td colSpan={4} className="py-2 px-3 text-right">รวมค่าประเมินตำรับยา:</td>
                  <td className="py-2 px-3 text-right font-mono text-emerald-800">{evaluationSubtotal.toLocaleString()} บาท</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Section 3: Hourly Stipend Breakdown */}
          <div>
            <div className="flex items-center justify-between border-b border-slate-300 pb-2 mb-3">
              <h3 className="font-bold text-sm text-slate-900">
                3. ค่าเบี้ยเลี้ยงรายชั่วโมงผู้ช่วยวิจัย (Research Assistant Hourly Stipend)
              </h3>
              <span className="font-mono font-bold text-sm text-slate-900">
                {stipendSubtotal.toLocaleString()} บาท
              </span>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-xs">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-slate-400 block">อัตราต่อชั่วโมง:</span>
                  <span className="font-bold font-mono text-slate-900">{stipendConfig.hourlyRate} บาท/ชั่วโมง</span>
                </div>
                <div>
                  <span className="text-slate-400 block">ชั่วโมงต่อสัปดาห์:</span>
                  <span className="font-bold font-mono text-slate-900">{stipendConfig.hoursPerWeek} ชม./สัปดาห์</span>
                </div>
                <div>
                  <span className="text-slate-400 block">ระยะเวลาดำเนินงาน:</span>
                  <span className="font-bold font-mono text-slate-900">{stipendConfig.projectDurationWeeks} สัปดาห์</span>
                </div>
                <div>
                  <span className="text-slate-400 block">จำนวนผู้ช่วยวิจัย:</span>
                  <span className="font-bold font-mono text-slate-900">{stipendConfig.numberOfAssistants} คน</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between font-mono text-xs">
                <span>
                  รวมทั้งสิ้น {stipendConfig.hoursPerWeek * stipendConfig.projectDurationWeeks * stipendConfig.numberOfAssistants} ชั่วโมงวิจัย
                </span>
                <span className="font-bold text-emerald-800">
                  รวมค่าเบี้ยเลี้ยง: {stipendSubtotal.toLocaleString()} บาท
                </span>
              </div>
            </div>
          </div>

          {/* Grand Total Summary Box */}
          <div className="p-4 bg-emerald-900 text-white rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <span className="text-xs uppercase font-mono text-emerald-200 tracking-wider">
                ยอดรวมงบประมาณโครงการวิจัยทั้งสิ้น (Grand Total Research Budget)
              </span>
              <p className="text-xs text-emerald-100 mt-0.5">
                (ค่าสารเคมีและอุปกรณ์ + ค่าตรวจประเมินตำรับยา + ค่าเบี้ยเลี้ยงรายชั่วโมง)
              </p>
            </div>
            <div className="text-2xl sm:text-3xl font-bold font-mono-numbers text-white">
              {grandTotal.toLocaleString()} <span className="text-xs font-normal text-emerald-200">บาท (THB)</span>
            </div>
          </div>

          {/* Endorsement & Signatures Block */}
          <div className="pt-8 grid grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-12">
              <p className="text-slate-600">ลงชื่อ .............................................................. ผู้เสนอโครงการ</p>
              <div>
                <p className="font-semibold text-slate-800">( .............................................................. )</p>
                <p className="text-slate-500">นักศึกษา / ผู้ขอรับทุนวิจัย</p>
              </div>
            </div>

            <div className="space-y-12">
              <p className="text-slate-600">ลงชื่อ .............................................................. อาจารย์ที่ปรึกษา</p>
              <div>
                <p className="font-semibold text-slate-800">( ศ. ดร. ภก.ธวัชชัย แพชมัด )</p>
                <p className="text-slate-500">อาจารย์ประจำสาขาวิชาเภสัชกรรมอุตสาหการ</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
