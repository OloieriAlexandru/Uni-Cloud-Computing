import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GenericService {
  constructor(private http: HttpClient) {}

  public get<T>(api: string, url: string): Observable<T> {
    return this.http.get<T>(api + url, { headers: this.buildHeaders() });
  }

  public post<T>(api: string, url: string, data?: T): Observable<T> {
    console.log("hello")
    return this.http.post<T>(api + url, data, { headers: this.buildHeaders() });
  }

  public postAlt<T>(api: string, url: string, data?: T): Observable<any> {
    return this.http.post<any>(api + url, data);
  }

  public delete<T>(api: string, url: string, data?: T): Observable<any> {
    if (data != null) {
      return this.http.delete(api + url, data);
    } else {
      return this.http.delete(api + url, { headers: this.buildHeaders() });
    }
  }

  public put<T>(api: string, url: string, data: T): Observable<any> {
    return this.http.put(api + url, data, { headers: this.buildHeaders() });
  }

  public patch<T>(api: string, url: string, data: T): Observable<any> {
    return this.http.patch(api + url, data, { headers: this.buildHeaders() });
  }

  private buildHeaders(): HttpHeaders {
    return new HttpHeaders({ 'Content-Type': 'application/json' });
  }
}
