import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#09111f",
        panel: "#0e192a",
        stroke: "#24364b",
        muted: "#94a5bc",
        accent: "#a78bfa",
        cyan: "#6be5db"
      },
      fontFamily: { sans: ["Arial", "Helvetica", "sans-serif"] },
      boxShadow: { glow: "0 20px 80px rgba(96,165,250,.08)" }
    }
  },
  plugins: []
} satisfies Config;
