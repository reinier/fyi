import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let JSDOM;
try {
    ({ JSDOM } = require('jsdom'));
} catch {
    // jsdom is optional to avoid pulling in deprecated dependencies
}

function getRelevantList(content, headerTitle) {
    if (JSDOM) {
        const dom = new JSDOM(content);
        let list = [];
        let headers = dom.window.document.getElementsByTagName('h3');

        for (var i = 0; i < headers.length; i++) {
            let header = headers[i];
            if (header.textContent == headerTitle) {
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

    // fallback to a simple regex-based parser if jsdom is unavailable
    const escapedTitle = headerTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const headerRegex = new RegExp(`<h3>\\s*${escapedTitle}\\s*<\\/h3>\\s*<(ul|ol)>((?:.|\\n)*?)<\\/\\1>`, 'i');
    const match = content.match(headerRegex);
    if (!match) {
        return [];
    }
    const listContent = match[2];
    const itemRegex = /<li>(.*?)<\/li>/gi;
    let m;
    const list = [];
    while ((m = itemRegex.exec(listContent)) !== null) {
        list.push(m[1].trim());
    }
    return list;
}

export default function (eleventyConfig) {
    eleventyConfig.addNunjucksShortcode("recipeTime", function (prepTime, cookTime, totalTime) {
        let recipeTimeTotal = [];

        if (prepTime) {
            recipeTimeTotal.push('"prepTime": "PT' + prepTime + 'M",');
        }

        if (cookTime) {
            recipeTimeTotal.push('"cookTime": "PT' + cookTime + 'M",');
        }

        if (totalTime) {
            recipeTimeTotal.push('"totalTime": "PT' + totalTime + 'M",');
        }

        return recipeTimeTotal.join("\n\t");
    });

    eleventyConfig.addNunjucksShortcode("recipeIngredients", function (recipeContent) {
        let ingredients = [];
        let list = getRelevantList(recipeContent, 'Ingrediënten');
        return '"recipeIngredient": ' + JSON.stringify(list);
    });

    eleventyConfig.addNunjucksShortcode("recipeInstructions", function (recipeContent) {

        let instructions = [];
        let list = getRelevantList(recipeContent, 'Aan de slag');

        for (let index = 0; index < list.length; index++) {
            const instructionContent = list[index];

            let instruction = '{"@type": "HowToStep", "text": "' + instructionContent + '"}';
            instructions.push(instruction);
        }

        return '"recipeInstructions": [' + instructions.join(',\n') + ']';
    });
};
