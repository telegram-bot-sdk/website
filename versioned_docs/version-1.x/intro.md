---
slug: /
sidebar_position: 1
---
import DocsHeroImg from '@site/src/components/DocsHeroImg';
import ShowcaseCTA from '@site/src/components/ShowcaseCTA';

# Introduction

<DocsHeroImg />

> This page will help you get started with Telegram Bot SDK. You'll be up and running in a jiffy!

## Overview

Telegram Bot API is an HTTP-based interface created for developers keen on building bots for Telegram.

To learn how to create and set up a bot, please consult the [Introduction to Bots](https://core.telegram.org/bots) and [Bot FAQ](https://core.telegram.org/bots/faq) on official Telegram site.

## Telegram Bot API - PHP SDK

This is an Unofficial [Telegram Bot API](https://core.telegram.org/bots) SDK for **PHP** language. Lets you develop Telegram Bots easily! Supports Laravel out of the box.

Please review the official [documentation](https://core.telegram.org/bots/api) of [Telegram Bot API](https://core.telegram.org/bots) to understand the usage better.

# Requirements
* PHP 5.5+
* Composer
* Telegram Bot API Access Token - Talk to [@BotFather](https://core.telegram.org/bots#botfather) and generate one.
- Laravel 5 or Lumen Installation (Optional only if you want to use with either of these frameworks).

# Installation

The recommended way to install the SDK is with [Composer](http://getcomposer.org/). Composer is a dependency management tool for PHP that allows you to declare the dependencies your project needs and installs them into your project.

```sh
curl -sS https://getcomposer.org/installer | php
```

You can add the SDK as a dependency using the composer.phar CLI:

```sh
php composer.phar require irazasyed/telegram-bot-sdk ^1.0
```

Or if you already have composer installed globally, then simply execute:

```sh
composer require irazasyed/telegram-bot-sdk ^1.0
```

Alternatively, you can specify the SDK as a dependency in your project's existing `composer.json` file:

```json title="composer.json"
{
    "require": {
        "irazasyed/telegram-bot-sdk": "^1.0"
    }
}
```

After installing, you need to require Composer's autoloader if you want to use the library standalone:

```php
require_once 'vendor/autoload.php';
```

You can find out more on how to install Composer, configure autoloading, and other best-practices for defining dependencies at [getcomposer.org](https://getcomposer.org).

## Laravel Additional Steps

If you're using Laravel and would like to use the SDK with it, then follow the below instructions. Otherwise, you can skip this part.

## Step 1: Add the Service Provider

Open `config/app.php` and, to your `providers` array at the bottom, add:

```php title="config/app.php"
Telegram\Bot\Laravel\TelegramServiceProvider::class,
```

## Step 2: Add Facade (Optional)

Optionally add an alias to make it easier to use the library. Open `config/app.php` and, to your "aliases" array at the bottom, add:

```php title="config/app.php"
'Telegram' => Telegram\Bot\Laravel\Facades\Telegram::class,
```

## Step 3: Publish Configuration File

Open your terminal window and fire the following command to publish config file to your config directory:

```sh
php artisan vendor:publish --provider="Telegram\Bot\Laravel\TelegramServiceProvider"
```

OR

```sh
php artisan vendor:publish
```

The former command publishes config file for just this package and the latter publishes vendor config files for other packages too. Depending on what you want to do, you can use any (Doesn't really matter).

<ShowcaseCTA />

:::tip

The library takes advantage of the amazing Laravel Collection API to automatically map the data.

So it's a lot easier to work with the array of data. Supports all the methods listed on the [official docs](http://laravel.com/docs/master/collections).

Any issues, feedback, suggestions or questions please use issue tracker [here](https://github.com/irazasyed/telegram-bot-sdk/issues).

:::
