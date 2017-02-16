const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const nodeResolve = require('rollup-plugin-node-resolve');
const replace = require('rollup-plugin-replace');
const stylusCssModules = require('rollup-plugin-stylus-css-modules');
const uglify = require('rollup-plugin-uglify');

// Modify this value to change between development and production build
module.exports.isProduction = false;

module.exports.developmentOptions = {
  entry: 'src/index.jsx',
  plugins: [
    stylusCssModules({
      output: 'www/styles.css'
    }),
    babel()
  ],
  external: [
    'mobx', 'mobx-react', 'react', 'react-dom', 'react-router'
  ]
};

module.exports.globalNames = {
  mobx: 'mobx',
  'mobx-react': 'mobxReact',
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router': 'ReactRouter'
};

module.exports.productionOptions = {
  entry: 'src/index.jsx',
  plugins: [
    stylusCssModules({
      sourceMap: false,
      output: 'www/styles.css'
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    nodeResolve({ jsnext: true, main: true }),
    commonjs({
      namedExports: {
        react: [
          'PropTypes',
          'createElement'
        ],
        'mobx-react': [ 'observer' ]
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  ]
};
