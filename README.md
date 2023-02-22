# FYI Newsletter and blog

This site is the blog and newsletter of [Reinier Ladan](https://reinierladan.nl). For now it's all in Dutch, but who knows how long the AI overlords will take to figure out a world language that anybody can understand by way of forced augmentation.

## Run this site with Codespaces

The repository supports Codespaces, so editting and testing this site is as easy as tapping the green 'Code' button, select the 'Codespaces' tab and hit the 'Create Codespace on main' button. An online code editor and server is being deployed for you to hack away.

## Recipe support

When an article is placed in the `recepten` directory in the blog, structured data is added to the article to mark it as a recipe. With this structured data, an app like Mela is able to substract the recipe from the article.

Data to keep in mind:

### Recipe Meta Data

- description
- image
- prepTime: [in minutes]
- cookTime: [in minutes]
- totalTime: [in minutes]

### Recipe Data

- The first **unordered** list directly following an h3 with content `Ingrediënten` will be treated as the ingredients list
- The first **ordered** list directly following an h3 with content `Aan de slag` or `Instructies` will be treated as the instruction list
