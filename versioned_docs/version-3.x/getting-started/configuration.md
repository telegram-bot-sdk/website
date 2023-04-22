---
sidebar_position: 3
---

# 📋 Configuration Guide

import CodeTabs from '@site/src/components/CodeTabs';

## 🔧 Bot Manager - Configuration Options {#bot-manager-configuration-options}

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| [`bots`](#registering-multiple-bots) | array | `[] ` | You may use multiple bots at once using the manager class. Each bot that you own should be configured here. |
| `default` | string | `''` | Here you may specify which of the bots you wish to use as your default bot for regular use. |
| [`async_requests`](#async-requests) | bool _(optional)_ | `false` | When set to `true`, All the requests would be made non-blocking (Async). |
| [`http_client_handler`](#http-client-handler) | string _(optional)_ | `GuzzleHttpClient` | Path to custom HTTP Client Handler which should be an instance of `\Telegram\Bot\HttpClients\HttpClientInterface`. |
| [`base_bot_url`](#base-bot-url) | string _(optional)_ | `https://bot.telegram.org/api` | If you'd like to use a custom Base Bot Url. Should be a local bot api endpoint or a proxy to the telegram api endpoint. |
| [`resolve_command_dependencies`](#resolve-command-dependencies) | bool _(optional)_ | `true` <br /> _(Laravel)_ | With the help of dependency injection container, we can easily specify dependencies in our command's constructor and have them resolved automatically, and in Laravel, it uses its IoC container by default. |
| [`commands`](#registering-global-commands) | array _(optional)_ | `[] ` | If you'd like to use the SDK's built in commands handler system, you can register all the global commands here. Global commands will apply to all the bots in system and are always active.<br /><br /> The command class should extend the `Telegram\Bot\Commands\Command` class. <br /><br /> Default: The SDK registers, a `help` command which when a user sends `/help` will respond with a list of available commands and description or upon no commands are found. |
| [`command_groups`](#grouping-commands) | array _(optional)_ | `[] ` | You can organize a set of commands into groups which can later, be re-used across all your bots. <br /><br />You can create 4 types of groups: <br /> **1.** Group using full path to command classes. <br /> **2.** Group using shared commands: Provide the key name of the shared command and the system will automatically resolve to the appropriate command. <br /> **3.** Group using other groups of commands: You can create a group which uses other groups of commands to bundle them into one group. <br /> **4.** You can create a group with a combination of 1, 2 and 3 all together in one group. |
| [`shared_commands`](#shared-commands) | array _(optional)_ | `[] ` | Shared commands let you register commands that can be shared between, one or more bots across the project. <br /><br /> This will help you prevent from having to register same set of commands, for each bot over and over again and make it easier to maintain them. <br /><br /> Shared commands are not active by default, You need to use the key name to register them, individually in a group of commands or in bot commands. <br /><br /> Think of this as a central storage, to register, reuse and maintain them across all bots. |


Let's explore these configuration options in-depth with some examples.

## 🤖 Registering Multiple Bots {#registering-multiple-bots}

You may use multiple bots at once using the bots manager class. Each bot that you own should be configured in the `bots` option as an associative array of `botname` and `botconfig`. For each `botname`, you can set the following parameters:


| Option | Type | Description |
| --- | --- | --- |
| `token` | string | Your Telegram Bot's Token. |
| `certificate_path` | string _(optional)_ | The path to your SSL certificate. |
| `webhook_url` | string _(optional)_ | Your bot's webhook URL. If you wish to use webhook **(recommended)** |
| `commands` | array _(optional)_ | Commands to register for this bot, <br /> **Supported:** "Command Group Name", "Shared Command Name", "Full Path to Class". <br /> **Default:** Registers Global Commands.|

For example, to configure two bots named "mybot" and "anotherbot", you would use the following syntax:

```php
[
    'bots' => [
        'mybot' => [
            'token'       => '123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11',
            'webhook_url' => 'https://domain.com/telegram/webhook',
            'commands'    => [
                App\Telegram\Commands\StartCommand::class,
            ],
        ],

        'anotherbot' => [
            'token' => '654321:DEF-GHI5678jkL-mno34pqr9stu456vwx',
            'commands' => ['admin', 'help', 'info'],
        ],

        'default' => 'mybot'
    ]
];
```

👉 In this example, `mybot` is configured with a bot token and a local command "start", while `anotherbot` is configured with a different bot token and three different commands ("admin", "help", and "info") from the shared commands array. We're also setting `mybot` as the `default` bot for regular use.

To make requests with a specific bot, you can use the `bot()` method with the bot's name as an argument:

<CodeTabs>
<>

```php
$response = $telegram->bot('mybot')->getMe();
```

</>
<>

```php
$response = Telegram::bot('mybot')->getMe();
```

</>
</CodeTabs>

If the `bot()` method is not used, API requests will be made for the default selected bot. For instance, the following request will be made for the `mybot`:

<CodeTabs>
<>

```php
$response = $telegram->getMe();
```

</>
<>

```php
$response = Telegram::getMe();
```

You can make use of the `Telegram\Bot\Laravel\Facades\Telegram` Facade to make API requests.

Example:

```php
use Telegram\Bot\Laravel\Facades\Telegram;

$response = Telegram::bot('mybot')->getMe();
```

</>
</CodeTabs>


## 🔁 Async Requests {#async-requests}

By default, all requests made with the SDK are blocking (sync), meaning that the script execution will wait for the response before continuing. You can make requests non-blocking (async) by setting the `async_requests` configuration option to `true`.

```php
[
    'async_requests' => true,
    // ...
];
```

👉 In this example, we're enabling async requests that is applicable for all the bots.

## 🚚 HTTP Client Handler {#http-client-handler}

By default, the SDK uses the [GuzzleHttpClient](https://github.com/irazasyed/telegram-bot-sdk/blob/3.x/src/HttpClients/GuzzleHttpClient.php) an implementation of [GuzzlePHP](https://docs.guzzlephp.org/en/stable/index.html) handler. However, you can use a custom HTTP client handler by setting the `http_client_handler` configuration option to the path of the handler class. The handler class must implement the `\Telegram\Bot\HttpClients\HttpClientInterface` interface.

```php
[
    'http_client_handler' => App\CustomHttpClient::class,
    // ...
];
```

👉 In this example, we're using a custom HTTP client handler named `CustomHttpClient`.

## 🌐 Base Bot URL {#base-bot-url}

By default, the SDK uses the official Telegram API endpoint as the base URL for all API requests. However, you can use a custom base URL by setting the `base_bot_url` configuration option to the URL of your custom endpoint, which is particularly helpful if the official endpoint is blocked in your country.

```php
[
    'base_bot_url' => 'http://mycustomurl.com/api',
    // ...
];
```

## 🔗 Resolve Command Dependencies {#resolve-command-dependencies}

With the help of dependency injection container, we can easily specify dependencies in our command's constructor and have them resolved automatically, and in Laravel, it uses its IoC container by default.

<CodeTabs>
<>

Standalone developers have this option disabled by default, but it can be enabled by setting the option in the configuration and providing a PSR-11 compliant container implementation to the `BotsManager`.

For example, if you want to use Laravel's container, you can include the `illuminate/container` package as a dependency in your project and then set it as the container for the BotsManager:

```php
$config = [
    'resolve_command_dependencies' => true,
    // ...
];

$telegram = new BotsManager($config);
$telegram->setContainer(new \Illuminate\Container\Container());
```

</>
<>

In Laravel, The SDK automatically resolves dependencies for your bot commands using Laravel's IoC container by default. To disable this behavior, you can set the `resolve_command_dependencies` option to `false`.

```php title="config/telegram.php"
[
    'resolve_command_dependencies' => false,
    // ...
];
```

</>
</CodeTabs>

## 📜 Registering Global Commands {#registering-global-commands}

Global commands are commands that are registered for all bots in the system and are always active. You can register global commands using the `commands` configuration option. Here is an example:

```php
[
    'commands' => [
        App\Telegram\Commands\HelpCommand::class,
        App\Telegram\Commands\StartCommand::class,
        // ...
    ],
    // ...
]
```

👉 In this example, we are registering two commands: `App\Telegram\Commands\HelpCommand` and `App\Telegram\Commands\StartCommand`. These commands will be active for ALL bots in the system.

:::info
For a more comprehensive understanding of commands, please refer to the [Commands System](../guides/commands-system.md) guide, which provides detailed information on the topic.
:::

## 👨‍💻 Grouping Commands [Advanced] {#grouping-commands}

You can organize a set of commands into groups which can later be reused across all your bots. This feature helps bot developers to manage common bot commands across multiple bots and maintain them more efficiently.

You can create 4 types of groups:

### 📚 1. Group using full path to command classes {#group-using-full-path-command-classes}

> In this type of group, you can provide an array of command class names to create a group. Here is an example:

```php
[
    'command_groups' => [
        'my_commands' => [
            App\Telegram\Commands\HelpCommand::class,
            App\Telegram\Commands\StartCommand::class,
            // ...
        ],
        // ...
    ],
    // ...
]
```

👉 In this example, we are creating a group called `my_commands` which includes the `HelpCommand` and `StartCommand`. Whenever we need these two commands, we just include the `my_commands` key into the `commands` option of the bot config.


### 🤝 2. Group using shared commands {#group-using-shared-commands}

> In this type of group, you can provide an array of shared command names to create a group. Here is an example:

```php
[
    'shared_commands' => [
        'greeting' => App\Telegram\Commands\GreetingCommand::class,
        'farewell' => App\Telegram\Commands\FarewellCommand::class,
        // ...
    ],
    'command_groups' => [
        'greeting_and_farewell' => [
            'greeting',
            'farewell',
            // ...
        ],
        // ...
    ],
    // ...
]
```

👉 In this example, we are creating a group called `greeting_and_farewell` which includes two shared commands: `greeting` and `farewell`. The shared commands themselves are defined in the `shared_commands` array.


### 🖇️ 3. Group using other groups of commands {#group-using-other-groups-commands}

> In this type of group, you can provide an array of other command groups to create a group. Here is an example:

```php
[
    'command_groups' => [
        'my_commands' => [
            'greeting_and_farewell',
            App\Telegram\Commands\StartCommand::class,
            // ...
        ],
        'greeting_and_farewell' => [
            'greeting',
            'farewell',
            // ...
        ],
        // ...
    ],
    // ...
]
```

👉 In this example, we are creating a group called `my_commands` which includes another group called `greeting_and_farewell` along with the `StartCommand`.


### 💬 4. Group with a combination of the above three {#group-combination-above-three}

> In this type of group, you can create a group with a combination of the above three types. You can register shared commands, groups, and command classes altogether in a single group. Here is an example:

```php
[
    'shared_commands' => [
        'greeting' => App\Telegram\Commands\GreetingCommand::class,
        // ...
    ],
    'command_groups' => [
        'my_commands' => [
            'greeting_and_farewell',
            'other_commands',
            App\Telegram\Commands\StopCommand::class,
            // ...
        ],
        'greeting_and_farewell' => [
            'greeting',
            'farewell',
            App\Telegram\Commands\StartCommand::class,
            // ...
        ],
        'other_commands' => [
            App\Telegram\Commands\InfoCommand::class,
            // ...
        ]
        // ...
    ]
]
```

👉 In this example, we have defined a shared command called `greeting`. Then, we have created a group called `greeting_and_farewell` that includes the `greeting` command, a `farewell` command, and a `StartCommand` class.

Next, we created another group called `other_commands` which includes an `InfoCommand` class.

Finally, we created a group called `my_commands` that includes the `greeting_and_farewell` group, the `other_commands` group, and a `StopCommand` class. This way, we can reuse these groups across multiple bots and make it easier to manage the commands.

:::info
Although it may appear intricate, this feature is intentionally designed to simplify your workflow and enable seamless management of multiple bots utilizing the same codebase.
:::

## 🤝 Shared Commands {#shared-commands}

Shared commands let you register commands that can be shared between, one or more bots across the project.

This will help you prevent from having to register same set of commands, for each bot over and over again and make it easier to maintain them.

Shared commands are not active by default, You need to use the key name to register them, individually in a group of commands or in bot commands.

Think of this as a central storage, to register, reuse and maintain them across all bots.

You can register commands that can be shared between multiple bots by using the `shared_commands` option in the config file.

```php
[
    'shared_commands' => [
        'admin' => App\Telegram\Commands\AdminCommand::class,
        'info' => App\Telegram\Commands\InfoCommand::class,
    ],
    // ...
];
```

Examples on how to use shared commands are already provided in [grouping commands using shared commands](#group-using-shared-commands) and [registering multiple bots](#registering-multiple-bots) section for a better understanding.

That's it! You're now ready to configure your Telegram Bot SDK and start building your Telegram Bot. Happy coding! 🎉
