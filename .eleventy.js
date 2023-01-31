const fs = require("fs");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");

const { DateTime } = require("luxon");

// module import collections
const {getAllPosts} = require('./config/collections/index.js');
const {getAllNewsletters} = require('./config/collections/index.js');

module.exports = function (eleventyConfig) {

	if (process.env.ELEVENTY_PRODUCTION) {
		eleventyConfig.addTransform("htmlmin", htmlminTransform);
	} else {
		eleventyConfig.setBrowserSyncConfig({ callbacks: { ready: browserSyncReady } });
	}

	// Passthrough
	eleventyConfig.addPassthroughCopy({ "./src/static": "." });

	// Watch targets
	eleventyConfig.addWatchTarget("./src/styles/");

	// <3 https://bnijenhuis.nl/notes/dates-in-eleventy/

 	// Filters
 	eleventyConfig.addFilter("readablePostDate", (dateObj) => {
 		return DateTime.fromJSDate(dateObj, {
 			zone: "Europe/Amsterdam"
 		}).setLocale('nl-NL').toFormat('dd MMMM, yyyy');
 	});

 	eleventyConfig.addFilter("readablePostDateTime", (dateObj) => {
 		return DateTime.fromJSDate(dateObj, {
 			zone: "Europe/Amsterdam"
 		}).setLocale('nl-NL').toFormat('dd MMMM, yyyy HH:mm');
 	});

 	eleventyConfig.addFilter("postDate", (dateObj) => {
 		return DateTime.fromJSDate(dateObj, {
 			zone: "Europe/Amsterdam"
 		}).setLocale('en').toISODate();
 	});

	eleventyConfig.addFilter("urlHostname", (data) => {
		var url = new URL(data);
		if(url.hostname.substring(0,4) == 'www.'){
			var hostname = url.hostname.substring(4);
		} else {
			var hostname = url.hostname;
		}
		return hostname;
 	});

	eleventyConfig.addFilter("limit", function(array, limit) {
		return array.slice(0, limit);
	});

	// RSS feeds
	eleventyConfig.addPlugin(pluginRss);

	// Collections
	eleventyConfig.addCollection('blogposts', getAllPosts);
	eleventyConfig.addCollection('newsletters', getAllNewsletters);

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
