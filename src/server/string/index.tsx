
import express from 'express'
import { renderToString } from 'react-dom/server'
import path from 'path'
import { matchRoutes, Route, Routes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import { Helmet } from 'react-helmet'
import router, { IRouter } from '@/router'
import { Provider } from 'react-redux'
import { serverStore } from '@/store'
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
  // https://react.dev/reference/react-dom/server/renderToString
  const content = renderToString(
    <Provider store={serverStore}>
      <StaticRouter location={req.path}>
        <Routes>
          {
            router.map(item => {
              return <Route {...item}></Route>
            })
          }
        </Routes>
      </StaticRouter>
    </Provider>

  )
  const helment = Helmet.renderStatic();

  // 防止乱码
  res.setHeader('Content-Type', 'text/html; charset=utf-8'); // 设置Content-Type头为text/html并指定charset为utf-8
  res.send(`
         <html lang="en">
            <head>
               <meta charSet="utf-8"></meta>
               ${helment.title.toString()}
               ${helment.meta.toString()}
            </head>
            <body>
                <div id="root">${content}</div>
                <script>
                  window.context= {
                     state:${JSON.stringify(serverStore.getState())}
                 }
                </script>
                <script src="./bundle.js"></script>
            </body>
        </html>
  `)
})

app.listen(3000, () => {
  console.log("listen server on  3000")
})
