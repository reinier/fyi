const fs = require("fs");
const path = require("path");
const glob = require("glob-promise");
const Image = require("@11ty/eleventy-img");

// For image processing
const THUMB = 250;
const FULL = 1200;
const QUALITY = 95;

async function generateImages() {

    let files = await glob('./src/images/**/*.{jpg,jpeg,png}');
    for (const f of files) {
        console.log('process img: ', f);
        const subDir = path.dirname(f).replace(/^\.\/src\/images/, "");

        let processImage = await Image(f, {
            widths: [FULL],
            formats: ['auto'],
            urlPath: "/images/" + subDir,
            outputDir: "./_site/images/" + subDir,
            sharpJpegOptions: {
                quality: QUALITY,
                progressive: false
            },
            filenameFormat: function (id, src, width, format, options) {
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

    // Social images
    eleventyConfig.on('afterBuild', () => {
        const socialPreviewImagesDir = "_site/images/social-preview-images/";
        fs.readdir(socialPreviewImagesDir, function (err, files) {
            if (files.length > 0) {
                files.forEach(function (filename) {
                    if (filename.endsWith(".svg")) {
                        let imageUrl = socialPreviewImagesDir + filename;
                        Image(imageUrl, {
                            formats: ["jpeg"],
                            outputDir: "./" + socialPreviewImagesDir,
                            sharpJpegOptions: {
                                quality: QUALITY,
                                progressive: false
                            },
                            filenameFormat: function (id, src, width, format, options) {
                                let outputFilename = filename.substring(0, (filename.length - 4));
                                return `${outputFilename}.${format}`;
                            }
                        });
                    }
                })
            }
        })
    });
};
