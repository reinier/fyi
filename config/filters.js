const { DateTime } = require("luxon");

module.exports = eleventyConfig => {

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
        if (url.hostname.substring(0, 4) == 'www.') {
            var hostname = url.hostname.substring(4);
        } else {
            var hostname = url.hostname;
        }
        return hostname;
    });

    eleventyConfig.addFilter("limit", function (array, limit) {
        return array.slice(0, limit);
    });

    // splitlines for social image
    eleventyConfig.addFilter('splitlines', function (input) {
        let lineWidth = 32;
        return wrapContentToWidth(input, lineWidth);
    });

    // splitlines for social image posts
    eleventyConfig.addFilter('splitlinespost', function (input) {
        let lineWidth = 28;
        return wrapContentToWidth(input, lineWidth);
    });

    eleventyConfig.addFilter('getthumb', function (input) {
        return getThumbFromImageUrl(input);
    });

    eleventyConfig.addFilter('capitalizeFirstLetter', function (input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    });
};

function getThumbFromImageUrl(imageUrl) {

    const prefix = 'thumb-';
    const lastIndex = imageUrl.lastIndexOf('/');

    // Extract the directory path and file name
    const directoryPath = imageUrl.slice(0, lastIndex + 1);
    const fileName = imageUrl.slice(lastIndex + 1);

    // Combine the prefix and file name to get the final result
    const finalString = directoryPath + prefix + fileName;

    return finalString;


}

function wrapContentToWidth(content, lineWidth) {
    const parts = content.split(' ');
    const lines = parts.reduce(function (prev, current) {

        if (!prev.length) {
            return [current];
        }

        let lastOne = prev[prev.length - 1];

        if (lastOne.length + current.length > lineWidth) {
            return [...prev, current];
        }

        prev[prev.length - 1] = lastOne + ' ' + current;

        return prev;
    }, []);

    return lines;
}
