module.exports = {
  // ...other config
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        modalEnter: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.2s ease-out',
        modalEnter: 'modalEnter 0.3s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
} 