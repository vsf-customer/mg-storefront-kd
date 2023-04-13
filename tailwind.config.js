/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/Prescription/**/*.{html,js,vue}', './components/Prescription/**/*.{html,js,vue}', './components/Zenni/**/*.{html,js,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#005769',
        secondary: '#007B8F',
        third: '#333333',
        bullet: '#B2E0E5',
        divider: '#DDDDDD',
        active: '#ED383E',
        // active: "#BAD80A",
        'teals-100': '#00A0AF',
        teals: '#ED383E',
        // teals: "#007B8F",
        pressed: '#005769',
        'pressed-secondary': '#B2E0E5',
        disabled: '#767676',
        title: '#19191B',
        placeholder: '#666666',
        error: '#AA0909',
        focus: '#8BD1FF',
        'gray-750': '#333333',
        'gray-border': '#D8D1CA',
      },
      gridTemplateColumns: {
        contacts: 'repeat(3, minmax(0, 1fr)) 30px minmax(0, 1fr)',
      },
    },
  },
  plugins: [],
};
