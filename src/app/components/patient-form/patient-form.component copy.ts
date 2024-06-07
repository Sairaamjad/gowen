import { Component, OnInit, ViewChild } from '@angular/core';
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

  patientFormGroup!: FormGroup;
  caseFormGroup!: FormGroup;
  appointmentFormGroup!: FormGroup;
  isProfileCompleted: boolean = false;
  firms: any[] = [];
  insurances: any[] = [];
  locations: any[] = [];
  doctors: Doctor[] = [];
  categories: string[] = ['General Checkup', 'Surgery', 'Dental', 'Emergency', 'Consultation', 'Other'];
  caseTypes: string[] = ['Medical', 'Legal', 'Insurance', 'Other'];
  appointment_times: string[] = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', '03:00 PM'];
  appointment_type: string[] = ['Consultation', 'Follow-up', 'Procedure', 'Physical Examination', 'Therapy Session', 'Diagnostic Test', 'Vaccination'];
  duration: string[] = ['15 minutes', '30 minutes', '45 minutes', '1 hour', '1 hour 15 minutes', '1 hour 30 minutes', '1 hour 45 minutes', '2 hours'];
  priorities: string[] = ['low', 'medium', 'high'];

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private jwtDecoder: JwtDecoder
  ) { }

  ngOnInit(): void {
    this.patientFormGroup = createPatientFormGroup(this.formBuilder);
    this.caseFormGroup = createCaseFormGroup(this.formBuilder);
    this.appointmentFormGroup = createAppointmentFormGroup(this.formBuilder);

    this.fetchCasesData();
    this.fetchInsurancesData();
    this.fetchFirmData();
    this.fetchLocationData();
    this.fetchDoctorsData();
    this.checkPatientExistence();
  }

  checkPatientExistence() {
    const token = localStorage.getItem('token');
    this.isProfileCompleted = !!token;
    this.moveToNextStep();
  }

  moveToNextStep() {
    if (this.isProfileCompleted) {
      this.stepper.selectedIndex = 0;
    } else {
      this.stepper.selectedIndex = 1;
    }
  }

  fetchFirmData() {
    this.mainService.get<any[]>('firms').subscribe(
      (response: any[]) => {
        this.firms = response.map(firm => ({ ...firm, id: firm.id }));
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
    }
  }

  fetchInsurancesData() {
    this.mainService.get<any[]>('insurances').subscribe(
      (response: any[]) => {
        this.insurances = response;
      },
      error => {
        console.error('Error fetching insurances data:', error);
      }
    );
  }

  onInsuranceChange(insurance_id: number) {
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
        console.error('Error fetching locations data:', error);
      }
    );
  }

  onLocationChange(location_id: number) {
    const selectedLocation = this.locations.find(location => location.id === location_id);
    if (selectedLocation) {
      this.caseFormGroup.patchValue({
        location_id: location_id,
        name: selectedLocation.name,
        location_code: selectedLocation.location_code,
        address: selectedLocation.address,
        city: selectedLocation.city,
        state: selectedLocation.state,
        zip: selectedLocation.zip,
        email: selectedLocation.email,
        fax: selectedLocation.fax,
        phone_number: selectedLocation.phone_number,
        extension: selectedLocation.extension,
        cell_number: selectedLocation.cell_number,
      });
    }
  }

  fetchDoctorsData() {
    this.mainService.get<Doctor[]>('doctors').subscribe(
      (response: Doctor[]) => {
        this.doctors = response;
      },
      error => {
        console.error('Error fetching doctors data:', error);
      }
    );
  }

  fetchCasesData() {
    this.mainService.get<Case[]>('cases').subscribe(
      (response: Case[]) => {
        console.log(response);
      },
      error => {
        console.error('Error fetching cases data:', error);
      }
    );
  }

  onSubmit() {
    if (this.patientFormGroup.invalid || this.caseFormGroup.invalid || this.appointmentFormGroup.invalid) {
      console.error('One or more forms are invalid');
      return;
    }

    const patientData = this.patientFormGroup.value;
    const caseData = this.caseFormGroup.value;
    const appointmentData = this.appointmentFormGroup.value;

    const combinedData = {
      patient: patientData,
      case: caseData,
      appointment: appointmentData
    };

    this.mainService.post<any>('combined-api-endpoint', combinedData).subscribe(
      response => {
        console.log('Submission successful:', response);
        // Optionally, navigate to a success page or display a success message
      },
      error => {
        console.error('Error during submission:', error);
        // Optionally, display an error message to the user
      }
    );
  }
}
