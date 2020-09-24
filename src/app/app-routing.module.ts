import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortalComponent } from './portal/portal.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './login/forgot/forgot.component';
import { InviteComponent } from './portal/invite/invite.component';
import { DashboardComponent } from './portal/dashboard/dashboard.component';
import { PeopleComponent } from './portal/people/people.component';
import { SettingsComponent } from './portal/settings/settings.component';
import { AuthGuard } from './auth.guard';
import { CustomAssessmetsUsersComponent } from './portal/dashboard/custom-assessmets-users/custom-assessmets-users.component';
import { UserDetailsComponent } from './portal/people/user-details/user-details.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'portal',
    component: PortalComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'invite', component: InviteComponent },
      { path: 'dashboard', component: DashboardComponent},
      { path: 'customAssessmentUsers', component: CustomAssessmetsUsersComponent } ,
      { path: 'people', component: PeopleComponent },
      { path: 'user-details', component: UserDetailsComponent } ,
      { path: 'settings', component: SettingsComponent }
    ]
  }, 
  /* {
    path: 'userDetails',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'motives', component: MotivesComponent },
      
    ]
  }, */{
    path: 'forgot',
    component: ForgotComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
