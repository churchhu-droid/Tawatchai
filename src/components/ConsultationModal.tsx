import React, { useState } from 'react';
import { X, Send, CheckCircle2, Calendar, User, Mail, Phone, BookOpen, MessageSquare } from 'lucide-react';
import { PROFESSOR_PROFILE } from '../data/professorData';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimatedBudget?: number;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  estimatedBudget = 25000,
}) => {
  const [formData, setFormData] = useState({
    applicantName: '',
    roleCategory: 'student-rx',
    studentIdOrOrg: '',
    email: '',
    phone: '',
    topicTitle: '',
    formulationType: 'in-situ-gel',
    estimatedBudget: estimatedBudget,
    meetingPreference: 'faculty-onsite',
    briefDescription: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-xl rounded-2xl shadow-xl border border-slate-200 overflow-hidden my-8">
        
        {/* Modal Header */}
        <div className="bg-emerald-900 text-white px-6 py-5 flex items-center justify-between">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-300">
              Department of Industrial Pharmacy · SU
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              แบบฟอร์มขอรับคำปรึกษางานวิจัยและพัฒนาตำรับยา
            </h3>
            <p className="text-xs text-emerald-100">
              เรียน: {PROFESSOR_PROFILE.nameTh}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-emerald-200 hover:text-white p-1 rounded-md cursor-pointer transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold text-slate-900">
              ส่งคำขอรับคำปรึกษาเรียบร้อยแล้ว
            </h4>
            <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              ข้อมูลหัวข้อวิจัยและการประมาณการงบประมาณได้รับการบันทึกแล้ว 
              ระบบจะประสานส่งข้อมูลไปยังอีเมลอาจารย์ ({PROFESSOR_PROFILE.email}) 
              และเจ้าหน้าที่สาขาวิชาเภสัชกรรมอุตสาหการจะติดต่อกลับเพื่อนัดหมายเวลา
            </p>
            <div className="pt-2 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-left text-slate-700 space-y-1">
              <div><strong>ผู้ขอคำปรึกษา:</strong> {formData.applicantName}</div>
              <div><strong>หัวข้อวิจัย:</strong> {formData.topicTitle || 'ระบบนำส่งยาแบบก่อเจลในร่างกาย'}</div>
              <div><strong>งบประมาณประมาณการ:</strong> {formData.estimatedBudget.toLocaleString()} บาท</div>
              <div><strong>รูปแบบการนัดหมาย:</strong> {formData.meetingPreference === 'faculty-onsite' ? 'พบที่อาคาร 4 คณะเภสัชศาสตร์ ม.ศิลปากร' : 'Google Meet ออนไลน์'}</div>
            </div>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
            >
              ปิดหน้าต่าง
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  ชื่อ-นามสกุล ผู้เสนอโครงการ *
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="เช่น ภก. สมชาย ใจดี หรือ นศ.ภ. ชุติมา"
                    value={formData.applicantName}
                    onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  สถานะผู้ขอรับคำปรึกษา *
                </label>
                <select
                  value={formData.roleCategory}
                  onChange={(e) => setFormData({ ...formData, roleCategory: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="student-rx">นักศึกษาเภสัชศาสตร์ ม.ศิลปากร (Rx SU Senior)</option>
                  <option value="grad-msc">นักศึกษาปริญญาโท (M.Sc.)</option>
                  <option value="grad-phd">นักศึกษาปริญญาเอก (Ph.D.)</option>
                  <option value="industry-sme">ภาคอุตสาหกรรมยา / บริษัทเวชสำอาง (Industry)</option>
                  <option value="external-researcher">อาจารย์ / นักวิจัยภายนอกสถาบัน</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  อีเมลสำหรับติดต่อ *
                </label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  เบอร์โทรศัพท์ติดต่อ
                </label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    placeholder="08X-XXX-XXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                หัวข้อวิจัย หรือ ชื่อตำรับยาที่สนใจศึกษา *
              </label>
              <div className="relative">
                <BookOpen className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  required
                  placeholder="เช่น การพัฒนา In Situ Forming Gel จาก Borneol เพื่อรักษาโรคปริทันต์อักเสบ"
                  value={formData.topicTitle}
                  onChange={(e) => setFormData({ ...formData, topicTitle: e.target.value })}
                  className="w-full pl-8 pr-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  หมวดหมู่นวัตกรรมตำรับยา
                </label>
                <select
                  value={formData.formulationType}
                  onChange={(e) => setFormData({ ...formData, formulationType: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="in-situ-gel">ระบบ In Situ Forming Gel / Matrix</option>
                  <option value="periodontal">ตำรับนำส่งยาร่องปริทันต์ (Periodontal Pocket)</option>
                  <option value="controlled-tablet">เม็ดยาควบคุมการปลดปล่อย (Matrix Tablet)</option>
                  <option value="herbal-cosmetics">ตำรับสมุนไพรสากล / เวชสำอาง (In Situ Paint)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  รูปแบบการเข้าพบอาจารย์
                </label>
                <select
                  value={formData.meetingPreference}
                  onChange={(e) => setFormData({ ...formData, meetingPreference: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md bg-white focus:ring-1 focus:ring-emerald-700 focus:outline-none"
                >
                  <option value="faculty-onsite">นัดพบที่คณะเภสัชศาสตร์ ม.ศิลปากร (นครปฐม)</option>
                  <option value="google-meet">การประชุมออนไลน์ (Google Meet)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                รายละเอียดสังเขปของโครงการหรือข้อสงสัยที่ต้องการปรึกษา
              </label>
              <textarea
                rows={3}
                placeholder="ระบุวัตถุประสงค์ ยาตัวสำคัญที่ต้องการนำส่ง หรือปัญหาการเตรียมตำรับที่พบ..."
                value={formData.briefDescription}
                onChange={(e) => setFormData({ ...formData, briefDescription: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-700 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium cursor-pointer"
              >
                ยกเลิก
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-md shadow-xs transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>ส่งคำขอคำปรึกษา</span>
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
