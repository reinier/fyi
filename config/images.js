import fs from "fs";
import path from "path";
import glob from "glob-promise";
import Image from "@11ty/eleventy-img";

// For image processing
const THUMB = 400;
const FULL = 1200;
const QUALITY = 95;

// Store generated metadata so templates can access it
let metadataStore = {};

async function generateImages() {

    let files = await glob('./src/images/**/*.{jpg,jpeg,png}');
    for (const f of files) {
        const subDir = path.dirname(f).replace(/^\.\/src\/images/, "");

        let metadata = await Image(f, {
            widths: [THUMB, FULL],
            formats: ['webp', 'jpeg'],
            urlPath: "/images/" + subDir,
            outputDir: "./_site/images/" + subDir,
            sharpJpegOptions: {
                quality: QUALITY,
                progressive: false
            },
            filenameFormat: function (id, src, width, format, options) {
                if (format == 'jpeg') {
                    format = 'jpg';
                }

                let origFilename = src.split('/').pop();
                let parts = origFilename.split('.');
                parts.pop();
                origFilename = parts.join('.');

                if (width === THUMB) return `thumb-${origFilename}.${format}`;
                else return `${origFilename}.${format}`;
            }
        });

        metadataStore[f.replace('./src', '')] = metadata;
    };
};

// async function generateThumbs() {

//     let files = await glob('./src/images/**/*.{jpg,jpeg,png}');
//     for (const f of files) {
//         console.log('process thumb: ', f);
//         const subDir = path.dirname(f).replace(/^\.\/src\/images/, "");

//         let processImage = await Image(f, {
//             widths: [400],
//             formats: ['auto'],
//             urlPath: "/images/" + subDir,
//             outputDir: "./_site/images/" + subDir,
//             sharpJpegOptions: {
//                 quality: QUALITY,
//                 progressive: false
//             },
//             filenameFormat: function (id, src, width, format, options) {
//                 return path.basename(src);
//             }
//         });
//     };
// };

async function generateSocialImages() {
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
};

export default function (eleventyConfig) {
    // expose metadata as global data
    eleventyConfig.addGlobalData('imageMeta', () => metadataStore);

    // Render and copy images
    eleventyConfig.on('beforeBuild', async () => {
        await generateImages();
    });

    eleventyConfig.addNunjucksAsyncShortcode('picture', async function (src, alt = '', sizes = '100vw') {
        if (!metadataStore[src]) {
            const file = './src' + src;
            const subDir = path.dirname(file).replace(/^\.\/src\/images/, "");
            metadataStore[src] = await Image(file, {
                widths: [THUMB, FULL],
                formats: ['webp', 'jpeg'],
                urlPath: '/images/' + subDir,
                outputDir: './_site/images/' + subDir,
                sharpJpegOptions: {
                    quality: QUALITY,
                    progressive: false
                },
                filenameFormat(id, source, width, format) {
                    if (format == 'jpeg') {
                        format = 'jpg';
                    }
                    let origFilename = source.split('/').pop();
                    let parts = origFilename.split('.');
                    parts.pop();
                    origFilename = parts.join('.');
                    if (width === THUMB) return `thumb-${origFilename}.${format}`;
                    else return `${origFilename}.${format}`;
                }
            });
        }
        const metadata = metadataStore[src];
        return Image.generateHTML(metadata, {
            alt,
            loading: 'lazy',
            decoding: 'async',
            sizes
        });
    });

    // Social images
    eleventyConfig.on('afterBuild', async () => {
        await generateSocialImages();
    });
};
