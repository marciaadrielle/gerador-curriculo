// src/components/Preview/CVPreview.tsx

import PersonalHeader from "./PersonalHeader";
import ExperienceSection from "./ExperienceSection";
import SkillSection from "./SkillsSection";
import EducationSection from "./EducationSection";
import { useCVData } from "../../hooks/useCVData";

export default function CVPreview() {
  const { cvData } = useCVData();

  return (
    <section className="space-y-8">
      <PersonalHeader cvData={cvData} />
      <SkillSection skills={cvData.skills} />
      <EducationSection education={cvData.education} />
      <ExperienceSection experiences={cvData.experiences} />
    </section>
  );
}