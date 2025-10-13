// src/components/Form/AIEnhanceButton.tsx
import { useAIEnhancement } from "../../hooks/useAiEnhancement";


type Props = {
  text: string;
  onResult: (newText: string) => void;
  className?: string;
};

export default function AIEnhanceButton({ text, onResult, className }: Props) {
  const { enhance, loading } = useAIEnhancement();

  async function handleClick() {
    if (!text || loading) return;
    const improved = await enhance(text);
    if (improved) onResult(improved);
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading || !text}
      className={`px-3 py-1 rounded ${loading ? "opacity-70 cursor-wait" : "bg-blue-600 text-white"} ${className ?? ""}`}
      title="Melhorar texto usando IA"
    >
      {loading ? "Melhorando..." : "Melhorar com IA"}
    </button>
  );
}
