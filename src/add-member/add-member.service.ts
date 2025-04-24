import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpEvent, HttpEventType, HttpRequest} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {Customer} from "./customer.model";

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {
  private apiUrl = 'http://localhost:8080/api/customers/customer-infos';

  constructor(private http: HttpClient) { }

  createCustomer(formData: FormData): Observable<Customer> {
    return this.http.post<Customer>(this.apiUrl, formData);
  }
}
