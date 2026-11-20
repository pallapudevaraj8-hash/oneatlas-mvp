import type { Prisma } from "@prisma/client";
import type { AIModel } from "@/lib/types";

export const modelInclude = {
  lab: true,
  offerings: { include: { provider: true }, orderBy: { inputPrice: "asc" as const } },
  benchmarks: true
} satisfies Prisma.ModelInclude;

export function serializeModel(m: Prisma.ModelGetPayload<{ include: typeof modelInclude }>): AIModel {
  return {
    id: m.id, slug: m.slug, name: m.name, description: m.description, type: m.type,
    contextWindow: m.contextWindow, maxOutput: m.maxOutput, openWeights: m.openWeights,
    modalities: m.modalities, capabilities: m.capabilities, releasedAt: m.releasedAt.toISOString(),
    lab: m.lab,
    offerings: m.offerings.map((o) => ({ provider: o.provider, inputPrice: o.inputPrice, outputPrice: o.outputPrice })),
    benchmarks: m.benchmarks.map(({ category, score }) => ({ category, score }))
  };
}
