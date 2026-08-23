<?php

declare(strict_types=1);

/*
 * Google Analytics — the published Composer package.
 *
 * GENERATED — do not edit. Fix weaver's template/ and regenerate.
 *
 * This runs against the PUBLISHED package, installed by name from the
 * registry into a project that has never seen this repo. Every other test
 * here imports from ../src and therefore cannot see the packaging.
 */

$autoload = getcwd().'/vendor/autoload.php';

if (! is_file($autoload)) {
    fwrite(STDERR, 'No vendor/autoload.php in '.getcwd().PHP_EOL);
    fwrite(STDERR, 'Run this from a project that has composer-required the published package:'.PHP_EOL);
    fwrite(STDERR, '    composer require particle-academy/google-analytics-php'.PHP_EOL);
    exit(2);
}

require $autoload;

use ParticleAcademy\Connectors\FakeValues;
use ParticleAcademy\GoogleAnalytics\GoogleAnalyticsFaker;

$goldens = [
    [
        'operation' => 'report_run',
        'config' => [],
        'expected' => [
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
        ],
    ],
];

foreach ($goldens as $golden) {
    $operation = $golden['operation'];
    $config = $golden['config'];

    $fake = new FakeValues(FakeValues::seedForCall('google_analytics', $operation, $config));
    $faked = GoogleAnalyticsFaker::respond($operation, ['config' => $config, 'fake' => $fake]);

    if ($faked !== $golden['expected']) {
        fwrite(STDERR, "the PUBLISHED package produced different bytes for {$operation}\n");
        fwrite(STDERR, '  got:      '.json_encode($faked)."\n");
        fwrite(STDERR, '  expected: '.json_encode($golden['expected'])."\n");
        exit(1);
    }

    echo "  ok   {$operation}\n";
}

echo "\n  ".count($goldens)." operations verified against the published package.\n";
