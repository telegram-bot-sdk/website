import { CodeTabs, TabPHP, TabLaravel } from '@site/src/components/CodeTabs';

# Keyboards

> One of the coolest things about Telegram Bot API are the new custom keyboards. Whenever your bot sends a message, it can pass along a special keyboard with predefined reply options. Telegram apps that receive the message will display your keyboard to the user. Tapping any of the buttons will immediately send the respective command. This way you can drastically simplify user interaction with your bot.

> Telegram currently support text and emoji for your buttons. Here are some custom keyboard examples:

<div style={{display: "flex", justifyContent: "center"}}>
    <img src="https://core.telegram.org/file/811140184/1/5YJxx-rostA/ad3f74094485fb97bd" alt="Keyboard for a poll bot" style={{maxHeight: "300px", padding: "10px 5px", margin: "0 auto"}} />
    <img src="https://core.telegram.org/file/811140880/1/jS-YSVkDCNQ/b397dfcefc6da0dc70" alt="Keyboard for a calculator bot." style={{maxHeight: "300px", padding: "10px 5px", margin: "0 auto"}} />
    <img src="https://core.telegram.org/file/811140733/2/KoysqJKQ_kI/a1ee46a377796c3961" alt="Keyboard for a trivia bot" style={{maxHeight: "300px", padding: "10px 5px", margin: "0 auto"}} />
</div>

## Keyboard Types

There are three types of keyboards:

- `ReplyKeyboardMarkup` - A regular keyboard with reply options (see above).
- `ReplyKeyboardRemove` - Removes the keyboard for the current chat.
- `InlineKeyboardMarkup` - A keyboard that appears right next to the message it belongs to.

## ReplyKeyboardMarkup

> This object represents a custom keyboard with reply options (see Introduction to bots for details and examples).

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| keyboard | Array of Array of KeyboardButton | Array of button rows, each represented by an Array of KeyboardButton objects |
| resize_keyboard | Boolean | Optional. Requests clients to resize the keyboard vertically for optimal fit (e.g., make the keyboard smaller if there are just two rows of buttons). Defaults to false, in which case the custom keyboard is always of the same height as the app's standard keyboard. |
| one_time_keyboard | Boolean | Optional. Requests clients to hide the keyboard as soon as it's been used. The keyboard will still be available, but clients will automatically display the usual letter-keyboard in the chat – the user can press a special button in the input field to see the custom keyboard again. Defaults to false. |
| selective | Boolean | Optional. Use this parameter if you want to show the keyboard to specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. Example: A user requests to change the bot‘s language, bot replies to the request with a keyboard to select the new language. Other users in the group don’t see the keyboard. |

## ReplyKeyboardRemove

> Upon receiving a message with this object, Telegram clients will remove the current custom keyboard and display the default letter-keyboard. By default, custom keyboards are displayed until a new keyboard is sent by a bot. An exception is made for one-time keyboards that are hidden immediately after the user presses a button (see ReplyKeyboardMarkup).

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| remove_keyboard | Boolean | Requests clients to remove the custom keyboard (user will not be able to summon this keyboard; if you want to hide the keyboard from sight but keep it accessible, use one_time_keyboard in ReplyKeyboardMarkup) |
| selective | Boolean | Optional. Use this parameter if you want to remove the keyboard for specific users only. Targets: 1) users that are @mentioned in the text of the Message object; 2) if the bot's message is a reply (has reply_to_message_id), sender of the original message. Example: A user votes in a poll, bot returns confirmation message in reply to the vote and removes the keyboard for that user, while still showing the keyboard with poll options to users who haven't voted yet. |

## InlineKeyboardMarkup

> This object represents an inline keyboard that appears right next to the message it belongs to.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| inline_keyboard | Array of Array of InlineKeyboardButton | Array of button rows, each represented by an Array of InlineKeyboardButton objects |

## InlineKeyboardButton

> This object represents one button of an inline keyboard. You must use exactly one of the optional fields.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | String | Label text on the button |
| url | String | Optional. HTTP or tg:// url to be opened when button is pressed |
| login_url | LoginUrl | Optional. An HTTP URL used to automatically authorize the user. Can be used as a replacement for the Telegram Login Widget. |
| callback_data | String | Optional. Data to be sent in a callback query to the bot when button is pressed, 1-64 bytes |

## KeyboardButton

> This object represents one button of the reply keyboard. For simple text buttons String can be used instead of this object to specify text of the button. Optional fields are mutually exclusive.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| text | String | Text of the button. If none of the optional fields are used, it will be sent as a message when the button is pressed |
| request_contact | Boolean | Optional. If True, the user's phone number will be sent as a contact when the button is pressed. Available in private chats only |
| request_location | Boolean | Optional. If True, the user's current location will be sent when the button is pressed. Available in private chats only |
| request_poll | KeyboardButtonPollType | Optional. If specified, the user will be asked to create a poll and send it to the bot when the button is pressed. Available in private chats only |

## KeyboardButtonPollType

> This object represents type of a poll, which is allowed to be created and sent when the corresponding button is pressed.

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| type | String | Optional. If quiz is passed, the user will be allowed to create only polls in the quiz mode. If regular is passed, only regular polls will be allowed. Otherwise, the user will be allowed to create a poll of any type. |

## LoginUrl

> This object represents a parameter of the inline keyboard button used to automatically authorize a user. Serves as a great replacement for the Telegram Login Widget when the user is coming from Telegram. All the user needs to do is tap/click a button and confirm that they want to log in:

### Properties

| Name | Type | Description |
| ---- | ---- | ----------- |
| url | String | An HTTP URL to be opened with user authorization data added to the query string when the button is pressed. If the user refuses to provide authorization data, the original URL without information about the user will be opened. The data added is the same as described in Receiving authorization data. |
| forward_text | String | Optional. New text of the button in forwarded messages. |


## Reply Keyboard Markup

The below example will send a message and automatically show a custom keyboard.
If `one_time_keyboard` is set as true, the keyboard will be shown only once.

See [ReplyKeyboardMarkup](https://core.telegram.org/bots/api#replykeyboardmarkup) docs for a list of supported parameters and other info.

Example:

<CodeTabs>
<TabPHP>


```php
$keyboard = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
         ['0']
];

$reply_markup = $telegram->replyKeyboardMarkup([
	'keyboard' => $keyboard,
	'resize_keyboard' => true,
	'one_time_keyboard' => true
]);

$response = $telegram->sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World',
	'reply_markup' => $reply_markup
]);

$messageId = $response->getMessageId();
```

</TabPHP>
<TabLaravel>


```php
$keyboard = [
    ['7', '8', '9'],
    ['4', '5', '6'],
    ['1', '2', '3'],
         ['0']
];

$reply_markup = Telegram::replyKeyboardMarkup([
	'keyboard' => $keyboard,
	'resize_keyboard' => true,
	'one_time_keyboard' => true
]);

$response = Telegram::sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World',
	'reply_markup' => $reply_markup
]);

$messageId = $response->getMessageId();
```

</TabLaravel>
</CodeTabs>

## Reply Keyboard Hide

Telegram clients will hide the current custom keyboard and display the default letter-keyboard.

See [ReplyKeyboardHide](https://core.telegram.org/bots/api#replykeyboardhide) docs for more info.

If called with no parameters, the `selective` option defaults to `false`.

<CodeTabs>
<TabPHP>

```php
$reply_markup = $telegram->replyKeyboardHide();

$response = $telegram->sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World',
	'reply_markup' => $reply_markup
]);
```

</TabPHP>
<TabLaravel>

```php
$reply_markup = Telegram::replyKeyboardHide();

$response = Telegram::sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World',
	'reply_markup' => $reply_markup
]);
```

</TabLaravel>
</CodeTabs>

## Force Reply

Shows reply interface to the user, as if they manually selected the bot‘s message and tapped ’Reply'.
See [ForceReply](https://core.telegram.org/bots/api#forcereply) docs for more info.

If called with no parameters, the `selective` option defaults to `false`.

<CodeTabs>
<TabPHP>

```php
$reply_markup = $telegram->forceReply();

$response = $telegram->sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World',
	'reply_markup' => $reply_markup
]);
```

</TabPHP>
<TabLaravel>

```php
$reply_markup = Telegram::forceReply();

$response = Telegram::sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World',
	'reply_markup' => $reply_markup
]);
```

</TabLaravel>
</CodeTabs>
