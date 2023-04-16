import CodeTabs from '@site/src/components/CodeTabs';

# 💻 Commands System

> This guide covers the basics of commands, commands structure, and handling of commands including registration and writing the command.

## 🤖 Basics of Telegram Bot Commands {#basics-of-telegram-bot-commands}

- In Telegram Bots, commands are special messages that start with a forward slash (/) and are used to trigger specific actions in your bot. Example: `/start`.

- When a user sends a command, your bot will receive an `Update` object that contains the command itself and any accompanying arguments.

## 👨‍💻 Commands Handler in SDK {#commands-handler-in-sdk}

- The SDK includes a commands system that enables you to manage all inbound commands effortlessly and efficiently.

- The Commands Handler System automatically recognizes and triggers the correct command when it detects one in an inbound message from Telegram.

- The commands are lazy loaded and processed on-demand, so registering them won't impact your application's performance.

Let's begin by writing and registering our command.

## 📝 Writing Commands {#writing-commands}

Before the Commands Handler System can start handling your inbound commands, you need to write them. To do this, you should extend the `Telegram\Bot\Commands\Command` class, which implements the `Telegram\Bot\Commands\CommandInterface` interface.

You can store your custom commands in any directory, as long as they can be autoloaded according to your `composer.json` settings and are registered correctly with the Commands Handler System.

In this guide, we will start by creating a basic `StartCommand`, which will be triggered when a user sends `/start` or when they start an interaction with your bot for the first time. From there, you will also gain an understanding of the advanced capabilities of the command system.

### 🔨 Basic Command {#basic-command}

Each command is associated with a unique name, a description, and a handle function that executes when the command is triggered.

Here's a basic command structure for you to understand how to write a simple command class for your Telegram Bot. Let's take a closer look at the properties and handler method that make up this class.

#### Required Properties and Method: {#required-properties-methods}

- `$name`: This property is a string that represents the name of the command. The name is used to identify the command when the user sends a message to the bot. In this case, the name is set to 'start,' so the command will be triggered when the user sends `/start`.

- `$description`: This property is a string that provides a brief description of the command's purpose. It is typically displayed when the user types `/help` to get a list of available commands.

- `handle()`: This method is the heart of the command and defines the action that should be executed when the command is triggered. In this case, the `handle()` method simply sends a welcome message to the user when the `/start` command is issued.

```php title="StartCommand.php"
<?php

namespace App\Telegram\Commands;

use Telegram\Bot\Commands\Command;

class StartCommand extends Command
{
    protected string $name = 'start';
    protected string $description = 'Start Command to get you started';

    public function handle()
    {
        $this->replyWithMessage([
            'text' => 'Hey, there! Welcome to our bot!',
        ]);
    }
}
```

:::tip

`replyWithMessage()` is a convenient shortcut for the `sendMessage()` method. It automatically handles the `chat_id` parameter, so you don't have to provide it. However, you can still pass any other parameters supported by `sendMessage()`. We'll go over this in more detail in the next sections.

:::

### 👥 Command Aliases {#command-aliases}

In addition to their primary names, commands can have one or multiple `$aliases` that can trigger them either internally or by the user. This allows for a command to have multiple functions and be used in various ways. For example, a command could be both a `/start` command and a `/subscribe` command.

<details>
<summary>💡 Command Aliases Example</summary>

Here's an example of a command with aliases support.

**USAGE**

- **User:** `/start` or `/subscribe`
- **Bot:** Hey, there! Welcome to our bot!

```php title="StartCommand.php"
<?php

namespace App\Telegram\Commands;

use Telegram\Bot\Commands\Command;

class StartCommand extends Command
{
    protected string $name = 'start';
    protected array $aliases = ['subscribe'];
    protected string $description = 'Start Command to get you started';

    public function handle()
    {
        $this->replyWithMessage([
            'text' => 'Hey, there! Welcome to our bot!',
        ]);
    }
}
```

</details>

## 🧮 Command Arguments {#command-arguments}

It's also possible for commands to have arguments that are passed by the user. To do this, the command must use the `$pattern` property to set a pattern for the arguments.

The pattern can be a simple term or a regular expression for more complex arguments. We will go over each of these types with examples for a better understanding.

### 🔠 Simple Argument {#simple-argument}

In this example, we include an argument specified by the `$pattern` property. The pattern is `{username}`, which specifies that the command can accept a `username` argument. If the argument is not provided, the command will fall back to using the username from the `Update` object.

We try to retrieve the argument using the `argument($name, $default)` method. The argument itself will return `null` if it isn't provided by the user or there is no match. You can use this for validation and further processing (Example: Notify the user, they need to provide the username).

Finally, we use the `replyWithMessage()` method to send a personalized welcome message to the user by addressing them with their username.

<details>
<summary>💡 Simple Argument Example</summary>

**USAGE**

- **User:** `/start johndoe`
- **Bot:** Hello johndoe! Welcome to our bot :)

```php title="StartCommand.php"
<?php

namespace App\Telegram\Commands;

use Telegram\Bot\Commands\Command;

class StartCommand extends Command
{
    protected string $name = 'start';
    protected string $pattern = '{username}';
    protected string $description = 'Start Command to get you started';

    public function handle()
    {
        # username from Update object to be used as fallback.
        $fallbackUsername = $this->getUpdate()->getMessage()->from->username;

        # Get the username argument if the user provides,
        # (optional) fallback to username from Update object as the default.
        $username = $this->argument(
            'username',
            $fallbackUsername
        );

        $this->replyWithMessage([
            'text' => "Hello {$username}! Welcome to our bot :)"
        ]);
    }
}
```

</details>

### 🧩 Regex Argument {#regex-argument}

In this example, we've defined both simple and regex pattern, for regex we've specified as `{age: \d+ }`. This regular expression will match any string of one or more digits and assign it to the `age` argument.

We retrieve the argument values using the `argument()` method. We can then notify the user needs to send the argument if it's not provided.

<details>
<summary>💡 Regex Argument Example</summary>

**USAGE**

- **User:** `/start johndoe 24`
- **Bot:** Hello johndoe! Welcome to our bot :)

```php title="StartCommand.php"
<?php

namespace App\Telegram\Commands;

use Telegram\Bot\Commands\Command;

class StartCommand extends Command
{
    protected string $name = 'start';
    protected string $pattern = '{username}
    {age: \d+}';

    protected string $description = 'Start Command to get you started';

    public function handle()
    {
        $username = $this->argument('username');
        $age = $this->argument('age');

        if(!$username) {
            $this->replyWithMessage([
                'text' => "Please provide your username! Ex: /start jasondoe"
            ]);

            return;
        }

        if(!$age) {
            $this->replyWithMessage([
                'text' => "Please provide your age with the username! Ex: /start jasondoe 24"
            ]);

            return;
        }

        $this->replyWithMessage([
            'text' => "Hello {$username}! Welcome to our bot :)"
        ]);
    }
}
```

</details>

To use the `StartCommand` class, you'll need to register it with your bot. More on this under registering commands section.

## 🛠️ Comprehensive Example {#comprehensive-example}

Here is a comprehensive example that combines all the previously demonstrated examples, along with some additional handy methods.

```php title="StartCommand.php"
<?php

namespace App\Telegram\Commands;

use Telegram\Bot\Actions;
use Telegram\Bot\Commands\Command;

/**
 * This command can be triggered in two ways:
 * /start and /join due to the alias.
 */
class StartCommand extends Command
{
    protected string $name = 'start';
    protected array $aliases = ['join'];
    protected string $description = 'Start Command to get you started';
    protected string $pattern = '{username}
    {age: \d+}';

    public function handle()
    {
        # username from Update object to be used as fallback.
        $fallbackUsername = $this->getUpdate()->getMessage()->from->username;

        # Get the username argument if the user provides,
        # (optional) fallback to username from Update object as the default.
        $username = $this->argument(
            'username',
            $fallbackUsername
        );

        $this->replyWithMessage([
            'text' => "Hello {$username}! Welcome to our bot, Here are our available commands:"
        ]);

        # This will update the chat status to "typing..."
        $this->replyWithChatAction(['action' => Actions::TYPING]);

        # Get all the registered commands.
        $commands = $this->getTelegram()->getCommands();

        $response = '';
        foreach ($commands as $name => $command) {
            $response .= sprintf('/%s - %s' . PHP_EOL, $name, $command->getDescription());
        }

        $this->replyWithMessage(['text' => $response]);

        if($this->argument('age', 0) >= 18) {
            $this->replyWithMessage(['text' => 'Congrats, You are eligible to buy premimum access to our membership!']);
        } else {
            $this->replyWithMessage(['text' => 'Sorry, you are not eligible to access premium membership yet!']);
        }
    }
}
```

## 📌 Registering Commands {#registering-commands}

Now that we've learned how to create a command, the first step is to register it. There are two ways to do this: registering through the Bot Manager in your configuration or registering on-the-fly.

For maintainability reasons, it is recommended to register all commands in the configuration file.

To learn how to register commands using the configuration file, please refer to the [Registering Multiple Bots](../getting-started/configuration.md#registering-multiple-bots) and [Registering Global Commands](../getting-started/configuration.md#registering-global-commands) sections in the [Configuration Guide](../getting-started/configuration.md). These sections will provide step-by-step instructions on how to register commands in your configuration file for multiple bots or globally, respectively.

In this guide, we'll focus on registering commands on-the-fly.

### 💬 Single Command {#single-command}

To register a single command, you can use the `addCommand()` method, which accepts either the command object or the full path to the command. The method automatically initializes the command behind the scenes, allowing you to register it seamlessly.

<CodeTabs>
<>

```php
$telegram->addCommand(Telegram\Bot\Commands\HelpCommand::class);

# OR

$command = new Telegram\Bot\Commands\HelpCommand();
$telegram->addCommand($command);
```

</>

<>

Registering Commands in Laravel is actually very easy. Simply open the `telegram.php` configuration file and add all your commands full path to the `commands` array and the SDK will take care of the rest.

Example:

```php  title="config/telegram.php"
[
    'commands' => [
        Telegram\Bot\Commands\HelpCommand::class,
        Vendor\Project\Commands\StartCommand::class,
        Vendor\Project\Commands\SettingsCommand::class,
    ]
    // ...
]
```

By default, The SDK registers a global Help Command in Laravel, But you can either choose to disable it by simply commenting out the HelpCommand line/removing it completely or Replace it with your own Help Command.

You can also register commands on-the-fly using the `addCommand()` method like in Standalone example.

```php title="On-the-Fly Registration of Commands"
Telegram::addCommand(Telegram\Bot\Commands\HelpCommand::class);

# OR

$command = new Telegram\Bot\Commands\HelpCommand();
Telegram::addCommand($command);
```

</>
</CodeTabs>

### 🔢 Multiple Commands {#multiple-commands}

To register multiple commands, you can pass an array containing all the commands to the `addCommands()` method. This method allows you to register all the commands at once, saving you time and effort.

Example:

<CodeTabs>
<>

```php
$telegram->addCommands([
    Telegram\Bot\Commands\HelpCommand::class,
    Vendor\Project\TestCommand::class,
    Vendor\Project\StartCommand::class,
]);
```

</>

<>

```php
Telegram::addCommands([
    Telegram\Bot\Commands\HelpCommand::class,
    Vendor\Project\TestCommand::class,
    Vendor\Project\StartCommand::class,
]);
```

</>
</CodeTabs>

:::note

All commands are lazy loaded.

:::


:::tip

If a user enters an invalid command that is not registered, the system will automatically search for a registered `help` command. If a `help` command is found, it will be triggered, and the default help command class will respond to the user with a list of available commands and their respective descriptions (If you rely upon the help command shipped with the SDK). This can enhance the user experience and help them navigate the available commands.

:::

## 🗑️ Removal of Commands {#removal-of-commands}

If you wish to remove a command on-the-fly, you can use either `removeCommand('command_name')` or the `removeCommands(array $commands)` method to unregister multiple commands.

## 👌 Handling Commands {#handling-commands}

To process inbound commands, you can use the `commandsHandler()` method. This method allows you to handle incoming commands and implement the necessary logic to respond to them appropriately.

By default, the method accepts a boolean value of `false`, which means that the commands should be manually processed using the `getUpdates()` method behind the scene. If you set it to `true`, it will process incoming updates sent from Telegram to your Webhook using the `getWebhookUpdate()` method.

The commands handler system scans through the incoming `Update` object to check if any registered commands match and processes them accordingly. It always returns the `Update` object, whether or not it processes the command, which can be used for further processing.

Additionally, the same `Update` object can be used to process callback queries.

Here are two examples demonstrating how to handle both scenarios.

### 📡 Using Webhook {#using-webhook}

Here's an example of using `commandsHandler()` with a registered webhook.

This is the **RECOMMENDED** way to handle inbound updates from Telegram.

<CodeTabs>
<>

```php title="webhook.php"
$update = $telegram->commandsHandler(true);
```

</>

<>

```php
Route::post('/<token>/webhook', function () {
    $update = Telegram::commandsHandler(true);

    // Commands handler method returns the Update object.
    // So you can further process $update object
    // to however you want.

    return 'ok';
});
```

:::note

When using the `commandsHandler()` method with a webhook in a Laravel application, you may encounter CSRF token verification errors. This is because Laravel's CSRF middleware by default verifies the CSRF token for all incoming HTTP POST requests, including webhook requests.

To bypass this verification for your webhook route, you can add the route path to the `$except` array in the `VerifyCsrfToken` middleware, which is located in the `app/Http/Middleware` directory. This will tell Laravel to skip CSRF token verification for that specific route.
:::

</>
</CodeTabs>

### 🔍 Using Long-Polling {#using-long-polling}

Here's an example of using `commandsHandler()` with long polling updates.

<CodeTabs>
<>

```php
$update = $telegram->commandsHandler(false, ['timeout' => 30]);
```

</>

<>

```php
$update = Telegram::commandsHandler(false, ['timeout' => 30]);
```

</>
</CodeTabs>

## 🔫 Triggering Command Manually {#triggering-command-manually}

The `triggerCommand('command_name')` method is a helper method that allows you to trigger another command within a command. This is particularly useful when you want to chain a sequence of commands together or when you want to simulate the execution of a registered command within your own command.

The `triggerCommand` method simplifies your code by automating certain tasks and improving the user experience. When called, it executes any logic associated with the command as if the user had triggered it. For example, you can automatically subscribe a user to receive alerts by triggering the `/subscribe` command within your `/start` command, as example you would call `triggerCommand('subscribe')`.

In summary, triggerCommand is a powerful tool for automating complex workflows and improving your bot's functionality.

## 📚 Available Methods {#available-methods}

| Method Name | Description |
| --- | --- |
| `getName(): string` | Get the name of the Telegram command. |
| `setName(string $name): self` | Set the name of the Telegram command. |
| `getAliases(): array` | Get the command aliases. |
| `setAliases(array\|string $aliases): self` | Set the command aliases. |
| `getDescription(): string` | Get the description of the Telegram command. |
| `setDescription(string $description): self` | Set the description of the Telegram command. |
| `argument(string $name, mixed $default = null): mixed` | Get the command argument or default value. |
| `getArguments(): array` | Get all the command arguments. |
| `setArguments(array $arguments): self` | Set the command arguments. |
| `getPattern(): string` | Get the command arguments pattern. |
| `setPattern(string $pattern): self` | Set the command arguments pattern. |
| `handle()` | Main logic of your command to handle. |
| `getTelegram(): Telegram\Bot\Api` | Get Telegram Api Instance. |
| `getUpdate(): Telegram\Bot\Objects\Update` | Returns Update object. |
| `triggerCommand(string $command): mixed` | Helper to trigger other commands. |
| `getCommandBus(): CommandBus` | Returns an instance of the command bus. |

### 🛠️ Helper Methods {#helper-methods}

The command system includes optional helper methods that can simplify your workflow and assist you in responding to the user who triggered your command in the handle method. These are simply to enhance the development experience.

:::note

The `replyWith*` methods support all `send<API Method>` parameters and come pre-populated with the `chat_id` of the command sender. You can easily pass any other method parameters as per the documentation.

:::

| Method Name | Description |
| --- | --- |
| `replyWithMessage(array $params): mixed` | Reply with a Message. |
| `replyWithPhoto(array $params): mixed` | Reply with a Photo. |
| `replyWithAudio(array $params): mixed` | Reply with a Audio message. |
| `replyWithVideo(array $params): mixed` | Reply with a Video. |
| `replyWithVoice(array $params): mixed` | Reply with a Voice message. |
| `replyWithDocument(array $params): mixed` | Reply with a Document. |
| `replyWithSticker(array $params): mixed` | Reply with a Sticker. |
| `replyWithLocation(array $params): mixed` | Reply with a Location. |
| `replyWithChatAction(array $params): mixed` | Reply with a Chat Action. |
