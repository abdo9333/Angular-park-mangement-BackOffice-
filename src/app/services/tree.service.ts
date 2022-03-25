import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tree } from '../models/tree/tree.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';



const baseUrl = 'http://192.168.33.10:3002/trees';


@Injectable({
  providedIn: 'root'
})
export class TreeService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Tree[]> {
    return this.http.get<Tree[]>(baseUrl);
  }
  get(id: any): Observable<Tree> {
    return this.http.get(`${baseUrl}/${id}`);
  }
  create(data: any): Observable<any> {
    return this.http.post(baseUrl+'/create', data);
  }
  update(id: any, data: any): Observable<any> {
      console.log(data);
    return this.http.put(`${baseUrl}/updatetree/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/deletetree/${id}`);
  }
  
// image 

  uploadProfileImage(formData: FormData, id : Number): Observable<any> {
    return this.http.post<FormData>(`${baseUrl}/${id}/upload/`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

//end image

}
