import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Handicap } from '../models/handicap/handicap.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const baseUrl = 'http://192.168.33.10:3002/handicap';

@Injectable({
  providedIn: 'root',
})
export class HandicapService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Handicap[]> {
    return this.http.get<Handicap[]>(baseUrl);
  }
  get(id: any): Observable<Handicap> {
    return this.http.get(`${baseUrl}/handicap/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/create', data);
  }
  update(id: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put(`${baseUrl}/updatehandicap/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/deletehandicap/${id}`);
  }

  // image

  uploadProfileImage(formData: FormData, id: Number): Observable<any> {
    return this.http.post<FormData>(`${baseUrl}/${id}/upload/`, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  //end image
}
