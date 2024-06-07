import { Component, OnInit,ViewChild  } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from 'src/app/main.service';
import { Case } from 'src/app/model/case';
import { Appointment } from 'src/app/model/appointment';
import { Patient } from 'src/app/model/patient';
import { createAppointmentFormGroup } from 'src/app/validations/appointment-validation';
import { createCaseFormGroup } from 'src/app/validations/case-validation';
import { createPatientFormGroup } from 'src/app/validations/patient-validation';
import { Doctor } from 'src/app/model/doctor';
import { JwtDecoder } from 'src/app/jwt.decode';
import { AuthService } from 'src/authService';
import { MatStepper } from '@angular/material/stepper'; 

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})

export class PatientFormComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper; 
  patient: Patient[] = [];
  case: Case[] = [];
  appointment: Appointment[] = [];
  doctors: Doctor[] = [];
  doctor_id: number[] = [];
  patientFormGroup!: FormGroup;
  caseFormGroup!: FormGroup;
  appointmentFormGroup!: FormGroup;
  isProfileCompleted: boolean = false; 
  firms: any[] = [];
  insurances: any[] = [];
  locations:any[]=[];
  categories: string[] = ['General Checkup', 'Surgery', 'Dental', 'Emergency', 'Consultation', 'Other'];
  caseTypes: string[] = ['Medical', 'Legal', 'Insurance', 'Other'];
  appointment_times: string[] = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
  appointment_type: string[] = ['Consultation', 'Follow-up', 'Procedure', 'Physical Examination', 'Therapy Session', 'Diagnostic Test', 'Vaccination'];
  duration: string[] = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '1 hour 15 minutes', '1 hour 30 minutes', '1 hour 45 minutes', '2 hours'];
  priorities:string[]=['low', 'medium', 'high'];
  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private jwtDecoder:JwtDecoder
  ) { }
  case_id: number | undefined;

  ngOnInit(): void {
    this.patientFormGroup = createPatientFormGroup(this.formBuilder);
    this.caseFormGroup = createCaseFormGroup(this.formBuilder);
    this.appointmentFormGroup = createAppointmentFormGroup(this.formBuilder);
    this.fetchCasesData();
    this.fetchInsurancesData();
    this.fetchFirmData();
    this.fetchLocationData();
    this.fetchDoctorsData();
    this.checkPatientExistence()
}

  checkPatientExistence() {
    const token = localStorage.getItem('token');
    this.isProfileCompleted = !!token; 
    console.log(token,"console")
    this.moveToNextStep();
  } 

  moveToNextStep() {
    if (this.isProfileCompleted) {
      this.stepper.selectedIndex = 0; 
    } else {
      this.stepper.selectedIndex = 1; 
    }
  }

  onSubmitPatient(stepper: any) {
    if (this.patientFormGroup.valid) {
      if (!this.isProfileCompleted) {
        const newPatient: Patient = this.patientFormGroup.value as Patient;
        this.mainService.post<Patient>('patient/create', newPatient).subscribe(
          (response: any) => {
            console.log('Patient registration successful:', response);
            this.patientFormGroup.patchValue({ patient_id: response.data.id });
          },
          (error: any) => {
            console.error('Patient registration error:', error);
          }
        );
      } 
    } else {
      console.log("Patient form is invalid");
    }
  }
   fetchFirmData() {
    this.mainService.get<any[]>('firms').subscribe(
      (response: any[]) => {
        console.log("Firms data response:", response); 
        this.firms = response.map(firm => ({ ...firm, id: firm.id })); // Map the IDs to the firms array
        console.log(this.firms,"id present for firms")
      },
      error => {
        console.error('Error fetching firms data:', error);
      }
    );
  }
  
  onFirmChange(firm_id: number) {
    const selectedFirm = this.firms.find(firm => firm.id === firm_id);
    if (selectedFirm) {
      this.caseFormGroup.patchValue({
        firm_id: selectedFirm.id,
        firm_name: selectedFirm.firm_name,
        location: selectedFirm.location,
        street_address: selectedFirm.street_address,
        city: selectedFirm.city,
        state: selectedFirm.state,
        zip: selectedFirm.zip
      });
    } else {
      console.error(`Firm with ID ${firm_id} not found.`);
    }
  }
fetchInsurancesData() {
    console.log("Fetching insurances data...");
    this.mainService.get<any[]>('insurances').subscribe(
      (response: any[]) => {
        console.log("Insurances data fetched successfully:", response);
        this.insurances = response;
      },
      error => {
        console.error('Error fetching insurances data:', error);
      }
    );
  }
onInsuranceChange(insurance_id: number) {
    console.log('Selected insurance ID:', insurance_id);
    const selectedInsurance = this.insurances.find(insurance => insurance.id === insurance_id);
    if (selectedInsurance) {
      this.caseFormGroup.patchValue({
        insurance_id: insurance_id, 
        name: selectedInsurance.name,
        insurance_code: selectedInsurance.insurance_code,
        location_code: selectedInsurance.location_code,
        street_address: selectedInsurance.street_address,
        city: selectedInsurance.city,
        state: selectedInsurance.state,
        zip: selectedInsurance.zip,
        email: selectedInsurance.email,
        fax: selectedInsurance.fax,
        phone_number: selectedInsurance.phone_number,
        extension: selectedInsurance.extension,
        cell_number: selectedInsurance.cell_number,
      });
    }
  }
  fetchLocationData() {
    this.mainService.get<any[]>('locations').subscribe( 
      (response: any[]) => {
        this.locations = response;
      },
      error => {
        console.error('Error fetching location data:', error);
      }
    );
  }
  onLocationChange(location_id: number) {
    console.log('Selected location ID:', location_id);
    const selectedLocation = this.locations.find(location => location.id === location_id);
    if (selectedLocation) {
      this.caseFormGroup.patchValue({
        location_id: selectedLocation.id ,
        name: selectedLocation.location,
       });
    }
  }

  // Other methods remain unchanged
fetchCasesData() {
    this.mainService.get<Case[]>('/').subscribe(
      (cases: Case[]) => {
        this.case = cases;
      },
      error => {
        console.error('Error fetching cases data:', error);
      }
    );
  }

  onSubmitCase(stepper: any) {
    if (this.caseFormGroup.valid) {
      const patient_id: number = this.patientFormGroup.get('patient_id')?.value;
      console.log("Retrieved patient_id:", patient_id);

      const newCase: Case = this.caseFormGroup.value as Case;
      
      const location_id: number = this.caseFormGroup.get('location_id')?.value;
      const insurance_id: number = this.caseFormGroup.get('insurance_id')?.value;
      const firm_id: number = this.caseFormGroup.get('firm_id')?.value;  
  
      // Assign IDs to the newCase object
      newCase.patient_id = patient_id;
      console.log("Assigned patient_id:", newCase.patient_id);
      newCase.location_id = location_id;
      console.log("Assigned location_id:", newCase.location_id);
      newCase.insurance_id = insurance_id;
      console.log("Assigned insurance_id:", newCase.insurance_id);
      newCase.firm_id = firm_id;
      console.log("Assigned firm_id:", newCase.firm_id);
      console.log("Submitting new case:", newCase);
      console.log("Submitting new case:", newCase);
  
      this.mainService.post('create', newCase).subscribe(
        (response: any) => {
          console.log('Case submission successful:', response);
          this.case_id = response.id;

          this.caseFormGroup.patchValue({ case_id: response.id });
          console.log('Patched case_id:', response.id);
          stepper.next();
        },
        (error: any) => {
          console.log('Case submission error:', error);
        }
      );
    } else {
      console.log("Case form is invalid");
    }
  }
  



 onLocationsChange(location_id: number) {
    console.log('Selected location ID from appointment:', location_id);
    const selectedLocation = this.locations.find(location => location.id === location_id);
    if (selectedLocation) {
      this.appointmentFormGroup.patchValue({
        location_id: selectedLocation.id ,
        name: selectedLocation.location,
       });
    }
  }
fetchDoctorsData() {
    this.mainService.get<Doctor[]>('doctors').subscribe( 
      (response: Doctor[]) => {
        this.doctors = response;
        console.log(response,"response doctorsssssss")
    
      },
      error => {
        console.error('Error fetching doctors data:', error);
      }
    );
  }
  onDoctorChnage(doctor_id: number) {
    console.log('Selected Doctor ID from appointment:', doctor_id);
    const selectedDoctor = this.doctors.find(doctor => doctor.id === doctor_id);
    if (selectedDoctor) {
      this.appointmentFormGroup.patchValue({
        doctor_id: selectedDoctor.id,
        name: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
      });
    }
  }
  
onSubmitAppointment(stepper: any) {
    if (this.appointmentFormGroup.valid) {
      // Retrieve the case_id from the class property set during case submission
      const case_id = this.case_id;
      console.log("Retrieved case_id:", case_id);
  
      if (case_id) {
      
        const newAppointment: Appointment = this.appointmentFormGroup.value as Appointment;
        const location_id: number = this.appointmentFormGroup.get('location_id')?.value;
        const doctor_id: number = this.appointmentFormGroup.get('doctor_id')?.value;

        newAppointment.case_id = case_id;
        console.log("Assigned patient_id:", newAppointment.case_id);
        newAppointment.location_id = location_id;
        console.log("Assigned location_id:", newAppointment.location_id);
        newAppointment.doctor_id = doctor_id;

        this.mainService.post<Appointment>('appointment/create', newAppointment).subscribe(
          (response: any) => {
            console.log('Appointment submission successful:', response);
            stepper.next();
          },
          (error: any) => {
            console.error('Appointment submission error:', error);
          }
        );
      } else {
        console.error("Case ID is undefined. Please create a case first.");
      }
    } else {
      console.log("Appointment form is invalid");
    }
  }
  }  