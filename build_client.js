var babel = require('rollup-plugin-babel');
var rollup = require('rollup');
var stylusCssModules = require('rollup-plugin-stylus-css-modules');
var uglify = require('rollup-plugin-uglify');

rollup.rollup({
  entry: 'src/index.js',
  external: [
    'mobx', 'mobx-react', 'react', 'react-dom', 'react-router'
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
      'mobx': 'mobx',
      'mobx-react': 'mobxReact',
      'react': 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter'
    }
  });
});
