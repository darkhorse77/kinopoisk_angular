import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Film } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OmdbService {

  private apikey = '1b16ed91';
  private url = 'http://www.omdbapi.com/' // в реальном приложении я бы вынес апи ключ в конфиг, а ссылку на апи через прокси

  public historyUpdated = new Subject();

  constructor(private http: HttpClient) { }

  public Search(searchString: string, page?: string): Observable<any> {
    var params = new HttpParams();
    params = params.append('apikey', this.apikey);
    if(searchString) params = params.append('s', searchString);
    if(page) params = params.append('p', page);
    return this.http.get<any>(`${this.url}`, { params: params });
  }

  public GetFilm(id: string): Observable<any> {
    var params = new HttpParams();
    params = params.append('apikey', this.apikey);
    if(id) params = params.append('i', id);
    return this.http.get<any>(`${this.url}`, { params: params });
  }
}
