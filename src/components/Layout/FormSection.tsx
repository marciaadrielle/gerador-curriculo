import { useCVData } from '../../hooks/useCVData';
import PersonalInfo from "../Form/PersonalInfo";
import EducationSection from "../Form/EducationSection";
import SkillsSection from "../Form/Skills";
import ExperiencesSection from "../Form/Experience";
import logoImage from '../../assets/logo.png';

export default function FormSection() {
  const { undo, redo, canUndo, canRedo } = useCVData();

  return (
    <section className="flex-1 p-8 bg-white rounded-2xl border border-gray-200 shadow-lg overflow-y-auto animate-fadeIn">
      {/* Container para a imagem e o título */}
      <div className="flex items-center gap-4">
        <img src={logoImage} alt="Logo" className="w-12 h-12" />
        <h2 className="text-2xl font-bold text-gray-800">
          Informações do Currículo
        </h2>
      </div>

      <div className="flex justify-end space-x-2 my-6">
        <button
          onClick={undo}
          disabled={!canUndo}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            !canUndo ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
          }`}
        >
          Desfazer
        </button>
        <button
          onClick={redo}
          disabled={!canRedo}
          className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
            !canRedo ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600 cursor-pointer'
          }`}
        >
          Refazer
        </button>
      </div>

      <div className="space-y-12">
        <PersonalInfo />
        <SkillsSection />
        <EducationSection />
        <ExperiencesSection />
      </div>
    </section>
  );
}