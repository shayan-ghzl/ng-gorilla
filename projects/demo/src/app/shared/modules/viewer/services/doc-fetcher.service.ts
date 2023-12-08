import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocFetcherService {
  private _cache: Record<string, Observable<string>> = {};

  constructor(private _http: HttpClient) { }

  fetchDocument(url: string): Observable<string> {
    if (this._cache[url]) {
      return this._cache[url];
    }

    const stream = this._http.get(url, { responseType: 'text' }).pipe(shareReplay(1));
    return stream.pipe(tap(() => this._cache[url] = stream));
  }
}