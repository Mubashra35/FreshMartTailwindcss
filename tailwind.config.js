/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#2E7D32",
          secondary: "#66BB6A",
          third: "#A5D6A7",
          fourth: "#F9A825",
          accent: "#E53935",
        },
        bg: {
          main: "#F4FAF4",
          card: "#FFFFFF",
        },
        text: {
          primary: "#1B1B1B",
          secondary: "#3A3A3A",
          muted: "#7A7A7A",
        },
        border: {
          muted: "#D8EDD8",
          secondary: "#66BB6A",
        },
        table: {
          odd: "#F0F7F0",
          even: "#FFFFFF",
          hover: "#C8E6C9",
          headerBg: "#2E7D32",
          headerText: "#FFFFFF",
        },
      },
      fontFamily: {
        heading: ["'Playfair Display'", "Georgia", "serif"],
        body: ["'DM Sans'", "sans-serif"],
      },
      borderRadius: {
        sm: "6px",
        md: "12px",
        lg: "20px",
      },
      boxShadow: {
        sm: "0 2px 8px rgba(46,125,50,0.08)",
        md: "0 4px 20px rgba(46,125,50,0.14)",
        lg: "0 8px 32px rgba(46,125,50,0.18)",
      },
    },
  },
  plugins: [],
};