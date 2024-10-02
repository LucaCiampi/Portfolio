/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        black: '#030101',
        green: '#4B6559',
        brown: '#59503E',
        'text-header': '#3A362D',
        background: '#F9F5EE',
        'background-darker': '#F6EFE5',
        text: '#363636',
        yellow: '#FFEB84',
        grey: '#E8F1F7',
        orange: '#F75D3B',
        outline: '#060606',
      },
      fontFamily: {
        'abril-fatface': ['var(--font-abril-fatface)'],
        'playfair-display': ['var(--font-playfair-display)'],
        allison: ['var(--font-allison)'],
      },
      backgroundImage: {
        noise: "url('/images/noise.png')",
      },
    },
  },
  plugins: [],
};
