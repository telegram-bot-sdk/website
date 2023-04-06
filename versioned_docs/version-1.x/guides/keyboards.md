import CodeTabs from '@site/src/components/CodeTabs';

# Keyboards

> One of the coolest things about Telegram Bot API are the new custom keyboards. Whenever your bot sends a message, it can pass along a special keyboard with predefined reply options. Telegram apps that receive the message will display your keyboard to the user. Tapping any of the buttons will immediately send the respective command. This way you can drastically simplify user interaction with your bot.

> Telegram currently support text and emoji for your buttons. Here are some custom keyboard examples:

<div style={{display: "flex", justifyContent: "center"}}>
    <img src="https://core.telegram.org/file/811140184/1/5YJxx-rostA/ad3f74094485fb97bd" alt="Keyboard for a poll bot" style={{maxHeight: "300px", padding: "10px 5px", margin: "0 auto"}} />
    <img src="https://core.telegram.org/file/811140880/1/jS-YSVkDCNQ/b397dfcefc6da0dc70" alt="Keyboard for a calculator bot." style={{maxHeight: "300px", padding: "10px 5px", margin: "0 auto"}} />
    <img src="https://core.telegram.org/file/811140733/2/KoysqJKQ_kI/a1ee46a377796c3961" alt="Keyboard for a trivia bot" style={{maxHeight: "300px", padding: "10px 5px", margin: "0 auto"}} />
</div>

## Reply Keyboard Markup

The below example will send a message and automatically show a custom keyboard.
If `one_time_keyboard` is set as `true`, the keyboard will be shown only once.

See [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) docs for a list of supported parameters and other info.

Example:
<CodeTabs>
<>

```php
$keyboard = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0']
];

$reply_markup = $telegram->replyKeyboardMarkup($keyboard, true, true);

$response = $telegram->sendMessage('CHAT_ID', 'Hello World', false, null, $reply_markup);

$messageId = $response->getMessageId();
```

</>

<>

```php
$keyboard = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
    ['0']
];

$reply_markup = Telegram::replyKeyboardMarkup($keyboard, true, true);

$response = Telegram::sendMessage('CHAT_ID', 'Hello World', false, null, $reply_markup);

$messageId = $response->getMessageId();
```

</>
</CodeTabs>

## Reply Keyboard Hide

Telegram clients will hide the current custom keyboard and display the default letter-keyboard.
See [ReplyKeyboardHide](https://core.telegram.org/bots/api#replykeyboardhide) docs for more info.

If called with no parameters, the `selective` option defaults to `false`.

<CodeTabs>
<>

```php
$reply_markup = $telegram->replyKeyboardHide();

$response = $telegram->sendMessage('CHAT_ID', 'Hello World', false, null, $reply_markup);
```

</>

<>

```php
$reply_markup = Telegram::replyKeyboardHide();

$response = Telegram::sendMessage('CHAT_ID', 'Hello World', false, null, $reply_markup);
```

</>
</CodeTabs>

## Force Reply

Shows reply interface to the user, as if they manually selected the bot‘s message and tapped ’Reply'.
See [ForceReply](https://core.telegram.org/bots/api#forcereply) docs for more info.

If called with no parameters, the `selective` option defaults to `false`.

<CodeTabs>
<>

```php
$reply_markup = $telegram->forceReply();

$response = $telegram->sendMessage('CHAT_ID', 'Hello World', false, null, $reply_markup);
```

</>

<>

```php
$reply_markup = Telegram::forceReply();

$response = Telegram::sendMessage('CHAT_ID', 'Hello World', false, null, $reply_markup);
```

</>
</CodeTabs>
