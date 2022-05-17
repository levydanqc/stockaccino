import { Notification } from './notification';

export interface User {
  Id?: string;
  Email: string;
  Prenom: string;
  Nom: string;
  Password?: string;
  Stocks: string[];
  Amis: string[];
  Requetes: string[];
  Notifications: Notification[];
}
