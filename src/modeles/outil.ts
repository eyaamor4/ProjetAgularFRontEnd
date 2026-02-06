import { Member } from "./member";

export interface Outil 
{
   id?: number;
  nom: string;
  description?: string;
  technologie?: string;
  lienSource: string;
  dateCreation: string;
  auteur?: Member; 
   
}