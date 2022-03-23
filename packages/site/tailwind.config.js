module.exports = Object.assign({
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  plugins: [],
  safelist: [
    {
      pattern: /alert-(danger|info|warning|success)-(background|border|text)/,
    },
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        alert: {
          danger: {
            border: '#ebcccc',
            background: '#f2dede',
            text: '#a94442',
          },
          info: {
            border: '#bcdff1',
            background: '#d9edf7',
            text: '#31708f',
          },
          warning: {
            border: '#faf2cc',
            background: '#fcf8e3',
            text: '#8a6d3b',
          },
          success: {
            border: '#d0e9c6',
            background: '#dff0d8',
            text: '#3c763d',
          },
        },
      },
    },
  },
});
