// src/components/Preview/EducationSection.tsx
import type { Education } from "../../types/cv.types";
import EducationItemPreview from "./EducationItemPreview";

type Props = {
  education: Education[];
};

export default function EducationSection({ education }: Props) {
  return (
    <>
      <section>
        <h2 className="text-xl text-gray-800 font-bold tracking-wide p-1">
          FORMAÇÃO ACADÊMICA
        </h2>
        {education.length > 0 ? (
          <div className="pl-3 mt-2 text-justify">
            {education.map((edu) => (
              <EducationItemPreview key={edu.id} education={edu} />
            ))}
          </div>
        ) : (
          <p className="m-2 text-gray-500 italic mt-2 text-center">
            Nenhuma formação adicionada ainda.
          </p>
        )}
      </section>
    </>
  );
}