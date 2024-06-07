

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

export function createCaseFormGroup(formBuilder: FormBuilder): FormGroup {
  return formBuilder.group({
    patient_id: [''],
    location_id: [''], 
    category: [''],
    purpose_of_visit: ['',Validators.required],
    case_type: [''],
    doa: [''],
    firm_id: [''], 
    firmName: [''],
    firmLocation: [''],
    streetAddress: [''],
    suiteFloor: [''],
    city: [''],
    state: [''],
    zip: [''],
   
    insurance_id: [''], 
    insuranceName: [''],
    insuranceCode: [''],
    locationCode: [''],
    insuranceLocation: [''],
    streetAddressInsurance: [''],
    suiteFloorInsurance: [''],
    cityInsurance: [''],
    stateInsurance: [''],
    zipInsurance: [''],
    emailInsurance: [''],
    faxInsurance: [''],
    phoneNumberInsurance: [''],
    extensionInsurance: [''],
    cellPhoneInsurance: [''],

  
  
    
  });
}
