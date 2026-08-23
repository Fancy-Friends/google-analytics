/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/report-run.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/report-run.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- google_analytics
 */

/**
 * Google Analytics report — Run a report against a Google Analytics 4
 * property.
 *
 * https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { googleAnalyticsMeta } from "../service.js";

export const GOOGLE_ANALYTICS_REPORT_KIND = "@particle-academy/google_analytics_report";
export const GOOGLE_ANALYTICS_REPORT_OPERATION = "report_run";

export const GOOGLE_ANALYTICS_REPORT_META = googleAnalyticsMeta("action", "run a report", "https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const GOOGLE_ANALYTICS_REPORT_OUTPUT: OutputField[] = [
  {
    "path": "data.rows",
    "type": "array",
    "description": "One entry per combination of dimension values. Each carries dimensionValues and metricValues, in the order requested."
  },
  {
    "path": "data.rowCount",
    "type": "number",
    "description": "Total rows matching the query, which can exceed the rows returned."
  },
  {
    "path": "data.metricHeaders",
    "type": "array",
    "description": "The metrics in the order their values appear in each row -- the only thing that says which number is which."
  }
];

export const googleAnalyticsReportKind: NodeKindDefinition = defineConnectorKind(GOOGLE_ANALYTICS_REPORT_META, {
  name: GOOGLE_ANALYTICS_REPORT_KIND,
  aliases: ["google_analytics_report"],
  label: "Google Analytics report",
  description: "Run a report against a Google Analytics 4 property.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "none",
  outputShape: GOOGLE_ANALYTICS_REPORT_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "property",
      "label": "Property",
      "required": true,
      "default": "properties/",
      "description": "The GA4 property, written as `properties/1234567890`. The numeric id alone is not accepted."
    },
    {
      "type": "text",
      "key": "startDate",
      "label": "Start date",
      "required": true,
      "default": "28daysAgo",
      "description": "YYYY-MM-DD, or a relative form Google accepts such as `28daysAgo`, `yesterday` or `today`."
    },
    {
      "type": "text",
      "key": "endDate",
      "label": "End date",
      "required": true,
      "default": "today",
      "description": "YYYY-MM-DD, or a relative form such as `today`."
    },
    {
      "type": "text",
      "key": "metrics",
      "label": "Metrics",
      "required": true,
      "default": "activeUsers,sessions",
      "description": "Metric names, comma separated. For example activeUsers, sessions, screenPageViews."
    },
    {
      "type": "text",
      "key": "dimensions",
      "label": "Dimensions",
      "default": "date",
      "description": "Dimension names, comma separated. For example date, country, pagePath. Leave empty for a single total row."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(GOOGLE_ANALYTICS_REPORT_META, config as Record<string, unknown>, "run a report"),
});
