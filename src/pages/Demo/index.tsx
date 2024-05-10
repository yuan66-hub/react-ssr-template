
import React from "react";
import type { FC } from "react";
import { Helmet } from 'react-helmet'
import { getDemoData } from "@/store/demoReducer";
import { connect } from "react-redux";

interface IProps {
    content?: string,
    getDemoData?: (data: string) => void
}

const Demo: FC = (props: IProps) => {
    const onRequest = (): void => {
        if (props.getDemoData) {
            props.getDemoData("刷新后的数据")
        }
    }
    return <>
        <Helmet>
            <title>这是一个Demo页面</title>
        </Helmet>
        <h1>这个一个Demo页面</h1>
        <h1>接口返回数据{props.content}</h1>
        <button onClick={onRequest}>刷新数据</button>
    </>
}


const mapStateToProps = (state: any) => {
    return {
        content: state?.demo?.content || ''
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getDemoData: (data: string) => {
            dispatch(getDemoData(data))
        }
    }
}

const storeDemo: any = connect(mapStateToProps, mapDispatchToProps)(Demo)


// 页面初始化数据
storeDemo.getInitProps = (store: any, data: string) => {
    return store.dispatch(getDemoData(data || '页面初始化数据--node数据'))
}




export default storeDemo