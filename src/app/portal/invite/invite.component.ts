import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { ModuleCardOverviewComponent } from '../dashboard/custom-assessmets-users/module-card-overview/module-card-overview.component';
import { MatDialog } from '@angular/material';
/* import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatTable, MatDialog } from '@angular/material';
import { DataService } from '../../data.service';
import { InvitestatusComponent } from './invitestatus/invitestatus.component';
 */
/* export interface PeriodicElement {
  name: string;
  email: string;
}

export class CSVRecord {
  public name: any;
  public emailId: any;
  constructor() { }
} */
@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss']
})
export class InviteComponent implements OnInit {

 /*  public csvRecords: any[] = [];
  @ViewChild('fileImportInput') fileImportInput: any;

  @ViewChild(MatTable) table: MatTable<any>;

  displayedColumns: string[] = ['name', 'email', 'action'];
  assessmentfilter: String;
  assessments: any = [];
  invitesList = [];
  showTable = false;
  showLoader = false;

  inviteForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2)
    ]),
    emailId: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.email
    ])
  });

  disable_invite_submit_name = true;
  disable_invite_submit_email = true;
  duplicateValue: Boolean = false; */

  constructor(public dialog: MatDialog) { }
  /* openDialog(resultdata) {
    const popmsg = {
      assessment: this.assessmentfilter,
      data: resultdata
    };
    this.dialog.open(InvitestatusComponent, {
      data: popmsg,
      height: '50%',
      width: '50%'
    });
  } */
  ngOnInit() {/* 
    this.data.getAssessments().subscribe(
      res => {
        const elements_dd = res['job_list'];
        const sel_list = [];
        for (const element of elements_dd) {
          const temp_obj = {
            value: element['role_code'],
            viewValue: element['role_name']
          };
          this.assessments.push(temp_obj);
        }
      },
      err => {
        console.log(err);
      }
    ); */
  }

  /* onAdd() {
    const nameVal = this.inviteForm.value['name'];
    const emailVal = this.inviteForm.value['emailId'];
    if ((this.inviteForm.controls['name'].hasError('required') ||
      this.inviteForm.controls['emailId'].hasError('required') ||
      this.inviteForm.controls['emailId'].hasError('email')) ||
      (nameVal == null || emailVal == null)) {
      this.openSnackBar('Invalid Entry', 'Ok');
    } else {
      if (this.invitesList.length > 0) {
        for (let i = 0; i < this.invitesList.length; i++) {
          if (this.inviteForm.value['emailId'] === this.invitesList[i]['emailId']) {
            this.duplicateValue = true;
            this.inviteForm.reset();
            this.inviteForm.controls['name'].setErrors(null);
            this.inviteForm.controls['emailId'].setErrors(null);
          }
        }
      }
      if (this.duplicateValue === false) {
        this.showTable = true;
        this.invitesList.push(this.inviteForm.value);
        this.table.renderRows();
        this.inviteForm.reset();
        this.inviteForm.controls['name'].setErrors(null);
        this.inviteForm.controls['emailId'].setErrors(null);
        this.disable_invite_submit_name = true;
        this.disable_invite_submit_email = true;
      } else {
        this.openSnackBar('Duplicate Entry', 'Ok');
      }
    }
  }

  getErrorMessageName() {
    if (this.inviteForm.controls['name'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.inviteForm.controls['name'].hasError('minLength')) {
      return 'Too Short';
    }
  }

  getErrorMessageEmail() {
    if (this.inviteForm.controls['emailId'].hasError('required')) {
      return 'You must enter a value';
    }
    if (this.inviteForm.controls['emailId'].hasError('minLength')) {
      return 'Too Short';
    }
    if (this.inviteForm.controls['emailId'].hasError('email')) {
      return 'Not a valid email';
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  formInputChangedName() {
    this.disable_invite_submit_name = false;
  }

  formInputChangedEmail() {
    this.disable_invite_submit_email = false;
  }

  updateTable(event) {

  }

  sendInvites() {
    if ((!this.assessmentfilter) && (this.invitesList.length < 1)) {
      this.openSnackBar('Add an Assessment and Add Candidates to Invite', 'Ok');
    } else if (!this.assessmentfilter) {
      this.openSnackBar('Please Select an Assessment', 'Ok');
    } else if (this.invitesList.length < 1) {
      this.openSnackBar('No candidate List Provided', 'Ok');
    } else {
      // console.log('Sending Data');
      const invitesData = {
        'key_series_no': this.assessmentfilter,
        'mail_list': this.invitesList
      };
      // console.log(invitesData);
      this.showLoader = true;
      this.showTable = false;
      this.data.sendInvites(invitesData).subscribe(
        res => {
          // console.log(res);
          // console.log(this.invitesList);
          // console.log(this.assessmentfilter);
          this.openDialog(res['existing_emails']);
          this.invitesList = [];
          this.assessmentfilter = undefined;
          this.showTable = false;
          this.showLoader = false;
        },
        err => {
          // console.log(err['error']['message']);
          this.openSnackBar(err['error']['message'], 'Ok');
          // console.log(this.invitesList);
          // console.log(this.assessmentfilter);
        }
      );
      // this.invitesList = [];
      // this.assessmentfilter = undefined;
      // this.showTable = false;
    }
  }

  // Upload CSV

  isCSVFile(file: any) {

    return file.name.endsWith('.csv');

  }

  getHeaderArray(csvRecordsArr: any) {
    const headers = csvRecordsArr[0].split(',');
    const headerArray = [];

    for (let j = 0; j < headers.length; j++) {
      headerArray.push(headers[j]);
    }
    return headerArray;
  }

  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {
    const dataArr = [];
    let toAdd = true;

    for (let i = 1; i < csvRecordsArray.length; i++) {
      const data = csvRecordsArray[i].split(',');
      toAdd = true;
      // console.log(data);
      // FOR EACH ROW IN CSV FILE IF THE NUMBER OF COLUMNS
      // ARE SAME AS NUMBER OF HEADER COLUMNS THEN PARSE THE DATA
      if (dataArr.length > 0 && data[1] !== undefined) {
        for (let j = 0; j < dataArr.length; j++) {
          // console.log('\n');
          if (dataArr[j]['emailId'] === data[1].trim()) {
            // console.log('Duplicate Found');
            toAdd = false;
          }
        }
      }

      if (data.length === headerLength && toAdd) {
        const csvRecord: CSVRecord = new CSVRecord();
        csvRecord.name = data[0].trim();
        csvRecord.emailId = data[1].trim();
        dataArr.push(csvRecord);
      }
    }
    return dataArr;
  }

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.csvRecords = [];
  }

  fileChangeListener($event: any): void {
    // console.log('Invoked');
    const files = $event.srcElement.files;

    if (this.isCSVFile(files[0])) {
      const input = $event.target;
      const reader = new FileReader();
      reader.readAsText(input.files[0]);

      reader.onload = (data) => {
        const csvData = reader.result;
        const csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        const headersRow = this.getHeaderArray(csvRecordsArray);
        if (headersRow[0] === 'name' && headersRow[1] === 'emailId') {
          // this.csvRecords = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          this.invitesList = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);
          this.showTable = true;
          this.table.renderRows();
        } else {
          this.openSnackBar('Invalid CSV Template', 'Ok');
        }
      };

      reader.onerror = function () {
        alert('Unable to read' + input.files[0]);
      };
    } else {
      alert('Please import valid .csv file.');
      this.fileReset();
    }
  }

  deleteTableElement(index) {
    this.invitesList.splice(index, 1);
    this.table.renderRows();
    if (this.invitesList.length > 0) {
      this.showTable = true;
    } else {
      this.showTable = false;
    }
  }
 */


 /* modules functionality */
 assessmentObject:any;
  recommendationInput:String;
  recommendations :any[] =['Planning','Persistance','Risk Taking','Flexibility','Learning']

  changeInputValue(value){
    this.recommendationInput=value;
  }

  openPopup() : void {
    const dialogRef = this.dialog.open(ModuleCardOverviewComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  
}

  
}
