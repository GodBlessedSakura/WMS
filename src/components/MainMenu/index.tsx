import React, { useState } from 'react'
import { DesktopOutlined, PieChartOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem
}

// region
// const items: MenuItem[] = [
//   {
//     label: '栏目 1',
//     key: '/page1',
//     icon: <PieChartOutlined />,
//   },
//   {
//     label: '栏目 2',
//     key: '/page2',
//     icon: <DesktopOutlined />,
//   },
//   {
//     label: '用户',
//     key: '/user',
//     icon: <UserOutlined />,
//     children: [
//       {
//         label: '用户数据',
//         key: '/user/data',
//         icon: <UserOutlined />,
//       },
//       {
//         label: '用户图片',
//         key: '/user/img',
//         icon: <UserOutlined />,
//       },
//     ],
//   },
//   {
//     label: '设置',
//     key: '/settings',
//     icon: <SettingOutlined />,
//     children: [
//       {
//         label: '隐私设置',
//         key: '/settings/privacy',
//         icon: <SettingOutlined />,
//       },
//       {
//         label: '语言设置',
//         key: '/settings/language',
//         icon: <SettingOutlined />,
//       },
//     ],
//   },
// ]
// endregion

const items: MenuItem[] = [
  getItem('栏目 1', '/page1', <PieChartOutlined />),
  getItem('栏目 2', '/page2', <DesktopOutlined />),
  getItem('用户', '/user', <UserOutlined />, [getItem('用户数据', '/user/data', <UserOutlined />), getItem('用户图片', '/user/img', <UserOutlined />)]),
  getItem('设置', '/settings', <SettingOutlined />, [getItem('隐私设置', '/settings/privacy', <SettingOutlined />), getItem('语言设置', '/settings/lang', <SettingOutlined />)]),
]

const MainMenu: React.FC = () => {
  const curRoute = useLocation()
  let firstOpenKey: string = ''
  for (let i = 0; i < items.length; i++) {
    const item: any = items[i]
    if (item?.children?.find((item: MenuItem) => item?.key === curRoute.pathname)) {
      firstOpenKey = items[i]?.key as string
      break
    }
  }
  const [openKeys, setOpenKeys] = useState<string[]>([firstOpenKey])
  const navigateTo = useNavigate()

  const getDefalutSeletedKeys = (): string[] => {
    return [curRoute.pathname]
  }

  const onMenuClick = (e: { key: string }) => {
    // 编程式路由导航
    navigateTo(e.key)
  }

  const handleOpenChange: MenuProps['onOpenChange'] = (keys) => {
    setOpenKeys([keys[keys.length - 1]])
  }

  return <Menu theme="dark" defaultSelectedKeys={getDefalutSeletedKeys()} mode="inline" items={items} openKeys={openKeys} onClick={onMenuClick} onOpenChange={handleOpenChange} />
}

export default MainMenu
