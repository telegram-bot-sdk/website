# Upgrade Guide

## Upgrading To 2.x from 1.x

There are some breaking and major changes in this new version. Follow the below instructions to apply the changes.

#### Upgrading Your Composer Dependency

To update the package in composer, fire the following command in your terminal:

```bash
composer require irazasyed/telegram-bot-sdk:^2.0
```

### Updating method parameters

Due to rapid amount of changes Telegram have made to their method parameter names and order, this version now requires all main methods to be called with an _array of parameters_ rather than _individual parameters_.

The affected methods are:

```php
 sendMessage()
 forwardMessage()
 sendPhoto()
 sendAudio()
 sendDocument()
 sendSticker()
 sendVideo()
 sendVoice()
 sendLocation()
 sendChatAction()
 getUserProfilePhotos()
 getUpdates()
 setWebhook()
 getFile()
 replyKeyboardMarkup()
 replyKeyboardHide()
 forceReply()
```

 For example, in version 1.x of the api the `sendMessage()` method would have been called as follows:

```php
$response = $telegram->sendMessage('CHAT_ID', 'Hello World');
```

 You must now pass an associative array to the method instead like so:

```php
$response = $telegram->sendMessage([
	'chat_id' => 'CHAT_ID',
	'text' => 'Hello World'
]);
```

All methods in the API are heavily documented, follow the official Telegram documentation and should provide easy guidance of required array key names, especially if you use an IDE.

That's all folks, Enjoy!

Always make sure to update the package in your project to latest version to apply all the bug-fixes, security updates, tweaks and to get other cool new features.
