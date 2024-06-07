import { Component, OnInit } from '@angular/core';
import { Patient } from 'src/app/model/patient';
@Component({
  selector: 'app-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.css']
})
export class PatientProfileComponent implements OnInit {
  patients: Patient[] = [];
  columns: any[] = []; 
  constructor() {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    // this.patientService.getPatients().subscribe(patients => {
    //   this.patients = patients;
    // });
  }

  createPatient(patient: Patient) {
    // this.patientService.addPatient(patient).subscribe(() => {
    //   this.loadPatients();
    // });
  }

  editPatient(patient: Patient) {
    // this.patientService.editPatient(patient).subscribe(() => {
    //   this.loadPatients();
    // });
  }

  deletePatient(id: number) {
    // this.patientService.deletePatient(id).subscribe(() => {
    //   this.loadPatients();
    // });
  }
}