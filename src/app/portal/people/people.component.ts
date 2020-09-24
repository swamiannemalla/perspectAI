import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../data.service';
import { Router } from '@angular/router';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';

// export interface PeriodicElement {
//   name: string;
//   email_id: number;
//   status: number;
//   report: number;
// }

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['name', 'email_id', 'status', 'report'];
  displayedColumnsPending: string[] = ['name', 'email_id'];
  dataSource: any = [];
  pendingemails: any = [];
  disableButton: Boolean = false;
  selectedindex = '';
  assessmentfilter = 'all';
  showloader: Boolean = false;
  assessments: any = [];
  showTableLoader: Boolean = false;
  registerArr: any = [];
  pendingArr: any = [];
  url: string;
  motivesData: {};
  email: any;
  code: any;

  constructor(public router: Router, private data: DataService, private http: HttpClient) { }

  ngOnInit() {
    this.showTableLoader = true;
    this.data.getAssessments().subscribe(
      res => {
        console.log("getAssessments", res)
        const elements_dd = res['assessment_list'];
        const sel_list = [];
        this.assessments.push({
          value: 'all',
          viewValue: 'All'
        });
        console.log(this.assessments)
        for (const element of elements_dd) {
          const temp_obj = {
            value: element['assessment_code'],
            viewValue: element['assessment_name']
          };
          this.assessments.push(temp_obj);
        }
        this.showTableLoader = false;
      },
      err => {
        console.log(err);
        this.showTableLoader = false;
      }
    );
    this.invitesTable(this.assessmentfilter);
  }

  invitesTable(filter) {
    // console.log(filter);
    this.data.getInvites(filter).subscribe(
      res => {
        console.log("getInvites", res)

        console.log("getInvitess", res)
        this.registerArr = res['registered'];
        this.pendingArr = res['pending'];
        console.log("-------------")
        console.log(this.pendingArr[0].status)
        this.registerArr.push(...this.pendingArr)
        this.dataSource = new MatTableDataSource(this.registerArr)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        /* this.dataSource = new MatTableDataSource(res['registered']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.pendingemails = new MatTableDataSource(res['pending']);
        this.pendingemails.paginator = this.paginator;
        this.pendingemails.sort = this.sort; */
      },
      err => {
        console.log(err);
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyFilterPending(filterValue: string) {
    this.pendingemails.filter = filterValue.trim().toLowerCase();
  }
  getReport(data) {
    console.log("dataaaaaaaaa", data)
    this.disableButton = true;
    this.selectedindex = data;
    this.showloader = true;
    this.motivesData = {
      'queryparams': {
        'email': data.name        
      }
    } 
    
    //this.url = 'https://appapi.perspect.ai/web-dev-v1/portal/user_score/surajbathina@loopreality.com/07';
    //var email_id = 'surajbathina@loopreality.com';
    //var assessment_code = '07';
    this.url = 'https://appapi.perspect.ai/web-dev-v1/portal/user_score/'+data.email_id+'/'+data.assment_id;

    console.log("this.url",this.url);

    this.http.get(this.url).subscribe(
      res => {
        this.data.setSharedUserData(res)
        console.log("------ -----------aaaaaaaaaaaa1111111111111", res)
        this.router.navigate(['/portal/user-details'],{ queryParams: {   'name': data.name  } });
      });
    /* getReport(data) {
      console.log("dataaaaaaaaa",data)
      this.disableButton = true;
      this.selectedindex = data;
      this.showloader = true;
      this.motivesData={
        'queryparams':{
        'email':data.email_id,
        'code' :data.assessment_code
      }} *//* 
    this.url='https://appapi.perspect.ai/web-dev-v1/portal/user_score/surajbathina@loopreality.com/07'; */
    /* this.data.getMotives(data).subscribe(
      res => {
      console.log("------ -----------aaaaaaaaaaaa",data)
      this.data.setSharedUserData(data)
      console.log("------ -----------aaaaaaaaaaaa1111111111111",res)

      
      this.router.navigate(['/portal/user-details'],this.motivesData);
    }); */
    /*  this.data.generateReport(email).subscribe(
       res => { */


    /* 




    console.log("generatedReport",res)
    const pdfblob = window.atob(res['data']);
    const dn = new Blob([pdfblob], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(dn);
    window.open(fileURL, '_blank');
    this.showloader = false;
    this.selectedindex = '';
    this.disableButton = false; */
    /*  },
     err => {
       console.log(err);
       this.disableButton = false;
       this.selectedindex = '';
     }
   ); */
  }

  updateTable(event) {
    this.invitesTable(event['value']);
  }

}
