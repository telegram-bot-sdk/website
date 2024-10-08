---
id: installation
sidebar_position: 1
---

# Installation

## Requirements

- PHP >=5.6
- Telegram Bot API Token - Talk to [@BotFather](https://core.telegram.org/bots#6-botfather) and generate one
- Laravel >=5 (Optional)

## Installation

Telegram Bot SDK utilizes [Composer](https://getcomposer.org/) to manage its dependencies. So, before using the SDK, make sure you have Composer installed on your machine.

Install the Telegram Bot SDK using Composer:

```bash
composer require irazasyed/telegram-bot-sdk:^2.0
```

### Laravel Setup

Telegram Bot SDK will self-register its service provider and facade in Laravel >=5.5.

#### Laravel < 5.5

If you're using Laravel `<5.5`, you'll manually have to register the service provider and facade.

#### Service Provider

```php
Telegram\Bot\Laravel\TelegramServiceProvider::class,
```

#### Facade (Optional)

```php
'Telegram' => Telegram\Bot\Laravel\Facades\Telegram::class,
```

#### Publish Configuration File

Publish the configuration file by running this command in your terminal window:

```bash
php artisan vendor:publish --provider="Telegram\Bot\Laravel\TelegramServiceProvider"
```
