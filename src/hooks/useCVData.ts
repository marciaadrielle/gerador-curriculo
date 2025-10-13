import { createContext, useContext, useState, useEffect, createElement, type ReactNode } from "react";
import type { CVData } from "../types/cv.types";

const LOCAL_STORAGE_KEY = "cv-data";

// Extende o tipo de contexto para incluir as novas funções
type CVContextType = {
  cvData: CVData;
  updateField: (field: keyof CVData, value: CVData[keyof CVData]) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
};

const CVDataContext = createContext<CVContextType | undefined>(undefined);

// A estrutura inicial do seu objeto de dados
const initialCVData: CVData = {
  name: "",
  email: "",
  phone: "",
  linkedin: "",
  resume: "",
  skills: [],
  experiences: [],
  education: [],
};

export function CVDataProvider({ children }: { children: ReactNode }) {
  const [cvData, setCvData] = useState<CVData>(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData ? JSON.parse(savedData) : initialCVData;
  });

  // Novos estados para o histórico de versões
  const [history, setHistory] = useState<CVData[]>([cvData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Efeito para salvar no localStorage apenas quando cvData muda
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cvData));
  }, [cvData]);

  // Função para adicionar um novo estado ao histórico
  function updateField(field: keyof CVData, value: CVData[keyof CVData]) {
    setCvData((prevData) => {
      const newData = {
        ...prevData,
        [field]: value,
      };

      // Adiciona o novo estado ao histórico e remove os estados "futuros"
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, newData]);
      setHistoryIndex(newHistory.length);

      return newData;
    });
  }

  // Função para desfazer a última alteração
  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCvData(history[historyIndex - 1]);
    }
  };

  // Função para refazer a última alteração desfeita
  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCvData(history[historyIndex + 1]);
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return createElement(
    CVDataContext.Provider,
    { value: { cvData, updateField, undo, redo, canUndo, canRedo } },
    children
  );
}

export function useCVData() {
  const context = useContext(CVDataContext);
  if (!context) {
    throw new Error("useCVData deve ser usado dentro de CVDataProvider");
  }
  return context;
}