/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
    // prefix: "tw-",
    // separator: ":",
    important: true,
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}"
    ],
    theme: {
        colors: {
            transparent: "transparent",
            current: "currentColor",
            black: colors.black,
            white: colors.white,
            orange: colors.orange,
            green: colors.green,
            gray: colors.gray,
            indigo: colors.indigo,
            yellow: colors.amber,
            red: colors.red,
            rose: colors.rose,
            blue: colors.blue,
            neutral: colors.neutral,
        },
        extend: {
            colors: {
                primary: '#e11d48', // rose-600, choice of primary color is not related to any political party
            },
            fontFamily: {
                sans: [ 'Inter', ...defaultTheme.fontFamily.sans ],
            }
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('tailwindcss-font-inter')({
            importFontFace: true,
        }),
        require('@tailwindcss/aspect-ratio'),
    ],
};
