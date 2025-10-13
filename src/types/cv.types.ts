// src/types/cv.types.ts
export type CVData = {
  name: string;
  email: string;
  phone: string;
  linkedin: string;
  resume: string;
  skills: Skill[];
  experiences: Experience[];
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  endDate: string;
  startDate: string;
  description: string;
  current: boolean;
};

export type Skill = {
  id: string;
  name: string;
  level: "Básico" | "Intermediário" | "Avançado";
};

export type Education = {
  id: string;
  degree: string; // Grau (Bacharelado, Tecnólogo, etc.)
  course: string; // Nome do curso
  institution: string; // Nome da instituição
  startDate: string;
  endDate: string;
  status: "Concluído" | "Cursando" | "Trancado"; // Status
  description: string; // Atividades relevantes
};