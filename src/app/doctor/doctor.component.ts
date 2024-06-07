import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Appointment } from '../model/appointment';
import { JwtDecoder } from '../jwt.decode';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  appointments: Appointment[] = [];

  constructor(private mainService: MainService, private jwtDecoder: JwtDecoder) { }

  ngOnInit(): void {
    this.fetchAppointments();
  }
  fetchAppointments() {
    const token = localStorage.getItem('token');
    if (token) {
      const doctorId = this.jwtDecoder.getUserId(token);
      if (doctorId !== null) {
        const endpoint = `appByDoctorId`;
        this.mainService.get<any>(endpoint).subscribe(
          response => {
            if (response.success) {
              this.appointments = response.data;
              console.log('Appointments data:', this.appointments);
            } else {
              console.error('API response indicates failure:', response);
            }
          },
          error => {
            console.error('Error fetching appointments:', error);
          }
        );
      } else {
        console.error('No doctorId found in token');
      }
    } else {
      console.error('No token found in localStorage');
    }
  }
}   