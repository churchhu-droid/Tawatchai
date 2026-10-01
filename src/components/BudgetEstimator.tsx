import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Plus,
  Minus,
  Check,
  FileText,
  Copy,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Sliders,
  DollarSign,
  Clock,
  FlaskConical,
  Activity,
  Layers,
  Info,
} from 'lucide-react';
import {
  INITIAL_CHEMICALS,
  EVALUATION_MODULES,
  RESEARCH_PROJECT_PRESETS,
} from '../data/professorData';
import { ChemicalItem, EvaluationModule, HourlyStipendConfig } from '../types/faculty';

interface BudgetEstimatorProps {
  onOpenProposalModal: (budgetData: any) => void;
  onOpenConsultation: () => void;
}

export const BudgetEstimator: React.FC<BudgetEstimatorProps> = ({
  onOpenProposalModal,
  onOpenConsultation,
}) => {
  // 1. Chemicals state (Targeting 10,000 - 20,000 Baht range)
  const [chemicals, setChemicals] = useState<ChemicalItem[]>(INITIAL_CHEMICALS);

  // 2. Evaluation modules state
  const [evaluationModules, setEvaluationModules] = useState<EvaluationModule[]>(EVALUATION_MODULES);

  // 3. Hourly stipend state
  const [stipendConfig, setStipendConfig] = useState<HourlyStipendConfig>({
    hourlyRate: 100,
    hoursPerWeek: 8,
    projectDurationWeeks: 12,
    numberOfAssistants: 1,
    roleTitle: 'นักศึกษาผู้ช่วยวิจัย (Research Assistant)',
  });

  const [activePreset, setActivePreset] = useState<string>('senior-project');
  const [copied, setCopied] = useState(false);

  // Calculations
  const chemicalsSubtotal = useMemo(() => {
    return chemicals
      .filter((c) => c.selected)
      .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  }, [chemicals]);

  const evaluationSubtotal = useMemo(() => {
    return evaluationModules
      .filter((m) => m.selected)
      .reduce((sum, item) => sum + item.cost, 0);
  }, [evaluationModules]);

  const stipendSubtotal = useMemo(() => {
    return (
      stipendConfig.hourlyRate *
      stipendConfig.hoursPerWeek *
      stipendConfig.projectDurationWeeks *
      stipendConfig.numberOfAssistants
    );
  }, [stipendConfig]);

  const grandTotal = chemicalsSubtotal + evaluationSubtotal + stipendSubtotal;

  // Toggle chemical item
  const handleToggleChemical = (id: string) => {
    setChemicals((prev) =>
      prev.map((c) => (c.id === id ? { ...c, selected: !c.selected } : c))
    );
  };

  // Adjust chemical quantity
  const handleQuantityChange = (id: string, delta: number) => {
    setChemicals((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const newQty = Math.max(1, Math.min(10, c.quantity + delta));
          return { ...c, quantity: newQty };
        }
        return c;
      })
    );
  };

  // Toggle evaluation module
  const handleToggleModule = (id: string) => {
    setEvaluationModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, selected: !m.selected } : m))
    );
  };

  // Apply project level preset
  const handleApplyPreset = (presetId: string) => {
    const preset = RESEARCH_PROJECT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    setActivePreset(presetId);

    // Apply stipend config
    setStipendConfig(preset.stipendConfig);

    // Apply evaluation modules
    setEvaluationModules((prev) =>
      prev.map((m) => ({
        ...m,
        selected: preset.selectedModules.includes(m.id),
      }))
    );

    // Adjust chemicals roughly to target chemical budget
    if (preset.targetChemicalBudget <= 13000) {
      // Light preset
      setChemicals((prev) =>
        prev.map((c, i) => ({
          ...c,
          selected: i < 5,
          quantity: 1,
        }))
      );
    } else if (preset.targetChemicalBudget <= 19000) {
      // Medium thesis preset
      setChemicals((prev) =>
        prev.map((c, i) => ({
          ...c,
          selected: i < 7,
          quantity: 1,
        }))
      );
    } else {
      // Industry prototype
      setChemicals((prev) =>
        prev.map((c) => ({
          ...c,
          selected: true,
          quantity: c.id === 'chem-1' || c.id === 'chem-4' ? 2 : 1,
        }))
      );
    }
  };

  // Target range status for chemicals (10,000 - 20,000 THB)
  const isChemicalsInRange = chemicalsSubtotal >= 10000 && chemicalsSubtotal <= 20000;

  // Copy proposal text
  const handleCopySummary = () => {
    const selectedChems = chemicals
      .filter((c) => c.selected)
      .map((c) => `  - ${c.nameTh} (${c.quantity} ${c.unit}) = ${(c.unitPrice * c.quantity).toLocaleString()} บาท`)
      .join('\n');

    const selectedEvals = evaluationModules
      .filter((m) => m.selected)
      .map((m) => `  - ${m.nameTh} = ${m.cost.toLocaleString()} บาท`)
      .join('\n');

    const summaryText = `
=== แบบประมาณการงบประมาณโครงการวิจัยและประเมินตำรับยา ===
ที่ปรึกษาโครงการ: ศ. ดร. ภก.ธวัชชัย แพชมัด (สาขาวิชาเภสัชกรรมอุตสาหการ คณะเภสัชศาสตร์ ม.ศิลปากร)

1. ค่าสารเคมีและอุปกรณ์เตรียมตำรับ: ${chemicalsSubtotal.toLocaleString()} บาท (ช่วงประมาณการ 10,000 - 20,000 บาท)
${selectedChems}

2. ค่าสารเคมีและอุปกรณ์ในการประเมินตำรับยา: ${evaluationSubtotal.toLocaleString()} บาท
${selectedEvals}

3. ค่าเบี้ยเลี้ยงรายชั่วโมงผู้ช่วยวิจัย: ${stipendSubtotal.toLocaleString()} บาท
  - อัตรา ${stipendConfig.hourlyRate} บาท/ชม. × ${stipendConfig.hoursPerWeek} ชม./สัปดาห์ × ${stipendConfig.projectDurationWeeks} สัปดาห์ × ${stipendConfig.numberOfAssistants} คน
  - รวมชั่วโมงทำงาน: ${stipendConfig.hoursPerWeek * stipendConfig.projectDurationWeeks * stipendConfig.numberOfAssistants} ชั่วโมง

>>> ยอดรวมงบประมาณโครงการทั้งสิ้น: ${grandTotal.toLocaleString()} บาท
`.trim();

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleOpenProposal = () => {
    onOpenProposalModal({
      chemicals,
      chemicalsSubtotal,
      evaluationModules,
      evaluationSubtotal,
      stipendConfig,
      stipendSubtotal,
      grandTotal,
      activePreset,
    });
  };

  return (
    <section id="budget-calculator" className="py-14 bg-slate-100/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800">
            Formulation & Research Budget Estimator
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            ระบบคำนวณงบประมาณสารเคมี อุปกรณ์ประเมินตำรับยา และค่าเบี้ยเลี้ยง
          </h2>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">
            ออกแบบเฉพาะสำหรับโครงงานวิจัยทางเภสัชกรรมอุตสาหการ คณะเภสัชศาสตร์ มหาวิทยาลัยศิลปากร 
            เพื่อประมาณการค่าสารเคมีและอุปกรณ์ (ช่วง 10,000 – 20,000 บาท) ค่าตรวจประเมินคุณสมบัติของตำรับยา 
            และค่าเบี้ยเลี้ยงรายชั่วโมงตามระเบียบมหาวิทยาลัย
          </p>
        </div>

        {/* Project Level Presets (Quick Tabs) */}
        <div className="mt-6 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-2">
            เลือกเทมเพลตประมาณการตามระดับโครงการวิจัย (Quick Presets):
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {RESEARCH_PROJECT_PRESETS.map((preset) => {
              const isActive = activePreset === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleApplyPreset(preset.id)}
                  className={`text-left p-3.5 rounded-lg border transition-all cursor-pointer ${
                    isActive
                      ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-bold ${isActive ? 'text-emerald-950' : 'text-slate-900'}`}>
                      {preset.title}
                    </span>
                    {isActive && <Check className="w-4 h-4 text-emerald-700 shrink-0" />}
                  </div>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1">{preset.subtitle}</p>
                  <div className="mt-2 text-[11px] font-mono text-emerald-800 font-medium">
                    งบสารเคมีเป้าหมาย: ~{preset.targetChemicalBudget.toLocaleString()} ฿
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3 Main Configuration Columns / Sections */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: 3 Configuration Modules (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* MODULE 1: CHEMICALS & CONSUMABLES (10,000 - 20,000 BAHT) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">1</span>
                    <h3 className="text-lg font-bold text-slate-900">
                      ค่าสารเคมีและอุปกรณ์พื้นฐานในการเตรียมตำรับ
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 ml-8">
                    ช่วงงบประมาณที่กำหนด: <strong className="text-slate-800">10,000 - 20,000 บาท</strong> (พอลิเมอร์, สารก่อเจล, ตัวทำละลาย, ตัวยา และอุปกรณ์สิ้นเปลือง)
                  </p>
                </div>

                {/* Status Indicator */}
                <div className="sm:text-right ml-8 sm:ml-0">
                  <span className="text-xs text-slate-400 block">ยอดรวมหมวดสารเคมี</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">
                    {chemicalsSubtotal.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
                  </span>
                </div>
              </div>

              {/* Range verification alert badge */}
              <div className="mt-4 p-3 rounded-lg text-xs flex items-center justify-between gap-2 border bg-slate-50">
                <div className="flex items-center gap-2">
                  <Info className={`w-4 h-4 shrink-0 ${isChemicalsInRange ? 'text-emerald-700' : 'text-amber-700'}`} />
                  <span>
                    {isChemicalsInRange ? (
                      <span className="text-emerald-900 font-medium">
                        ยอดงบประมาณสารเคมีอยู่ในช่วงมาตรฐาน <strong>10,000 - 20,000 บาท</strong> เหมาะสมกับโครงงานวิจัย
                      </span>
                    ) : chemicalsSubtotal < 10000 ? (
                      <span className="text-amber-900">
                        งบสารเคมีปัจจุบันต่ำกว่าเกณฑ์ 10,000 บาท (แนะนำเพิ่มรายการสารสำคัญหรือปริมาณให้ครอบคลุมการทดลอง)
                      </span>
                    ) : (
                      <span className="text-amber-900">
                        งบสารเคมีเกิน 20,000 บาท (สามารถปรับลดจำนวนขวดหรือรายการที่ไม่จำเป็นเพื่อควบคุมให้อยู่ในงบ)
                      </span>
                    )}
                  </span>
                </div>
                <div className="font-mono text-[11px] font-semibold text-slate-600 whitespace-nowrap">
                  เป้าหมาย: 10,000 - 20,000 ฿
                </div>
              </div>

              {/* Chemical Items Table */}
              <div className="mt-4 divide-y divide-slate-100 border border-slate-100 rounded-lg overflow-hidden">
                {chemicals.map((chem) => (
                  <div
                    key={chem.id}
                    className={`p-3 text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors ${
                      chem.selected ? 'bg-white' : 'bg-slate-50/50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="checkbox"
                        checked={chem.selected}
                        onChange={() => handleToggleChemical(chem.id)}
                        className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600 cursor-pointer"
                        id={`check-${chem.id}`}
                      />
                      <div>
                        <label
                          htmlFor={`check-${chem.id}`}
                          className="font-semibold text-slate-900 cursor-pointer hover:text-emerald-900 block"
                        >
                          {chem.nameTh}
                        </label>
                        <span className="text-xs text-slate-500 font-mono block">
                          {chem.nameEn}
                        </span>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1.5">
                          <span>หน่วย: {chem.unit}</span>
                          <span aria-hidden="true">·</span>
                          <span className="font-mono-numbers">@{chem.unitPrice.toLocaleString()} ฿</span>
                          {chem.notes && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span className="text-slate-400">{chem.notes}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Quantity controls and row subtotal */}
                    <div className="flex items-center justify-between sm:justify-end gap-3 pl-7 sm:pl-0">
                      <div className="flex items-center gap-1 bg-slate-100 rounded-md p-0.5">
                        <button
                          onClick={() => handleQuantityChange(chem.id, -1)}
                          disabled={!chem.selected || chem.quantity <= 1}
                          className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-mono font-semibold text-xs text-slate-900">
                          {chem.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(chem.id, 1)}
                          disabled={!chem.selected || chem.quantity >= 10}
                          className="p-1 text-slate-600 hover:text-slate-900 disabled:opacity-30 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="font-mono font-bold text-slate-900 text-right min-w-[75px]">
                        {(chem.unitPrice * chem.quantity).toLocaleString()} ฿
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 2: FORMULATION EVALUATION (ค่าสารเคมีและอุปกรณ์ในการประเมินตำรับยา) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">2</span>
                    <h3 className="text-lg font-bold text-slate-900">
                      ค่าสารเคมีและอุปกรณ์ในการประเมินตำรับยา
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 ml-8">
                    การทดสอบคุณสมบัติทางเคมีกายภาพ การปลดปล่อยตัวยา การซึมผ่านเยื่อบุผิว และความคงสภาพ
                  </p>
                </div>

                <div className="sm:text-right ml-8 sm:ml-0">
                  <span className="text-xs text-slate-400 block">รวมค่าประเมินตำรับ</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">
                    {evaluationSubtotal.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
                  </span>
                </div>
              </div>

              {/* Evaluation Modules Selection */}
              <div className="mt-4 space-y-3">
                {evaluationModules.map((module) => (
                  <div
                    key={module.id}
                    onClick={() => handleToggleModule(module.id)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      module.selected
                        ? 'border-emerald-500 bg-emerald-50/30'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={module.selected}
                          onChange={() => {}} // Handled by parent div click
                          className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-600"
                        />
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {module.nameTh}
                          </h4>
                          <span className="text-xs text-slate-500 font-mono block">
                            {module.nameEn}
                          </span>
                          <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                            {module.descriptionTh}
                          </p>
                          <div className="mt-2 text-[11px] text-slate-500 flex flex-wrap gap-x-2 gap-y-1">
                            <span>เครื่องมือ: <strong className="text-slate-700">{module.equipmentUsed}</strong></span>
                            <span aria-hidden="true">·</span>
                            <span>สาร/วัสดุจำเป็น: <span className="text-slate-600">{module.requiredReagents}</span></span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono text-base font-bold text-emerald-900">
                          {module.cost.toLocaleString()} ฿
                        </div>
                        <span className="text-[10px] text-slate-400 block">ต่อชุดการทดลอง</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* MODULE 3: HOURLY STIPEND (ค่าเบี้ยเลี้ยงรายชั่วโมง) */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-900 font-bold text-xs flex items-center justify-center">3</span>
                    <h3 className="text-lg font-bold text-slate-900">
                      ค่าเบี้ยเลี้ยงรายชั่วโมง (Hourly Research Assistant Stipend)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 ml-8">
                    ค่าตอบแทนนักศึกษาช่วยงานวิจัย / ผู้ช่วยวิจัยตามระเบียบมหาวิทยาลัยศิลปากร
                  </p>
                </div>

                <div className="sm:text-right ml-8 sm:ml-0">
                  <span className="text-xs text-slate-400 block">รวมค่าเบี้ยเลี้ยง</span>
                  <span className="text-xl font-bold font-mono-numbers text-slate-900">
                    {stipendSubtotal.toLocaleString()} <span className="text-xs font-normal text-slate-500">บาท</span>
                  </span>
                </div>
              </div>

              {/* Stipend Interactive Controls Grid */}
              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Control 1: Hourly Rate */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    อัตราค่าตอบแทน (บาท/ชม.)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={60}
                      max={300}
                      step={10}
                      value={stipendConfig.hourlyRate}
                      onChange={(e) =>
                        setStipendConfig({
                          ...stipendConfig,
                          hourlyRate: Math.max(0, parseInt(e.target.value) || 0),
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-sm font-mono font-bold bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500 font-mono">฿/hr</span>
                  </div>
                  {/* Preset quick buttons */}
                  <div className="mt-2 flex items-center gap-1 text-[11px]">
                    {[80, 100, 120, 150].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => setStipendConfig({ ...stipendConfig, hourlyRate: rate })}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-mono ${
                          stipendConfig.hourlyRate === rate
                            ? 'bg-emerald-800 text-white font-bold'
                            : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {rate}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Control 2: Hours Per Week */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    ชั่วโมงทำงาน (ชม./สัปดาห์)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={40}
                      value={stipendConfig.hoursPerWeek}
                      onChange={(e) =>
                        setStipendConfig({
                          ...stipendConfig,
                          hoursPerWeek: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-sm font-mono font-bold bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500">ชม./สัปดาห์</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">เฉลี่ย 5–15 ชม. สำหรับนักศึกษา</span>
                </div>

                {/* Control 3: Weeks */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    ระยะเวลาดำเนินงาน (สัปดาห์)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={48}
                      value={stipendConfig.projectDurationWeeks}
                      onChange={(e) =>
                        setStipendConfig({
                          ...stipendConfig,
                          projectDurationWeeks: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-sm font-mono font-bold bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500">สัปดาห์</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">1 ภาคการศึกษา ~ 12–16 สัปดาห์</span>
                </div>

                {/* Control 4: Number of Assistants */}
                <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                  <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                    จำนวนผู้ช่วยวิจัย (คน)
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={stipendConfig.numberOfAssistants}
                      onChange={(e) =>
                        setStipendConfig({
                          ...stipendConfig,
                          numberOfAssistants: Math.max(1, parseInt(e.target.value) || 1),
                        })
                      }
                      className="w-full px-2.5 py-1.5 text-sm font-mono font-bold bg-white border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-600 focus:outline-none"
                    />
                    <span className="text-xs text-slate-500">คน</span>
                  </div>
                  <span className="text-[10px] text-slate-400 mt-2 block">ป.ตรี ปกติ 1–2 คน</span>
                </div>

              </div>

              {/* Stipend Formula Demonstration */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs font-mono text-slate-700 flex flex-wrap items-center justify-between gap-2 border border-slate-200">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-800" />
                  <span>
                    สูตรคำนวณ: {stipendConfig.hourlyRate} ฿/ชม. × {stipendConfig.hoursPerWeek} ชม./สัปดาห์ × {stipendConfig.projectDurationWeeks} สัปดาห์ × {stipendConfig.numberOfAssistants} คน
                  </span>
                </div>
                <div className="font-semibold text-emerald-900">
                  รวมทั้งสิ้น {stipendConfig.hoursPerWeek * stipendConfig.projectDurationWeeks * stipendConfig.numberOfAssistants} ชม. = {stipendSubtotal.toLocaleString()} บาท
                </div>
              </div>
            </div>

          </div>

          {/* Right Side: Sticky Budget Summary & Official Actions (4 Cols) */}
          <div className="lg:col-span-4 sticky top-20 space-y-4">
            
            {/* Grand Total Summary Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                สรุปประมาณการงบประมาณโครงการวิจัย
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Total Research Budget
              </h3>

              {/* Total Amount Big Display */}
              <div className="mt-4 p-4 bg-emerald-900 text-white rounded-xl">
                <span className="text-xs text-emerald-200 uppercase font-mono tracking-wider block">
                  งบประมาณรวมทั้งสิ้น (Estimated Grand Total)
                </span>
                <div className="text-3xl sm:text-4xl font-bold font-mono-numbers mt-1 text-white">
                  {grandTotal.toLocaleString()}
                  <span className="text-sm font-normal text-emerald-200 ml-2">บาท (THB)</span>
                </div>
              </div>

              {/* Itemized Distribution Breakdown */}
              <div className="mt-5 space-y-3 text-xs">
                
                {/* 1. Chemicals */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-700" />
                    <span className="text-slate-600 font-medium">1. ค่าสารเคมีและอุปกรณ์</span>
                  </div>
                  <span className="font-mono-numbers font-bold text-slate-900">
                    {chemicalsSubtotal.toLocaleString()} ฿
                  </span>
                </div>

                {/* 2. Evaluation */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-700" />
                    <span className="text-slate-600 font-medium">2. ค่าประเมินตำรับยา</span>
                  </div>
                  <span className="font-mono-numbers font-bold text-slate-900">
                    {evaluationSubtotal.toLocaleString()} ฿
                  </span>
                </div>

                {/* 3. Stipends */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
                    <span className="text-slate-600 font-medium">3. ค่าเบี้ยเลี้ยงรายชั่วโมง</span>
                  </div>
                  <span className="font-mono-numbers font-bold text-slate-900">
                    {stipendSubtotal.toLocaleString()} ฿
                  </span>
                </div>

                {/* Visual Ratio Bar */}
                <div className="pt-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                    <div
                      style={{ width: `${grandTotal ? (chemicalsSubtotal / grandTotal) * 100 : 0}%` }}
                      className="bg-emerald-700 h-full"
                      title="สัดส่วนสารเคมีและอุปกรณ์"
                    />
                    <div
                      style={{ width: `${grandTotal ? (evaluationSubtotal / grandTotal) * 100 : 0}%` }}
                      className="bg-sky-700 h-full"
                      title="สัดส่วนประเมินตำรับยา"
                    />
                    <div
                      style={{ width: `${grandTotal ? (stipendSubtotal / grandTotal) * 100 : 0}%` }}
                      className="bg-amber-600 h-full"
                      title="สัดส่วนเบี้ยเลี้ยงรายชั่วโมง"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5 pt-4 border-t border-slate-100">
                <button
                  onClick={handleOpenProposal}
                  className="w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold rounded-lg shadow-xs flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>ดูใบเสนอประมาณการงบประมาณ (Print/Export)</span>
                </button>

                <button
                  onClick={handleCopySummary}
                  className="w-full py-2 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">คัดลอกลงคลิปบอร์ดแล้ว!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>คัดลอกข้อความสรุปงบประมาณ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={onOpenConsultation}
                  className="w-full py-2 px-4 border border-emerald-300 hover:bg-emerald-50 text-emerald-900 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>ส่งหัวข้อวิจัยและขอคำปรึกษาอาจารย์</span>
                </button>
              </div>

              <div className="mt-4 p-3 bg-slate-50 rounded-lg text-[11px] text-slate-500 leading-normal">
                <strong>หมายเหตุทางวิชาการ:</strong> ตัวเลขนี้เป็นการประมาณการเบื้องต้นสำหรับขออนุมัติทุนวิจัย 
                อัตราจริงอาจปรับเปลี่ยนตามเกรดความบริสุทธิ์ของสารเคมีและอัตราค่าธรรมเนียมเครื่องมือวิจัยของคณะเภสัชศาสตร์ ม.ศิลปากร
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
