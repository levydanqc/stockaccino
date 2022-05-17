import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Constants } from 'src/assets/constants';
import { map, Observable } from 'rxjs';
import { Trending } from '../classes/yahoo/trending';
import { Screener } from '../classes/yahoo/suggestion';

@Injectable({
  providedIn: 'root',
})
export class YahooService {
  reloaded = false;

  constructor(private http: HttpClient) {}

  public getAutocomplete(query: string): any {
    const queryParams = new HttpParams().append('input', query);

    let response = this.http.get(Constants.AUTOCOMPLETE_URL, {
      params: queryParams,
    });

    return response.pipe(
      map((data: any) => {
        return data.ResultSet.Result;
      })
    );
  }

  public getTrending(): Observable<Trending[]> {
    return this.http.get<Trending[]>(Constants.TRENDING_URL);
  }

  public getSuggestion(screener: string): Observable<Screener> {
    return this.http.get<Screener>(Constants.SUGGESTION_URL, {
      params: new HttpParams().append('screener', screener),
    });
  }

  public getSearchedStock(query: string): any {
    return this.http.get(Constants.SEARCH_STOCK_URL, {
      params: new HttpParams().append('input', query),
    });
  }

  public getStockChart(symbol: string): Observable<any> {
    return this.http.get(Constants.STOCK_CHART_URL, {
      params: new HttpParams().append('symbol', symbol),
    });
  }

  public reloadApiKey() {
    if (!this.reloaded) this.http.get(Constants.WEBHOOK_URL).subscribe();
    this.reloaded = true;
  }
}
