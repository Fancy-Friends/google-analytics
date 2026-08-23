<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleAnalytics\Actions;

use ParticleAcademy\GoogleAnalytics\GoogleAnalytics;
use ParticleAcademy\Connectors\ConnectorConfigException;

/*
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
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls Google Analytics or calls the faker.
 */
final class ReportRun
{
    public const OPERATION = 'report_run';
    public const METHOD = 'POST';
    public const PATH = '/v1beta/{+property}:runReport';
    public const SIDE_EFFECTS = 'none';

    /**
     * Build the JSON body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from Google Analytics.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function body(array $config): array
    {
        if (($config['property'] ?? null) === null || ($config['property'] ?? null) === '') {
            throw new ConnectorConfigException('report_run: "property" is required (Property).');
        }

        if (($config['startDate'] ?? null) === null || ($config['startDate'] ?? null) === '') {
            throw new ConnectorConfigException('report_run: "startDate" is required (Start date).');
        }

        if (($config['endDate'] ?? null) === null || ($config['endDate'] ?? null) === '') {
            throw new ConnectorConfigException('report_run: "endDate" is required (End date).');
        }

        if (($config['metrics'] ?? null) === null || ($config['metrics'] ?? null) === '') {
            throw new ConnectorConfigException('report_run: "metrics" is required (Metrics).');
        }

        $body = [];

        $value = $config['startDate'] ?? null;
        $body['dateRanges.0.startDate'] = (string) $value;

        $value = $config['endDate'] ?? null;
        $body['dateRanges.0.endDate'] = (string) $value;

        $value = $config['metrics'] ?? null;
        $body['metrics'] = array_map(static fn ($item) => ['name' => $item], self::metricsList($config['metrics'] ?? null));

        $value = $config['dimensions'] ?? null;
        if ($value !== null && $value !== '') {
            $body['dimensions'] = array_map(static fn ($item) => ['name' => $item], self::dimensionsList($config['dimensions'] ?? null));
        }

        return self::nestFields($body);
    }

    /**
     * The request path, with each config value URL-ENCODED into it.
     *
     * `PATH` above is the TEMPLATE, which is what the descriptor advertises;
     * this is what a caller sends. A value interpolated raw changes which URL
     * is called — a range like `Sheet1!A:B` or a sheet named `Q1/Q2` — and the
     * provider answers 404 about the document rather than about the encoding.
     *
     * @param array<string,mixed> $config
     */
    public static function path(array $config): string
    {
        return '/v1beta/'.str_replace('%2F', '/', rawurlencode((string) ($config['property'] ?? ''))).':runReport';
    }

    /**
     * `['properties.email' => x]` -> `['properties' => ['email' => x]]`.
     *
     * A dotted `as` means NESTING, and only a JSON body can nest — in a form
     * body that spelling already means a literal dotted key.
     *
     * @param  array<string,mixed>  $flat
     * @return array<string,mixed>
     */
    private static function nestFields(array $flat): array
    {
        $out = [];

        foreach ($flat as $path => $value) {
            $parts = explode('.', (string) $path);
            $node = &$out;

            while (count($parts) > 1) {
                $key = array_shift($parts);

                if (! isset($node[$key]) || ! is_array($node[$key])) {
                    $node[$key] = [];
                }

                $node = &$node[$key];
            }

            $node[$parts[0]] = $value;
            unset($node);
        }

        return $out;
    }

    /** One value, a ,-separated string, or an array — all end up a list. @return list<string> */
    private static function metricsList(mixed $value): array
    {
        if (is_array($value)) {
            $items = array_map(static fn (mixed $item): string => (string) $item, $value);
        } elseif (is_string($value)) {
            $items = explode(',', $value);
        } else {
            return [];
        }

        $items = array_map(trim(...), $items);

        return array_values(array_filter($items, static fn (string $item): bool => $item !== ''));
    }

    /** One value, a ,-separated string, or an array — all end up a list. @return list<string> */
    private static function dimensionsList(mixed $value): array
    {
        if (is_array($value)) {
            $items = array_map(static fn (mixed $item): string => (string) $item, $value);
        } elseif (is_string($value)) {
            $items = explode(',', $value);
        } else {
            return [];
        }

        $items = array_map(trim(...), $items);

        return array_values(array_filter($items, static fn (string $item): bool => $item !== ''));
    }
}
