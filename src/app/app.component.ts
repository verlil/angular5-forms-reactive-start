import {Component, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'emailAdress': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      'gender': new FormControl('female'),
      'hobbies': new FormArray([])
    });
    this.signupForm.valueChanges
      .subscribe(
        (value) => {
          console.log('Value changes: ', value);
        }
      );
    this.signupForm.statusChanges
      .subscribe(
        (value) => {
          console.log('Status changes: ', value);
        }
      );
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
    // (<FormArray>...) - this is a FormArray type explanation
  }

  // validator - is just a function, that is executing by Angular automatically
  // when it checks the validity of form control
  forbiddenNames(control: FormControl): { [s: string]: boolean } {
    //example of this function return:  {'nameIsForbidden': true}    (where nameIsForbidden is string)
    // you can't use 'this.' in validator function by default, so
    // don't forget to add '.bind(this)' in place of using this validator
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 3000);
    });
    return promise;
  }
}
