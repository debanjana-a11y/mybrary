/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./views/**/*.ejs"],
	purge: [
		// Your CSS will rebuild any time *any* file in `src` changes
		'./public/**/*.{html,js}',
	],
	theme: {
	  extend: {},
	},
	plugins: []
  }