
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'


const getDemoData = createAsyncThunk(
    "demo/getData",
    async (content: string) => {
        try {
            const res = await fetch('http://localhost:3000/mock/data', {
                method: "post",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    content
                })
            })
            const data = await res.json()

            return data.data.content
        } catch (error) {
            return '错误数据'
        }
    }
)
const isClient = typeof window !== 'undefined'
// 解决数据不同步问题
const demoReducer = createSlice({
    name: "demo",
    // @ts-ignore
    initialState: isClient ? (window as any).context.state.demo : {
        content: "node默认数据"
    },
    // 同步
    reducers: {},
    // 异步
    extraReducers(builder) {
        builder.addCase(getDemoData.pending, (state, action) => {
            state.content = 'pending'
        })
            .addCase(getDemoData.fulfilled, (state, action) => {
                state.content = action.payload
            })
            .addCase(getDemoData.rejected, (state, action) => {
                state.content = 'rejected'
            })
    },
})

export { demoReducer, getDemoData }