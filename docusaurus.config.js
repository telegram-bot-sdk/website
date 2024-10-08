// @ts-check

import { themes } from "prism-react-renderer";
import versions from "./versions.json";
import ConfigLocalized from "./docusaurus.config.localized.json";

// Environment variables and constants
const ENV = {
  isDev: process.env.NODE_ENV === "development",
  isCFPages: !!parseInt(process.env.CF_PAGES || "0"),
  isDeployPreview:
    process.env.CONTEXT === "preview" &&
    !!parseInt(process.env.CF_PAGES || "0"),
  isI18nStaging: process.env.I18N_STAGING === "true",
  baseUrl: process.env.BASE_URL ?? "/",
  defaultLocale: "en",
  currentLocale: process.env.DOCUSAURUS_CURRENT_LOCALE ?? "en",
};

const GITHUB = {
  REPO: "telegram-bot-sdk/telegram-bot-sdk",
  FORMER_REPO: "irazasyed/telegram-bot-sdk",
  WEBSITE: "telegram-bot-sdk/website",
};

// Helper function for localized config
function getLocalizedConfigValue(key) {
  const values = ConfigLocalized[key];
  if (!values) {
    throw new Error(`Localized config key=${key} not found`);
  }
  return (
    values[ENV.currentLocale] ??
    values[ENV.defaultLocale] ??
    (() => {
      throw new Error(`No value found for ${key} in any locale`);
    })()
  );
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Telegram Bot SDK for PHP",
  tagline: getLocalizedConfigValue("tagline"),
  organizationName: "telegram-bot-sdk",
  projectName: "telegram-bot-sdk",
  url: "https://telegram-bot-sdk.com",
  baseUrl: ENV.baseUrl,
  baseUrlIssueBanner: true,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon/favicon.ico",

  customFields: {
    isDeployPreview: ENV.isDeployPreview,
    owner: "irazasyed",
    githubUrl: `https://github.com/${GITHUB.REPO}`,
    GITHUB_PATHS: GITHUB,
    cacheKeys: {
      packagistData: "packagist_data",
    },
  },

  stylesheets: [
    "https://fonts.bunny.net/css?family=inter:100,200,300,400,500,600,700,800",
  ],

  i18n: {
    defaultLocale: ENV.defaultLocale,
    locales: ENV.isDeployPreview
      ? [ENV.defaultLocale]
      : ENV.isI18nStaging
      ? [ENV.defaultLocale, "ru"]
      : [ENV.defaultLocale],
  },

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: ({ locale, docPath }) =>
            locale !== ENV.defaultLocale
              ? `https://crowdin.com/project/telegram-bot-sdk/${locale}`
              : `https://github.com/${GITHUB.WEBSITE}/edit/main/docs/${docPath}`,
          lastVersion: ENV.isDev || ENV.isDeployPreview ? "current" : undefined,
          versions: {
            current: {
              label: "Next 🚧",
              noIndex: true,
            },
            "3.x": {
              noIndex: false,
            },
            "2.x": {
              noIndex: true,
            },
            "1.x": {
              noIndex: true,
            },
          },
        },
        blog: {
          showReadingTime: true,
          postsPerPage: 5,
          editUrl: ({ locale, blogDirPath, blogPath }) =>
            locale !== ENV.defaultLocale
              ? `https://crowdin.com/project/telegram-bot-sdk/${locale}`
              : `https://github.com/${GITHUB.WEBSITE}/edit/main/${blogDirPath}/${blogPath}`,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: !ENV.isDeployPreview
          ? {
              trackingID: "G-M51VQVYYQP",
              anonymizeIP: true,
            }
          : undefined,
      },
    ],
  ],

  plugins: [
    [
      require.resolve("./src/plugins/changelog/index.js"),
      {
        blogTitle: "Telegram Bot SDK changelog",
        blogDescription:
          "Keep yourself up-to-date about new features in every release",
        blogSidebarCount: "ALL",
        blogSidebarTitle: "Changelog",
        routeBasePath: "/changelog",
        showReadingTime: false,
        postsPerPage: 20,
        authorsMapPath: "authors.json",
        feedOptions: {
          type: "all",
          title: "Telegram Bot SDK changelog",
          description:
            "Keep yourself up-to-date about new features in every release",
          copyright: `Copyright © ${new Date().getFullYear()} Irfaq Syed`,
          language: ENV.defaultLocale,
        },
      },
    ],
    [
      "@docusaurus/plugin-ideal-image",
      {
        quality: 70,
        max: 1030,
        min: 640,
        steps: 2,
        disableInDev: true,
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "community",
        path: "community",
        routeBasePath: "community",
        editUrl: ({ locale, versionDocsDirPath, docPath }) =>
          locale !== ENV.defaultLocale
            ? `https://crowdin.com/project/telegram-bot-sdk/${locale}`
            : `https://github.com/${GITHUB.WEBSITE}/edit/main/${versionDocsDirPath}/${docPath}`,
        sidebarPath: require.resolve("./sidebarsCommunity.js"),
        showLastUpdateAuthor: false,
        showLastUpdateTime: true,
      },
    ],
    [
      "@docusaurus/plugin-pwa",
      {
        debug: ENV.isDeployPreview,
        offlineModeActivationStrategies: [
          "appInstalled",
          "standalone",
          "queryString",
        ],
        swCustom: require.resolve("./src/sw.js"),
        pwaHead: [
          {
            tagName: "link",
            rel: "icon",
            href: "img/favicon/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png",
          },
          {
            tagName: "link",
            rel: "manifest",
            href: "site.webmanifest",
          },
          {
            tagName: "meta",
            name: "application-name",
            content: "Telegram Bot SDK",
          },
          {
            tagName: "link",
            rel: "apple-touch-icon",
            href: "img/favicon/apple-touch-icon.png",
          },
        ],
      },
    ],
  ],

  themeConfig: {
    image: "img/social-card.jpg",
    colorMode: {
      defaultMode: "dark",
      respectPrefersColorScheme: true,
    },
    docs: {
      sidebar: {
        hideable: false,
        autoCollapseCategories: true,
      },
    },
    announcementBar: {
      id: "announcementBar_1",
      content:
        '⭐️ If you like Telegram Bot SDK, give it a star on <a target="_blank" href="https://github.com/telegram-bot-sdk/telegram-bot-sdk">GitHub</a>! ⭐️',
    },
    navbar: {
      hideOnScroll: false,
      title: "Telegram Bot SDK",
      logo: {
        alt: "Telegram Bot SDK",
        src: "img/logo.svg",
      },

      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "📖 Docs",
        },
        { to: "/blog", label: "📝 Blog", position: "left" },
        {
          to: "/community/support",
          label: "👥 Community",
          position: "left",
          activeBaseRegex: `/community/`,
        },
        {
          href: "https://github.com/telegram-bot-sdk/awesome-telegram-bots",
          label: "🤖 Showcase Bots",
          position: "left",
        },
        {
          type: "docsVersionDropdown",
          position: "right",
          dropdownActiveClassDisabled: true,
          dropdownItemsAfter: [
            {
              type: "html",
              value: '<hr class="dropdown-separator">',
            },
            {
              to: "/versions",
              label: "🗄️ All versions",
            },
          ],
        },
        {
          type: "localeDropdown",
          position: "right",
          dropdownItemsAfter: [
            {
              // Create translation issue.
              to: `https://github.com/${GITHUB.WEBSITE}/issues/123456`,
              label: "🌐 Help us translate",
            },
          ],
        },
        {
          href: `https://github.com/${GITHUB.REPO}`,
          position: "right",
          className: "header-github-link",
          "aria-label": "GitHub repository",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "📚 Learn",
          items: [
            {
              label: "👋 Introduction",
              to: "/docs",
            },
            {
              label: "🛠️ Installation",
              to: "docs/getting-started/installation",
            },
            {
              label: "🔺 Upgrade Guide",
              to: "docs/upgrade-guide",
            },
            {
              label: "📝 Blog",
              to: "/blog",
            },
          ],
        },
        {
          title: "👥 Community",
          items: [
            {
              label: "🤝 Support",
              to: "/community/support",
            },
            {
              label: "👌 Awesome Resources",
              to: "/community/resources",
            },
            {
              label: "📖 Contributing Guide",
              to: "/community/contributing",
            },
            {
              label: "💬 PHP Chat on Slack",
              href: "https://phpchat.co",
            },
            {
              label: "🐘 PHP Chat on Telegram",
              href: "https://t.me/PHPChatCo",
            },
          ],
        },
        {
          title: "➕ More",
          items: [
            {
              label: "🔄 Changelog",
              to: "/changelog",
            },
            {
              label: "🤖 Showcase Bots",
              href: "https://github.com/telegram-bot-sdk/awesome-telegram-bots",
            },
            {
              label: "🐙 GitHub (Current)",
              href: `https://github.com/${GITHUB.REPO}`,
            },
            {
              label: "🐙 GitHub (3.x)",
              href: `https://github.com/${GITHUB.FORMER_REPO}`,
            },
          ],
        },
        {
          title: "⚖️ Legal",
          items: [
            {
              label: "👮‍♀️ Code of Conduct",
              to: "/community/code-of-conduct",
            },
            {
              label: "🔒 Security Policy",
              to: "/community/security",
            },
            {
              label: "📃 License",
              to: "/license",
            },
            {
              label: "📜 Disclaimer",
              to: "/license#disclaimer",
            },
          ],
        },
      ],
      logo: {
        alt: "Telegram Bot SDK",
        src: "img/robot.png",
        href: "https://telegram-bot-sdk.com",
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
      theme: themes.github,
      darkTheme: themes.dracula,
      defaultLanguage: "php",
      additionalLanguages: ["php", "diff", "bash", "json"],
      magicComments: [
        {
          className: "theme-code-block-highlighted-line",
          line: "highlight-next-line",
          block: { start: "highlight-start", end: "highlight-end" },
        },
        {
          className: "code-block-error-line",
          line: "This will error",
        },
      ],
    },
    algolia: {
      appId: "L4ICB0MOQG",
      apiKey: "3e3d11f655b7eda59f531e8be4d2a6a1",
      indexName: "telegram-bot-sdk",
      replaceSearchResultPathname:
        ENV.isDev || ENV.isDeployPreview
          ? {
              from: /^\/docs\/next/g,
              to: "/docs",
            }
          : undefined,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 5,
    },
  },
};

export default config;
