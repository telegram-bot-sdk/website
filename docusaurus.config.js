// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const versions = require('./versions.json');
/** @type {Record<string,Record<string,string>>} */
const ConfigLocalized = require('./docusaurus.config.localized.json');

const isDev = process.env.NODE_ENV === 'development';

const isCFPages = !!parseInt(process.env.CF_PAGES || '0');

const isDeployPreview = isCFPages && process.env.CONTEXT === 'preview';

// Used to debug production build issues faster
const isBuildFast = !!parseInt(process.env.BUILD_FAST || '0');

// Special deployment for staging locales until they get enough translations
// https://telegram-bot-sdk-i18n-staging.vercel.app/
const isI18nStaging = process.env.I18N_STAGING === 'true';
const isVersioningDisabled = !!parseInt(process.env.DISABLE_VERSIONING || '0') || isI18nStaging;

const baseUrl = process.env.BASE_URL ?? '/';
const defaultLocale = 'en';

const GITHUB_PATHS = {
  REPO: 'telegram-bot-sdk/telegram-bot-sdk',
  FORMER_REPO: 'irazasyed/telegram-bot-sdk',
  WEBSITE: 'telegram-bot-sdk/website',
}

function getLocalizedConfigValue(/** @type {string} */ key) {
  const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? defaultLocale;
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  const value = values[currentLocale] ?? values[defaultLocale];
  if (!value) {
    throw new Error(
      `Localized value for config key=${key} not found for both currentLocale=${currentLocale} or defaultLocale=${defaultLocale}`,
    );
  }
  return value;
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Telegram Bot SDK for PHP',
  tagline: getLocalizedConfigValue('tagline'),
  organizationName: 'telegram-bot-sdk',
  projectName: 'telegram-bot-sdk',
  url: 'https://telegram-bot-sdk.com',

  baseUrl,
  baseUrlIssueBanner: true,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon/favicon.ico',
  customFields: {
    isDeployPreview,
    owner: 'irazasyed',
    githubUrl: `https://github.com/${GITHUB_PATHS.REPO}`,
    GITHUB_PATHS,
    cacheKeys: {
      packagistData: 'packagist_data'
    }
  },

  i18n: {
    defaultLocale,
    locales:
      isDeployPreview
        ? // Deploy preview and branch deploys: keep them fast!
        [defaultLocale]
        : isI18nStaging
          ? // Staging locales: https://telegram-bot-sdk-i18n-staging.vercel.app/
          [defaultLocale, 'ru']
          : // Production locales
          [defaultLocale],
  },

  plugins: [
    [
      require.resolve('./src/plugins/changelog/index.js'),
      {
        blogTitle: 'Telegram Bot SDK changelog',
        blogDescription:
          'Keep yourself up-to-date about new features in every release',
        blogSidebarCount: 'ALL',
        blogSidebarTitle: 'Changelog',
        routeBasePath: '/changelog',
        showReadingTime: false,
        postsPerPage: 20,
        archiveBasePath: null,
        authorsMapPath: 'authors.json',
        feedOptions: {
          type: 'all',
          title: 'Telegram Bot SDK changelog',
          description:
            'Keep yourself up-to-date about new features in every release',
          copyright: `Copyright © ${new Date().getFullYear()} Irfaq Syed`,
          language: defaultLocale,
        },
      },
    ],
    [
      'ideal-image',
      /** @type {import('@docusaurus/plugin-ideal-image').PluginOptions} */
      ({
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        // Use false to debug, but it incurs huge perf costs
        disableInDev: true,
      }),
    ],
    [
      'content-docs',
      /** @type {import('@docusaurus/plugin-content-docs').Options} */
      ({
        id: 'community',
        path: 'community',
        routeBasePath: 'community',
        editUrl: ({ locale, versionDocsDirPath, docPath }) => {
          if (locale !== defaultLocale) {
            return `https://crowdin.com/project/telegram-bot-sdk/${locale}`;
          }
          return `https://github.com/${GITHUB_PATHS.WEBSITE}/edit/main/${versionDocsDirPath}/${docPath}`;
        },
        sidebarPath: require.resolve('./sidebarsCommunity.js'),
        showLastUpdateAuthor: false,
        showLastUpdateTime: true,
      }),
    ],
    [
      'pwa',
      {
        debug: isDeployPreview,
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        // swRegister: false,
        swCustom: require.resolve('./src/sw.js'),
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: 'img/favicon/favicon-32x32.png',
          },
          {
            tagName: 'link',
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: 'img/favicon/favicon-16x16.png',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: 'site.webmanifest',
          },
          {
            tagName: 'meta',
            name: 'application-name',
            content: 'Telegram Bot SDK',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-title',
            content: 'Telegram Bot SDK',
          },
          {
            tagName: 'meta',
            name: 'theme-color',
            content: '#ffffff',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-status-bar-style',
            content: '#000',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: 'img/favicon/apple-touch-icon.png',
          },
          {
            tagName: 'link',
            rel: 'mask-icon',
            href: 'img/favicon/safari-pinned-tab.svg',
            color: '#5bbad5',
          },
          {
            tagName: 'meta',
            name: 'msapplication-TileColor',
            content: '#2d89ef',
          },
          {
            tagName: 'meta',
            name: 'msapplication-config',
            content: 'img/favicon/browserconfig.xml',
          },
        ],
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: ({ locale, docPath }) => {
            if (locale !== defaultLocale) {
              return `https://crowdin.com/project/telegram-bot-sdk/${locale}`;
            }
            // We want users to submit doc updates to the upstream/next version!
            // Otherwise we risk losing the update on the next release.
            const nextVersionDocsDirPath = 'docs';
            return `https://github.com/${GITHUB_PATHS.WEBSITE}/edit/main/${nextVersionDocsDirPath}/${docPath}`;
          },
          disableVersioning: isVersioningDisabled,
          lastVersion: isDev || isDeployPreview ? 'current' : undefined,
          onlyIncludeVersions: (() => {
            if (isBuildFast) {
              return ['current'];
            } else if (
              !isVersioningDisabled &&
              (isDev || isDeployPreview)
            ) {
              return ['current', ...versions];
            }

            return undefined;
          })(),
          versions: {
            current: {
              label: 'Next 🚧',
              noIndex: true,
            },
            // '3.x': {
            //   noIndex: true,
            // },
            // '2.x': {
            //   noIndex: true,
            // },
            // '1.x': {
            //   noIndex: true,
            // },
          },
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 5,
          editUrl: ({ locale, blogDirPath, blogPath }) => {
            if (locale !== defaultLocale) {
              return `https://crowdin.com/project/telegram-bot-sdk/${locale}`;
            }
            return `https://github.com/${GITHUB_PATHS.WEBSITE}/edit/main/${blogDirPath}/${blogPath}`;
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
        gtag: !(isDeployPreview)
          ? {
            trackingID: ['A'],
          }
          : undefined,
      }),
    ],
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',

      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },

      docs: {
        sidebar: {
          hideable: false,
          autoCollapseCategories: true,
        },
      },

      announcementBar: {
        id: 'announcementBar_1', // Increment on change
        content:
          '⭐️ If you like Telegram Bot SDK, give it a star on <a target="_blank" href="https://github.com/telegram-bot-sdk/telegram-bot-sdk">GitHub</a>! ⭐️',
      },

      navbar: {
        hideOnScroll: false,
        title: 'Telegram Bot SDK',
        logo: {
          alt: 'Telegram Bot SDK',
          src: 'img/logo.svg',
        },

        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs',
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            to: '/community/support',
            label: 'Community',
            position: 'left',
            activeBaseRegex: `/community/`,
          },
          {
            href: 'https://github.com/telegram-bot-sdk/awesome-telegram-bots',
            label: 'Showcase Bots',
            position: 'left'
          },
          {
            type: 'docsVersionDropdown',
            position: 'right',
            dropdownActiveClassDisabled: true,
            dropdownItemsAfter: [
              {
                type: 'html',
                value: '<hr class="dropdown-separator">',
              },
              {
                to: '/versions',
                label: 'All versions',
              },
            ],
          },
          {
            type: 'localeDropdown',
            position: 'right',
            dropdownItemsAfter: [
              {
                // Create translation issue.
                to: `https://github.com/${GITHUB_PATHS.WEBSITE}/issues/123456`,
                label: 'Help us translate',
              },
            ],
          },
          {
            href: `https://github.com/${GITHUB_PATHS.REPO}`,
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Learn',
            items: [
              {
                label: 'Introduction',
                to: '/docs',
              },
              {
                label: 'Installation',
                to: 'docs/getting-started/installation',
              },
              {
                label: 'Upgrade Guide',
                to: 'docs/getting-started/upgrade-guide',
              },
              {
                label: 'Blog',
                to: '/blog',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Support',
                to: '/community/support',
              },
              {
                label: 'Awesome Resources',
                to: '/community/resources',
              },
              {
                label: 'Contributing Guide',
                to: '/community/contributing',
              },
              {
                label: 'PHP Chat on Slack',
                href: 'https://phpchat.co',
              },
              {
                label: 'PHP Chat on Telegram',
                href: 'https://t.me/PHPChatCo',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Changelog',
                to: '/changelog',
              },
              {
                label: 'Showcase Bots',
                href: 'https://github.com/telegram-bot-sdk/awesome-telegram-bots',
              },
              {
                label: 'GitHub',
                href: `https://github.com/${GITHUB_PATHS.REPO}`,
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Code of Conduct',
                to: '/community/code-of-conduct',
              },
              {
                label: 'Security Policy',
                to: '/community/security',
              },
              {
                label: 'License',
                to: '/license',
              },
              {
                label: 'Disclaimer',
                to: '/license#disclaimer'
              }
            ],
          },
        ],
        logo: {
          alt: 'Telegram Bot SDK',
          src: 'img/robot.png',
          href: 'https://telegram-bot-sdk.com',
          height: 120,
        },
        copyright: `
        <p>
          Copyright © 2015-${new Date().getFullYear()} Telegram Bot SDK for PHP. All rights reserved. • Created by <a target="_blank" href="https://github.com/irazasyed">Irfaq Syed</a>
        </p>
        <p class="disclaimer">
          <a href="/license#disclaimer">Disclaimer</a>:
          The Telegram Bot SDK is a third-party library and is not associated with, endorsed by, or affiliated with Telegram or its products.
        </p>
        `,
      },
      prism: {
        defaultLanguage: 'php',
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['php', 'bash', 'json'],
        magicComments: [
          {
            className: 'theme-code-block-highlighted-line',
            line: 'highlight-next-line',
            block: { start: 'highlight-start', end: 'highlight-end' },
          },
          {
            className: 'code-block-error-line',
            line: 'This will error',
          },
        ],
      },
      // algolia: {
      //   appId: '',
      //   apiKey: '',
      //   indexName: '',
      //   replaceSearchResultPathname:
      //     isDev || isDeployPreview
      //       ? {
      //         from: /^\/docs\/next/g,
      //         to: '/docs',
      //       }
      //       : undefined,
      // },
    }),
};

module.exports = config;
