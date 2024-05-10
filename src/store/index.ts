
import { configureStore } from "@reduxjs/toolkit";
import { demoReducer } from "./demoReducer";

const clientStore: any = configureStore({
    reducer: {
        demo: demoReducer.reducer,
    }

})


const serverStore: any = configureStore({
    reducer: {
        demo: demoReducer.reducer,
    }
})

export {
    clientStore,
    serverStore
}