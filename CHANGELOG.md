# Telegram Bot SDK Changelog

## [3.12.0] - 2023-05-20
### Added
- `download` HTTP method for the file downloader.
- Added support for Pest `1.x` and `2.x`.

### Changed
- Updated Guzzle version to `7.5.1` to address security concerns.
- Refactored codebase for improved performance, readability, and optimizations.

## [3.11.0] - 2023-04-16
### Added
- `argument($name, $default)` method in `command`.
- `is_persistent` field of the `ReplyKeyboardMarkup` object by @pavel-mironchik in [#1063](https://github.com/irazasyed/telegram-bot-sdk/pull/1063).
- Unicode support for command parser.

### Changed
- Refactored command system to improve arguments support. Supported patterns: `{argument}` `{ regex: \w+ }`
- Updated `TelegramResponse.php` to improve decoding and other misc by @irpcpro in [#1053](https://github.com/irazasyed/telegram-bot-sdk/pull/1053), [#1054](https://github.com/irazasyed/telegram-bot-sdk/pull/1054), [#1057](https://github.com/irazasyed/telegram-bot-sdk/pull/1057).

### Fixed
- `setChatPhoto` method to properly upload photo file.

## [3.10.0] - 2023-04-02
### Added
- Telegram Facade PHPDoc blocks.
- 3.10 Changes by @irazasyed in [#1047](https://github.com/irazasyed/telegram-bot-sdk/pull/1047)
- Support League Event 2 and 3 by @irazasyed in [#1050](https://github.com/irazasyed/telegram-bot-sdk/pull/1050)

### Changed
- Convert all tests to PEST.
- Refactor to improve readibility and performance.
- Refactor WebhookCommand.

### Fixed
- Bugfixes

## [3.9.1] - 2023-04-01
### Added
- Add support for PSR-11 Container and update dependencies.
- make BASE_BOT_URL customizable by @ariaieboy in [#1017](https://github.com/irazasyed/telegram-bot-sdk/pull/1017)
- Supported Versions table by @lptn in [#997](https://github.com/irazasyed/telegram-bot-sdk/pull/997)
- Laravel 10 support by @Serpichenko in [#1034](https://github.com/irazasyed/telegram-bot-sdk/pull/1034)
- Add WebApp compatibility by @dmtrbskkv in [#1028](https://github.com/irazasyed/telegram-bot-sdk/pull/1028)

### Changed
- Emit `UpdateEvent` event similar to SDK v4 by @lptn in [#998](https://github.com/irazasyed/telegram-bot-sdk/pull/998)
- Change visibility of get method in TelegramResponseException by @foremtehan in [#1030](https://github.com/irazasyed/telegram-bot-sdk/pull/1030)
- Refactor TelegramClient.php by @Thajudecodes in [#1031](https://github.com/irazasyed/telegram-bot-sdk/pull/1031)

### Fixed
- Several minor bugfixes.
- Fix PHPDoc and return types: use `EmitterInterface` instead of `Emitter` implementation by @lptn in [#990](https://github.com/irazasyed/telegram-bot-sdk/pull/990)
- Fix links to docs by @lptn in [#993](https://github.com/irazasyed/telegram-bot-sdk/pull/993)
- fix chat trait by @kolirt in [#999](https://github.com/irazasyed/telegram-bot-sdk/pull/999)
- Fix Telegram.php docblock by @foremtehan in [#1004](https://github.com/irazasyed/telegram-bot-sdk/pull/1004)
- Fix showing the webhook information in an Artisan command by @pavel-mironchik in [#1044](https://github.com/irazasyed/telegram-bot-sdk/pull/1044)

### Removed
- Drop support for Laravel < 9 and PHP < 8.
- Drop command bus singleton.

## [3.9.0] - 2022-08-03
### Added
- Add GitHub issue template for bug reports by @lptn in [#981](https://github.com/irazasyed/telegram-bot-sdk/pull/981)
- Add missing `param` and `return` types to PHPDoc blocks by @lptn in [#983](https://github.com/irazasyed/telegram-bot-sdk/pull/983)

### Changed
- Make TelegramServiceProvider really deferrable by @lptn in [#978](https://github.com/irazasyed/telegram-bot-sdk/pull/978)

### Fixed
- FIX: Set correct Api/Bot instance when add/init Commands by @lptn in [#984](https://github.com/irazasyed/telegram-bot-sdk/pull/984)
- Fix `Update::getChat()` for cases when a User banned and/or unbanned a bot by @lptn in [#977](https://github.com/irazasyed/telegram-bot-sdk/pull/977)
- Fix return type error on method findType by @MaizerGomes in [#985](https://github.com/irazasyed/telegram-bot-sdk/pull/985)
- createChatInvitelink returns array and solves the create link issue by @arifjawad in [#986](https://github.com/irazasyed/telegram-bot-sdk/pull/986)

### Removed
- Drop `username` config key used by WebhookCommand only by @lptn in [#979](https://github.com/irazasyed/telegram-bot-sdk/pull/979)

## [3.8.0] - 2022-07-10
### Added
- Add php-cs-fixer to CI to use the same style as for SDK v4 by @lptn in [#973](https://github.com/irazasyed/telegram-bot-sdk/pull/973)

### Changed
- Improve PHPDoc (for Telegram + add more deprecations to methods removed in SDK v4) by @lptn in [#972](https://github.com/irazasyed/telegram-bot-sdk/pull/972)
- Cleanup php cs fixer config: remove cache from repository by @lptn in [#976](https://github.com/irazasyed/telegram-bot-sdk/pull/976)

### Fixed
- Fix package to work on PHP 7.3 by @lptn in [#969](https://github.com/irazasyed/telegram-bot-sdk/pull/969)
- Fix CI: do not use guzzle versions with know vulnerabilities by @lptn in [#970](https://github.com/irazasyed/telegram-bot-sdk/pull/970)

### Removed
- Remove invalid imports by @lptn in [#975](https://github.com/irazasyed/telegram-bot-sdk/pull/975)

## [3.7.0] - 2022-07-08
### Added
- Add missing types by @lptn in [#961](https://github.com/irazasyed/telegram-bot-sdk/pull/961)

### Changed
- Backport some v4 features by @lptn in [#965](https://github.com/irazasyed/telegram-bot-sdk/pull/965)

### Fixed
- Fix PHPDoc: mark optional properties as nullables by @lptn in [#963](https://github.com/irazasyed/telegram-bot-sdk/pull/963)
- Fix one-to-many relations by @lptn in [#964](https://github.com/irazasyed/telegram-bot-sdk/pull/964)
- Fix type issue parsing "entities" by @lptn in [#967](https://github.com/irazasyed/telegram-bot-sdk/pull/967)

### Removed
- Drop PHP 7.2 support and update phpunit by @lptn in [#966](https://github.com/irazasyed/telegram-bot-sdk/pull/966)

## [3.6.0] - 2022-03-31
### Added
- Added PHPDoc templates for Keyboard classes by @Kravets1996 in [#928](https://github.com/irazasyed/telegram-bot-sdk/pull/928)
- add copyMessage by @mrjavadseydi in [#927](https://github.com/irazasyed/telegram-bot-sdk/pull/927)
- Added missing message type: `video_note` by @andrey-helldar in [#930](https://github.com/irazasyed/telegram-bot-sdk/pull/930)
- Added missing message types by @andrey-helldar in [#932](https://github.com/irazasyed/telegram-bot-sdk/pull/932)

### Fixed
- Fix `is not valid header value` by @andrey-helldar in [#934](https://github.com/irazasyed/telegram-bot-sdk/pull/934)

## [3.5.0] - 2022-02-11
### Added
- Laravel 9 Support.
- Add support for RequestInterface for webhooks by @mattiabasone in [#908](https://github.com/irazasyed/telegram-bot-sdk/pull/908)
- Psr7 v2 support by @DoctorLines in [#907](https://github.com/irazasyed/telegram-bot-sdk/pull/907)
- Anonymous Admins by @alexmorbo in [#832](https://github.com/irazasyed/telegram-bot-sdk/pull/832)

### Changed
- Handle all possible Guzzle request exceptions by @b1rdex in [#879](https://github.com/irazasyed/telegram-bot-sdk/pull/879)

### Fixed
- Fixed: method ReflectionParameter::getClass() is deprecated, PHP8 by @semsphy in [#854](https://github.com/irazasyed/telegram-bot-sdk/pull/854)
- Fixed arrow sign by @semsphy in [#870](https://github.com/irazasyed/telegram-bot-sdk/pull/870)
- Fix namespace case by @netesin in [#892](https://github.com/irazasyed/telegram-bot-sdk/pull/892)
- Fixed conflict command aliases by @korkoshko in [#885](https://github.com/irazasyed/telegram-bot-sdk/pull/885)
- Fix: Aliased command not received arguments by @arispati in [#857](https://github.com/irazasyed/telegram-bot-sdk/pull/857)
- Fix an error in validateInputFileField by @mihard in [#829](https://github.com/irazasyed/telegram-bot-sdk/pull/829)

## [3.4.1] - 2020-12-11
### Fixed
- Fixed commands receiving argument names instead of values by @roelofr in [#821](https://github.com/irazasyed/telegram-bot-sdk/pull/821)

## [3.4.0] - 2020-12-05
### Added
- Added Laravel 8.0 to GitHub Actions by @roelofr in [#819](https://github.com/irazasyed/telegram-bot-sdk/pull/819)
- Added PHP 8.0 support by @roelofr in [#818](https://github.com/irazasyed/telegram-bot-sdk/pull/818)

## [3.3.0] - 2020-09-10
### Changed
- Refactored Service Provider

## [3.2.0] - 2020-09-09
### Added
- Laravel 8 Support by @faustbrian in [#786](https://github.com/irazasyed/telegram-bot-sdk/pull/786)

### Changed
- Replace "array_wrap" with "Arr::wrap" by @andriihorpenko in [#763](https://github.com/irazasyed/telegram-bot-sdk/pull/763)
- Replace "array_intersect_key" with "intersectByKeys" by @slavkluev in [#778](https://github.com/irazasyed/telegram-bot-sdk/pull/778)
- Allow Guzzle 7 by @matthewnessworthy in [#782](https://github.com/irazasyed/telegram-bot-sdk/pull/782)

### Fixed
- Fix triggerCommand issues by @jonnywilliamson in [#733](https://github.com/irazasyed/telegram-bot-sdk/pull/733)
- Offset issue when triggering a command by @KielD-01 in [#772](https://github.com/irazasyed/telegram-bot-sdk/pull/772)

## [3.1.0] - 2020-04-18
### Added
- Laravel 7 Support.
- Poll support by @arsamme in [#727](https://github.com/irazasyed/telegram-bot-sdk/pull/727)
- Bot API 4.7 by @jonnywilliamson in [#730](https://github.com/irazasyed/telegram-bot-sdk/pull/730)
- Latest Bot API changes by @jonnywilliamson in [#657](https://github.com/irazasyed/telegram-bot-sdk/pull/657)
- Bot API 4.5 by @jonnywilliamson in [#699](https://github.com/irazasyed/telegram-bot-sdk/pull/699)
- Bot API 4.4 by @jonnywilliamson in [#659](https://github.com/irazasyed/telegram-bot-sdk/pull/659)
- BotAPI 4.0 by @jonnywilliamson in [#596](https://github.com/irazasyed/telegram-bot-sdk/pull/596)
- Add proxy to GuzzleHttpClient by @vokamut in [#721](https://github.com/irazasyed/telegram-bot-sdk/pull/721)

### Changed
- Update .travis.yml by @sergiy-petrov in [#707](https://github.com/irazasyed/telegram-bot-sdk/pull/707)
- Update phpunit/phpunit requirement from ^6.1 to ^6.1 || ^8.0 by @dependabot in [#708](https://github.com/irazasyed/telegram-bot-sdk/pull/708)

### Fixed
- Fix send invoice by @jonnywilliamson in [#610](https://github.com/irazasyed/telegram-bot-sdk/pull/610)
- fix issue in sendMediaGroup by @alr2413 in [#691](https://github.com/irazasyed/telegram-bot-sdk/pull/691)

## [2.3.0] - 2019-09-08
### Added
- Laravel 6 Support!

## [2.2.0] - 2017-01-05
### Added
- Lumen Support!

## [2.1.0] - 2016-11-02
### Added
- Laravel 5.3 Support!

## [2.0.0] - 2015-12-28
### Added
- More doc blocks to the code.
- New `getFile()` method & File Object - Thanks @jonnywilliamson ([#39](https://github.com/irazasyed/telegram-bot-sdk/pull/39)).
- Channel Username Support.
- Dependency Injection in Commands - Thanks @antoniomadonna ([#53](https://github.com/irazasyed/telegram-bot-sdk/pull/53)).
- PHPUnit Tests - Thanks @antoniomadonna ([#58](https://github.com/irazasyed/telegram-bot-sdk/pull/58)).
- Travis Config.
- PHPUnit 4.8 Version to Support PHP5.5 Testing.
- Git Attributes File.
- Composer Config & Other Options.
- Composer script test to make it easier to run phpunit by firing `composer test`.
- Nitpick Config.
- New `removeCommand()` & `removeCommands()` methods to the API & their Tests - Thanks @jonnywilliamson ([#66](https://github.com/irazasyed/telegram-bot-sdk/pull/66)).
- New Remote Files Upload Support - ([#42](https://github.com/irazasyed/telegram-bot-sdk/issues/42)).
- Laravel 5.2 Support.
- New Message Object Properties - Thanks @jonnywilliamson ([#75](https://github.com/irazasyed/telegram-bot-sdk/pull/75)).
- More PHPUnit Tests & Mocking 'Telegram Response' class - Thanks @jonnywilliamson ([#76](https://github.com/irazasyed/telegram-bot-sdk/pull/76)).
- Added ability to change request timeout and connection timeout globally for all Telegram API requests - Thanks @ihoru ([#81](https://github.com/irazasyed/telegram-bot-sdk/pull/81)).

### Changed
- Methods' Params to Array, To support constant changes by Telegram - ([#54](https://github.com/irazasyed/telegram-bot-sdk/issues/54)) **[BC]**.
- Revise Doc Blocks.
- Update Commands Class to Reflect Param Changes.
- Update Help Command.
- Refactor Command Magic Method Arguments.
- Refactor Laravel Service Provider to Support DI.
- Message Detecting methods to support Message object too - Thanks @jonnywilliamson ([#37](https://github.com/irazasyed/telegram-bot-sdk/pull/37)).
- Switch to POST requests method to make API requests - Thanks @jonnywilliamson ([#40](https://github.com/irazasyed/telegram-bot-sdk/pull/40)).
- Update Chat field change to new Chat Object in place of GroupChat Object - Thanks @jonnywilliamson ([#46](https://github.com/irazasyed/telegram-bot-sdk/pull/46)).
- Improve `mapRelatives` to initialize inner properties - Thanks @alexsoft ([#49](https://github.com/irazasyed/telegram-bot-sdk/pull/49)).
- Tests Namespace.
- Tests to Autoload in Dev.
- PHPUnit Tests Config.
- Applied Scrutinizer's Best Practises & Other Fixes.
- CS Fixes & Doc Block Updates - Thanks @jonnywilliamson ([#72](https://github.com/irazasyed/telegram-bot-sdk/pull/72)).
- Get Updates & Process command enhancements to prevent errors - Thanks @autowp ([#85](https://github.com/irazasyed/telegram-bot-sdk/pull/85)) & ([#88](https://github.com/irazasyed/telegram-bot-sdk/pull/88)).
- Library Documentation Rewritten for V2 - Thanks @jonnywilliamson ([#89](https://github.com/irazasyed/telegram-bot-sdk/pull/89)).

### Fixed
- `ReplyWith` Params Bug.
- `uploadFile` Bug Opening Webhook URL.

### Removed
- Group Chat Object.

## [1.0.0] - 2015-09-08
### Added
- New `sendVoice()` method as per API Changes - Thanks @jonnywilliamson ([#19](https://github.com/irazasyed/telegram-bot-sdk/pull/19)).
- Branch Alias to Composer to install `dev-master` easily.
- Commands System: Automated Inbound Commands Handler.
- Commands Handler Support for Laravel.
- Command Bus Methods to Super Class.
- Default Help Command.
- Chat Actions Helper Class.
- CHANGELOG File.
- Magic Methods Documentation for Commands Class and Object Classes - Thanks @jonnywilliamson ([#26](https://github.com/irazasyed/telegram-bot-sdk/pull/26)).
- API Object Classes Magic Method PHPDocs - Thanks @jonnywilliamson ([#30](https://github.com/irazasyed/telegram-bot-sdk/pull/30)).
- New Documentation Page.
- Telegram Bot SDK [API Docs](https://irazasyed.github.io/telegram-bot-sdk/api).
- [Upgrade](/docs/upgrade-guide) Guide.
- Methods to Detect and Determine Message/Update Type.

### Changed
- `uploadFile()` method to support loading resource directly - Thanks @rkhitin - ([#17](https://github.com/irazasyed/telegram-bot-sdk/pull/17)).
- Added optional `performer` and `title` fields to `sendAudio()` as per official API Changes - Thanks @jonnywilliamson ([#19](https://github.com/irazasyed/telegram-bot-sdk/pull/19)) - **[BC]**.
- Added `certificate` param to `setWebhook()` method as per Official API Changes.
- Refactor Upload File Method.
- Format Code, Simplify FQNs, Code Cleanup and Revise Doc Blocks.
- Revise Token Exception Text.
- Clean Up Base Object Class.
- Rename Namespace from `Irazasyed\Telegram` to `Telegram\Bot` - **[BC]**.
- Rename [Telegram.php](https://github.com/irazasyed/telegram-bot-sdk/blob/v0.2.6/src/Telegram.php) - `Irazasyed\Telegram\Telegram` to [Api.php](https://github.com/irazasyed/telegram-bot-sdk/blob/master/src/Api.php) - `Telegram\Bot\Api` - **[BC]**.
- Move PHPDocs to its own home.
- Revise README.

## [0.2.6] - 2015-08-18
### Added
- Video Caption Support to `sendVideo()` method as per Official API Changes - Thanks @jonnywilliamson.
- Duration Support to `sendVideo()` and `sendAudio()` methods as per Official API Changes.

### Fixed
- Contact Object Namespace - Thanks DmitryNek.
- `HTTPClientHandlerInterface` Laravel Config Typo.

## [0.2.5] - 2015-07-20
### Fixed
- Custom HTTP Client Handler Not Found - Thanks @codengine.

### Removed
- `getLastName()` example from README.

## [0.2.4] - 2015-07-12
### Added
- Installation Requirements in README.

### Changed
- Laravel Service Provider.
- Revise README.

### Removed
- Laravel 4 Support.

## [0.2.3] - 2015-07-12
### Added
- Message Object Relatives.

### Changed
- `ReplyMarkupKeyboard` Example in README.
- Composer Keywords.
- Profile Links in README.

### Fixed
- Invalid resource type issue ([#6](https://github.com/irazasyed/telegram-bot-sdk/issues/6)).

### Removed
- KeyboardMarkup Class Import Statement.

## [0.2.2] - 2015-07-02
### Fixed
- `Irazasyed\Telegram\Exceptions\TelegramSDKException` not found issue ([#4](https://github.com/irazasyed/telegram-bot-sdk/issues/4)).

## [0.2.1] - 2015-07-02
### Added
- `recentMessage()` to Update object class.

### Changed
- Make `$token` param optional in constructor - Thanks @orloffv issue ([#1](https://github.com/irazasyed/telegram-bot-sdk/issues/1)).

## [0.2.0] - 2015-07-02
### Added
- `getWebhookUpdates()` method.
- Documentation in README for `getWebhookUpdates()` method.
- Contributing Guidelines.
- Disclaimer and Note to README.
- Banner Image in README.
- Link back to Telegram Bot API Page.

### Changed
- Refactor `getUpdates()` method.
- Project LICENSE.
- Revise README.

## 0.1.0 - 2015-06-29
- Initial Release.

[unreleased]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.12.0...HEAD
[3.12.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.11.0..v3.12.0
[3.11.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.10.0..v3.11.0
[3.10.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.9.1..v3.10.0
[3.9.1]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.9...v3.9.1
[3.9.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.8...v3.9
[3.8.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.7...v3.8
[3.7.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.6...v3.7
[3.6.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.5...v3.6
[3.5.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.4.0...v3.5
[3.4.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.3.0...v3.4.0
[3.3.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.2.0...v3.3.0
[3.2.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v3.1.0...v3.2.0
[3.1.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v2.3.0...v3.1.0
[2.3.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v2.2.0...v2.3.0
[2.2.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v2.1.0...v2.2.0
[2.1.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v2.0.0...v2.1.0
[2.0.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.6...v1.0.0
[0.2.6]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.5...v0.2.6
[0.2.5]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.4...v0.2.5
[0.2.4]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.3...v0.2.4
[0.2.3]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.2...v0.2.3
[0.2.2]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.1...v0.2.2
[0.2.1]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.2.0...v0.2.1
[0.2.0]: https://github.com/irazasyed/telegram-bot-sdk/compare/v0.1.0...v0.2.0
