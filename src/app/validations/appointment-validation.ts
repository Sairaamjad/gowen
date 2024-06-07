import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function createAppointmentFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    appointment_date: [''],
    appointment_time: [''],
    appointment_type: [''],
    apt_priority: [''],
    duration: [''],
    comments: [''],
    name: [''],
    specialty: [''],
    location_id: [''],
    doctor_id: [''],
    case_id: [''],

  });
}
