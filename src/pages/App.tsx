
import React from "react"
import router from "@/router"
import { Route, Routes } from "react-router-dom"
import { clientStore } from '@/store'
import { Provider } from 'react-redux'
const App = () => {
    return (
        <Provider store={clientStore}>
            <html lang="en">
                <head>
                    <meta charSet="utf-8"></meta>
                </head>
                <body>
                    <div id="root">
                        <Routes>
                            {
                                router.map((item, index) => {
                                    return <Route {...item} key={index}></Route>
                                })
                            }
                        </Routes>

                    </div>
                </body>
            </html>
        </Provider>
    )
}

export default App