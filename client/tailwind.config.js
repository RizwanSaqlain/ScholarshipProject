const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily:{
  'poppins':['SUSE']
      },
  screens:{
    //  mobile:"682px",
      // small:"710px"
  }
    },
  },
  plugins: [
    
    flowbite.plugin(),
  ],
  // darkMode:true , //disable dark mode
  
}

