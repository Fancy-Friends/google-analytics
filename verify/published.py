"""
Google Analytics — the published PyPI wheel.

GENERATED — do not edit. Fix weaver's template/ and regenerate.

Runs against the PUBLISHED wheel, installed by name into a fresh venv.
Every other test here imports from ../src and cannot see the packaging —
a missing py.typed or an unshipped module passes there and breaks for
every user.
"""

from importlib.metadata import requires

from fancy_google_analytics._fake import FakeValues, seed_for_call
from fancy_google_analytics.faker import respond

GOLDENS = [
    {
        "operation": "report_run",
        "config": {},
        "expected": {
            "dimensionHeaders": [
                {
                    "name": "date",
                },
            ],
            "metricHeaders": [
                {
                    "name": "activeUsers",
                    "type": "TYPE_INTEGER",
                },
                {
                    "name": "sessions",
                    "type": "TYPE_INTEGER",
                },
            ],
            "rows": [
                {
                    "dimensionValues": [
                        {
                            "value": "20260821",
                        },
                    ],
                    "metricValues": [
                        {
                            "value": "412",
                        },
                        {
                            "value": "530",
                        },
                    ],
                },
                {
                    "dimensionValues": [
                        {
                            "value": "20260822",
                        },
                    ],
                    "metricValues": [
                        {
                            "value": "389",
                        },
                        {
                            "value": "501",
                        },
                    ],
                },
            ],
            "rowCount": 2,
            "kind": "analyticsData#runReport",
        },
    },
]


def main() -> None:
    # Zero runtime dependencies is a design constraint, checked on the
    # INSTALLED distribution rather than on the pyproject that claimed it.
    declared = requires("fancy-google-analytics")
    assert not declared, f"expected no runtime dependencies, got {declared}"
    print("  ok   zero runtime dependencies on the installed distribution")

    for golden in GOLDENS:
        operation, config = golden["operation"], golden["config"]
        fake = FakeValues(seed_for_call("google_analytics", operation, config))
        faked = respond(operation, {"config": config, "fake": fake})

        assert faked == golden["expected"], (
            f"the PUBLISHED wheel produced different bytes for {operation} than the repo does"
        )
        print(f"  ok   {operation}")

    print(f"\n  {len(GOLDENS)} operations verified against the published wheel.")


if __name__ == "__main__":
    main()
