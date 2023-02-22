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
        if(url.hostname.substring(0,4) == 'www.'){
            var hostname = url.hostname.substring(4);
        } else {
            var hostname = url.hostname;
        }
        return hostname;
    });

    eleventyConfig.addFilter("fullImageURL", (data) => {
        if(data.substring(0,8) == 'https://'){
            var fullURL = data;
        } else {
            var fullURL = "https://reinier.fyi"+data;
        }

        return fullURL;
    });
    
    eleventyConfig.addFilter("limit", function(array, limit) {
        return array.slice(0, limit);
    });
};
