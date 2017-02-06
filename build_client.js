var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var stylusCssModules = require('rollup-plugin-stylus-css-modules');
var uglify = require('rollup-plugin-uglify');

rollup.rollup({
  entry: 'src/main.js',
  onwarn: () => {},
  plugins: [
    stylusCssModules({
      output: 'www/styles.css'
    }),
    babel(),
    uglify()
  ]
}).then((bundle) => {
  bundle.write({
    dest: 'www/bundle.js',
    format: 'umd'
  });
});
