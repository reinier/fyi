module.exports = {
	content: ["./src/**/*.{html,njk,md}"],
	theme: {
		extend: {
			fontFamily: {
				'publicsans': ['Public Sans webfont', '-apple-system', 'Helvetica Neue', 'Helvetica', 'sans-serif']
			},
			colors: {
        		'fyi-dark-green': '#0d6239',
        		'fyi-light-green': '#ddfff7'
      		}
		},
	},
	plugins: [],
};
