import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetAbbottApp } from '../models/abbott-app.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "http://localhost:8051";

  constructor(private http: HttpClient,) { }

  getAbbottApp(): Observable<GetAbbottApp[]> {

    return this.http.get<GetAbbottApp[]>(
      `${this.apiUrl}/ehrconnect-master/abbottApp`,
    );
  }
  
  receiveFromApp(value: string, payload: object): Observable<any> {
    const customAuthToken = localStorage.getItem("appToken");
    const headers = new HttpHeaders()
        .set("Authorization", `Bearer ${customAuthToken}`)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json, application/pdf, application/text");
    return this.http.post<any>(
      `http://localhost:8050/common-connector/receive-from-app?abbottApp=${value}`,
      payload,
      { headers },
    );
  }

  tokenAbbottAppId = (value: number): Observable<any> => {
    const headers = new HttpHeaders().set("No-Auth", "True");
    return this.http.get<any>(
      `${"http://localhost:8050"}/token?abbottAppId=${value}`,
      { headers },
    );
  };
}
