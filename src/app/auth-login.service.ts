import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginService {
  constructor(private http: HttpClient) {}
  url = 'https://dcx-app-server.herokuapp.com/api/developer/login';
  head = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  loginDeveloper(data): Observable<any> {
    return this.http.post<any>(this.url, data, this.head);
  }
}
