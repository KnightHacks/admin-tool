module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'dark-gray': '#272727',
        'med-gray': '#414348',
        'light-gray': '#C3C3C3',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
