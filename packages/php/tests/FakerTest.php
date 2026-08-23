<?php

declare(strict_types=1);

use ParticleAcademy\GoogleAnalytics\GoogleAnalyticsFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('report_run fakes the shape Google Analytics publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('google_analytics', 'report_run', $config));

    $faked = GoogleAnalyticsFaker::respond('report_run', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'dimensionHeaders' => [
            [
                'name' => 'date',
            ],
        ],
        'metricHeaders' => [
            [
                'name' => 'activeUsers',
                'type' => 'TYPE_INTEGER',
            ],
            [
                'name' => 'sessions',
                'type' => 'TYPE_INTEGER',
            ],
        ],
        'rows' => [
            [
                'dimensionValues' => [
                    [
                        'value' => '20260821',
                    ],
                ],
                'metricValues' => [
                    [
                        'value' => '412',
                    ],
                    [
                        'value' => '530',
                    ],
                ],
            ],
            [
                'dimensionValues' => [
                    [
                        'value' => '20260822',
                    ],
                ],
                'metricValues' => [
                    [
                        'value' => '389',
                    ],
                    [
                        'value' => '501',
                    ],
                ],
            ],
        ],
        'rowCount' => 2,
        'kind' => 'analyticsData#runReport',
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('google_analytics', 'no_such_operation', []));

    expect(fn () => GoogleAnalyticsFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
