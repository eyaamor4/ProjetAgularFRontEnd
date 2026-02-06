export interface Laboratoire {
  id?: string;
  nom: string;
  adresse: string;
  email: string;
  directeur: string;
  membres: string[];   // liste des IDs des membres
}
