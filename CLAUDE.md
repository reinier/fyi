# Claude Code Guide for FYI Blog

## Project Overview
This is Reinier's personal blog and newsletter site (reinier.fyi) built with Eleventy. The site contains:
- Blog posts in `/src/blog/` organized by category
- Newsletter issues in `/src/nieuwsbrief/` organized by year
- Recipes, tech posts, book reviews, and society commentary
- Dutch content optimized for a tech-savvy Dutch audience

## Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run tests (if any)
npm test

# Deploy (check package.json for actual command)
npm run deploy
```

## Content Structure
- **Blog posts**: `/src/blog/[category]/filename.md`
- **Newsletter**: `/src/nieuwsbrief/[year]/[number]-title.md`
- **Images**: `/src/images/` with subdirectories for blog, recipes, social previews
- **Recipes**: Special format with prep/cook times, ingredients, instructions

## Writing Style Guidelines
- Conversational Dutch tone ("Hi, Reinier hier,")
- Mix personal anecdotes with broader insights
- Critical but constructive on tech/society topics
- Include practical recommendations and links
- Newsletter format: multiple topics, "Postscriptum" sections, product recommendations

## Common Tasks

### Creating New Blog Posts
```yaml
---
title: "Post Title"
date: YYYY-MM-DD
tags: [tag1, tag2]
description: "Brief description"
---
```

### Creating Newsletter Issues
```yaml
---
title: "Newsletter Title"
date: YYYY-MM-DD
socialPreview: "Brief preview text"
---

Hi, Reinier hier,

[Content sections with ## headers]

Tot de volgende keer!
```

### Adding Recipes
Include: prepTime, cookTime, totalTime, ingredients list, step-by-step instructions

## Useful Patterns
- Link to affiliate products via BOL.com partner links
- Reference Dutch cultural context (VVD, NOS, etc.)
- Include "Webhike" sections for curated links
- Use personal cooking/tech experiences as entry points
- Balance criticism with practical alternatives

## SEO & Social
- Each post needs social preview images
- Include proper meta descriptions
- Use structured data for recipes
- Optimize images (WebP format preferred)

## Content Categories
- **algemeen**: General posts, yearly reflections
- **apptips**: App recommendations and reviews
- **gezondheid**: Health, wellness, vitamins critique
- **links**: Curated link posts
- **media**: Book reviews, TV/film commentary
- **productiviteit**: Productivity tools and methods
- **recepten**: Vegetarian/vegan recipes
- **samenleving**: Society, politics, climate
- **tech**: Technology criticism, AI skepticism
- **werk**: Work-related insights

## Notes for Claude
- Respect the authentic Dutch voice and cultural context
- Don't be overly promotional except in designated sections
- Include personal perspective, not generic advice
- Reference specific Dutch media, politics, food culture
- Maintain skeptical but constructive tone on tech topics
- Always include practical value or actionable insights