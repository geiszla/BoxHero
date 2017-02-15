const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const isProduction = require('./build_options').isProduction;
const replace = require('rollup-plugin-replace');
const rollup = require('rollup');

rollup.rollup({
  entry: 'server/server.jsx',
  onwarn: () => {},
  plugins: [ babel({
    include: '**',
    exclude: 'scripts/build_options.js'
  }), commonjs({
    include: 'scripts/build_options.js'
  }), replace({
    'isProduction': isProduction
  }) ]
}).then((bundle) => {
  bundle.write({
    dest: 'server.bundle.js',
    format: 'umd',
    globals: {
      'react-router': 'ReactRouter'
    }
  });
});
