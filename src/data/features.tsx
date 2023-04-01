import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';

export type FeatureItem = {
  title: string;
  image: {
    src: string;
  };
  text: JSX.Element;
};

const FEATURES: FeatureItem[] = [
  {
    title: translate({
      message: 'Multi-Bot Support',
      id: 'homepage.features.multi-bot-support.title',
    }),
    image: {
      src: '/img/multibots.png'
    },
    text: (
      <Translate id="homepage.features.multi-bot-support.text">
        Effortlessly manage multiple bots like a pro with Telegram Bot SDK's multi-bot support - no juggling required ^_^
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'Commands Handler',
      id: 'homepage.features.commands-handler.title',
    }),
    image: {
      src: '/img/telegram-bot-sdk-commands-handler.png'
    },
    text: (
      <Translate id="homepage.features.commands-handler.text">
        Craft awe-inspiring commands, hassle-free! Thanks to Telegram Bot SDK's easy command handler.
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'Events & Plugins',
      id: 'homepage.features.events-plugins.title',
    }),
    image: {
      src: '/img/telegram-bot-sdk-plugin-support.png'
    },
    text: (
      <Translate id="homepage.features.events-plugins.text">
        Level up your bot with events & plugins support!
        Enhance and extend features to your heart's content, and take your bot to new heights!
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'Feature Rich',
      id: 'homepage.features.feature-rich.title',
    }),
    image: {
      src: '/img/feature-rich.png'
    },
    text: (
      <Translate id="homepage.features.feature-rich.text">
        Telegram Bot SDK is the ultimate powerhouse of features,
        packed with everything you need to create a dynamic and engaging bot!
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'Laravel Support',
      id: 'homepage.features.laravel-support.title',
    }),
    image: {
      src: '/img/Laravel-Logo.png'
    },
    text: (
      <Translate id="homepage.features.laravel-support.text">
        Laravel enthusiasts, rejoice!
        Telegram Bot SDK comes equipped with built-in support for your favorite framework!
      </Translate>
    ),
  },
  {
    title: translate({
      message: 'Recommended By Telegram',
      id: 'homepage.features.recommended-by-telegram.title',
    }),
    image: {
      src: '/img/Telegram-Logo.png'
    },
    text: (
      <Translate id="homepage.features.recommended-by-telegram.text">
        Telegram Bot SDK for PHP is proudly recommended by Telegram
      </Translate>
    ),
  },
];

export default FEATURES;
