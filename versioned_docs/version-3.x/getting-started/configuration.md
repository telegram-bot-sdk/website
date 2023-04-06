# 📋 Configuration Guide

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

Open the `config/telegram.php` configuration file and set the `bot_token` with your Telegram Bot Token or you can also set an environment variable `TELEGRAM_BOT_TOKEN` with the appropriate value.

In Laravel, you don't have to initilize the SDK as its taken care for you in the service provider and ships with multibot support by default.

</>
</CodeTabs>

You can now get started to write your Telegram Bot.

Refer the below table to know more about the available options with detailed information.

## 🔧 Bots Manager - Configuration Options {#bots-manager-configuration-options}

| Option | Type | Description |
| --- | --- | --- |
| `bots` | array | You may use multiple bots at once using the manager class. Each bot that you own should be configured here. |
| `default` | string | Here you may specify which of the bots you wish to use as your default bot for regular use. |
| `async_requests` | bool _(optional)_ | Default: `false`. When set to True, All the requests would be made non-blocking (Async). |
| `http_client_handler` | string _(optional)_ | Default: `GuzzlePHP`. Path to HTTP Client Handler, If you'd like to use a custom HTTP Client Handler. Should be an instance of `\Telegram\Bot\HttpClients\HttpClientInterface`. |
| `base_bot_url` | string _(optional)_ | If you'd like to use a custom Base Bot Url. Should be a local bot api endpoint or a proxy to the telegram api endpoint. |
| `resolve_command_dependencies` | bool _(optional)_ | Default: `true`. Using Laravel's IoC container, we can easily type hint dependencies in our command's constructor and have them automatically resolved for us. |
| `commands` | array _(optional)_ | If you'd like to use the SDK's built in commands handler system, you can register all the global commands here. Global commands will apply to all the bots in system and are always active.<br /><br /> The command class should extend the `Telegram\Bot\Commands\Command` class. <br /><br /> Default: The SDK registers, a `help` command which when a user sends /help will respond with a list of available commands and description. |
| `command_groups` | array _(optional)_ | You can organize a set of commands into groups which can later, be re-used across all your bots. <br /><br />You can create 4 types of groups: <br /> **1.** Group using full path to command classes. <br /> **2.** Group using shared commands: Provide the key name of the shared command and the system will automatically resolve to the appropriate command. <br /> **3.** Group using other groups of commands: You can create a group which uses other groups of commands to bundle them into one group. <br /> **4.** You can create a group with a combination of 1, 2 and 3 all together in one group. |
| `shared_commands` | array _(optional)_ | Shared commands let you register commands that can be shared between, one or more bots across the project. <br /><br /> This will help you prevent from having to register same set of commands, for each bot over and over again and make it easier to maintain them. <br /><br /> Shared commands are not active by default, You need to use the key name to register them, individually in a group of commands or in bot commands. <br /><br /> Think of this as a central storage, to register, reuse and maintain them across all bots. |


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
]
```

In this example, "mybot" is configured with a bot token and a local command "start", while "anotherbot" is configured with a different bot token and three different commands ("admin", "help", and "info") from the shared commands array.

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

👉 In this example, we are registering two commands: `App\Telegram\Commands\HelpCommand` and `App\Telegram\Commands\StartCommand`. These commands will be active for all bots in the system.

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
