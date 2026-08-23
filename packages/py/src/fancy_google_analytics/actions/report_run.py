# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/report-run.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/report-run.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_analytics

"""Run a report against a Google Analytics 4 property.

POST /v1beta/{+property}:runReport —
https://developers.google.com/analytics/devguides/reporting/data/v1/rest/v1beta/properties/runReport

This describes the request. `call` resolves the connection, picks the
estate, and either calls Google Analytics or calls the faker.
"""

from __future__ import annotations

from typing import Any
from urllib.parse import quote

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "report_run"
METHOD = "POST"
PATH = "/v1beta/{+property}:runReport"
SIDE_EFFECTS = "none"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the JSON body for one call, failing loudly and specifically."""
    if config.get("property") is None or config.get("property") == "":
        raise ConnectorConfigError(
            "report_run: \"property\" is required (Property)."
        )

    if config.get("startDate") is None or config.get("startDate") == "":
        raise ConnectorConfigError(
            "report_run: \"startDate\" is required (Start date)."
        )

    if config.get("endDate") is None or config.get("endDate") == "":
        raise ConnectorConfigError(
            "report_run: \"endDate\" is required (End date)."
        )

    if config.get("metrics") is None or config.get("metrics") == "":
        raise ConnectorConfigError(
            "report_run: \"metrics\" is required (Metrics)."
        )

    out: dict[str, Any] = {}
    _value = config.get("startDate")
    if _value is None or _value == "":
        raise ConnectorConfigError("report_run: \"startDate\" is required.")

    out["dateRanges.0.startDate"] = str(_value)
    _value = config.get("endDate")
    if _value is None or _value == "":
        raise ConnectorConfigError("report_run: \"endDate\" is required.")

    out["dateRanges.0.endDate"] = str(_value)
    _value = config.get("metrics")
    out["metrics"] = [
        {"name": _item} for _item in _metrics_list(config.get("metrics"))
    ]
    _value = config.get("dimensions")
    if _value is not None and _value != "":
        out["dimensions"] = [
            {"name": _item} for _item in _dimensions_list(config.get("dimensions"))
        ]

    return _nest_fields(out)



def path(config: dict[str, Any]) -> str:
    """The request path, with each config value URL-ENCODED into it.

    `PATH` above is the TEMPLATE, which is what the descriptor advertises;
    this is what a caller sends. A value interpolated raw changes WHICH URL is
    called — a range like `Sheet1!A:B`, or a sheet named `Q1/Q2` — and the
    provider answers 404 about the document rather than about the encoding.
    """
    return (
        "/v1beta/"
        + quote(str(config.get("property") or ""), safe="/")
        + ":runReport"
    )

def report_run(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Run a report against a Google Analytics 4 property."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )



def _nest_fields(flat: dict[str, Any]) -> dict[str, Any]:
    """`{"properties.email": x}` -> `{"properties": {"email": x}}`.

    A dotted `as` means NESTING, and only a JSON body can nest -- in a form body
    that spelling already means a literal dotted key.
    """
    out: dict[str, Any] = {}

    for path, value in flat.items():
        parts = path.split(".")
        node = out

        for key in parts[:-1]:
            found = node.get(key)
            if not isinstance(found, dict):
                found = {}
                node[key] = found
            node = found

        node[parts[-1]] = value

    # The ROOT is always an object -- a JSON body's top level is never a list
    # -- so only its VALUES are converted. That also keeps the return type
    # honest: `_listify` returns Any, and returning it directly is a
    # no-any-return error under mypy --strict.
    return {key: _listify(value) for key, value in out.items()}


def _listify(node: Any) -> Any:
    """A mapping whose keys are 0, 1, 2 ... is an ARRAY, not an object.

    `dateRanges.0.startDate` has to become `[{...}]`. PHP produced the list by
    accident -- its integer-keyed arrays serialise as JSON arrays -- while
    TypeScript and Python produced `{"0": {...}}`, which the provider refuses
    as the wrong type. The parity suite is what caught the disagreement, and
    converting at the END keeps the walk above simple.
    """
    if not isinstance(node, dict):
        return node

    walked = {key: _listify(value) for key, value in node.items()}
    wanted = [str(index) for index in range(len(walked))]

    if walked and list(walked.keys()) == wanted:
        return [walked[key] for key in wanted]

    return walked

def _metrics_list(value: Any) -> list[str]:
    """One value, a ","-separated string, or a list — all end up a list."""
    if isinstance(value, list):
        items = [str(item) for item in value]
    elif isinstance(value, str):
        items = value.split(",")
    else:
        return []

    return [item.strip() for item in items if item.strip()]

def _dimensions_list(value: Any) -> list[str]:
    """One value, a ","-separated string, or a list — all end up a list."""
    if isinstance(value, list):
        items = [str(item) for item in value]
    elif isinstance(value, str):
        items = value.split(",")
    else:
        return []

    return [item.strip() for item in items if item.strip()]