const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // 设置为开发模式
    mode: 'development',
    entry: './src/index.js',//配置入口文件
    output: {
        filename: 'js/index.js', // 配置输出文件名
        // 目录名绝对路径 配置输出文件目录
        path: path.resolve(__dirname, 'dist')
    },
    // 配置加载器
    module: {
        // 规则
        rules: [
            // css
            {
                // 正则表达式匹配css后缀的文件,那些文件需要问到当前loader
                test: /\.css$/i,
                // 顺序从右向左执行, 从后往前执行，先加载的放后面
                use: ['style-loader', 'css-loader'],

            },
            //less
            {
                test: /\.less$/i, // i ignore case i：忽略大小写，所以它会同时匹配 .less、.LESS、.Less、.LeSs 等各种大小写组合的文件名
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            //sass
            {
                test: /\.scss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            //图片资源--直接拷贝到dist
            {
                test: /\.(jpg|png|gif|jpeg|webp)$/i,
                // 资源模块类型，用于处理静态资源
                type: 'asset/resource',
                // 文件路径，名字配置
                generator: {
                    /**
                     * [name] 源文件的名字 
                     * [ext] 源文件的扩展名 
                     * //Error: Conflict: Multiple chunks emit assets to the same filename images/1.jpg
                     * 使用原来的源文件名和扩展名，可能引起打包过程中文件名和原来dist中文件名冲突
                     * [hash]根据文件内容计算hash值 1.07e1da24976bc2234cf8 名字太长了
                     * [hash:<number>] 保留几位的hash值
                     * images/ 前面加自定义目录名
                     * */
                    filename: 'images/[name].[hash:5][ext]'
                }
            },
            //图片打包成base64
            {
                test: /\.(jpg|png|gif|jpeg|webp)$/i,
                type: 'asset/inline'
            },
            //图片资源 --base64 --拷贝到dist
            {
                test: /\.(jpg|png|gif|jpeg|webp)$/i,
                type: 'asset',
                generator: {
                    filename: 'img/[name].[hash:6][ext]',

                },
                //配置打包成base64的最大限制
                parser: {
                    dataUrlCondition: {
                        maxSize: 10 * 1024 // 10kb以下打包成base64，以上拷贝到dist
                    }
                }
            },
            // icon 字体 audio video
            {
                test: /\.(ttf|woff2?)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash:4][ext]'

                }
            }
        ]
    },
    plugins: [
        //自动清理上次的打包文件夹
        new CleanWebpackPlugin(),
        // 自动生成html文件
        new HtmlWebpackPlugin({
            // 标题配置
            title: 'webpack5',
            //基于这个模版打包生成html文件
            template: './public/index.html'
        })
    ],
    // 配置开发工具
    // 把报错代码定位到 源代码位置，而不是打包后的代码位置
    devtool: 'inline-source-map',
    // 服务配置
    devServer: {
        //指定开启服务的静态目录 npx webpack server 开启热更新服务 但是dist目录中并没有具体的文件， 但是报错或者console能看到具体的源文件位置。在内存中生成了dist，没有存到磁盘中
        static: './dist',
        // 开启热更新
        hot: true,
    }
}