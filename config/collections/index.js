/** Returns all blog posts as a collection. */
const getAllNewsletters = collection => {
  const posts = collection.getFilteredByGlob('./src/nieuwsbrief/zolder/**/*.md');
  return posts.reverse();
};

module.exports = {
  getAllNewsletters
};
