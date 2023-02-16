const fs = require("fs");
const path = require("path");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const glob = require("glob-promise");
const Image = require("@11ty/eleventy-img");

// module import collections
const { getAllPosts } = require('./config/collections.js');
const { getAllNewsletters } = require('./config/collections.js');

// For image processing
const THUMB = 250;
const FULL = 1200;

module.exports = function (eleventyConfig) {
    
    if (process.env.ELEVENTY_PRODUCTION) {
        eleventyConfig.addTransform("htmlmin", htmlminTransform);
    }
    
    eleventyConfig.setServerOptions({
        showAllHosts: true
    });
    
    // Render and copy images
    eleventyConfig.on('beforeBuild', async () => {
        console.log('beforeBuild');
        await generateImages();
        console.log('images done');
    });
    
    // Passthrough
    eleventyConfig.addPassthroughCopy({ "./src/static": "." });
    
    // Watch targets
    eleventyConfig.addWatchTarget("./src/styles/");
    
    // <3 https://bnijenhuis.nl/notes/dates-in-eleventy/
    
    // RSS feeds
    eleventyConfig.addPlugin(pluginRss);
    
    // Filters
    eleventyConfig.addPlugin(require('./config/filters.js'));

    // Collections
    eleventyConfig.addCollection('blogposts', getAllPosts);
    eleventyConfig.addCollection('newsletters', getAllNewsletters);
    
    var pathPrefix = "";
    if (process.env.GITHUB_REPOSITORY) {
        pathPrefix = process.env.GITHUB_REPOSITORY.split('/')[1];
    }
    
    eleventyConfig.addCollection('mtgimages', async collectionApi => {
        
        let files = await glob('./_site/mtg/*.jpeg');
        //Now filter to non thumb-
        let images = files.filter(f => {
            return f.indexOf('./_site/mtg/thumb-') !== 0;
        });
        
        let collection = images.map(i => {
            return {
                path: i.replace('./_site/mtg/', '/mtg/'),
                thumbpath: i.replace('./_site/mtg/', '/mtg/thumb-'),
                title: i.replace('./_site/mtg/', '')
            }
        });
        
        return collection;
        
    });
    
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

async function generateImages() {
    
    let files = await glob('./src/images/**/*.{jpg,jpeg,png,gif}');
    for(const f of files) {
        console.log('process img: ',f);
        const subDir = path.dirname(f).replace(/^\.\/src\/images/, "");
        
        let processImage = await Image(f, {
            widths: [FULL],
            formats: ['auto'],
            urlPath: "/images/"+subDir,
            outputDir: "./_site/images/"+subDir,
            filenameFormat:function(id, src, width, format, options) {
                return path.basename(src);
            }
        });
    };
    
    // Options for images of MTG cards
    let optionsCards = {
        widths: [THUMB,FULL],
        formats: ['jpeg'],
        urlPath: "/mtg/",
        outputDir: "./_site/mtg/",
        filenameFormat:function(id, src, width, format, options) {
            let origFilename = src.split('/').pop();
            //strip off the file type, this could probably be one line of fancier JS
            let parts = origFilename.split('.');
            parts.pop();
            origFilename = parts.join('.');
            
            if(width === THUMB) return `thumb-${origFilename}.${format}`;
            else return `${origFilename}.${format}`;
        }
    };
    
    let filesCards = await glob('./mtg/*.{jpg,jpeg,png,gif}');
    for(const f of filesCards) {
        console.log('doing f',f);
        let md = await Image(f, optionsCards);
    };
    
};
