import React from 'react'
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet'
import { useNavigate } from "react-router-dom"
const Home = () => {
  const [count, setCount] = useState(0)
  const [isClient, setIsClient] = useState(false);
  const navigate = useNavigate()
  // 两次渲染 ===>第一次服务端渲染，第二次客户端渲染
  useEffect(() => {
    setIsClient(true);
    
  }, []);
  return (
    <>
      <Helmet>
         <title>这是一个home页面</title>
      </Helmet>
      <h1>{}</h1>
      <button onClick={() => {
        setCount(count + 1)
      }}>
        {isClient ? `按钮点击次数${count}` : '按钮点击次数'}
      </button>
      <button onClick={() => {
        navigate('/demo')
      }
      }>
        跳转demo页面
      </button>
    </>

  )
}

export default Home