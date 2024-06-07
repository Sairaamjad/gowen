import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';
import { RegisterFormGroup } from '../../validations/register-validation';
import { Auth } from 'src/app/model/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;
  roles: any[] = [];
  specialties: any[] = []; 
  
  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      email: [''],
      name: [''],
      password: [''],
      role_id: [null],
      specialty: [null] 
    });    
    this.loadRoles();

    // Load specialties
    this.loadSpecialties();

    // Listen for changes in the role selection
    this.registrationForm.get('role_id')?.valueChanges.subscribe(selectedRoleId => {
      this.onRoleChange(selectedRoleId);
    });
  }

  
  loadRoles(): void {
    // Assuming roles are fetched from the service
    this.roles = [
      { id: 1, name: 'Patient' },
      { id: 2, name: 'Doctor' },
      // { id: 3, name: 'Admin' }
    ];
  }
  loadSpecialties(): void {
    this.mainService.get('specialities').subscribe(
      (response: any) => {
        this.specialties = response;
        console.log(response,"response from seeder")
      },
      (error: any) => {
        console.error('Error loading specialties:', error);
      }
    );
  }

  onRoleChange(selectedRoleId: number): void {
    if (selectedRoleId === 2) { 
      if (this.specialties && this.specialties.length > 0) {
        this.registrationForm.get('specialty')?.setValue(this.specialties[0]?.id);
      }
    } else {
      this.registrationForm.get('specialty')?.setValue(null);
    }
  }
  onSubmit(): void {
    if (this.registrationForm.valid) {

      const authData: Auth = {
        email: this.registrationForm.value.email,
        name: this.registrationForm.value.name,
        password: this.registrationForm.value.password,
        role_id: this.registrationForm.value.role_id,
        specialty:this.registrationForm.value.specialty
      };

      this.mainService.post('register', authData).subscribe(

        (response) => {
          console.log('Registration successful:', response);
          this.registrationForm.reset();
          this.router.navigate(['/']);
        },
        (error) => {
          console.error('Registration error:', error);
        }
      );
    }
  }
}
