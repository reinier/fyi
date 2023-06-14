/** Returns all blog posts as a collection. */
const getAllPosts = collection => {
    const posts = collection.getFilteredByGlob("./src/blog/**/*.md");
    return posts.reverse();
};

const getAllNewsletters = collection => {
    const posts = collection.getFilteredByGlob("./src/nieuwsbrief/**/*.md");
    return posts.reverse();
};

const getAllRecipes = collection => {
    const posts = collection.getFilteredByTag("recepten");
    return posts.reverse();
};

const getAllNewslettersWithSocialPreview = collection => {
    const posts = collection.getFilteredByGlob("./src/nieuwsbrief/**/*.md");
    return onlySocialPreview(posts);
};

module.exports = {
    getAllPosts,
    getAllNewsletters,
    getAllRecipes,
    getAllNewslettersWithSocialPreview
};

function onlySocialPreview(posts) {
    // set the result as an object
    let result = [];
    // loop through each item in the provided collection
    posts.forEach((item) => {
        if (item.data.socialPreview) {
            result.push(item);
        }
    });

    return result;
}
