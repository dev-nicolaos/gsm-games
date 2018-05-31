import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class DataService {

  constructor(private http: HttpClient) { }

  post(url: string, data: object) {
    JSON.stringify(data);
    return this.http.post(url, data);
  }

  put(url, data) {
    return this.http.put(url, data);
  }
}
