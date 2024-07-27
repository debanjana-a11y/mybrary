/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.ejs"],
	theme: {
	  extend: {},
	},
	plugins: [],
	enabled: process.env.NODE_ENV === "production",
  }