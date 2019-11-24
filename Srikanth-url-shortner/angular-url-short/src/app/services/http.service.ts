import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const API_URL = environment.hostV1 + '/api/url-shorten';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }


  public create(data: any) {
    console.log(data);

    return this.http.post(API_URL, data).toPromise();
  }

  public update(id: any, data: any) {
    return this.http.put(API_URL + '/' + id, data).toPromise();
  }

  public getAll() {
    return this.http.get(API_URL).toPromise();
  }

  public get(code: any) {
    return this.http.get(API_URL + '/' + code).toPromise();
  }
}
