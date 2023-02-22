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
    eleventyConfig.addNunjucksShortcode("recipeTime", function() {
        let recipeTimeTotal = [];
        
        // Don't know if using the 11ty `ctx` object is the right way, but it works
        if (this.ctx.prepTime) {
            recipeTimeTotal.push('"prepTime": "PT'+this.ctx.prepTime+'M",');
        }
        
        if (this.ctx.cookTime) {
            recipeTimeTotal.push('"cookTime": "PT'+this.ctx.cookTime+'M",');
        }
        
        if (this.ctx.totalTime) {
            recipeTimeTotal.push('"totalTime": "PT'+this.ctx.totalTime+'M",');
        }
        
        return recipeTimeTotal.join("\n\t");
    });
    
    eleventyConfig.addNunjucksShortcode("recipeIngredients", function(recipeContent) {
        let ingredients = [];
        const dom = new JSDOM(recipeContent);
        var headers = dom.window.document.getElementsByTagName('h3'); 
        
        for (var i = 0; i < headers.length; i++) {
            let header = headers[i];
            if(header.textContent == 'Ingrediënten' || header.textContent == 'Ingredienten'){
                let ulElement = header.nextElementSibling;
                let rawIngredients = ulElement.getElementsByTagName('li');
                
                for (let index = 0; index < rawIngredients.length; index++) {
                    const ingredient = rawIngredients[index];
                    ingredients.push(ingredient.textContent);
                }
            }
        }
        
        return '"recipeIngredient": '+JSON.stringify(ingredients);
    });
    
    eleventyConfig.addNunjucksShortcode("recipeInstructions", function(recipeContent) {
        let instructions = [];
        const dom = new JSDOM(recipeContent);
        var headers = dom.window.document.getElementsByTagName('h3');
        
        for (var i = 0; i < headers.length; i++) {
            let header = headers[i];
            if(header.textContent == 'Aan de slag' || header.textContent == 'Instructies'){
                let olElement = header.nextElementSibling;
                let rawInstructions = olElement.getElementsByTagName('li');
                
                for (let index = 0; index < rawInstructions.length; index++) {
                    const rawInstruction = rawInstructions[index];

                    let instruction = '{"@type": "HowToStep", "text": "'+rawInstruction.textContent+'"}';                    
                    instructions.push(instruction);
                }
            }
        }

        return '"recipeInstructions": ['+instructions.join(',\n')+']';
        // "recipeInstructions": [
        //         {
        //             "@type": "HowToStep",
        //             "text": "Preheat the oven to 350 degrees F. Grease and flour a 9x9 inch pan."
        //         }, {
        //             "@type": "HowToStep",
        //             "text": "In a large bowl, combine flour, sugar, baking powder, and salt."
        //         }, {
        //             "@type": "HowToStep",
        //             "text": "Mix in the butter, eggs, and milk."
        //         }
        //     ]
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
