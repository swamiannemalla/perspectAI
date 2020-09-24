import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { FilePickerModule } from  'ngx-awesome-uploader';

/* Modules */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule,MatCheckboxModule, MatInputModule,MatChipsModule,MatAutocompleteModule, MatListModule, MatDialogModule, MatButtonModule} from '@angular/material';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { PortalComponent } from './portal/portal.component';
import { InviteComponent } from './portal/invite/invite.component';
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { PeopleComponent } from './portal/people/people.component';
import { SettingsComponent } from './portal/settings/settings.component';
import { InvitestatusComponent } from './portal/invite/invitestatus/invitestatus.component';
import { DashboardDailogComponent } from './portal/dashboard/dashboard-dailog/dashboard-dailog.component';
import { CustomAssessmetsUsersComponent } from './portal/dashboard/custom-assessmets-users/custom-assessmets-users.component';
import { ModuleCardOverviewComponent } from './portal/dashboard/custom-assessmets-users/module-card-overview/module-card-overview.component';
import { UserDetailsComponent, SafePipe } from './portal/people/user-details/user-details.component';
import { BarRatingModule } from "ngx-bar-rating";
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { DialogsServiceService } from './portal/people/user-details/user-details-dialog/dialogs-service.service';
import { UserDetailsDialogComponent } from './portal/people/user-details/user-details-dialog/user-details-dialog.component';
/* import {MatRadioModule} from '@angular/material/radio'; */

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    PortalComponent,
    InviteComponent,
    DashboardComponent,
    PeopleComponent,
    UserDetailsComponent,
    SettingsComponent,
    SafePipe,
    InvitestatusComponent,
    DashboardDailogComponent,
    CustomAssessmetsUsersComponent,
    ModuleCardOverviewComponent,
    UserDetailsDialogComponent

  ],
  entryComponents: [
    InvitestatusComponent,
    DashboardDailogComponent,
    ModuleCardOverviewComponent,
    UserDetailsDialogComponent
  ],
  exports: [UserDetailsDialogComponent],
  imports: [
    BrowserModule,
    FilePickerModule,
    MatTableModule,
    FilePickerModule,
    MatIconModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatDividerModule,
    MatAutocompleteModule,
    MaterialModule,
    ScrollDispatchModule,
    MatListModule,
    BarRatingModule ,
    MatCheckboxModule,
    MatSnackBarModule,
    FormsModule,
    MatChipsModule,
    NgbModule,
    MatDialogModule,
    MatButtonModule,
    

    /* MatRadioModule, */
    ReactiveFormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['appapi.perspect.ai'],
        blacklistedRoutes: [''],
        skipWhenExpired: true,
        headerName: 'Authorization',
        authScheme: ''
      }
    }),
  ],
  providers: [DialogsServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
