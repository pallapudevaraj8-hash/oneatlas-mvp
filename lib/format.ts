export function fmtTokens(value: number): string {
  if (value >= 1_000_000) return `${+(value / 1_000_000).toFixed(2)}M`;
  if (value >= 1_000) return `${+(value / 1_000).toFixed(1)}K`;
  return String(value);
}
export function fmtPrice(price?: number): string {
  if (price === undefined) return "—";
  return `$${price.toFixed(price < 1 ? 3 : 2)}`;
}
export function bestPrice(offerings: { inputPrice: number }[]): number | undefined {
  return offerings.length ? Math.min(...offerings.map((o) => o.inputPrice)) : undefined;
}
export function shortDate(value: string): string {
  return new Date(value).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}
