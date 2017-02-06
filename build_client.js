var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var stylusCssModules = require('rollup-plugin-stylus-css-modules');
var uglify = require('rollup-plugin-uglify');

rollup.rollup({
  entry: 'src/index.js',
  external: [
    'react', 'react-dom', 'react-router'
  ],
  plugins: [
    stylusCssModules({
      output: 'www/styles.css'
    }),
    babel()
    // uglify()
  ]
}).then((bundle) => {
  bundle.write({
    dest: 'www/bundle.js',
    format: 'umd',
    sourceMap: 'inline',
    globals: {
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter'
    }
  });
});
