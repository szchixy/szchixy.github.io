import {defineConfig} from 'vitepress'

export default defineConfig({
  title: 'Geogi Chi',
  description: 'Homepage of Geogi CHi',
  head: [['link', {rel: 'icon', href: '/favicon.ico'}]],
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    math: true,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      {text: 'Blog', link: '/blog/track_fly'},
    ],

    sidebar: {
      '/blog/': {
        base: '/blog',
        items: [
          {
            text: 'blog',
            collapsed: false,
            items: [{text: 'track fly animation', link: '/track_fly'}],
          },
        ],
      },
    },

    socialLinks: [
      {icon: 'github', link: 'https://github.com/szchixy/szchixy.github.io'},
    ],

    // footer: {
    //   message: 'Powered by VitePress',
    //   copyright: 'Copyright © 2024 Geogi Chi',
    // },

    externalLinkIcon: true,
  },
})
