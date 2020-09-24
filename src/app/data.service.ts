import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {  BehaviorSubject } from 'rxjs';
import {map} from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class DataService {
  helper = new JwtHelperService();
  public userdata = new BehaviorSubject<Array<any>>(undefined)
  public _userdata = [];
  base_url = environment.base_url;
  commondata:any;

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('token');
    if (user) {
        return true;
    } else {
        return false;
    }
}

setSharedUserData(json:any){
  this._userdata=json;
  this.userdata.next(this._userdata);
  console.log("this._userdata",this._userdata)
}

getSharedUserData(){
  let _reqData = [];
  return this.userdata.asObservable().pipe(
    map((val: any) => {
      if (val != null) {
        if (Array.isArray(val)) { // true    
          if (val.length == 0) {
            _reqData = [];
          } else {
            _reqData = val;
          }
        } else { // false
          if (Object.keys(val).length == 0) {
            _reqData = [];
          } else {
            _reqData.push(val);
          }
        }
        return _reqData[0];
      } else {
        return [];
      }
    })
  )
}


  authUser(data) {
    return this.http.put(this.base_url + '/admin_login', data);
  }

  getInvites(filter) {
    console.log('filter::::::', filter);
    if (!this.checkExpiredToken()) {
    return this.http.get(this.base_url + '/portal/invite/' + filter);
    }
    
  }

  generateReport(email) {
    if (!this.checkExpiredToken()) {
    return this.http.get(this.base_url + '/report/' + email);
    }
  }

  getAssessments() {
    if (!this.checkExpiredToken()) {
    return this.http.get(this.base_url + '/portal/get_assessments');
    }
  }

  sendInvites(data) {
    if (!this.checkExpiredToken()) {
    return this.http.post(this.base_url + '/portal/invite', data);
    }
  }

  getDashboardDetails() {
    if (!this.checkExpiredToken()) {
      return this.http.get(this.base_url + '/portal/dashboard');
    }
  }

  checkExpiredToken() {
    const expiration_status = this.helper.isTokenExpired(localStorage.getItem('token'));
    if (expiration_status) {
      localStorage.clear();
      this.router.navigate(['']);
      this.openSnackBar('Login Expired', '');
    }
    return expiration_status;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }
  getAllModules() {
    if (!this.checkExpiredToken()) {
    return this.http.get(this.base_url + '/portal/modules');
    }
  }
  getModulesINAssessments(data) {
    if (!this.checkExpiredToken()) {
    return this.http.get(this.base_url + '/portal/modules_company/'+ data);
    }
  }
  
  getMotives(data) {
    console.log("data",data)
    if (!this.checkExpiredToken()) {
    return this.http.get(this.base_url + '/portal/user_score/'+data.email_id+'/'+data.assessment_code);
    }
  }
 }
