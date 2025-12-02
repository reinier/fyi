import { minify as htmlmin } from "html-minifier-terser";
import pluginRss from "@11ty/eleventy-plugin-rss";
import filters from './config/filters.js';
import nunjucksShortcodes from './config/nunjucks.js';
import imagesPlugin from './config/images.js';
import markdownPlugin from './config/markdown.js';

export default function (eleventyConfig) {

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
    eleventyConfig.addPlugin(filters);
    // Markdown
    eleventyConfig.addPlugin(markdownPlugin);

    // Collections
    eleventyConfig.addCollection("allcontent", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/**/*.md").reverse();
    });

    eleventyConfig.addCollection("blogposts", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/blog/**/*.md").reverse();
    });

    eleventyConfig.addCollection("newsletters", function (collectionApi) {
        return collectionApi.getFilteredByGlob("./src/nieuwsbrief/**/*.md").reverse();
    });

    eleventyConfig.addCollection("recipes", function (collectionApi) {
        return collectionApi.getFilteredByTag("recepten").reverse();
    });

    eleventyConfig.addCollection("newslettersWithSocialPreview", function (collectionApi) {
        const posts = collectionApi.getFilteredByGlob("./src/nieuwsbrief/**/*.md");
        return onlySocialPreview(posts);
    });

    function onlySocialPreview(posts) {
        // set the result as an object
        let result = [];
        // loop through each item in the provided collection
        posts.forEach((item) => {
            if (item.data.socialPreview) {
                result.push(item);
            }
        });

        return result;
    }


    // Nunjucks Shortcodes
    eleventyConfig.addPlugin(nunjucksShortcodes);

    // Images
    eleventyConfig.addPlugin(imagesPlugin);

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

async function htmlminTransform(content, outputPath) {
    if (outputPath.endsWith(".html")) {
        let minified = await htmlmin(content, {
            useShortDoctype: true,
            removeComments: true,
            collapseWhitespace: true
        });
        return minified;
    }
    return content;
}


