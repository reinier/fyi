import assert from 'assert';
import filtersSetup, { getThumbFromImageUrl } from '../config/filters.js';
import nunjucksSetup from '../config/nunjucks.js';

const input = '/foo/bar.jpg';
const expected = '/foo/thumb-bar.jpg';

assert.strictEqual(
  getThumbFromImageUrl(input),
  expected,
  `Expected ${input} to convert to ${expected}`
);

// grab the splitlines filter
let splitlinesFilter;
filtersSetup({
  addFilter(name, fn) {
    if (name === 'splitlines') {
      splitlinesFilter = fn;
    }
  },
});

const wrapped = splitlinesFilter(
  'This is a test of the emergency broadcast system'
);
assert.deepStrictEqual(wrapped, [
  'This is a test of the emergency',
  'broadcast system',
]);

// grab the recipe shortcodes
let recipeIngredients;
let recipeInstructions;
nunjucksSetup({
  addNunjucksShortcode(name, fn) {
    if (name === 'recipeIngredients') {
      recipeIngredients = fn;
    }
    if (name === 'recipeInstructions') {
      recipeInstructions = fn;
    }
  },
});

const recipeHtml = `
  <h3>Ingrediënten</h3>
  <ul>
    <li>1 apple</li>
    <li>2 pears</li>
  </ul>
  <h3>Aan de slag</h3>
  <ol>
    <li>Cut fruit</li>
    <li>Eat it</li>
  </ol>`;

assert.strictEqual(
  recipeIngredients(recipeHtml),
  '"recipeIngredient": ["1 apple","2 pears"]'
);

assert.strictEqual(
  recipeInstructions(recipeHtml),
  '"recipeInstructions": [{"@type": "HowToStep", "text": "Cut fruit"},\n' +
    '{"@type": "HowToStep", "text": "Eat it"}]'
);

console.log('All tests passed.');
