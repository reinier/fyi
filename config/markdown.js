import markdownIt from 'markdown-it';

export default function(eleventyConfig) {
    const markdownLib = markdownIt({ html: true }).use(function(md) {
        const defaultImageRule = md.renderer.rules.image || function(tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };
        md.renderer.rules.image = function (tokens, idx, options, env, self) {
            tokens[idx].attrSet('loading', 'lazy');
            return defaultImageRule(tokens, idx, options, env, self);
        };
    });

    eleventyConfig.setLibrary('md', markdownLib);
};
