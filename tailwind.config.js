/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        neo: '4px 4px 0px 0px rgba(0,0,0,1)',
        'neo-lg': '6px 6px 0px 0px rgba(0,0,0,1)',
        'neo-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
        'neo-orange': '4px 4px 0px 0px #F6851B',
        'neo-blue': '4px 4px 0px 0px #037DD6',
        'glow-orange': '0 0 30px rgba(246,133,27,0.35)',
        'glow-blue': '0 0 30px rgba(3,125,214,0.35)',
      },
      colors: {
        mm: {
          bg: '#0D0D0D',
          surface: '#1C1C1E',
          card: '#242428',
          border: '#2E2E32',
          orange: '#F6851B',
          'orange-light': '#FFAB40',
          'orange-dark': '#E2761B',
          blue: '#037DD6',
          'blue-light': '#1098FC',
          'blue-dark': '#0260A4',
          white: '#F8F8F8',
          muted: '#8A8A8E',
          green: '#28A745',
          red: '#D73A49',
        },
        accent: {
          yellow: '#FFE500',
          cyan: '#00F5FF',
          pink: '#FF2D78',
          green: '#00FF94',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'line-draw': 'lineDraw 1.2s ease forwards',
        'dot-pop': 'dotPop 0.4s cubic-bezier(0.34,1.56,0.64,1) forwards',
        'slide-right': 'slideRight 0.7s ease forwards',
        'slide-left': 'slideLeft 0.7s ease forwards',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        lineDraw: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
        dotPop: {
          '0%': { opacity: '0', transform: 'scale(0)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
    },
  },
  plugins: [],
}
