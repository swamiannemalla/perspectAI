import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {

  helper = new JwtHelperService();
  decoded_token: String = this.helper.decodeToken(localStorage.getItem('token'));

  user_name: String = this.decoded_token['name'];
  org_name: String = this.decoded_token['org_name'];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

}
