---
sidebar_position: 1
---

# The Basics

Here's an example of `getMe()` API method you can use to test your bot's auth token.
Returns basic information about the bot in form of a User object.

See [getMe](https://core.telegram.org/bots/api#getme) docs for more details.

## Standalone

```php
require __DIR__.'/vendor/autoload.php';

use Telegram\Bot\Api;

$telegram = new Api('YOUR BOT TOKEN');
$response = $telegram->getMe();
```

## Laravel

### Using Facade

```php
use Telegram\Bot\Laravel\Facades\Telegram;

$response = Telegram::getMe();
```

### Using Service Container

Here's an example using Laravel's service container aka dependency injection.

```php
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Telegram\Bot\Api;

class BotController extends Controller
{
    protected $telegram;

    /**
     * Create a new controller instance.
     *
     * @param  Api  $telegram
     */
    public function __construct(Api $telegram)
    {
        $this->telegram = $telegram;
    }

    /**
     * Show the bot information.
     */
    public function show()
    {
        $response = $this->telegram->getMe();

        return $response;
    }
}
```

## Handling Response

Telegram Bot API responses in the SDK are represented as PHP objects. Telegram Bot SDK supports all [available types](https://core.telegram.org/bots/api#available-types) of response objects with various helpful methods. In addition, all the related objects of an object are also automatically mapped to the appropriate PHP response object.

In the above example, `getMe()` returns a [User](https://core.telegram.org/bots/api#user) object.

So we can retrieve the object values like so:

```php
$botId = $response->getId();
$firstName = $response->getFirstName();
$username = $response->getUsername();
```

## Additional Information

Telegram Bot SDK takes advantage of the amazing Laravel Collection API to automatically map the data.

So it's a lot easier to work with the array of data. Supports all the methods listed on the [official docs](https://laravel.com/docs/5.1/collections).
