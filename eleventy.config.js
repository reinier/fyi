const fs = require("fs");
const path = require("path");
const htmlmin = require("html-minifier");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const glob = require("glob-promise");
const Image = require("@11ty/eleventy-img");
const { JSDOM } = require('jsdom');

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
    
    // Nunjucks
    eleventyConfig.addNunjucksShortcode("recipeTime", function(prepTime, cookTime, totalTime) {
        let recipeTimeTotal = [];

        if (prepTime) {
            recipeTimeTotal.push('"prepTime": "PT'+prepTime+'M",');
        }
        
        if (cookTime) {
            recipeTimeTotal.push('"cookTime": "PT'+cookTime+'M",');
        }
        
        if (totalTime) {
            recipeTimeTotal.push('"totalTime": "PT'+totalTime+'M",');
        }
        
        return recipeTimeTotal.join("\n\t");
    });
    
    eleventyConfig.addNunjucksShortcode("recipeIngredients", function(recipeContent) {
        let ingredients = [];
        let list = getRelevantList(recipeContent, 'Ingrediënten');
        return '"recipeIngredient": '+JSON.stringify(list);
    });
    
    eleventyConfig.addNunjucksShortcode("recipeInstructions", function(recipeContent) {
        
        let instructions = [];
        let list = getRelevantList(recipeContent, 'Aan de slag');
        
        for (let index = 0; index < list.length; index++) {
            const instructionContent = list[index];
            
            let instruction = '{"@type": "HowToStep", "text": "'+instructionContent+'"}';
            instructions.push(instruction);
        }
        
        return '"recipeInstructions": ['+instructions.join(',\n')+']';
    });
    
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

function getRelevantList(content, headerTitle) {
    const dom = new JSDOM(content);
    let list = [];
    let headers = dom.window.document.getElementsByTagName('h3'); 
    
    for (var i = 0; i < headers.length; i++) {
        let header = headers[i];
        if(header.textContent == headerTitle){
            let theList = header.nextElementSibling;
            let listElements = theList.getElementsByTagName('li');
            
            for (let index = 0; index < listElements.length; index++) {
                const listElement = listElements[index];
                list.push(listElement.textContent);
            }
        }
    }
    return list;
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
};
