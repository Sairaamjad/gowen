import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function LoginFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
}
