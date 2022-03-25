import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Constants } from 'src/assets/constants';
import { ResultAutocomplete } from '../classes/yahooResults/autocomplete';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class YahooService {
  constructor(private http: HttpClient) {}

  public getAutocomplete(query: string): any {
    const queryParams = new HttpParams().append('input', query);

    let response = this.get(Constants.AUTOCOMPLETE_URL, {
      params: queryParams,
    });

    return response.pipe(
      map((data) => {
        return data.ResultSet.Result;
      })
    );
  }

  public getSearchedStock(query: string): any {
    return this.get(Constants.SEARCH_STOCK_URL, {
      params: new HttpParams().append('input', query),
    });
  }

  public get(url: string, options?: any): Observable<any> {
    return this.http.get(url, options);
  }

  public post(url: string, data: any, options?: any) {
    return this.http.post(url, data, options);
  }

  public put(url: string, data: any, options?: any) {
    return this.http.put(url, data, options);
  }

  public delete(url: string, options?: any) {
    return this.http.delete(url, options);
  }
}
