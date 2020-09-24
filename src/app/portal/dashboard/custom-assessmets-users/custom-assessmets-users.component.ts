import { Component, OnInit, ViewChild, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatDialog, ErrorStateMatcher, MatSnackBar, MatTable, MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { ModuleCardOverviewComponent } from './module-card-overview/module-card-overview.component';
import { FormControl, FormGroupDirective, NgForm, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { DemoFilePickerAdapter } from 'src/app/demofilepickeradapter';
import { InvitestatusComponent } from '../../invite/invitestatus/invitestatus.component';
import { DataService } from 'src/app/data.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';


export interface PeriodicElement {
  name: string;
  email: string;
}

export class CSVRecord {
  public name: any;
  public emailId: any;
  constructor() { }
}

export interface Recomm {
  name: string;
}


@Component({
  selector: 'app-custom-assessmets-users',
  templateUrl: './custom-assessmets-users.component.html',
  styleUrls: ['./custom-assessmets-users.component.scss']
})
export class CustomAssessmetsUsersComponent implements OnInit, OnDestroy {

  /* reports page functionality */
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  reportsDisplayedColumns: string[] = ['name', 'email_id', 'status', 'report'];
  reportsDisplayedColumnsPending: string[] = ['name', 'email_id'];
  dataSource: any = [];
  pendingemails: any = [];
  disableButton: Boolean = false;
  selectedindex = '';
  reportAssessmentfilter = '07';
  showloader: Boolean = false;
  reportAssessments: any = [];
  showTableLoader: Boolean = false;
  registerArr: any = [];
  pendingArr: any = [];
  dashboardId: any;
  url: string;

  constructor(public activeRouter: ActivatedRoute, public router: Router, public http: HttpClient, private snackBar: MatSnackBar, private data: DataService, public dialog: MatDialog) { }


  departments = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' }
  ];

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);


  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  assessmentObject: any;
  recommendationInput: String;
  recommendations: any[] = ['Planning', 'Persistance', 'Risk Taking', 'Flexibility', 'Learning']


  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.recommendations.push({ name: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(recomm: Recomm): void {
    const index = this.recommendations.indexOf(recomm);

    if (index >= 0) {
      this.recommendations.splice(index, 1);
    }
  }

  ngOnDestroy() {
    this.dashboardId.unsubscribe();
  }


  ngOnInit() {
    this.data.getModulesINAssessments(this.data).subscribe(
      res => {
        console.log("getModulesINAssessments",res)
      });


    this.dashboardId = this.activeRouter
      .queryParams
      .subscribe(params => {
        this.reportAssessmentfilter = params['id'];
      });

    this.assessmentObject = JSON.parse(localStorage.getItem('dialogForm'));
    console.log(this.assessmentObject);

    /* invites page functionality from  from 131-163*/
    this.data.getAssessments().subscribe(
      res => {
        console.log(res)
        const elements_dd = res['assessment_list'];
        const sel_list = [];
        for (const element of elements_dd) {
          const temp_obj = {
            value: element['assessment_code'],
            viewValue: element['assessment_name']
          };
          this.assessments.push(temp_obj);
        }
      },
      err => {
        console.log(err);
      }
    );



    /* reports page functionality line from 91-117*/

    this.showTableLoader = true;
    this.data.getAssessments().subscribe(
      res => {
        console.log("getAssessments", res)
        const elements_dd = res['assessment_list'];
        const sel_list = [];
        this.reportAssessments.push({
          value: 'all',
          viewValue: 'All'
        });
        console.log(this.reportAssessments)
        for (const element of elements_dd) {
          const temp_obj = {
            value: element['assessment_code'],
            viewValue: element['assessment_name']
          };
          this.reportAssessments.push(temp_obj);
        }
        this.showTableLoader = false;
      },
      err => {
        console.log(err);
        this.showTableLoader = false;
      }
    );
    this.invitesTable(this.reportAssessmentfilter);
  }

  /* reports page functionality  line from 120-171*/
  invitesTable(filter) {
    // console.log(filter);
    this.data.getInvites(filter).subscribe(
      res => {
        console.log("getInvitess", res)
        this.registerArr = res['registered'];
        this.pendingArr = res['pending'];

        this.registerArr.push(...this.pendingArr)
        this.dataSource = new MatTableDataSource(this.registerArr)
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        /* this.dataSource = new MatTableDataSource(res['registered']);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.dataSource)

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
    console.log("this.dataSource.filter",this.dataSource.filter)
  }

  applyFilterPending(filterValue: string) {
    this.pendingemails.filter = filterValue.trim().toLowerCase();
  }

  getReport(data,value){
  console.log("dataaaaaaaaa", data)
  this.disableButton = true;
  this.selectedindex = data;
  this.showloader = true;
  localStorage.dialogForm = JSON.stringify(value);
  console.log(localStorage.dialogForm)
  
  //this.url = 'https://appapi.perspect.ai/web-dev-v1/portal/user_score/surajbathina@loopreality.com/07';
  //var email_id = 'surajbathina@loopreality.com';
  //var assessment_code = '07';
  this.url = 'https://appapi.perspect.ai/web-dev-v1/portal/user_score/'+data.email_id+'/'+this.assessmentObject;

  console.log("this.urlllllll",this.url);

  this.http.get(this.url).subscribe(
    res => {
      this.data.setSharedUserData(res)
      console.log("------ -----------aaaaaaaaaaaa1111111111111", res)
      this.router.navigate(['/portal/user-details']);
    });
    /* console.log("generatedReport", res)
    const pdfblob = window.atob(res['data']);
    const dn = new Blob([pdfblob], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(dn);
    window.open(fileURL, '_blank');
    this.showloader = false;
    this.selectedindex = '';
    this.disableButton = false;
  },
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


  changeInputValue(value) {
    this.recommendationInput = value;
  }

  openPopup(): void {
    const dialogRef = this.dialog.open(ModuleCardOverviewComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }







  /* invites page functionality  from 171-421*/

  public csvRecords: any[] = [];
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
  duplicateValue: Boolean = false;

  openDialog(resultdata) {
    const popmsg = {
      assessment: this.assessmentfilter,
      data: resultdata
    };
    this.dialog.open(InvitestatusComponent, {
      data: popmsg,
      height: '50%',
      width: '50%'
    });
  }

  onAdd() {
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

  /* updateTable(event) {

  } */

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

}
