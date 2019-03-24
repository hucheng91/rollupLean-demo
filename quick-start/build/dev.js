import serve from 'rollup-plugin-serve'
import baseConfig from './rollup.config'

const config = baseConfig;
config.plugins.concat([
    serve({
      open: true,
      port: 3001,
      contentBase: ['example', 'lib']  // 设置 exmaple的访问目录和dist的访问目录
    })
]);
export default config