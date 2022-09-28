// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Azael Docs',
  tagline: 'เอกสารประกอบการใช้งานสำหรับทรัพยากรที่ถูกพัฒนาโดย Azael Dev',
  url: 'https://docs.azael.dev',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.ico',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Azael-Dev', // Usually your GitHub org/user name.
  projectName: 'azael-docs', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
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
          path: 'fivem',
          routeBasePath: 'fivem',
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
      navbar: {
        title: 'Azael Docs',
        logo: {
          alt: 'Azael Logo',
          src: 'img/logo.png',
        },
        items: [
          {
            href: 'https://www.azael.dev',
            label: 'Azael.Dev',
            position: 'right',
          },
          {
            href: 'https://discord.gg/Ca5W62f',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://github.com/Azael-Dev',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright ©${new Date().getFullYear()} Azael Dev, All Rights Reserved.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['lua']
      },
    }),

    themes: [
      [
        require.resolve('@easyops-cn/docusaurus-search-local'),
        {
          hashed: true,
          docsDir: ['fivem'],
          docsRouteBasePath: ['fivem'],
          //language: ['en', 'th'],
        },
      ],
    ],
};

module.exports = config;
