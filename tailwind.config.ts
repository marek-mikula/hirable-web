import type {Config} from "tailwindcss";

export default <Config>{
    content: [
        "./components/**/*.vue",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.ts",
        "./directives/**/*.ts",
        "./app.vue",
        "./error.vue",
        "./assets/translations/*.ts",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#edf9ff',
                    100: '#d6efff',
                    200: '#b5e5ff',
                    300: '#83d7ff',
                    400: '#48bfff',
                    500: '#1e9dff',
                    600: '#067eff',
                    700: '#0069fe',
                    800: '#0851c5',
                    900: '#0d479b',
                    950: '#0e2c5d',
                }
            }
        }
    },
    plugins: [
        require('@tailwindcss/forms'),
    ],
}