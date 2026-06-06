/** @type {import('tailwindcss').Config} */
export default { darkMode: 'class', content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'], theme: { extend: { fontFamily: { sans: ['"Noto Sans JP"', '"Hiragino Kaku Gothic ProN"', 'sans-serif'] }, colors: { ink:'#17201c', moss:'#1f6b4f', lime:'#d9f36c', paper:'#f6f8f5' }, boxShadow: { card:'0 8px 30px rgba(27,54,43,.07)' } } }, plugins: [] }
