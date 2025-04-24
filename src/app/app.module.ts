import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {UserProfileComponent} from "../user-profile/user-profile.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {UserListComponent} from "../user-list/user-list.component";
import {UpdateMemberModalComponent} from "../update-member-modal/update-member-modal.component";
import {MemberListComponent} from "../member-list/member-list.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CustomerFormComponent} from "../add-member/add-member.component";



// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    NavbarComponent,
    DashboardComponent,
    MemberListComponent,
    UpdateMemberModalComponent,
    UserListComponent,
    MemberListComponent,
    CustomerFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
  ],
  providers: [],
  schemas: [NO_ERRORS_SCHEMA], // Add NO_ERRORS_SCHEMA here
  bootstrap: [AppComponent]
})
export class AppModule { }
