import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, forkJoin, map, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryApiService {

  private apiUrl = 'https://hackernewsapi20251226160215.azurewebsites.net/api/hackernews';
  private loadingSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient
  ) {
  }
  getAllStories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/newstories`);
  }


  getStoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/item/${id}`);
  }

  getStoriesByIds(ids: number[]): Observable<any[]> {
    console.log(ids);
    return forkJoin(ids.map(id => this.getStoryById(id)));
  }



}
