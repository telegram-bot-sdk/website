---
id: initialize
sidebar_position: 2
---

# 🎬 Initilize SDK

import CodeTabs from '@site/src/components/CodeTabs';

Before you can start building a Telegram Bot, you need to configure Telegram Bot SDK with your Bot Token that was provided by BotFather. Once you do that, you'll get access to all the available Bot API Methods to make requests to the Telegram Bot API.

<CodeTabs>
<>

Here is how you can quickly set up and initialize a single bot operation:

```php
require __DIR__.'/vendor/autoload.php';

use Telegram\Bot\Api;

$telegram = new Api('YOUR BOT TOKEN');

// Example usage
$response = $telegram->getMe();
```

### 🦾 Managing Multiple Bots {#managing-multiple-bots}

If you want to manage multiple bots, you can take advantage of the `BotsManager` like this:

```php
use Telegram\Bot\BotsManager;

$config = [
    'bots' => [
        'mybot' => [
            'token' => '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
        ],
    ]
];

$telegram = new BotsManager($config);

// Example usage
$response = $telegram->bot('mybot')->getMe();
```

:::tip
FYI, `$config` can get large when handling multiple configurations. To avoid problems, create a dedicated file like `config.php` and require it in your code to return the array separately. You can use SDK's Laravel [config](https://github.com/irazasyed/telegram-bot-sdk/blob/3.x/src/Laravel/config/telegram.php) file as a starting point.
:::

</>
<>

Open the `config/telegram.php` configuration file and set the `token` with your Telegram Bot Token or you can also set an environment variable `TELEGRAM_BOT_TOKEN` with the appropriate value.

In Laravel, you don't have to initilize the SDK as its taken care for you in the service provider and ships with multibot support by default.

You can make use of the `Telegram\Bot\Laravel\Facades\Telegram` Facade to make API requests.

Example:

```php
use Telegram\Bot\Laravel\Facades\Telegram;

$response = Telegram::bot('mybot')->getMe();
```

</>
</CodeTabs>

:::info

The configuration guide provides further information on how to [register multiple bots](./configuration.md#registering-multiple-bots).

:::

You can now get started to write your Telegram Bot.

Refer the [configuration guide](./configuration.md) to know more about the available options with detailed information.
