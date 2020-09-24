import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { UserDetailsDialogComponent } from './user-details-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogsServiceService {

  constructor(private dialog: MatDialog) { }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MatDialogRef<UserDetailsDialogComponent>;

    dialogRef = this.dialog.open(UserDetailsDialogComponent);

    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
}
}
