const path = require("path");
const glob = require("glob-promise");
const Image = require("@11ty/eleventy-img");

// For image processing
const THUMB = 250;
const FULL = 1200;

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

module.exports = eleventyConfig => {
    // Render and copy images
    eleventyConfig.on('beforeBuild', async () => {
        console.log('beforeBuild');
        await generateImages();
        console.log('images done');
    });
};
