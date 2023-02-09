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
	}

    eleventyConfig.setServerOptions({
		// Default values are shown:

		// Whether the live reload snippet is used
		liveReload: true,

		// Whether DOM diffing updates are applied where possible instead of page reloads
		domDiff: true,

		// The starting port number
		// Will increment up to (configurable) 10 times if a port is already in use.
		port: 8080,

		// Additional files to watch that will trigger server updates
		// Accepts an Array of file paths or globs (passed to `chokidar.watch`).
		// Works great with a separate bundler writing files to your output folder.
		// e.g. `watch: ["_site/**/*.css"]`
		watch: [],

		// Show local network IP addresses for device testing
		showAllHosts: true,

		// Use a local key/certificate to opt-in to local HTTP/2 with https
		https: {
		// key: "./localhost.key",
		// cert: "./localhost.cert",
		},

		// Change the default file encoding for reading/serving files
		encoding: "utf-8",
	});

	// Passthrough
	eleventyConfig.addPassthroughCopy({ "./src/static": "." });

	// Watch targets
	eleventyConfig.addWatchTarget("./src/styles/");

	// <3 https://bnijenhuis.nl/notes/dates-in-eleventy/

 	// Filters
    eleventyConfig.addFilter("readablePostDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: "Europe/Amsterdam"
        }).setLocale('nl-NL').toFormat('d MMMM, yyyy');
    });

    eleventyConfig.addFilter("readablePostDateTime", (dateObj) => {
        return DateTime.fromJSDate(dateObj, {
            zone: "Europe/Amsterdam"
        }).setLocale('nl-NL').toFormat('d MMMM, yyyy HH:mm');
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
