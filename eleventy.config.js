const fs = require("fs");
const path = require("path");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

// module import collections
const { getAllContent, getAllPosts, getAllNewsletters, getAllRecipes, getAllNewslettersWithSocialPreview } = require('./config/collections.js');

module.exports = function (eleventyConfig) {
    // If you have other `addPlugin` calls, it’s important that UpgradeHelper is added last.
    eleventyConfig.addPlugin(UpgradeHelper);

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
    eleventyConfig.addPassthroughCopy({ "./src/admin/config.yml": "./admin/config.yml" });

    // Passthrough fonts (also needed at ./fonts for font.conf)
    eleventyConfig.addPassthroughCopy({ "./fonts": "/fonts" });

    // Watch targets
    eleventyConfig.addWatchTarget("./src/styles/");

    // RSS feeds
    eleventyConfig.addPlugin(pluginRss);

    // Filters
    eleventyConfig.addPlugin(require('./config/filters.js'));

    // Collections
    eleventyConfig.addCollection('allcontent', getAllContent);
    eleventyConfig.addCollection('blogposts', getAllPosts);
    eleventyConfig.addCollection('newsletters', getAllNewsletters);
    eleventyConfig.addCollection('recipes', getAllRecipes);
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


