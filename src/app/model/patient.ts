export interface Patient {
  first_name: string;
  middle_name: string;
  last_name: string;
  gender: 'male' | 'female' | 'X';
  dob: Date;
  ssn: string;
  address: string;
  city: string;
  state: 'California'|'Texas'|'New York'|'Florida'|'Illinois'
  zip: string;
  home_phone: string;
  work_phone: string;
  cell_phone: string;
  email: string;
  created_at: string;
  updated_at: string;
  deleted_at: string| null;
}
