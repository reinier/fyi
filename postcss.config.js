import postcssImport from 'postcss-import';
import tailwindNesting from "tailwindcss/nesting/index.js";
import tailwindCss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssNano from 'cssnano';

export default function ({ env }) {
    return {
        plugins: [
            postcssImport(),
            tailwindNesting(),
            tailwindCss(),
            autoprefixer(),
            env === 'production'
                ? cssNano({
                    preset: ['default', { discardComments: { removeAll: true } }],
                })
                : false,
        ],
    };
};
