import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Music } from '../models/music';

@Injectable({
  providedIn: 'root',
})
export class MusicService {
  private readonly _http: HttpClient = inject(HttpClient);
  private readonly _apiUrl: string = 'http://localhost:3000/musics';

  getAll(): Observable<Music[]> {
    return this._http.get<Music[]>(this._apiUrl);
  }

  getById(id: number): Observable<Music> {
    return this._http.get<Music>(`${this._apiUrl}/${id}`);
  }

  create(music: Omit<Music, 'id'>): Observable<Music> {
    return this._http.post<Music>(this._apiUrl, music);
  }

  update(id: number, music: Omit<Music, 'id'>): Observable<Music> {
    return this._http.put<Music>(`${this._apiUrl}/${id}`, music);
  }

  delete(id: number): Observable<any> {
    return this._http.delete(`${this._apiUrl}/${id}`);
  }
}