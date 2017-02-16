const developmentOptions = require('./build_options').developmentOptions;
const globalNames = require('./build_options').globalNames;
const isProduction = require('./build_options').isProduction;
const productionOptions = require('./build_options').productionOptions;
const rollup = require('rollup');

rollup.rollup(
  isProduction ? productionOptions : developmentOptions
).then((bundle) => {
  bundle.write({
    dest: 'www/bundle.js',
    format: 'umd',
    sourceMap: isProduction ? false : 'inline',
    globals: isProduction ? {} : globalNames
  });
});
