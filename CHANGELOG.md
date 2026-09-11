# Changelog

All notable changes to `@particle-academy/google-analytics-ui`,
`@particle-academy/google-analytics-js`,
`particle-academy/google-analytics-php` and `fancy-google-analytics`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.3.3] — 2026-09-11

### Added

- **`fancy-flow-php` executors for every node.** `src/Flow/` carries one `#[FlowNode]` class per action and trigger, and `GoogleAnalyticsFlow::EXECUTORS` lists them.

A Laravel host running fancy-flow-php could show this connector's nodes in its editor and could not run them: `particle-academy/google-analytics-php` shipped the request builders and no executor. Each one is the PHP twin of the executor in `@particle-academy/google-analytics-js` — the same kind, the same request, the same value on `out` — and an unsafe-to-replay action derives its idempotency key from the run and the node, so a retried durable run sends the key it sent the first time.

Register them by adding `vendor/particle-academy/google-analytics-php/packages/php/src/Flow` to `config('fancy-flow.discover')`. `particle-academy/fancy-flow-php` is SUGGESTED, not required, and conflicts outside `>=0.51.0 <2.0`, the range the executors were tested under. Nothing outside `Flow\` needs it.

### Fixed

- **Fake mode through `ConnectorClient` threw.** `GoogleAnalytics::descriptor()` handed the connector core its faker as `GoogleAnalyticsFaker::respond(...)`, which takes `($operation, $request)`; the core calls a faker `($operation, $config, $fake, $input)`. So `$config` arrived as `$request` and every fake call died on "Call to a member function … on null". The descriptor now translates between the two. Calling `GoogleAnalyticsFaker::respond()` directly — what this package's own tests do, which is why they never saw it — is unchanged.

## [0.3.2] — 2026-09-06

### Changed

- **Published through npm Trusted Publishing, so these packages now carry PROVENANCE.**

Every earlier release went out under a scope-wide npm token. This one is
published by an OIDC exchange from the release workflow itself, and npm records
which workflow in which repository built it.
`npm view @particle-academy/google-analytics-ui@0.3.2` shows the attestation; releases before
this one have none.

What it buys a consumer: the tarball on the registry can be tied to a public
commit and a public workflow run, rather than to whoever held a token. What it
does not buy: nothing about the code changed, and the runtime behaviour of all
four packages is identical to 0.3.1.

- **`repository.directory` in the npm packages.**

`@particle-academy/google-analytics-ui` and `@particle-academy/google-analytics-js` live at
`packages/ui` and `packages/js` inside the provider repo. npm's `repository`
field now says so, which makes the "Repository" link on each package page point
at the package rather than at the repository root.

## [0.3.1] — 2026-08-24

### Fixed

- **`@particle-academy/google-analytics-js` now accepts a RANGE of `@particle-academy/google-analytics-ui`, not one exact version.**

It peer-depended on `@particle-academy/google-analytics-ui` at exactly the release it shipped with. That is the
strict form of the thing the kit's own rule forbids — a first-party sibling gets
a range — and the same block applied the rule correctly to its other two
dependencies. It was this one pair that slipped.

What it cost: ship `@particle-academy/google-analytics-ui` with a fixed help string and every consumer on the
previous `@particle-academy/google-analytics-js` had an **unmet peer**, which npm 7+ errors on. A documentation
patch could not be delivered without a matching runtime release, and a routine
`npm update` that moved the ui package alone broke the install.

The coupling is real and is not being loosened away. The ui package emits the
config schema and the js package implements against it, so a ui that adds a
field to a js that ignores it is silently wrong. But a PATCH is non-additive by
definition and a MINOR is where a field can appear — so `>=0.3.1 <0.4.0` is the
coupling that actually exists rather than the strictest one expressible.

Nothing else changed. `particle-academy/google-analytics-php` and `fancy-google-analytics` are unaffected; neither has an
equivalent edge.

## [0.3.0] — 2026-08-24

### Added

- **The README now says how to SET THIS CONNECTOR UP**, in the package itself.

Until now it explained what the four packages are, what they cost and why the
repo is generated — and said nothing about credentials, scopes, sandboxes or
operations. Somebody who installed it could not learn from it which credentials
a connection needs, where a human GETS them, which scopes to request, or what
the connector can actually do. All of that was already in the definition; the
one document a consumer reads was the one that omitted everything actionable.

The new **Setting it up** section carries:

- every credential, with the text saying where the value comes from, whether it
  is **per installation** or **per connected account**, and whether it is secret;
- the OAuth authorize and token URLs and the exact scopes, verbatim;
- the access-token lifetime, and where refresh tokens ROTATE, the two things a
  host must not do — retry a failed refresh, or refresh concurrently — because a
  replay revokes the entire grant and nothing in the failure says why;
- the estate in this provider's own terms, including the cases where a
  successful-looking run reaches nobody, or reaches the real one;
- every action and trigger with its method, path, inputs, and whether it is safe
  to replay;
- a trigger's provider-side setup, which nobody can derive from anything else.

It is **generated from `provider/manifest.json`**, so it cannot drift from what
the packages do — which is the point at a few hundred providers, where a
hand-written setup section is a few hundred documents going quietly stale.

No code changed. This release exists because a registry and an installing agent
read the PUBLISHED artifact, and the artifact carried the old README.

## [0.2.0] — 2026-08-24

### Changed

- **`@particle-academy/google-analytics-ui` is now an OPTIONAL PEER dependency of `@particle-academy/google-analytics-js`, not a hard one.**

`./flow` needs it; nothing else does. It was a hard dependency, and because
`@particle-academy/google-analytics-ui` itself peer-depends on `fancy-flow` — which npm 7+ installs
automatically — `npm install @particle-academy/google-analytics-js` pulled the **entire flow engine**
onto disk for a consumer who only wanted to call the API. Roughly **18 MB
became 874 KB**, and the package works exactly as before:

```js
import { googleAnalytics… } from "@particle-academy/google-analytics-js";
// an injected transport, no flow engine anywhere
```

**This is breaking if you use `@particle-academy/google-analytics-js/flow`.** Add `@particle-academy/google-analytics-ui` to your own
dependencies — it was always being installed for you, and now it is declared.
Everything importing only the main entry point is unaffected.

The fix is on this edge rather than on `@particle-academy/google-analytics-ui` → `fancy-flow`: the ui package
genuinely requires fancy-flow, since it calls `defineConnectorKind`, and marking
that peer optional would be a lie about what it needs.

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
[0.2.0]: https://github.com/Fancy-Friends/google-analytics/releases/tag/v0.2.0
[0.3.0]: https://github.com/Fancy-Friends/google-analytics/releases/tag/v0.3.0
[0.3.1]: https://github.com/Fancy-Friends/google-analytics/releases/tag/v0.3.1
