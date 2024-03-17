import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Geogi Chi',
  description: 'Homepage of Geogi CHi',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/szchixy/szchixy.github.io' },
    ],

    externalLinkIcon: true,

    aside: false,

    docFooter: {
      prev: false,
      next: false,
    },

    // footer: {
    //   message: 'Powered by VitePress',
    //   copyright: 'Copyright © 2024 Geogi Chi',
    // },
  },
})
