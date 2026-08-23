/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_analytics
 */

/**
 * Google Analytics, as one service descriptor shared by every Google Analytics
 * operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of Google Analytics: its base URL, its
 * auth scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * Google Analytics has no sandbox. A report reads a real property's real data
 * and spends real quota. The faker returns a plausibly-shaped report so a flow
 * can be built without a Google account.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { googleAnalyticsFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const GOOGLE_ANALYTICS_BASE_URLS = {
  "live": "https://analyticsdata.googleapis.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const GOOGLE_ANALYTICS_REQUIRES = [
  "accessToken",
  "refreshToken",
  "clientId",
  "clientSecret"
] as const;

/**
 * Apply Google Analytics's auth scheme to an outgoing request.
 *
 *
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function googleAnalyticsAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers.Authorization = `Bearer ${credentials.accessToken ?? ""}`;
}

/** The Google Analytics service, for the TypeScript runtime. */
export const GOOGLE_ANALYTICS: ServiceDescriptor = {
  service: "google_analytics",
  title: "Google Analytics",
  sandbox: "none",
  baseUrls: { ...GOOGLE_ANALYTICS_BASE_URLS },
  requires: [...GOOGLE_ANALYTICS_REQUIRES],
  authorize: googleAnalyticsAuthorize,
  faker: googleAnalyticsFaker,
};
