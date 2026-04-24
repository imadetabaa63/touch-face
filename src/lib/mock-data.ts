// Shared mock data for FaceGate Présence

export type Department =
  | "Ingénierie"
  | "RH"
  | "Finance"
  | "Marketing"
  | "Opérations"
  | "Sécurité"
  | "IT";

export const departmentColors: Record<Department, string> = {
  "Ingénierie": "var(--color-primary)",
  "RH": "var(--color-success)",
  "Finance": "var(--color-info)",
  "Marketing": "var(--color-warning)",
  "Opérations": "oklch(0.6 0.2 320)",
  "Sécurité": "var(--color-destructive)",
  "IT": "oklch(0.65 0.15 200)",
};

export type Status = "PRÉSENT" | "RETARD" | "ABSENT" | "DEMI-JOURNÉE" | "EN CONGÉ";

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  department: Department;
  email: string;
  phone: string;
  startDate: string;
  accessLevel: "Standard" | "Responsable" | "Exécutif" | "Sécurité" | "Visiteur";
  active: boolean;
  avatar: string;
  lastSeen: string;
}

const avatarSeeds = [
  "imad", "kanza", "ahmed", "fatima", "youssef", "sara",
  "hamza", "nadia", "omar", "leila", "khalid", "amina",
  "rachid", "salma", "mehdi", "yasmine", "tarik", "houda",
  "soufiane", "meryem"
];

export const employees: Employee[] = [
  { id: "FG-2026-0001", firstName: "Imad", lastName: "Benali", position: "Ingénieur IA", department: "Ingénierie", email: "imad.benali@entreprise.com", phone: "+212 661 23 45 67", startDate: "2023-03-15", accessLevel: "Standard", active: true, avatar: avatarSeeds[0], lastSeen: "Aujourd'hui 08h32" },
  { id: "FG-2026-0002", firstName: "Kanza", lastName: "Mansouri", position: "Responsable RH", department: "RH", email: "kanza.m@entreprise.com", phone: "+212 662 34 56 78", startDate: "2021-09-01", accessLevel: "Responsable", active: true, avatar: avatarSeeds[1], lastSeen: "Aujourd'hui 08h15" },
  { id: "FG-2026-0003", firstName: "Ahmed", lastName: "El Fassi", position: "Comptable senior", department: "Finance", email: "ahmed.elfassi@entreprise.com", phone: "+212 663 45 67 89", startDate: "2020-01-12", accessLevel: "Standard", active: true, avatar: avatarSeeds[2], lastSeen: "Hier 17h45" },
  { id: "FG-2026-0004", firstName: "Fatima", lastName: "Zahra", position: "Cheffe de projet", department: "Marketing", email: "fatima.z@entreprise.com", phone: "+212 664 56 78 90", startDate: "2022-06-20", accessLevel: "Responsable", active: true, avatar: avatarSeeds[3], lastSeen: "Aujourd'hui 09h02" },
  { id: "FG-2026-0005", firstName: "Youssef", lastName: "Amrani", position: "Développeur backend", department: "Ingénierie", email: "youssef.a@entreprise.com", phone: "+212 665 67 89 01", startDate: "2024-02-10", accessLevel: "Standard", active: true, avatar: avatarSeeds[4], lastSeen: "Aujourd'hui 08h47" },
  { id: "FG-2026-0006", firstName: "Sara", lastName: "Bouazza", position: "Designer UI/UX", department: "Marketing", email: "sara.b@entreprise.com", phone: "+212 666 78 90 12", startDate: "2023-11-05", accessLevel: "Standard", active: true, avatar: avatarSeeds[5], lastSeen: "Aujourd'hui 08h55" },
  { id: "FG-2026-0007", firstName: "Hamza", lastName: "Tazi", position: "Admin sécurité", department: "Sécurité", email: "hamza.t@entreprise.com", phone: "+212 667 89 01 23", startDate: "2019-04-22", accessLevel: "Sécurité", active: true, avatar: avatarSeeds[6], lastSeen: "Aujourd'hui 06h30" },
  { id: "FG-2026-0008", firstName: "Nadia", lastName: "Berrada", position: "DevOps", department: "IT", email: "nadia.b@entreprise.com", phone: "+212 668 90 12 34", startDate: "2022-08-18", accessLevel: "Standard", active: true, avatar: avatarSeeds[7], lastSeen: "Aujourd'hui 08h41" },
  { id: "FG-2026-0009", firstName: "Omar", lastName: "Chraibi", position: "Directeur opérations", department: "Opérations", email: "omar.c@entreprise.com", phone: "+212 669 01 23 45", startDate: "2018-02-01", accessLevel: "Exécutif", active: true, avatar: avatarSeeds[8], lastSeen: "Aujourd'hui 08h05" },
  { id: "FG-2026-0010", firstName: "Leila", lastName: "Ouahbi", position: "Analyste financière", department: "Finance", email: "leila.o@entreprise.com", phone: "+212 670 12 34 56", startDate: "2023-07-14", accessLevel: "Standard", active: true, avatar: avatarSeeds[9], lastSeen: "Aujourd'hui 09h12" },
  { id: "FG-2026-0011", firstName: "Khalid", lastName: "Idrissi", position: "Chef d'équipe", department: "Ingénierie", email: "khalid.i@entreprise.com", phone: "+212 671 23 45 67", startDate: "2020-10-05", accessLevel: "Responsable", active: true, avatar: avatarSeeds[10], lastSeen: "Aujourd'hui 08h22" },
  { id: "FG-2026-0012", firstName: "Amina", lastName: "Saidi", position: "Recruteuse", department: "RH", email: "amina.s@entreprise.com", phone: "+212 672 34 56 78", startDate: "2024-01-08", accessLevel: "Standard", active: false, avatar: avatarSeeds[11], lastSeen: "Il y a 3 jours" },
];

export const avatarUrl = (seed: string) =>
  `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=7c3aed,3b82f6,10b981,f59e0b&backgroundType=gradientLinear`;

export const recentScans = [
  { time: "09:14", employeeIdx: 4, type: "ENTRÉE" as const, isNew: true },
  { time: "09:12", employeeIdx: 9, type: "ENTRÉE" as const, isNew: true },
  { time: "09:08", employeeIdx: 3, type: "ENTRÉE" as const, isNew: false },
  { time: "08:55", employeeIdx: 5, type: "ENTRÉE" as const, isNew: false },
  { time: "08:47", employeeIdx: 0, type: "ENTRÉE" as const, isNew: false },
  { time: "08:41", employeeIdx: 7, type: "ENTRÉE" as const, isNew: false },
  { time: "08:32", employeeIdx: 1, type: "ENTRÉE" as const, isNew: false },
  { time: "08:22", employeeIdx: 10, type: "ENTRÉE" as const, isNew: false },
  { time: "08:15", employeeIdx: 2, type: "SORTIE" as const, isNew: false, duration: "8h 12min" },
  { time: "08:05", employeeIdx: 8, type: "ENTRÉE" as const, isNew: false },
];

export const weeklyData = [
  { day: "Lun", presents: 142, absents: 14 },
  { day: "Mar", presents: 138, absents: 18 },
  { day: "Mer", presents: 145, absents: 11 },
  { day: "Jeu", presents: 140, absents: 16 },
  { day: "Ven", presents: 127, absents: 29 },
];

export const departmentStats = [
  { name: "Ingénierie", rate: 94, count: 42 },
  { name: "RH", rate: 88, count: 12 },
  { name: "Finance", rate: 92, count: 18 },
  { name: "Marketing", rate: 76, count: 24 },
  { name: "Opérations", rate: 85, count: 32 },
  { name: "Sécurité", rate: 96, count: 14 },
  { name: "IT", rate: 68, count: 14 },
];

export const todayDate = "Lundi 21 avril 2026";

export const attendanceRecords = employees.map((e, i) => {
  const arrivals = ["08h05", "08h15", "—", "09h02", "08h47", "08h55", "06h30", "08h41", "08h05", "09h12", "08h22", "—"];
  const departures = ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"];
  const statuses: Status[] = ["PRÉSENT", "PRÉSENT", "ABSENT", "RETARD", "PRÉSENT", "PRÉSENT", "PRÉSENT", "PRÉSENT", "PRÉSENT", "RETARD", "PRÉSENT", "EN CONGÉ"];
  const durations = ["—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—", "—"];
  return {
    employee: e,
    arrival: arrivals[i],
    departure: departures[i],
    status: statuses[i],
    duration: durations[i],
    stillPresent: statuses[i] === "PRÉSENT" || statuses[i] === "RETARD",
  };
});
