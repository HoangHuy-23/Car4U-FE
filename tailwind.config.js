module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // nếu dùng pages router
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}", // nếu dùng app router
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")], // nếu dùng transition từ UI kit
};
