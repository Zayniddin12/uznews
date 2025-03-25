/** @type {import('tailwindcss').Config} */
import { Config } from 'tailwindcss'

export default <Partial<Config>>{
  mode: 'jit',
  darkMode: 'class',
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './directives/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: ['1224px'],
    },
    extend: {
      colors: {
        dark: {
          DEFAULT: '#2D2D2B',
          200: '#222B3F',
        },
        blue: {
          100: '#A2BCDE',
          150: '#52618E',
          200: '#52618F',
          250: '#465370',
          300: '#737FA4',
          600: '#2C3752',
          700: '#191F2E',
          800: '#2B3348',
          850: '#19192D',
          900: '#0E1118',
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#F5F6F9',
          150: '#F8FAFC',
          200: '#D9D9D9',
          300: '#ECF2F8',
          700: '#F5F5F8',
          800: '#F0F4F9',
          500: '#EEF0F4',
          900: '#F0F0F5',
        },
        gray: {
          DEFAULT: '#B8BABE',
          100: '#D1D2D5',
          150: '#F1F2F6',
          200: '#919299',
          300: '#E5E7EE',
          500: '#E6EEF6',
          600: '#A3A8B3',
          700: '#41495B',
          800: '#F7F7F7',
        },
        green: {
          DEFAULT: '#51B334',
        },
        red: {
          DEFAULT: '#D50404',
          light: '#FFEDF0',
          100: '#FC2947',
          700: '#302031',
        },
      },
      fontSize: {
        44: ['44px', '52px'],
        28: '28px',
        32: '32px',
      },
      fontFamily: {
        ibm: ['IBM-Plex', 'serif'],
      },
      boxShadow: {
        xs: '0px 12px 32px rgba(82, 97, 143, 0.52)',
        sm: '0px 2px 24px rgba(25, 31, 46, 0.24)',
        m: '0px 12px 32px rgba(82, 97, 143, 0.52)',
        ml: '0px 2px 16px 0px rgba(25, 31, 46, 0.04)',
        xl: '0px 12px 24px 0px rgba(82, 97, 143, 0.12);',
        qrShadow: '0px 12px 64px 0px rgba(162, 188, 222, 0.64)',
      },
      dropShadow: {
        xs: '(0px 12px 32px rgba(82, 97, 143, 0.52)',
      },
      lineHeight: {
        136: '136%',
        130: '130%',
        120: '120%',
        126: '126%',
        125: '125%',
        140: '140%',
        138: '138%',
        14: '14px',
        16: '16px',
        20: '20px',
        24: '24px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
