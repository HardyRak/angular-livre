import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectDataService {
  private baseUrl = 'http://localhost:3000/api';
  constructor(private httpClient : HttpClient) {}
  getBooks(page : number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/livre?page=${page}`);
  }

  saveBooks(book: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/livre`, book);
  }

  getBookById(id : string) : Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/livre/${id}`);
  }

  deleteBook(id : string) : Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/livre/${id}`);
  }

}