import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  server = 'https://ece9065-araut4-lab5-araut4.c9users.io:8080';
  constructor(private _http: HttpClient) { }
  
  adminLogin(loginData: any) {
    console.log(loginData);
    return this._http.post(this.server + '/register', loginData)
  }
}
