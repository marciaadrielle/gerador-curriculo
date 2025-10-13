// src/components/Preview/EducationItemPreview.tsx
import { useState, useEffect } from 'react';
import type { Education } from "../../types/cv.types";

type Props = {
  education: Education;
};

export default function EducationItemPreview({ education }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`text-gray-700 mb-4 ${isVisible ? 'animate-scaleIn' : 'opacity-0'}`}>
      <p className="font-bold uppercase">
        {education.degree} EM {education.course} | {education.startDate} – {education.status === "Cursando" ? "Cursando" : education.endDate}
      </p>
      <p className="italic">
        {education.institution} • {education.status}
      </p>
      {education.description && (
        <ul className="list-inside mt-1">
          {education.description.split("\n").map((item, idx) => (
            <li key={idx} className="text-justify leading-5">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}