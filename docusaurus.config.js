// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Azael Docs',
  tagline: 'เอกสารประกอบการใช้งานสำหรับทรัพยากรที่ถูกพัฒนาโดย Azael Dev',
  url: 'https://docs.azael.dev',
  baseUrl: '/',
  favicon: 'img/logo.ico',
  // trailingSlash: false,
  onBrokenLinks: 'throw',
  // onBrokenAnchors: 'throw',
  onBrokenMarkdownLinks: 'warn',

  /**
   * GitHub pages deployment config.
   * If you aren't using GitHub pages, you don't need these.
   */
  organizationName: 'Azael-Dev',
  projectName: 'azael-docs',

  /**
   * Even if you don't use internalization, you can use this field to set useful
   * metadata like html lang. For example, if your site is Chinese, you may want
   * to replace "en" with "zh-Hans".
   */
  i18n: {
    defaultLocale: 'th',
    locales: ['th'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'cfx',
          routeBasePath: 'cfx',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Azael-Dev/azael-docs/edit/main/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        defaultMode: 'dark'
      },
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Azael Docs',
        logo: {
          alt: 'Azael Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            href: 'https://www.azael.dev',
            position: 'right',
            className: 'header-home-link',
            'aria-label': 'Home',
          },
          {
            href: 'https://discord.gg/Ca5W62f',
            position: 'right',
            className: 'header-discord-link',
            'aria-label': 'Discord',
          },
          {
            href: 'https://github.com/Azael-Dev',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub',
          },
          {
            type: 'search',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright ©${new Date().getFullYear()} Azael Dev, All Rights Reserved.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.vsDark,
        additionalLanguages: [
          'lua',
          'javascript',
          'js-extras',
          'php',
          'php-extras',
          'sql',
          'mongodb',
          'powershell',
          'bash',
          'json',
          'diff',
          'uri',
        ]
      },
    }),

    themes: [
      [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        {
          hashed: true,
          docsDir: ['cfx'],
          docsRouteBasePath: ['cfx'],
          language: ['en']
        },
      ],
    ],
};

export default config;
