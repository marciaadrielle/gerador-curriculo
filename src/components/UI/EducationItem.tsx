// src/components/UI/EducationItem.tsx
import { useState, useEffect } from 'react';
import type { Education } from '../../types/cv.types';

type Props = {
  education: Education;
  onEdit: (edu: Education) => void;
  onRemove: (id: string) => void;
};

export default function EducationItem({ education, onEdit, onRemove }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <li
      className={`flex justify-between items-start bg-white p-2 rounded shadow ${
        isVisible ? 'animate-scaleIn' : 'opacity-0'
      }`}
    >
      <div>
        <strong>{education.degree} em {education.course}</strong> <br />
        <em>{education.institution}</em> <br />
        <span className="text-sm text-gray-600">
          {education.startDate} - {education.status === "Cursando" ? "Cursando" : education.endDate}
        </span>
        <span className="ml-2 text-sm font-medium text-blue-600">({education.status})</span>
        {education.description && <p className="mt-1 text-sm">{education.description}</p>}
      </div>
      <div className="flex gap-2">
        <button
          className="px-2 py-1 bg-yellow-400 text-gray-600 rounded hover:bg-yellow-500 cursor-pointer"
          onClick={() => onEdit(education)}
        >
          Editar
        </button>
        <button
          className="px-2 py-1 bg-red-400 text-white rounded hover:bg-red-600 cursor-pointer"
          onClick={() => onRemove(education.id)}
        >
          Remover
        </button>
      </div>
    </li>
  );
}