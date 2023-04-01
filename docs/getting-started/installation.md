---
id: installation
sidebar_position: 1
---

# Installation

## Requirements {#requirements}

- PHP >=8.0
- Telegram Bot Token - Talk to [@BotFather](https://core.telegram.org/bots#how-do-i-create-a-bot) and generate one.
- Laravel >=9 (Optional)

### Obtaining Telegram Bot Token {#obtaining-telegram-bot-token}

1. Open the Telegram app and message [@BotFather](https://t.me/botfather).
2. Follow the instructions to create a new bot.
3. After creating the bot, the "BotFather" bot will give you a bot token. Keep this token safe, as you will need it to use the Telegram Bot API.

:::tip
Your **bot token** is its unique identifier – store it in a secure place, and avoid sharing with anyone or publishing your bot token anywhere. Everyone who has your token will have full control over your bot.
:::

## Installation {#installation}

Telegram Bot SDK utilizes [Composer](https://getcomposer.org/) to manage its dependencies. So, before using the SDK, make sure you have Composer installed on your machine.

Install the Telegram Bot SDK using Composer:

```bash
composer require irazasyed/telegram-bot-sdk:^3.10
```

### Laravel Setup {#laravel-setup}

Telegram Bot SDK will self-register its service provider and facade in Laravel.

#### Publish Configuration File {#publish-configuration-file}

Publish the configuration file by running this command in your terminal window:

```bash
php artisan vendor:publish --tag="telegram-config"
```
