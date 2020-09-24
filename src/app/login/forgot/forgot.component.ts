import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
/* import { DataService } from '../data.service'; */
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  disableButton;
  errormessage = null;
  showloader = false;

  profileForm = new FormGroup({
    login_id: new FormControl('', [
      Validators.required,
      Validators.minLength(1)
    ]),
    passwd: new FormControl('', [
      Validators.required
    ])
  });

  constructor(/* private data: DataService, */ private router: Router) { }

  ngOnInit() {
    /* if (this.data.isLoggedIn()) {
      this.router.navigate(['portal/dashboard']);
    } */
  }
  gotoLogin(){
    this.router.navigate(['portal/dashboard']);
  }

  /* onSubmit() {
    if (this.profileForm.valid && this.profileForm.value['passwd'] != null) {
      this.disableButton = true;
      this.errormessage = '';
      this.showloader = true;
      this.profileForm.get('login_id').disable();
      this.profileForm.get('passwd').disable();

      this.data.authUser(this.profileForm.value).subscribe(
        res => {
          localStorage.setItem('token', res['data']['auth_token']);
          this.router.navigate(['portal/dashboard']);
          this.showloader = false;
        },
        err => {
          if (err['error']['auth'] = 'Fail') {
            this.errormessage = err['error']['message'];
          }
          this.profileForm.controls['passwd'].reset();
          this.profileForm.get('login_id').enable();
          this.profileForm.get('passwd').enable();
          this.disableButton = false;
          this.showloader = false;
          this.profileForm.controls['passwd'].setErrors(null);
        }
      );
    } else if (this.profileForm.value['passwd'] === null) {
      this.errormessage = null;
      this.profileForm.controls['passwd'].setErrors({'required': true});
    }
  } */

}
