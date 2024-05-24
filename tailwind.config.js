/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{ts,js,tsx}",
    "./index.html","./index.php"

],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}