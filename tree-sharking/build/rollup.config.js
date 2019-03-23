import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      format: 'esm',
      file: 'lib/index.esm.js',
    }
  ],
  plugins: [resolve(
  ), babel(), common()]
}