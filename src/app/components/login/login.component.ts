import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from 'src/app/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private mainService: MainService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      this.mainService.post('login', loginData).subscribe(
        (response: any) => {
          const token = response.token;
          localStorage.setItem('token', token); 

          // Redirect based on user role
          const userRole = response.user.role_id;
          switch (userRole) {
            case 1: 
              this.router.navigate(['/form']); 
              break;
            case 2: 
              this.router.navigate(['/doctor']); 
              break;
            case 3: 
              this.router.navigate(['/admin']);
              break;
            default: 
              this.router.navigate(['/unauthorized']); 
              break;
          }
        },
        (error) => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
