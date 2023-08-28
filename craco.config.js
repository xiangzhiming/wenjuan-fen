module.exports = {
    devServer: {   // 是webpack的一个扩展配置，devServer：开发环境下的server
        proxy: {   // proxy代理
            /**
             * 表示所有以'/api'开头的访问路径,最终都指向了 http://localhost:3001这个ip和端口。
             * 所以在发送网络请求时就不需要添加ip加端口了。
             *比如：axios("localhost:3001/api/test")就可以直接简化成axios("/api/test")。
              */
            '/api': 'http://localhost:3001',
        },
    },
}
