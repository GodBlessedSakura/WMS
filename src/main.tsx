import React from 'react'
import ReactDOM from 'react-dom/client'
// 初始化样式放入最前
import "reset-css" 
// UI 框架样式 Antd5无需引入样式且包里附带reset.css, 自动支持按需引入
// 全局样式
import "@/assets/styles/global.scss"
// 组件样式
import { BrowserRouter } from 'react-router-dom'
import App from '@/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
