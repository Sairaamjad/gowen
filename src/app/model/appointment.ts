export interface Appointment {
  case_id:number;
  appointment_date: Date;
  appointment_time: string; 
  appointment_type: string;
  apt_priority: string;
  duration: string; 
  comments: string; 
  name: string;
  // specialty: string;
  location_id: number;
  doctor_id: number;
}

  