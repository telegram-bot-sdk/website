# 🚀 Release process

Let's see how Telegram Bot SDK handles **versioning, releases and breaking changes**.

:::info

This topic is particularly important for large chatbots that may have difficulties to upgrade.

:::

## Semantic versioning {#semantic-versioning}

Telegram Bot SDK versioning is based on the `major.minor.patch` scheme and respects [Semantic Versioning](https://semver.org/).

Respecting Semantic Versioning is important for multiple reasons:

- It **guarantees simple minor version upgrades**, as long as you only use the [public API](/community/release-process#public-api-surface)
- A new major version is an opportunity to thoroughly document breaking changes
- A new major/minor version is an opportunity to communicate new features through a blog post

:::note

[Major version numbers are not sacred](https://tom.preston-werner.com/2022/05/23/major-version-numbers-are-not-sacred.html), but we still group breaking changes together and avoid releasing major versions too often.

:::

### Major versions {#major-versions}

The `major` version number is incremented on **every breaking change**.

Whenever a new major version is released, we publish:

- a blog post with feature highlights, major bug fixes, **breaking changes, and upgrade instructions**.
- an exhaustive changelog entry

:::tip

Read our [public API surface](/community/release-process#public-api-surface) section to clearly understand what we consider as a breaking change.

:::

### Minor versions {#minor-versions}

The `minor` version number is incremented on every significant retro-compatible change.

Whenever a new minor version is released, we publish:

- a blog post with a list of feature highlights and major bug fixes
- an exhaustive changelog entry

:::tip

If you only use our [public API surface](/community/release-process#public-api-surface), you should be able to upgrade in no time!

:::

### Patch versions {#patch-versions}

The `patch` version number is incremented on bugfixes releases.

Whenever a new patch version is released, we publish:

- an exhaustive changelog entry

## Versions {#versions}

The Telegram Bot SDK team is usually working on 2 major versions at the same time:

- **Telegram Bot SDK **: the **stable** version, on the `main` branch
- **Telegram Bot SDK **: the **next** version, on the `develop` branch

### Stable version {#stable-version}

The stable version is recommended for most Telegram Bot SDK users.

:::info

After a new stable version has been released, the former stable version will continue to receive support only for **major security issues** for **3 months**. Otherwise, all features will be frozen and non-critical bugs will not be fixed.

It is recommended to upgrade within that time frame to the new stable version.

:::

### Next version {#next-version}

The next version is the version the Telegram Bot SDK team is currently working on.

The branch is the **default target branch** for all pull requests, including core team and external contributions.

This version is recommended for **early adopters** that want to use the latest Telegram Bot SDK features as soon as possible. It is also a good way to help us by reporting bugs and giving some feedback.

There are 2 ways to use the next version:

- with an `alpha`, `beta` or `rc` pre-release
- with a [canary release](./6-canary.md) for the very latest features

:::tip

The next version passes all our automated tests and is used by the Telegram Bot SDK team itself. It is relatively safe: don't be afraid to give it a try.

:::

:::caution

Breaking changes can happen on the next version: detailed upgrade instructions are available in the changelog and pull requests.

At the `beta` and `rc` (release candidate) phases, we avoid introducing major breaking changes.

:::

## Public API surface {#public-api-surface}

Telegram Bot SDK commits to respecting Semantic Versioning. This means that whenever changes occur in Telegram Bot SDK public APIs and break backward compatibility, we will increment the `major` version number.

:::tip

Telegram Bot SDK guarantees public API retro-compatibility across `minor` versions. Unless you use internal APIs, `minor` version upgrades should be easy.

:::

We will outline what accounts as the public API surface.

### Core public API {#core-public-api}

✅ Our public API includes:

- Telegram Bot SDK config
- Telegram Bot SDK public methods
- Telegram Bot APIs changes
- Telegram Bot SDK CLI
- Telegram Bot SDK Addon's public methods.

:::tip

Any documented API is considered public (and will be stable); any undocumented API is considered internal.

:::

An API being "stable" means if you increment the patch or minor version of your Telegram Bot SDK installation without any other change, updating through `composer update` should not throw an error.
