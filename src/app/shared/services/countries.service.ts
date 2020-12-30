import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/env/environment';
import { CountryInfo } from '../models/country.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  httpOptions = {
    headers: {
      "x-rapidapi-key": environment.apiKeys.rapidApi,
      "x-rapidapi-host": "restcountries-v1.p.rapidapi.com"
    }
  };

  constructor(private http: HttpClient) { }

  getCountryByName(query: string): Observable<string[]> {
    const formattedQuery = query.replace(' ', '%20');
    return this.http.get<CountryInfo[]>(`https://restcountries-v1.p.rapidapi.com/name/${formattedQuery}`, this.httpOptions).pipe(
      map(res => res.map(info => info.name))
    );
  }
}
