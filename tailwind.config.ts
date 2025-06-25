import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',    // 👈 your structure!
    './src/app/components/**/*.{js,ts,jsx,tsx}', 
    './src/pages/**/*.{js,ts,jsx,tsx}',   // optional
    './src/**/*.{js,ts,jsx,tsx}',         // fallback
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FFD700',
        accent: '#10B981',
        secondary: '#111827',
      },
    },
  },
  plugins: [],
};

export default config;
