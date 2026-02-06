export interface Member {
  id?: string;
  cin: string;
  nom: string;       // nom
  prenom: string;     // prénom
  email: string;
  password: string;
  dateNaissance: string;
  grade: string;
  etablissement: string;
  type: string;       // étudiant / enseignant
  encadreur?: string; // id du professeur encadreur
  photo?: string;     // base64
  cv?: string;        // PDF base64
  createdDate?: string;
  role?: string; 
  diplome?: string;     
}
