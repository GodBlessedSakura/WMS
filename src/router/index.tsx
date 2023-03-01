import { lazy } from 'react'
import Home from '@/views/Home'
import Login from '@/views/Login'
import { Suspense } from 'react'
import { Spin } from 'antd'
import { Navigate } from 'react-router-dom'

const Page1 = lazy(() => import('@/views/Home/Page1')) // 路由懒加载
const Page2 = lazy(() => import('@/views/Home/Page2'))
const User = lazy(() => import('@/views/Home/User'))
const Settings = lazy(() => import('@/views/Home/Settings'))
const Data = lazy(() => import('@/views/Home/User/Data'))

const withSuspense = (fc: JSX.Element): JSX.Element => <Suspense fallback={<Spin />}>{fc}</Suspense>
const routes = [
  {
    path: '/',
    element: <Navigate to="/page1" />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Home />,
    children: [
      {
        path: '/page1',
        element: withSuspense(<Page1 />),
      },
      {
        path: '/page2',
        element: withSuspense(<Page2 />),
      },
      {
        path: '/user',
        element: withSuspense(<User />),
        children: [
          {
            path: '/user/data',
            element: withSuspense(<Data />),
          },
        ],
      },
      {
        path: '/settings',
        element: withSuspense(<Settings />),
      },
    ],
  },
  //  其他路由跳转回首页
  {
    path: '*',
    element: <Navigate to="page1" />,
  },
]

export default routes
