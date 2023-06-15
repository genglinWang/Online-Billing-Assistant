/*
 * @文件描述: 路由
 * @公司: 山东大学
 * @作者: 李洪文
 * @Date: 2019-06-13 10:35:10
 * @LastEditors: liuweis
 * @LastEditTime: 2020-12-27 19:33:53
 */

import {
  HomeOutlined,
  SettingOutlined,
  AreaChartOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';

const menuConfig = [
  {
    key: 'home',
    name: '首页',
    link: '/home',
    icon: HomeOutlined,
  },
  {
    key: 'base',
    name: '基础数据',
    icon: SettingOutlined,
    children: [
      // {
      //   key: 'department',
      //   link: '/base/department',
      //   name: '部门管理',
      // },
      // {
      //   key: 'user',
      //   link: '/base/user',
      //   name: '用户管理',
      // },
      {
        key: 'myMod',
        link: '/base/myMod',
        name: '记账助手',
      },
      {
        key: 'myMod0',
        link: '/base/myMod0',
        name: '可视化',
      },
      {
        key: 'wordcloud',
        link: '/base/wordcloud',
        name: '词云',
      },
    ],
  },
  {
    key: 'system',
    link: '',
    icon: SettingOutlined,
    name: '系统管理',

    children: [
      {
        key: 'config',
        link: '/system/config',
        name: '参数设置',
      },
      {
        key: 'network',
        link: '/system/network',
        name: '网络设置',
      },
    ],
  },
];

export { menuConfig };
