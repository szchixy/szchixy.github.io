import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: '池道',
  description: 'Homepage of szchixy',
  head: [['link', { rel: 'icon', href: '/img/favicon.ico' }]],
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // nav: [],

    sidebar: {
      '/blog/': {
        base: '/blog', items: [
          {
            text: '博客',
            collapsed: false,
            items: [
              { text: '轨迹飞行动画', link: '/track_fly' },
            ]
          },
        ]
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/szchixy/szchixy.github.io' },
    ],

    // footer: {
    //   message: 'Powered by VitePress',
    //   copyright: 'Copyright © 2023 szchixy',
    // },

    lastUpdated: { text: '最后更新于', formatOptions: { dateStyle: 'short', timeStyle: 'medium', } },
    outline: { label: '页面导航' },
    docFooter: { prev: '上一页', next: '下一页', },
    darkModeSwitchLabel: '主题',
    darkModeSwitchTitle: '切换到深色模式',
    lightModeSwitchTitle: '切换到浅色模式',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    externalLinkIcon: true,
  }
})
