import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/stories/**/*.{js,ts,jsx,tsx}', // Here!
  ],
  theme: {
    backgroundColor: ({ theme }) => ({
      ...theme('colors'),
      primary: '#3B71CA',
      secondary: '#9FA6B2',
      success: '#14A44D',
      danger: '#DC4C64',
      warning: '#E4A11B',
      info: '#54B4D3',
      light: '#F9FAFB',
      dark: '#1F2937',
    }),
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      textColor: {
        'custom-red': '#E53E3E',
      },
      backgroundColor: {
        'custom-blue': '#5A67D8',
      },
    },
  },
  plugins: [],
};
export default config;
