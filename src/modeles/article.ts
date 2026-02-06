export interface Article {
  id?: string;
  titre: string;
  contenu: string;
  date: string;     // ISO format
  auteurs: string[]; // liste d'ID membres
}
