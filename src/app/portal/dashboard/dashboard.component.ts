import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material';
import { DashboardDailogComponent } from './dashboard-dailog/dashboard-dailog.component';
import { Router } from '@angular/router';
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
}


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  dashboard_numbers: any;
  showLoader = false;

  constructor(private data: DataService, private _snackBar: MatSnackBar, public dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.showLoader = true;
    this.data.getAssessments().subscribe(
      res => {
        console.dir(res);
        this.dashboard_numbers = res['assessment_list'];
        console.log(this.dashboard_numbers)
        this.showLoader = false;
      },
      err => {
        console.log(err);
        this.showLoader = false;
      }
    );
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DashboardDailogComponent, {
      width: '250px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  AssessmentCustomUser(value) {
    console.log(value);
    localStorage.dialogForm = JSON.stringify(value);
    /* let data = '04'; */
    // this.router.navigate(['/portal/customAssessmentUsers']);
    this.router.navigate(['/portal/customAssessmentUsers'], { queryParams: { id: value } });

  }

}
