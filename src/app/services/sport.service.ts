import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sport } from '../models/sport/sport.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';

const baseUrl = 'http://192.168.33.10:3002/sport';

@Injectable({
  providedIn: 'root',
})
export class SportService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Sport[]> {
    return this.http.get<Sport[]>(baseUrl);
  }
  get(id: any): Observable<Sport> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl + '/create', data);
  }
  update(id: any, data: any): Observable<any> {
    console.log(data);
    return this.http.put(`${baseUrl}/updatesport/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/deletesport/${id}`);
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
