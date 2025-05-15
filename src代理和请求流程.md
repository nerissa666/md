前端 src 请求怎么把 vue.config.js 里面的配置 在生产环境也生效
因为 src 请求 只会在前端 不会传到后端 所以 nginx 代理不行
1️⃣ 可以在 src 前面拼接 http 头 有点傻但是能解决问题

const formatSRC = (src) => {
return process.env.VUE_APP_API_BASE_URL + src
};
<img
    v-if="imageUrl"
    :src="$formatSRC(imageUrl)"
    alt="avatar"
    width="100%"
    height="100%"
/>

2️⃣ configureWebpack 配置 让在生产环境生效 (正解)

configureWebpack: {
    devServer: {
        proxy: {
          '/file': {
            target: process.env.VUE_APP_API_BASE_URL,
            changeOrigin: true,
            // pathRewrite: { '^/api': '' }
          }
        }
      }
    }
}