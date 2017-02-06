var rollup = require('rollup');
var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');

rollup.rollup({
  entry: 'server.js',
  onwarn: () => {},
  plugins: [
    babel()
  ]
}).then((bundle) => {
  bundle.write({
    dest: 'server.bundle.js',
    format: 'umd',
    globals: {
      'react-router': 'ReactRouter'
    }
  });
});
