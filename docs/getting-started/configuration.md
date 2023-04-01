# Configuration

Before you can start building a Telegram Bot, you need to configure Telegram Bot SDK with your Bot Token that was provided by BotFather. Once you do that, you'll get access to all the available Bot API Methods to make requests to the Telegram Bot API.

## Standalone {#standalone}

```php
require __DIR__.'/vendor/autoload.php';

use Telegram\Bot\Api;

$telegram = new Api('YOUR BOT TOKEN');
```

## Laravel {#laravel}

Open the `config/telegram.php` configuration file and set the `bot_token` with your Telegram Bot Token or you can also set an environment variable `TELEGRAM_BOT_TOKEN` with the appropriate value.

Refer the configuration file to know more about the available options with detailed information.

In Laravel, you don't have to initilize the SDK as its taken care for you in the service provider. You can now get started to write your Telegram Bot.
