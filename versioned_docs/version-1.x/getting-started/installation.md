import CodeTabs from '@site/src/components/CodeTabs';
import TabItem from '@theme/TabItem';

# Installation

All the methods listed on [Telegram Bot API](https://core.telegram.org/bots/api) page are fully supported by this SDK.

## Standalone Setup

In order to use the library in your project, You need to install the SDK with Composer. Refer the [Getting Started](doc:getting-started) page for more details on how to install with Composer and autoload in your project.

## Initialize Library

The first​ step is to initialize the library. Once you do that, You'll get access to all the available API Methods to make requests to Telegram.

```php title="Standalone"
use Telegram\Bot\Api;

$telegram = new Api('YOUR_BOT_TOKEN');
```

## Laravel Setup

Open `telegram.php` the configuration file in `config` directory and set the `bot_token` with your Telegram's Bot Access Token or you could also set environment variable `TELEGRAM_BOT_TOKEN` with the appropriate value.
Refer the configuration file for other default configuration settings.

## Config Overview

Open the config file for detailed comments for each option.

Set your Telegram Bot Access Token in `bot_token` key **[REQUIRED]**

```php title="telegram.php"
'bot_token' => '1234:ABCD'
```

All other configs are optional, use as per your requirements.

## Test Bot

A simple method for testing your bot's auth token.
Returns basic information about the bot in form of a User object.

See [getMe](https://core.telegram.org/bots/api#getme) docs for more details.

<CodeTabs>
<TabItem value="standalone">

```php
$response = $telegram->getMe();

$botId = $response->getId();
$firstName = $response->getFirstName();
$username = $response->getUsername();
```

</TabItem>

<TabItem value="laravel">

```php
$response = Telegram::getMe();

$botId = $response->getId();
$firstName = $response->getFirstName();
$username = $response->getUsername();
```

</TabItem>
</CodeTabs>
