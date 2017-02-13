const babel = require('rollup-plugin-babel');
const rollup = require('rollup');
const stylusCssModules = require('rollup-plugin-stylus-css-modules');
const uglify = require('rollup-plugin-uglify');

rollup.rollup({
  entry: 'src/index.jsx',
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
      mobx: 'mobx',
      'mobx-react': 'mobxReact',
      react: 'React',
      'react-dom': 'ReactDOM',
      'react-router': 'ReactRouter'
    }
  });
});
