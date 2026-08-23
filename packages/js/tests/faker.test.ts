/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_analytics
 */

/**
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { googleAnalyticsFaker } from "../src/faker.js";

test("report_run fakes the shape Google Analytics publishes", () => {
  const config = {};

  const faked = googleAnalyticsFaker("report_run", fakeRequest("google_analytics", "report_run", config));

  assert.deepEqual(faked, {
    "dimensionHeaders": [
      {
        "name": "date"
      }
    ],
    "metricHeaders": [
      {
        "name": "activeUsers",
        "type": "TYPE_INTEGER"
      },
      {
        "name": "sessions",
        "type": "TYPE_INTEGER"
      }
    ],
    "rows": [
      {
        "dimensionValues": [
          {
            "value": "20260821"
          }
        ],
        "metricValues": [
          {
            "value": "412"
          },
          {
            "value": "530"
          }
        ]
      },
      {
        "dimensionValues": [
          {
            "value": "20260822"
          }
        ],
        "metricValues": [
          {
            "value": "389"
          },
          {
            "value": "501"
          }
        ]
      }
    ],
    "rowCount": 2,
    "kind": "analyticsData#runReport"
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => googleAnalyticsFaker("no_such_operation", fakeRequest("google_analytics", "no_such_operation", {})), /no fake response/);
});
