
import express from 'express'
import { renderToPipeableStream } from 'react-dom/server'
import path from 'path'
import { matchRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import router, { IRouter } from '@/router'
import { serverStore } from '@/store'
import App from '@/pages/App'
const app = express()

app.use(express.static(path.resolve(process.cwd(), "client_build")));

app.use(express.json())
// 模拟一个请求
app.post('/mock/data', (req, res) => {
    res.send({
        code: "OK",
        data: req.body,
    })
})

// 路由映射
const routerMap: any = new Map()
router.forEach((item: IRouter) => {
    if (item.loadData) {
        routerMap.set(item.path, item.loadData(serverStore))
    }
})

app.get("*", async (req, res) => {


    // 根据路由地址下所有获取初始化函数 （包括子路由）
    const promises: (() => Promise<any>)[] = []
    const matchedRouters = matchRoutes(router, req.path)
    matchedRouters?.forEach(item => {
        if (routerMap.has(item.pathname)) {
            promises.push(routerMap.get(item.pathname))
        }
    })
    // 异步渲染 
    await Promise.all(promises)
    // https://react.dev/reference/react-dom/server/renderToPipeableStream
    // 流式传输文本
    const { pipe } = renderToPipeableStream(
        // https://reactrouter.com/en/main/guides/ssr
        <StaticRouter location={req.path}>
                <App />
        </StaticRouter>
        ,
        {
            bootstrapScripts: ['/bundle.js'],
            bootstrapScriptContent: `window.context= {state:${JSON.stringify(serverStore.getState())}}`,
            onShellReady() {
                res.setHeader('content-type', 'text/html');
                pipe(res);
            },
            // 服务端渲染失败容错处理
            onShellError(error) {
                res.statusCode = 200;
                res.setHeader('content-type', 'text/html');
                res.send('<h1>出错了</h1>'); 
              },
        }
    )

})

app.listen(3000, () => {
    console.log("listen server on  3000")
})
