export interface Publication {
  id: string;
  title: string;
  journal: string;
  year: number;
  volume?: string;
  citations: number;
  doi?: string;
  category: 'in-situ-gels' | 'periodontal' | 'controlled-release' | 'herbal-cosmetics' | 'other';
  type: 'Article' | 'Conference Paper' | 'Book Chapter';
  highlight?: boolean;
}

export interface ResearchArea {
  id: string;
  titleTh: string;
  titleEn: string;
  descriptionTh: string;
  descriptionEn: string;
  keywords: string[];
  sampleFormulation: string;
}

export interface LabInstrument {
  id: string;
  nameTh: string;
  nameEn: string;
  purposeTh: string;
  applications: string[];
  hourlyRateEstimate?: number;
}

export interface ChemicalItem {
  id: string;
  nameTh: string;
  nameEn: string;
  category: 'polymer' | 'solvent' | 'active' | 'consumable';
  unit: string;
  unitPrice: number;
  quantity: number;
  selected: boolean;
  notes?: string;
}

export interface EvaluationModule {
  id: string;
  nameTh: string;
  nameEn: string;
  cost: number;
  descriptionTh: string;
  equipmentUsed: string;
  selected: boolean;
  requiredReagents: string;
}

export interface HourlyStipendConfig {
  hourlyRate: number; // Baht per hour (default 100)
  hoursPerWeek: number; // e.g. 10 hrs
  projectDurationWeeks: number; // e.g. 12 weeks
  numberOfAssistants: number; // e.g. 1
  roleTitle: string; // e.g. นักศึกษาผู้ช่วยวิจัย (Research Assistant)
}

export interface FacultyProfile {
  nameTh: string;
  nameEn: string;
  academicTitleTh: string;
  academicTitleEn: string;
  departmentTh: string;
  departmentEn: string;
  facultyTh: string;
  facultyEn: string;
  universityTh: string;
  universityEn: string;
  email: string;
  office: string;
  scopusUrl: string;
  scopusStats: {
    hIndex: number;
    totalDocuments: number;
    totalCitations: number;
    citedDocuments: number;
    articles: number;
    conferencePapers: number;
    bookChapters: number;
    lastUpdated: string;
  };
  expertiseTh: string[];
  expertiseEn: string;
  biographyTh: string;
}
