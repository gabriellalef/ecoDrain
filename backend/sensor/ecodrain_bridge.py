"""
ecoDrain – Python Serial Bridge
================================
Reads CSV lines from the ESP32 over USB Serial, authenticates
with the ecoDrain backend, and forwards each reading via HTTP.

Expected serial format (one line every 30 s):
    000001,73

Usage:
    pip install pyserial requests
    python ecodrain_bridge.py
"""

import sys
import time
import logging

import serial          # pip install pyserial
import requests        # pip install requests

# ─────────────────────────────────────────────────────────────
#  CONFIGURATION  ← edit before running
# ─────────────────────────────────────────────────────────────
BACKEND_URL = "http://127.0.0.1:8000"
SERIAL_PORT = "COM1"          # Windows: "COM3", "COM4" …
                               # Linux:   "/dev/ttyUSB0", "/dev/ttyACM0"
                               # macOS:   "/dev/cu.usbserial-…"
BAUD_RATE   = 9600
EMAIL       = "admin@ecodrain.com"
PASSWORD    = "123456"
# ─────────────────────────────────────────────────────────────

# ── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s  %(levelname)-8s  %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
log = logging.getLogger("ecodrain_bridge")


# =============================================================
#  Authentication
# =============================================================

_token: str = ""


def authenticate() -> bool:
    """POST /auth/login and store the JWT.  Returns True on success."""
    global _token
    url = f"{BACKEND_URL}/auth/login"
    payload = {"email": EMAIL, "senha": PASSWORD}

    try:
        resp = requests.post(url, json=payload, timeout=10)
    except requests.exceptions.ConnectionError:
        log.error("Backend unavailable: could not reach %s", url)
        return False
    except requests.exceptions.Timeout:
        log.error("Backend unavailable: request timed out (%s)", url)
        return False

    if resp.status_code == 200:
        data = resp.json()
        _token = data.get("access_token", "")
        if _token:
            log.info("Authenticated successfully")
            return True
        log.error("Authentication failed: response did not contain access_token")
        return False

    log.error(
        "Authentication failed: HTTP %s – %s",
        resp.status_code,
        resp.text[:200],
    )
    return False


# =============================================================
#  Send reading
# =============================================================

def send_reading(codigo: str, nivel: int) -> bool:
    """POST /leituras.  Re-authenticates once on HTTP 401."""
    global _token

    if not _token:
        log.warning("No token available – authenticating…")
        if not authenticate():
            log.error("Failed to send reading: authentication unsuccessful")
            return False

    url     = f"{BACKEND_URL}/leituras"
    headers = {"Authorization": f"Bearer {_token}"}
    payload = {"codigo": codigo, "nivel": nivel}

    try:
        resp = requests.post(url, json=payload, headers=headers, timeout=10)
    except requests.exceptions.ConnectionError:
        log.error("Backend unavailable: could not reach %s", url)
        return False
    except requests.exceptions.Timeout:
        log.error("Backend unavailable: request timed out (%s)", url)
        return False

    # Token expired – re-authenticate and retry once
    if resp.status_code == 401:
        log.warning("Token expired – re-authenticating…")
        _token = ""
        if not authenticate():
            log.error("Failed to send reading: re-authentication unsuccessful")
            return False
        return send_reading(codigo, nivel)   # single retry

    if resp.status_code == 201:
        log.info("Reading sent successfully")
        return True

    log.error(
        "Failed to send reading: HTTP %s – %s",
        resp.status_code,
        resp.text[:200],
    )
    return False


# =============================================================
#  Serial parsing
# =============================================================

def parse_line(raw: str) -> tuple[str, int] | None:
    """
    Parse a line in the format  '000001,73'.
    Returns (codigo, nivel) on success, or None on invalid data.
    """
    line = raw.strip()
    if not line:
        return None

    parts = line.split(",")
    if len(parts) != 2:
        log.warning("Invalid serial data (expected 'CODE,NIVEL'): %r", line)
        return None

    codigo = parts[0].strip()
    if not codigo:
        log.warning("Invalid serial data: empty drain code in %r", line)
        return None

    try:
        nivel = int(parts[1].strip())
    except ValueError:
        log.warning("Invalid serial data: nivel is not an integer in %r", line)
        return None

    if not (0 <= nivel <= 100):
        log.warning("Invalid serial data: nivel %d out of range [0-100]", nivel)
        return None

    return codigo, nivel


# =============================================================
#  Main loop
# =============================================================

def open_serial() -> serial.Serial | None:
    """Open the serial port and return the handle, or None on failure."""
    try:
        ser = serial.Serial(SERIAL_PORT, BAUD_RATE, timeout=1)
        log.info("Connected to %s at %d baud", SERIAL_PORT, BAUD_RATE)
        return ser
    except serial.SerialException as exc:
        log.error("COM port unavailable: %s – %s", SERIAL_PORT, exc)
        return None


def run() -> None:
    # Initial authentication
    if not authenticate():
        log.error("Could not authenticate on startup. Check credentials and backend URL.")
        sys.exit(1)

    ser = None

    while True:
        # (Re-)open serial port if needed
        if ser is None or not ser.is_open:
            ser = open_serial()
            if ser is None:
                log.info("Retrying serial connection in 5 seconds…")
                time.sleep(5)
                continue

        try:
            raw = ser.readline().decode("utf-8", errors="replace")
        except serial.SerialException as exc:
            log.error("Lost connection to %s: %s", SERIAL_PORT, exc)
            ser = None
            continue

        if not raw.strip():
            # Timeout – nothing received this second, just loop
            continue

        log.info("Reading received: %s", raw.strip())

        parsed = parse_line(raw)
        if parsed is None:
            continue

        codigo, nivel = parsed
        send_reading(codigo, nivel)


# =============================================================
if __name__ == "__main__":
    try:
        run()
    except KeyboardInterrupt:
        log.info("Bridge stopped by user.")
