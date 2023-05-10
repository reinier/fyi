const fs = require("fs");
const path = require("path");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");


// module import collections
const { getAllPosts, getAllNewsletters, getAllNewslettersWithSocialPreview } = require('./config/collections.js');

module.exports = function (eleventyConfig) {

    if (process.env.ELEVENTY_PRODUCTION) {
        eleventyConfig.addTransform("htmlmin", htmlminTransform);
    }

    eleventyConfig.setServerOptions({
        showAllHosts: true,
        port: 8080
    });

    // Passthrough static files
    eleventyConfig.addPassthroughCopy({ "./src/static": "." });
    eleventyConfig.addPassthroughCopy('./src/images/**/*.gif');

    // Passthrough fonts (also needed at ./fonts for font.conf)
    eleventyConfig.addPassthroughCopy({ "./fonts": "/fonts" });

    // Watch targets
    eleventyConfig.addWatchTarget("./src/styles/");

    // RSS feeds
    eleventyConfig.addPlugin(pluginRss);

    // Filters
    eleventyConfig.addPlugin(require('./config/filters.js'));

    // Collections
    eleventyConfig.addCollection('blogposts', getAllPosts);
    eleventyConfig.addCollection('newsletters', getAllNewsletters);
    eleventyConfig.addCollection('newslettersWithSocialPreview', getAllNewslettersWithSocialPreview);

    // Nunjucks Shortcodes
    eleventyConfig.addPlugin(require('./config/nunjucks.js'));

    // Images
    eleventyConfig.addPlugin(require('./config/images.js'));

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


