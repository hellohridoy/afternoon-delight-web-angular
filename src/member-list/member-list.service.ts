import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Customer} from "./customer.model";
import {environment} from "./member-list.component";


@Injectable({
  providedIn: 'root'
})

export class MemberListService {
  private apiUrl = '/api/customers';

  constructor(private http: HttpClient) { }

  // Download image
  downloadImage(customerId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/customers/${customerId}/image`, {
      responseType: 'blob'
    });
  }

  // Download CV
  downloadCv(customerId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/api/customers/${customerId}/cv`, {
      responseType: 'blob'
    });
  }
// member-list.service.ts

  getImage(customerId: number): Observable<Blob> {
    return this.http.get(`http://localhost:8080/download/image/${customerId}`, {
      responseType: 'blob'
    });
  }
  // Updated service methods with typing
  getAllCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`http://localhost:8080/api/customers/customer-infos`);
  }
  members: Customer[] = [];
}
