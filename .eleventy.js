const fs = require("fs");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.addTransform("htmlmin", htmlminTransform);
	} else {
		eleventyConfig.setBrowserSyncConfig({ callbacks: { ready: browserSyncReady } });
	}

	// Passthrough
	eleventyConfig.addPassthroughCopy({ "src/static": "." });
	eleventyConfig.addPassthroughCopy('src/_redirects');

	// Watch targets
	eleventyConfig.addWatchTarget("./src/styles/");

	// <3 https://bnijenhuis.nl/notes/dates-in-eleventy/

 	// Filters
 	eleventyConfig.addFilter("readablePostDate", (dateObj) => {
 		return DateTime.fromJSDate(dateObj, {
 			zone: "Europe/Amsterdam"
 		}).setLocale('nl-NL').toFormat('dd MMMM, yyyy');
 	});

 	eleventyConfig.addFilter("postDate", (dateObj) => {
 		return DateTime.fromJSDate(dateObj, {
 			zone: "Europe/Amsterdam"
 		}).setLocale('en').toISODate();
 	});

	// RSS feeds
	eleventyConfig.addPlugin(pluginRss);

	var pathPrefix = "";
	if (process.env.GITHUB_REPOSITORY) {
		pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
	}

	return {
		dir: {
			input: "src",
		},
		pathPrefix
	}
};

function browserSyncReady(err, bs) {
	bs.addMiddleware("*", (req, res) => {
		const content_404 = fs.readFileSync('_site/404.html');
		// Add 404 http status code in request header.
		res.writeHead(404, { "Content-Type": "text/html; charset=ETF-8" });
		// Provides the 404 content without redirect.
		res.write(content_404);
		res.end();
	});
}

function htmlminTransform(content, outputPath) {
	if (outputPath.endsWith(".html")) {
		let minified = htmlmin.minify(content, {
			useShortDoctype: true,
			removeComments: true,
			collapseWhitespace: true
		});
		return minified;
	}
	return content;
}
