# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- google_analytics

"""Google Analytics, as one service descriptor shared by every Google Analytics
operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

Google Analytics has no sandbox. A report reads a real property's real data
and spends real quota. The faker returns a plausibly-shaped report so a flow
can be built without a Google account.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "google_analytics"
TITLE = "Google Analytics"
SANDBOX = "none"
BASE_URLS = {
    "live": "https://analyticsdata.googleapis.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "accessToken",
    "refreshToken",
    "clientId",
    "clientSecret",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply Google Analytics's auth scheme to an outgoing request.
    
    
    """
    request.headers["Authorization"] = f"Bearer {credentials.get('accessToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The Google Analytics service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
