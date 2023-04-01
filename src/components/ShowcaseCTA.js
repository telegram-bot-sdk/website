import React from 'react';
import Admonition from '@theme/Admonition';

export default function ShowcaseCTA() {
  return (
    <>
      <Admonition type="info" icon="💡" title="Attention">
        <h2>Are You Using Telegram Bot SDK?</h2>
        <p>
          If you're using this SDK to build your Telegram Bots or have a project that's relevant to this SDK, We'd love to know and share it with the world.
        </p>
        <p>
          Head over to <a href="https://github.com/telegram-bot-sdk/awesome-telegram-bots" title="Awesome Telegram Bots">Awesome Telegram Bots</a > to share, discover, and learn more.
        </p>
      </Admonition>
    </>
  );
}
