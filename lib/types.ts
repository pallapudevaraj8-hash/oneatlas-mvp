export type Lab = { id: string; slug: string; name: string; initials: string; description: string; website: string | null; modelCount?: number };
export type Provider = { id: string; slug: string; name: string; initials: string; description: string; website: string | null; modelCount?: number };
export type Offering = { provider: Provider; inputPrice: number; outputPrice: number };
export type Benchmark = { category: string; score: number };
export type AIModel = {
  id: string; slug: string; name: string; description: string; type: string;
  contextWindow: number; maxOutput: number; openWeights: boolean;
  modalities: string[]; capabilities: string[]; releasedAt: string;
  lab: Lab; offerings: Offering[]; benchmarks: Benchmark[];
};
export type ModelList = { items: AIModel[]; total: number; page: number; totalPages: number };
export const categories = ["Intelligence", "Coding", "Reasoning", "Math", "Multimodal"];
export const modelTypes = ["Text", "Multimodal", "Reasoning", "Code"];
export const capabilities = ["Vision", "Tools", "JSON", "Reasoning", "Code", "Long context", "Multilingual"];
