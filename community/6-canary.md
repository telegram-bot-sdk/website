# Canary releases

Telegram Bot SDK has a canary releases system.

It permits you to **test new unreleased features** as soon as the pull requests are merged on the [next version](./7-release-process.md#next-version) of Telegram Bot SDK.

It is a good way to **give feedback to maintainers**, ensuring the newly implemented feature works as intended.

:::note

Using a canary release in production might seem risky, but in practice, it's not.

A canary release passes all automated tests and is used in production by the Telegram Bot SDK maintainers.

:::

## Using a canary release {#using-canary-release}

You can update your installation of the package to `dev-develop` to use latest unreleased version of the package.

Make sure to set `minimum-stability` in your `composer.json` file to `dev`.

```json title="composer.json"
"minimum-stability": "dev"
```
