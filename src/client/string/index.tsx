import { hydrateRoot } from 'react-dom/client'
import router from "@/router"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { clientStore } from '@/store'
import { Provider } from 'react-redux'


const Client = () => {
    return (
        <Provider store={clientStore}>
            <BrowserRouter>
                <Routes>
                    {
                        router.map((item, index) => {
                            return <Route {...item} key={index}></Route>
                        })
                    }
                </Routes>
            </BrowserRouter>
        </Provider>

    )
}
// 水合操作
hydrateRoot(document.getElementById('root') as Element, <Client />)