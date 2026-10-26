#!/usr/bin/env python3
"""Serve the local akka.io copy from build_local.py at http://localhost:8711 with akka.io-style paths."""
import functools
import http.server
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[2] / "_internal" / "product-pages-local"


class Handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parts = urlsplit(self.path)
        path = unquote(parts.path)
        if not path.endswith("/") and (ROOT / path.lstrip("/")).is_dir():
            self.path = path + "/" + (("?" + parts.query) if parts.query else "")
        return super().do_GET()

    def end_headers(self):
        # Rebuilds reuse file names, so every response is fetched fresh.
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, *args):
        pass


handler = functools.partial(Handler, directory=str(ROOT))
http.server.ThreadingHTTPServer(("127.0.0.1", 8711), handler).serve_forever()
