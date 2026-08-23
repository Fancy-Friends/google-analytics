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
 * Run a report against a Google Analytics 4 property.
 *
 * POST /v1beta/{+property}:runReport —
 * https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls Google Analytics or calls the
 * faker.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { GOOGLE_ANALYTICS } from "../service.js";

export const REPORT_RUN_OPERATION = "report_run";

export type ReportRunOptions = {
  /** The node's resolved config. Keys: property, startDate, endDate, metrics, dimensions. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function googleAnalyticsReportRun(options: ReportRunOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.property === undefined || config.property === null || config.property === "") {
    throw new Error(`report_run: "property" is required (Property).`);
  }

  if (config.startDate === undefined || config.startDate === null || config.startDate === "") {
    throw new Error(`report_run: "startDate" is required (Start date).`);
  }

  if (config.endDate === undefined || config.endDate === null || config.endDate === "") {
    throw new Error(`report_run: "endDate" is required (End date).`);
  }

  if (config.metrics === undefined || config.metrics === null || config.metrics === "") {
    throw new Error(`report_run: "metrics" is required (Metrics).`);
  }

  return callConnector(GOOGLE_ANALYTICS, {
    operation: REPORT_RUN_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: `/v1beta/${encodeURI(String(config.property))}:runReport`,
      json: nestFields({
        "dateRanges.0.startDate": String(config.startDate),
        "dateRanges.0.endDate": String(config.endDate),
        "metrics": metricsList(config.metrics).map((item) => ({ "name": item })),
        ...(config.dimensions !== undefined && config.dimensions !== null && config.dimensions !== "" ? { "dimensions": dimensionsList(config.dimensions).map((item) => ({ "name": item })) } : {}),
      }),
    },
  });
}

/**
 * `{"properties.email": x}` -> `{properties: {email: x}}`.
 *
 * A dotted `as` means NESTING, and only a JSON body can nest. The validator
 * refuses that spelling anywhere else, because in a form body it already means
 * something different — a literal dotted key.
 */
function nestFields(flat: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = {};

  for (const [path, value] of Object.entries(flat)) {
    const parts = path.split(".");
    let node = out;

    while (parts.length > 1) {
      const key = parts.shift() as string;
      // A NUMERIC segment is an array index: `dateRanges.0.startDate` has to
      // become `[{startDate}]`, not `{"0": {startDate}}`. PHP produced the
      // array by accident (its integer-keyed arrays serialise as JSON lists)
      // and the other two produced an object, which the provider rejects as
      // the wrong type. The parity suite is what caught the disagreement.
      const wantsArray = /^d+$/.test(parts[0] ?? "");

      if (typeof node[key] !== "object" || node[key] === null) node[key] = wantsArray ? [] : {};
      node = node[key] as Record<string, unknown>;
    }

    node[parts[0] as string] = value;
  }

  return out;
}

/** One value, a ","-separated string, or an array — all end up a list. */
function metricsList(value: unknown): string[] {
  const items = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value.split(",")
      : [];

  return items.map((item) => item.trim()).filter(Boolean);
}

/** One value, a ","-separated string, or an array — all end up a list. */
function dimensionsList(value: unknown): string[] {
  const items = Array.isArray(value)
    ? value.map(String)
    : typeof value === "string"
      ? value.split(",")
      : [];

  return items.map((item) => item.trim()).filter(Boolean);
}
