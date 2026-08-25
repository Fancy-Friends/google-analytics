# Google Analytics

Google Analytics for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/google-analytics-ui` | `npm install @particle-academy/google-analytics-ui` |
| Node | `@particle-academy/google-analytics-js` | `npm install @particle-academy/google-analytics-js` |
| PHP 8.4+ | `particle-academy/google-analytics-php` | `composer require particle-academy/google-analytics-php` |
| Python 3.11+ | `fancy-google-analytics` | `pip install fancy-google-analytics` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No Google Analytics SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A Google Analytics connection holds 4 values.

**Two kinds of value, and mixing them up matters.** A `provider` credential is ONE value for the whole installation — an OAuth app's client secret serves every connected account. An `account` credential is one per connected account. A host that stores the second where it stores the first lets one account's credentials reach another's.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **OAuth client ID** | per installation | not secret | From Google Cloud Console -> APIs & Services -> Credentials. ONE value for the whole installation, not per connected account. |
| **OAuth client secret** | per installation | **secret** | The client secret for the same OAuth app. One value for the whole installation. |
| **Access token** | per connected account | **secret** | Per connected Google account, and it expires after ONE HOUR. The host refreshes it with the refresh token. |
| **Refresh token** | per connected account | **secret** | Per connected Google account. Google issues one only when the consent request asks for offline access. |

### Authorising

Google Analytics uses OAuth2 (authorization_code). The package DECLARES the exchange; the HOST performs it — a consent screen needs a browser, a redirect URI and somewhere to persist the result, and all three belong to the host.

- **Authorize URL** — https://accounts.google.com/o/oauth2/v2/auth
- **Token URL** — https://oauth2.googleapis.com/token
- **Scopes** — `https://www.googleapis.com/auth/analytics.readonly`
- **Access token lifetime** — 3600 seconds (1 hours). A host that never refreshes works all afternoon and is broken by morning.

The refresh tokens do **not** rotate: the same one is reusable, so a refresh may safely be retried and may run concurrently. Stated rather than assumed, because the opposite — a provider that spends the token and revokes the grant on a replay — looks identical until it happens.

### The estate

**Google Analytics has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> Google Analytics has no sandbox. A report reads a real property's real data and spends real quota. The faker returns a plausibly-shaped report so a flow can be built without a Google account.

## What it can do

### Actions

#### `report_run` — Google Analytics report

Run a report against a Google Analytics 4 property.

`POST /v1beta/{+property}:runReport` · reads only — safe to replay

| Input | Required | What it is |
|---|---|---|
| `property` | yes | The GA4 property, written as `properties/1234567890`. The numeric id alone is not accepted. |
| `startDate` | yes | YYYY-MM-DD, or a relative form Google accepts such as `28daysAgo`, `yesterday` or `today`. |
| `endDate` | yes | YYYY-MM-DD, or a relative form such as `today`. |
| `metrics` | yes | Metric names, comma separated. For example activeUsers, sessions, screenPageViews. |
| `dimensions` | no | Dimension names, comma separated. For example date, country, pagePath. Leave empty for a single total row. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not Google Analytics has a sandbox. Set a
node's mode to `fake` and it returns the shape Google Analytics actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/google-analytics`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
