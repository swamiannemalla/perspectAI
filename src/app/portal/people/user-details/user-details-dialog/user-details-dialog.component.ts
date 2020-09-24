import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DataService } from '../../../../data.service';





@Component({
  selector: 'app-user-details-dialog',
  templateUrl: './user-details-dialog.component.html',
  styleUrls: ['./user-details-dialog.component.scss']
})
export class UserDetailsDialogComponent implements OnInit {
  public title: string;
    public message: string;
  dialogData: any;
  constructor(
    public dialogRef: MatDialogRef<UserDetailsDialogComponent>,
    private data: DataService) { }

  ngOnInit() {    
    console.log("----------------",this.data.commondata);
    this.dialogData = this.data.commondata;
  }
}
