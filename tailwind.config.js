export default {
    content: ["./src/**/*.{html,njk,md}"],
    theme: {
        extend: {
            fontFamily: {
                'cartridge': ['Cartridge', '-apple-system', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
                'body-default': ['-apple-system', 'Helvetica Neue', 'Helvetica', 'sans-serif']
            },
            colors: {
                'fyi-darkest-tint': '#36244f',
                'fyi-dark-tint': '#3a579a',
                'fyi-light-tint': '#faba61',
                'fyi-alt-tint': '#c01c74',
                'fyi-bright-tint': '#ff2fa9',
                'fyi-brightest-tint': '#fffc40',
                'fyi-dark-active': '#c01c74'
            }
        },
    },
    plugins: [],
};
