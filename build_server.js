const babel = require('rollup-plugin-babel');
const rollup = require('rollup');

rollup.rollup({
  entry: 'server/server.jsx',
  onwarn: () => {},
  plugins: [ babel() ]
}).then((bundle) => {
  bundle.write({
    dest: 'server.bundle.js',
    format: 'umd',
    globals: {
      'react-router': 'ReactRouter'
    }
  });
});
