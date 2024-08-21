/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: ['./views/**/*.{html,js,ejs}'],
  mode: 'jit',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
