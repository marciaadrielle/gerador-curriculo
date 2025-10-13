// src/components/Education/EducationSection.tsx
import { useState } from "react";
import { useCVData } from "../../hooks/useCVData";
import EducationItem from "../UI/EducationItem";
import type { Education } from "../../types/cv.types";

export default function EducationSection() {
  const { cvData, updateField } = useCVData();

  const [degree, setDegree] = useState("");
  const [course, setCourse] = useState("");
  const [institution, setInstitution] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState<"Concluído" | "Cursando" | "Trancado">("Cursando");
  const [description, setDescription] = useState("");

  // Estado para edição
  const [editingId, setEditingId] = useState<string | null>(null);

  function addEducation() {
    if (!degree.trim() || !course.trim() || !institution.trim()) return;

    const newEducation: Education = {
      id: crypto.randomUUID(),
      degree,
      course,
      institution,
      startDate,
      endDate,
      status,
      description,
    };

    updateField("education", [...(cvData.education || []), newEducation]);
    resetInputs();
  }

  function removeEducation(id: string) {
    updateField(
      "education",
      (cvData.education || []).filter((edu) => edu.id !== id)
    );
    if (editingId === id) resetInputs();
  }

  function startEdit(edu: Education) {
    setEditingId(edu.id);
    setDegree(edu.degree);
    setCourse(edu.course);
    setInstitution(edu.institution);
    setStartDate(edu.startDate);
    setEndDate(edu.endDate);
    setStatus(edu.status);
    setDescription(edu.description);
  }

  function saveEdit() {
    if (!degree.trim() || !course.trim() || !institution.trim() || !editingId) return;

    updateField(
      "education",
      (cvData.education || []).map((edu) =>
        edu.id === editingId
          ? { ...edu, degree, course, institution, startDate, endDate, status, description }
          : edu
      )
    );
    resetInputs();
  }

  function resetInputs() {
    setDegree("");
    setCourse("");
    setInstitution("");
    setStartDate("");
    setEndDate("");
    setStatus("Cursando");
    setDescription("");
    setEditingId(null);
  }

  return (
    <section className="grid gap-4">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Formação Acadêmica</h3>

      <div className="form-group space-y-2">
        <div className="grid grid-cols-2 gap-4">
          <span className="grid gap-2">
            <label className="form-label">Grau</label>
            <select
              className="form-input"
              value={degree}
              onChange={(e) => setDegree(e.target.value)}
            >
              <option value="">Selecione o grau</option>
              <option value="Ensino Médio">Ensino Médio</option>
              <option value="Técnico">Técnico</option>
              <option value="Tecnólogo">Tecnólogo</option>
              <option value="Bacharelado">Bacharelado</option>
              <option value="Licenciatura">Licenciatura</option>
              <option value="Pós-graduação">Pós-graduação</option>
              <option value="MBA">MBA</option>
              <option value="Mestrado">Mestrado</option>
              <option value="Doutorado">Doutorado</option>
            </select>
          </span>
          <span className="grid gap-2">
            <label className="form-label">Curso</label>
            <input
              type="text"
              className="form-input"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              placeholder="Nome do curso"
            />
          </span>
        </div>

        <div className="grid gap-2">
          <label className="form-label">Instituição</label>
          <input
            type="text"
            className="form-input"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
            placeholder="Nome da instituição de ensino"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="grid gap-2">
            <label className="form-label">Data de início</label>
            <input
              type="text"
              className="form-input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="mm/aaaa"
            />
          </div>
          <div className="grid gap-2">
            <label className="form-label">Data de conclusão</label>
            <input
              type="text"
              className="form-input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="mm/aaaa"
              disabled={status === "Cursando"}
            />
          </div>
          <div className="grid gap-2">
            <label className="form-label">Status</label>
            <select
              className="form-input"
              value={status}
              onChange={(e) => setStatus(e.target.value as "Concluído" | "Cursando" | "Trancado")}
            >
              <option value="Cursando">Cursando</option>
              <option value="Concluído">Concluído</option>
              <option value="Trancado">Trancado</option>
            </select>
          </div>
        </div>

        <div className="grid gap-2">
          <label className="form-label">Atividades e conquistas relevantes (opcional)</label>
          <textarea
            className="form-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descreva projetos, atividades extracurriculares, prêmios, etc."
            rows={3}
          />
        </div>

        {editingId ? (
          <div className="flex gap-2">
            <button
              className="px-4 py-2 bg-green-500 text-white font-medium rounded-md shadow cursor-pointer hover:bg-green-600 transition duration-200"
              onClick={saveEdit}
            >
              Salvar
            </button>
            <button
              className="px-4 py-2 bg-gray-400 text-white font-medium rounded-md shadow cursor-pointer hover:bg-gray-500 transition duration-200"
              onClick={resetInputs}
            >
              Cancelar
            </button>
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-md shadow cursor-pointer hover:bg-blue-600 transition duration-200"
            onClick={addEducation}
          >
            Adicionar
          </button>
        )}
      </div>

      <ul className="space-y-2 mt-4">
        {(cvData.education || []).map((edu) => (
          <EducationItem key={edu.id} education={edu} onEdit={startEdit} onRemove={removeEducation} />
        ))}
      </ul>
    </section>
  );
}