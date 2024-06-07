import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function RegisterFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
  
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role_id: ['', Validators.required]
  });
}
