import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "../user-list/user-list.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {CustomerFormComponent} from "../add-member/add-member.component";
import {MemberListComponent} from "../member-list/member-list.component";

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'list', component: UserListComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-member', component: CustomerFormComponent },
  { path: 'member-list', component: MemberListComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
