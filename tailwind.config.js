/** @type {import('tailwindcss').Config} */
module.exports = {
content: [
'./app/**/*.{js,jsx,ts,tsx}',
'./components/**/*.{js,jsx,ts,tsx}',
],
theme: {
extend: {
colors: {
brand: {
DEFAULT: '#0ea5e9',
dark: '#0369a1',
light: '#7dd3fc'
}
},
fontFamily: {
display: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Arial'],
body: ['ui-sans-serif', 'system-ui', 'Inter', 'Segoe UI', 'Arial']
},
boxShadow: {
glow: '0 0 40px rgba(14,165,233,0.35)'
}
},
},
plugins: [],
}
