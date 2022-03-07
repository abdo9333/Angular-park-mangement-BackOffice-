import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Bird } from '../models/bird/bird.model';

const baseUrl = 'http://192.168.33.10:3002/bird';

@Injectable({
  providedIn: 'root'
})
export class BirdsService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Bird[]> {
    return this.http.get<Bird[]>(baseUrl);
  }
  get(id: any): Observable<Bird> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl+'/create', data);
  }
  update(id: any, data: any): Observable<any> {
      console.log(data);
    return this.http.put(`${baseUrl}/updatebird/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/deletebird/${id}`);
  }
  
// image 

  uploadProfileImage(formData: FormData, id : Number): Observable<any> {
    return this.http.post<FormData>(`${baseUrl}/${id}/upload/`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

}
