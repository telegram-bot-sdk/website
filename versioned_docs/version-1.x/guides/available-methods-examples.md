import { CodeTabs, TabPHP, TabLaravel } from '@site/src/components/CodeTabs';

# Available Methods & Examples

:::info Available Methods
The library supports all the methods listed on Telegram Bot API docs [page](https://core.telegram.org/bots/api#available-methods).
:::

## sendMessage - Send a Message

See [sendMessage](https://core.telegram.org/bots/api#sendmessage) docs for a list of supported parameters and other info.

<CodeTabs>
<TabPHP>

```php
$response = $telegram->sendMessage('CHAT_ID', 'Hello World');
$messageId = $response->getMessageId();
```

</TabPHP>
<TabLaravel>

```php
$response = Telegram::sendMessage('CHAT_ID', 'Hello World');
$messageId = $response->getMessageId();
```

</TabLaravel>
</CodeTabs>

## forwardMessage - Forward a Message

See [forwardMessage](https://core.telegram.org/bots/api#forwardmessage) docs for a list of supported parameters and other info.

<CodeTabs>
<TabPHP>

```php
$response = $telegram->forwardMessage('CHAT_ID', 'FROM_CHAT_ID', 'MESSAGE_ID');
$messageId = $response->getMessageId();
```

</TabPHP>
<TabLaravel>

```php
$response = Telegram::forwardMessage('CHAT_ID', 'FROM_CHAT_ID', 'MESSAGE_ID');
$messageId = $response->getMessageId();
```

</TabLaravel>
</CodeTabs>

## sendPhoto - Send a Photo

See [sendPhoto](https://core.telegram.org/bots/api#sendphoto) docs for a list of supported parameters and other info.

<CodeTabs>
<TabPHP>

```php
$response = $telegram->sendPhoto('CHAT_ID', 'path/to/photo.jpg', 'Some caption');
$messageId = $response->getMessageId();
```

</TabPHP>
<TabLaravel>

```php
$response = Telegram::sendPhoto('CHAT_ID', 'path/to/photo.jpg', 'Some caption');
$messageId = $response->getMessageId();
```

</TabLaravel>
</CodeTabs>

## sendChatAction - Send a Chat Action

See [sendChatAction](https://core.telegram.org/bots/api#sendchataction) docs for a list of supported actions and other info.

<CodeTabs>
<TabPHP>

```php
$response = $telegram->sendChatAction('CHAT_ID', 'typing');
$messageId = $response->getMessageId();
```

</TabPHP>
<TabLaravel>

```php
$response = Telegram::sendChatAction('CHAT_ID', 'typing');
$messageId = $response->getMessageId();
```

</TabLaravel>
</CodeTabs>

There is also a helper method for supplying the chat action. This is especially useful with code completion with your IDE.

```php
$telegram->sendChatAction('CHAT_ID', Actions::RECORD_VIDEO);
```

## getUserProfilePhotos - Get User Profile Photos

See [getUserProfilePhotos](https://core.telegram.org/bots/api#getuserprofilephotos) docs for a list of supported parameters and other info.

<CodeTabs>
<TabPHP>

```php
$response = $telegram->getUserProfilePhotos('USER_ID');

$photos_count = $response->getTotalCount();
$photos = $response->getPhotos();
```

</TabPHP>
<TabLaravel>

```php
$response = Telegram::getUserProfilePhotos('USER_ID');

$photos_count = $response->getTotalCount();
$photos = $response->getPhotos();
```

</TabLaravel>
</CodeTabs>

## getUpdates - Get Updates

See [getUpdates](https://core.telegram.org/bots/api#getupdates) docs for a list of supported parameters and other info.

<CodeTabs>
<TabPHP>

```php
$updates = $telegram->getUpdates();
```

</TabPHP>

<TabLaravel>

```php
$updates = Telegram::getUpdates();
```

</TabLaravel>
</CodeTabs>
