import {AbstractControl, AsyncValidatorFn, ValidationErrors} from '@angular/forms';
import {Observable, map, timer} from 'rxjs';

class UsersApiService {
  isEmailTaken(email: string): Observable<boolean> {
    return timer(300).pipe(map(() => email === 'taken@example.com'));
  }
}

export function uniqueEmailValidator(api: UsersApiService): AsyncValidatorFn {
  return (control: AbstractControl<string>): Observable<ValidationErrors | null> => {
    return api.isEmailTaken(control.value).pipe(
      map((isTaken) => (isTaken ? {emailTaken: true} : null)),
    );
  };
}

