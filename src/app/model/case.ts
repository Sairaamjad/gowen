export interface Case {
    patient_id: number;
    location_id: number;
    category: 'General Checkup' | 'Surgery' | 'Dental' | 'Emergency' | 'Consultation' | 'Other';
    purpose_of_visit: string;
    case_type: 'Medical' | 'Legal' | 'Insurance' | 'Other';
    doa: Date;
    insurance_id: number;
    firm_id: number;
    created_at:string; 
    updated_at: string; 
    deleted_at: string | null;  
  }
  