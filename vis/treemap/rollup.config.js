import babel from 'rollup-plugin-babel';

export default {
  entry: 'index.js',
  format: 'cjs',
  plugins : [babel()],
  dest: 'd3-treemap.js', // equivalent to --output,
  sourceMap: true
};