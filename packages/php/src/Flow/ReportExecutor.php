<?php

declare(strict_types=1);

namespace ParticleAcademy\GoogleAnalytics\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\GoogleAnalytics\Actions\ReportRun;
use ParticleAcademy\GoogleAnalytics\GoogleAnalytics;

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
 * Google Analytics report, run on a fancy-flow-php host.
 *
 * The PHP twin of `googleAnalyticsReportExecutor` in
 * @particle-academy/google-analytics-js: the same request, built from the
 * node's config by the same `Actions\ReportRun` a host would call directly,
 * and the same value on `out` — the client's `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than Google Analytics. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/google_analytics_report',
    aliases: [
        'google_analytics_report',
    ],
    category: 'io',
    label: 'Google Analytics report',
    description: 'Run a report against a Google Analytics 4 property.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'none',
    outputShape: [
        [
            'path' => 'data.rows',
            'type' => 'array',
            'description' => 'One entry per combination of dimension values. Each carries dimensionValues and metricValues, in the order requested.',
        ],
        [
            'path' => 'data.rowCount',
            'type' => 'number',
            'description' => 'Total rows matching the query, which can exceed the rows returned.',
        ],
        [
            'path' => 'data.metricHeaders',
            'type' => 'array',
            'description' => 'The metrics in the order their values appear in each row -- the only thing that says which number is which.',
        ],
    ],
)]
final class ReportExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            GoogleAnalytics::descriptor(),
            ReportRun::OPERATION,
            $config,
            [
                'method' => ReportRun::METHOD,
                'path' => ReportRun::path($config),
                'json' => ReportRun::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'google_analytics report_run'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
