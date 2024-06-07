import { FormBuilder, FormGroup, Validators } from '@angular/forms';
export function createPatientFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    patient_id: [''], 
    first_name: ['', Validators.required],
    middle_name: [''],
    last_name: ['', Validators.required],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    ssn: ['', Validators.required],
    home_phone: ['', Validators.required],
    work_phone: ['', Validators.required],
    cell_phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', Validators.required]
  });
}
