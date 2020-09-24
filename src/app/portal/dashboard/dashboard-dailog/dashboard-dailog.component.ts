import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-dashboard-dailog',
  templateUrl: './dashboard-dailog.component.html',
  styleUrls: ['./dashboard-dailog.component.scss']
})
export class DashboardDailogComponent implements OnInit {
  assessmentName = "Sales";

  constructor(public router: Router, public dialogRef: MatDialogRef<DashboardDailogComponent>) { }

  departments: any = [
    { value: 'HR-0', viewValue: 'HR' },
    { value: 'Associate-1', viewValue: 'Associate' }
  ];

  jobLevels: any = [
    { value: 'Level0-0', viewValue: 'Level0' },
    { value: 'Level1-1', viewValue: 'Level1' }
  ];

  jobRoles: any = [
    { value: 'UI-0', viewValue: 'UI' },
    { value: 'DataScience-1', viewValue: 'DataScience' }
  ];

  ngOnInit() {
  }

  AssessmentCustomUser(value) {

//call assessment crate App
// let sendData ={

// }
// this.data.aetAssessment(sendData).subscribe(
//   res => {
//     this.router.navigate(['/portal/customAssessmentUsers'], { queryParams: { id: res } });
//   });

    console.log(value);
    localStorage.dialogForm= JSON.stringify(value);
    //this.router.navigate(['/portal/customAssessmentUsers']);
    this.router.navigate(['/portal/customAssessmentUsers'], { queryParams: { id: 'all' } });
    this.dialogRef.close();
  }

}


