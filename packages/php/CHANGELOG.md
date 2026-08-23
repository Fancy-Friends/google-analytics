# Changelog

All notable changes to `@particle-academy/google-analytics-ui`,
`@particle-academy/google-analytics-js`,
`particle-academy/google-analytics-php` and `fancy-google-analytics`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.1.0] — 2026-08-23

First release.

### Added

- `report_run` — run a report against a GA4 property.
  `POST /v1beta/{+property}:runReport`.
- A faker for it, so a flow can be built with no Google account.

### `{+property}` — the plus is the whole point

RFC 6570 **reserved expansion**. The value is `properties/1234567890` and the
**slash must survive**: percent-encoded it becomes `properties%2F1234567890` and
Google answers 404.

That is the exact opposite of Google Sheets, where a sheet named `Q1/Q2` *must*
have its slash escaped or the request reaches a different document. The two
templates are **one character apart** and both fail silently when confused — so
each runtime now picks its encoder from the `+`: `encodeURI` rather than
`encodeURIComponent`, `quote(safe="/")` rather than `quote(safe="")`, and in PHP
the slash is put back after `rawurlencode`, since PHP has no reserved-expansion
encoder at all.

### `metrics` is a list of NAMED OBJECTS

Google asks for `[{"name": "activeUsers"}]`, not `["activeUsers"]`; a bare list
of strings is refused as the wrong type. That is `encoding: "objects"` with an
`itemKey`, declared rather than guessed — a guess that fits one provider is
still a guess.

### The only read-only action in the estate

`sideEffects: "none"`. Running the same report twice returns the same numbers
and changes nothing, so a durable run may replay it freely and there is no
idempotency question at all.

The scope is `analytics.readonly`, not `analytics`. The discovery document lists
both for this method, and granting write access to run a report would let an
automation modify property configuration it never needs to touch.

### Metric values are STRINGS

Google sends `"412"`, not `412` — including for integer metrics. The faker says
so, because a fixture that emitted numbers would let an author write arithmetic
that works against the fake and concatenates against the real thing.

[0.1.0]: https://github.com/Fancy-Friends/google-analytics/releases/tag/v0.1.0
