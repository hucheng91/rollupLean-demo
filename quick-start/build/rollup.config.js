import babel from 'rollup-plugin-babel';
import common from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.js',
      name:"Demo",
      format: 'iife' // iife 表示立即执行函数
    },
    {
      format: 'esm',
      file: 'lib/index.esm.js',
    },
    {
      file: 'lib/index.umd.js',
      name:"Demo",
      format: 'umd' 
    },
    {
      file: 'lib/index.amd.js',
      name:"Demo",
      format: 'amd' 
    },
    {
      file: 'lib/index.cjs.js',
      name:"Demo",
      format: 'cjs' 
    },
  ],
  plugins: [
    resolve(), 
    babel(), 
    common()
  ]
}