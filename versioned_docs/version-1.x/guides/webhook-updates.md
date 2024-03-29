import CodeTabs from '@site/src/components/CodeTabs';

# Webhook & Updates

There are two mutually exclusive ways of receiving updates for your bot — the `getUpdates()` method on one hand and Webhooks on the other. Incoming updates are stored on the server until the bot receives them either way, but they will not be kept longer than 24 hours.

Regardless of which option you choose, you will receive JSON-serialized Update objects as a result.

## Getting Updates Via Webhook

In order to receive updates via a Webhook, You first need to tell your webhook URL to Telegram. You can use `setWebhook($url)` method to specify a url and receive incoming updates via an outgoing webhook.

Whenever there is an update for the bot, Telegram will send an HTTPS POST request to the specified url, containing a JSON-serialized Update. In case of an unsuccessful request, Telegram will give up after a reasonable amount of attempts.

If you'd like to make sure that the Webhook request comes from Telegram, we recommend using a secret path in the URL, e.g. `https://www.example.com/<token>`. Since nobody else knows your bot's token, you can be pretty sure it's Telegram who made the request.

See [setWebhook](https://core.telegram.org/bots/api#setwebhook) docs for a list of supported parameters and other info.

<CodeTabs>
<>

```php
$response = $telegram->setWebhook('https://example.com/<token>/webhook');

// Or if you are supplying a self-signed-certificate
$response = $telegram->setWebhook('https://example.com/<token>/webhook', '/path/to/public_key_certificate.pub');
```

</>

<>

```php
// Don't forget to setup a POST route in your Laravel Project.

$response = Telegram::setWebhook('https://example.com/<token>/webhook');

// Or if you are supplying a self-signed-certificate
$response = Telegram::setWebhook('https://example.com/<token>/webhook', '/path/to/public_key_certificate.pub');
```

</>
</CodeTabs>

:::info Notes
1. You will not be able to receive updates using `getUpdates()` for as long as an outgoing webhook is set up.

2. To use a self-signed certificate, you need to upload your public key certificate using certificate parameter. Please pass the absolute path to the certificate when uploading.

3. Ports currently supported *for Webhooks*: **443, 80, 88, 8443**.
:::

Once you set the webhook, You can then use the below function to retrieve the updates that are sent to your Webhook URL. The function returns an array of `Update` objects.

<CodeTabs>
<>

```php
$updates = $telegram->getWebhookUpdates();
```

</>

<>

```php
// Put this inside the POST route /<token>/webhook or POST Controller
$updates = Telegram::getWebhookUpdates();

// Example of POST Route:
Route::post('/<token>/webhook', function () {
    $updates = Telegram::getWebhookUpdates();

    return 'ok';
});
```

</>
</CodeTabs>

## Removing Webhook

To remove a webhook (if it was set before).

<CodeTabs>
<>

```php
$response = $telegram->removeWebhook();
```

</>

<>

```php
$response = Telegram::removeWebhook();
```

</>
</CodeTabs>

## Getting Updates Manually

You can use `getUpdates()` method to receive incoming updates using long polling ([wiki](http://en.wikipedia.org/wiki/Push_technology#Long_polling)). An Array of Update objects is returned.

See [getUpdates](https://core.telegram.org/bots/api#getupdates
) docs for a list of supported parameters and other info.

<CodeTabs>
<>

```php
$response = $telegram->getUpdates();
```

</>

<>

```php
$response = Telegram::getUpdates();
```

</>
</CodeTabs>

:::info Notes
1. This method will not work if an outgoing webhook is set up.

2. In order to avoid getting duplicate updates, recalculate *offset* after each server response.
:::
