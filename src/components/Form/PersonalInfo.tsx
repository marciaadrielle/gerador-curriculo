import { useCVData } from "../../hooks/useCVData";
import { improveText } from "../../Services/aiServices";
import { useState, type ChangeEvent } from "react";



// Função para aplicar máscara de telefone
const formatPhone = (value: string) => {
  // Remove tudo que não é número
  const numbers = value.replace(/\D/g, '');
  
  // Se não tem números, retorna vazio
  if (!numbers) return '';
  
  // Limita a 11 dígitos (código de área + número)
  const limitedNumbers = numbers.slice(0, 11);
  
  // Se tem menos de 3 dígitos, retorna apenas os números
  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  }
  
  // Se tem 3-6 dígitos, aplica apenas (XX) 
  if (limitedNumbers.length <= 6) {
    return `(${limitedNumbers.slice(0, 2)}) ${limitedNumbers.slice(2)}`;
  }
  
  // Para 7+ dígitos, verifica se é celular (9 no terceiro dígito após DDD)
  const ddd = limitedNumbers.slice(0, 2);
  const restNumbers = limitedNumbers.slice(2);
  
  // Se o terceiro dígito (primeiro após DDD) é 9, é celular
  const isCelular = restNumbers[0] === '9';
  
  if (isCelular) {
    // Celular: (XX) 9XXXX-XXXX
    if (limitedNumbers.length <= 10) {
      return `(${ddd}) ${restNumbers}`;
    } else {
      return `(${ddd}) ${restNumbers.slice(0, 5)}-${restNumbers.slice(5)}`;
    }
  } else {
    // Fixo: (XX) XXXX-XXXX
    if (limitedNumbers.length <= 9) {
      return `(${ddd}) ${restNumbers}`;
    } else {
      return `(${ddd}) ${restNumbers.slice(0, 4)}-${restNumbers.slice(4)}`;
    }
  }
};

export default function PersonalInfo() {
  const { cvData, updateField } = useCVData();
  const [loading, setLoading] = useState(false);

  const resumeCount = cvData.resume ? cvData.resume.length : 0;

  async function handleEnhance() {
  if (!cvData.resume) return;
  try {
    setLoading(true);
    const improved = await improveText(cvData.resume); // <- aqui muda
    updateField("resume", improved);
  } catch (error) {
    console.error("Erro ao melhorar o texto:", error);
    alert("Não foi possível melhorar o texto agora.");
  } finally {
    setLoading(false);
  }
}


  // Função para lidar com mudanças no telefone
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    updateField("phone", formatted);
  };

  return (
    <section className="space-y-14">
      <h3 className="text-xl font-semibold mb-4 text-gray-700">Informações Pessoais</h3>

      <div className="form-group">

        <div className="grid grid-cols-2 gap-4">
          <span className="form-group">
            <label className="block text-sm font-medium text-gray-600 mb-1">Nome completo</label>
            <input
              type="text"
              placeholder="Digite o seu nome completo"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={cvData.name}
              onChange={(e) => updateField("name", e.target.value)}
            />
          </span>
          <span>
            <label className="block text-sm font-medium text-gray-600 mb-1">E-mail</label>
            <input
              type="email"
              placeholder="Digite o seu e-mail"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={cvData.email}
              onChange={(e) => updateField("email", e.target.value)}
            />
          </span>
        </div>


        <div className="grid grid-cols-2 gap-4">
          <span>
            <label className="block text-sm font-medium text-gray-600 mb-1">Telefone</label>
            <input
              type="text"
              placeholder="(11) 99999-9999"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={cvData.phone}
              onChange={handlePhoneChange}
              maxLength={15}
            />
          </span>
          <span>
            <label className="block text-sm font-medium text-gray-600 mb-1">LinkedIn</label>
            <input
              type="text"
              placeholder="Digite o seu LinkedIn"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
              value={cvData.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
            />
          </span>
        </div>

        <div className="form-group mt-4">
          <label className="block text-sm font-medium text-gray-600 mb-1">Resumo Profissional</label>
          <textarea
            rows={4}
            maxLength={300}
            placeholder="Descreva brevemente sua experiência e objetivos."
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            value={cvData.resume}
            onChange={(e) => updateField("resume", e.target.value)}
          />
          <p className="text-xs text-gray-500 text-right">
            {resumeCount}/300
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button
            type="button"
            onClick={handleEnhance}
            disabled={loading}
            className="px-4 py-2 font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer transition disabled:opacity-50"
          >
            {loading ? "Só um momento, o seu texto está sendo melhorando..." : "Melhorar Texto"}
          </button>
        </div>
      </div>
    </section>
  );


}

