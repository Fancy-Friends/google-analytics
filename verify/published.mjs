/*
 * Google Analytics — the published npm packages.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { googleAnalyticsFaker } from "@particle-academy/google-analytics-js";
import { GOOGLE_ANALYTICS_KINDS } from "@particle-academy/google-analytics-ui";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

/*
 * WHERE did that come from?
 *
 * Node resolves a bare specifier from the importing MODULE's directory, not
 * the working directory. So running this script across from a checkout
 * resolves out of the REPO's node_modules and silently tests the source
 * again — which it did, and passed, before CI caught it.
 *
 * Two things are checked, because neither is enough alone: that the package
 * came from an INSTALL rather than from source, and that this script is not
 * sitting inside the provider repo it is supposed to be testing.
 */
const resolved = import.meta.resolve("@particle-academy/google-analytics-js");
const here = dirname(fileURLToPath(import.meta.url));

assert.ok(
  !existsSync(join(here, "..", "packages", "js", "package.json")),
  `${here} is inside the provider repo, so a bare import resolves the repo's ` +
    "own node_modules. Copy this script into a project that installed the " +
    "published package and run it there.",
);
assert.match(resolved, /node_modules/, `resolved ${resolved}, which is not an installed package`);
console.log(`  ok   resolved from ${resolved}`);

const GOLDENS = [
  {
    "operation": "report_run",
    "config": {},
    "expected": {
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
    }
  }
];

for (const { operation, config, expected } of GOLDENS) {
  const faked = googleAnalyticsFaker(operation, fakeRequest("google_analytics", operation, config));

  assert.deepEqual(
    faked,
    expected,
    `the PUBLISHED package produced different bytes for ${operation} than the repo does`,
  );
  console.log(`  ok   ${operation}`);
}

// The ui package is a separate tarball, and js depends on it by its
// published name — so this also proves that dependency resolves.
assert.equal(GOOGLE_ANALYTICS_KINDS.length, 1);
for (const kind of GOOGLE_ANALYTICS_KINDS) {
  const keys = kind.configSchema.map((field) => field.key);
  assert.equal(keys[0], "connection");
  assert.equal(keys[1], "mode");
  assert.ok(kind.outputShape.length > 0, `${kind.name} declares no output shape`);
}
console.log(`  ok   ui kinds resolve from ${"@particle-academy/google-analytics-ui"}`);

console.log(`\n  ${GOLDENS.length} operations verified against the published packages.`);
