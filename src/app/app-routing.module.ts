import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './super/admin.component';
import { DoctorComponent } from './doctor/doctor.component';
import { PatientListComponent } from './patient-list/patient-list.component';
import { RoleGuard } from '../guards/role.guard';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { expectedRole: '3' } },
  { path: 'Plist', component: PatientListComponent, canActivate: [RoleGuard], data: { expectedRole: '2' } },
  { path: 'doctor', component: DoctorComponent, canActivate: [RoleGuard], data: { expectedRole: '2' } },
  { path: 'form', component: PatientFormComponent, canActivate: [RoleGuard], data: { expectedRole: '1' } },
  { path: '**', redirectTo: '' }
];


@NgModule({
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
