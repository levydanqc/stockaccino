export abstract class Constants {
  static readonly LOCAL_URL: string = 'https://localhost:7056/';
  static readonly BASE_URL: string = 'https://api.danlevy.ca/stockaccino/';
  static readonly USER_URL: string = this.BASE_URL + 'users/';
  static readonly YAHOO_URL: string = this.BASE_URL + 'yahoo/';
  static readonly AUTOCOMPLETE_URL: string = this.YAHOO_URL + 'autocomplete/';
}
