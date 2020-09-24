import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';

export interface DialogData {
  assessment: String;
  data: any;
}

@Component({
  selector: 'app-invitestatus',
  templateUrl: './invitestatus.component.html',
  styleUrls: ['./invitestatus.component.scss']
})

export class InvitestatusComponent implements OnInit {

  displayedColumns: string[] = ['name', 'status'];
  dataSource = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, public dialogRef: MatDialogRef<InvitestatusComponent>,
  private router: Router) {
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['portal/dashboard']);
    });
  }

  resparray: any;
  assessment: String;

  // status_list: any = [];
  ngOnInit() {
    // console.log(this.data);
    this.dataSource = this.data['data'];
    // this.assessment = this.data['assessment'];
    // console.log(this.data);
  }


  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['portal/dashboard']);
  }

}
