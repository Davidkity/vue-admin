const path = require('path');
module.exports = {
    //基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
    //输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: false,
    /**
     *  webpack配置，see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
     */
    chainWebpack: (config) =>{
        const svgRule = config.module.rule("svg");     
        svgRule.uses.clear();     
        svgRule
        .use("svg-sprite-loader")
        .loader("svg-sprite-loader")
        .options({ 
        symbolId: "icon-[name]",
        include: ["./src/icons"] 
        });
    },
    configureWebpack: (config) => {
         config.resolve = { // 配置解析别名
             extensions: ['.js','.json','.vue'],  //自动添加文件名后缀
             alias: {
                'vue': 'vue/dist/vue.js',  //改变vue3.0的默认指向路径
                '@': path.resolve(__dirname, './src'),
                'public': path.resolve(__dirname, './public'),
                'compoments': path.resolve(__dirname, './src/components'),
                'common': path.resolve(__dirname, './src/common'),
                'api': path.resolve(__dirname, './src/api'),
                'view': path.resolve(__dirname, './src/view'),
                'data': path.resolve(__dirname, './src/data')
            }
       }
    },
    //生产环境是否生成 sourceMap文件
    productionSourceMap: false,
    // css相关配置
    css: {
        // 是否使用css分离插件 ExtractTextPlugin
        extract: true,
        // 开启 CSS source map ?
        sourceMap: false,
        // css 预设器配置项
        loaderOptions: {
            sass: {
                prependData:`@import "./src/styles/main.scss";`
            }
        },
        // 启用 CSS modules for all css / pre-processor files
        requireModuleExtension: true
    },
    // use thread-loader for babel & TS in production build
    // enable by default if the machine has more than 1 cores
    parallel: require('os').cpus().length > 1,
    /**
     *  PWA 插件相关配置，see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
     */
    pwa: {},
    // webpack-dev-server 相关配置
    devServer: {
        open: false, //编译完成是否打开网页
        host: '0.0.0.0', // 制定使用地址，默认localhost,0.0.0.0代表可以被外界访问
        port: 8080, //访问端口
        https: false, //编译失败是刷新页面
        hot: true, //开启热加载
        hotOnly: false,
      //  proxy: null, //设置代理
        proxy: {    //跨域网址配置
            '/api':{
                target: "http://www.web-jshtml.cn/productapi/token", //API服务地址
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''     //值的含义是接 http://www.web-jshtml.cn/productapi 网址的路径 （/xx）
                }
            }
        },
        overlay: { // 全屏模式下是否显示脚本错误
            warnings: true,
            errors: true
        },
        before: app => {}
    },
    /**
     * 第三方插件配置
     */
    pluginOptions: {}
}