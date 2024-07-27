/** @type {import('tailwindcss').Config} */
module.exports = {
	important: true,
	content: ["./views/**/*.ejs"],
	theme: {
	  extend: {},
	},
	plugins: [],
	enabled: process.env.NODE_ENV === "production",
  }