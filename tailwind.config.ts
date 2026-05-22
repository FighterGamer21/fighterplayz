import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05070d",
        ink: "#090d18",
        panel: "rgba(12, 18, 32, 0.72)",
        cyan: "#28e7ff",
        electric: "#4f7dff",
        violet: "#8b5cf6"
      },
      boxShadow: {
        glow: "0 0 50px rgba(40, 231, 255, 0.18)",
        violet: "0 0 60px rgba(139, 92, 246, 0.2)"
      },
      backgroundImage: {
        "radial-core": "radial-gradient(circle at top, rgba(40, 231, 255, 0.16), transparent 34%), radial-gradient(circle at 75% 15%, rgba(139, 92, 246, 0.16), transparent 32%)"
      }
    }
  },
  plugins: []
};

export default config;
