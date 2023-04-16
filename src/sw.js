import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

export default function swCustom(params) {
  if (params.debug) {
    console.log('[Telegram-Bot-SDK-PWA][SW]: running swCustom code', params);
  }

  // Cache responses from external resources
  registerRoute(
    (context) =>
      [
        /fonts\.bunny/,
        /img\.shields/,
        /github\.com/,
        /avatars\d*\.githubusercontent/,
        /telegram-bot-sdk\.com/,
      ].some((regex) => context.url.href.match(regex)),
    new StaleWhileRevalidate(),
  );
}
