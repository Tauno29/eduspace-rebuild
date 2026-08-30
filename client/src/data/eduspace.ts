/* EduSpace live-data contract: this file contains types only; no sample or screenshot-derived records are bundled into the application. */

export type Region = {
  id: string;
  name: string;
  schools: number;
  available: number;
  icon: string;
  tone: string;
};

export type School = {
  id: string;
  name: string;
  region: string;
  location: string;
  category: "Secondary" | "Primary" | "Combined";
  type: "Government" | "Private";
  spaces: number;
  boarding: "Hostel" | "Day school";
  image: string;
  description: string;
};

export type VacancyStream = {
  name: string;
  enrolled: number;
  capacity: number;
};

export type VacancyRow = {
  grade: string;
  note: string;
  enrolled: number;
  capacity: number;
  occupied: number;
  tone?: string;
  streams: VacancyStream[];
};
