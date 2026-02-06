export interface Publication {
  id?: number;
  type: string;
  titre: string;              // ✅ aligné backend
  dateApparition: string;     // ✅ aligné backend
  lien?: string | null;
  auteurs?: string[];
  sourcePdf?: string | null;
}
