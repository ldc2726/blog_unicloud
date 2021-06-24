const path = require('path')
module.exports = {
    /**
     * 在生产中服务时的基本公共路径。
     * @default '/'
     */
    base: '/',
    /**
     * 与“根”相关的目录，构建输出将放在其中。如果目录存在，它将在构建之前被删除。
     * @default 'dist'
     */
    outDir: 'dist',
    port: 3000,
    // 是否自动在浏览器打开
    open: true,
    // 是否开启 https
    https: false,
    // 服务端渲染
    ssr: false,
    // 引入第三方的配置
    optimizeDeps: {
        include: ['moment', 'echarts', 'axios', 'mockjs']
    },
    alias: {
        '/@/': path.resolve(__dirname, 'src')
        // '/@components/': path.resolve(__dirname, './src/components')
    },
    proxy: {
        // 如果是 /lsbdb 打头，则访问地址如下
        '/http': 'https://e2ad8936-ff0a-4d4b-9e17-565fcce00ac0.bspapp.com/http'
        // 如果是 /lsbdb 打头，则访问地址如下
        // '/lsbdb': {
        //   target: 'http://10.192.195.96:8087/',
        //   changeOrigin: true,
        //   // rewrite: path => path.replace(/^\/lsbdb/, '')
        // }
    }
}
