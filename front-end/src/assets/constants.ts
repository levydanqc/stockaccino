export abstract class Constants {
  static readonly LOCAL_URL: string = 'https://localhost:7056/';
  static readonly DOMAIN: string = 'https://api.danlevy.ca/';
  static readonly BASE_URL: string = this.DOMAIN + 'stockaccino/';
  static readonly USER_URL: string = this.BASE_URL + 'users/';
  static readonly YAHOO_URL: string = this.BASE_URL + 'yahoo/';
  static readonly AUTOCOMPLETE_URL: string = this.YAHOO_URL + 'autocomplete/';
  static readonly SEARCH_STOCK_URL: string = this.YAHOO_URL + 'search/';
  static readonly STOCK_CHART_URL: string = this.YAHOO_URL + 'chart/';
  static readonly TRENDING_URL: string = this.YAHOO_URL + 'trending/';
  static readonly SUGGESTION_URL: string = this.YAHOO_URL + 'suggestion/';
  static readonly WEBHOOK_URL: string =
    this.DOMAIN + 'webhook/reloadyahooapikey';
}
