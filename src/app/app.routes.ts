import {Routes} from '@angular/router';
import {UserTableComponent} from './components/user-table/user-table.component';
import {AuthenticationModuleComponent} from './components/login-form/authentication-module.component';
import {NewUserModuleComponent} from './components/user-form/new-user-module.component';
import {AuthGuardService} from './services/auth-guard-service/auth-guard.service';

export const routes: Routes = [
  {path: 'users', component: UserTableComponent, canActivate: [AuthGuardService]},
  {path: 'users/new', component: NewUserModuleComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: AuthenticationModuleComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},

];
