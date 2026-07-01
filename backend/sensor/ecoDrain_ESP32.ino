// =============================================================
//  ecoDrain – ESP32 Sketch (Serial Bridge Architecture)
//  Reads the ultrasonic sensor and outputs one CSV line every
//  30 seconds over USB Serial. No Wi-Fi, no HTTP, no auth.
// =============================================================

// ─────────────────────────────────────────────────────────────
//  CONFIGURATION  ← only change DRAIN_CODE before uploading
// ─────────────────────────────────────────────────────────────
const char* DRAIN_CODE = "000001";   // bueiro.codigo registered in the backend
// ─────────────────────────────────────────────────────────────

#include <Ultrasonic.h>

// ── Sensor (do NOT change) ────────────────────────────────────
Ultrasonic leitor(12, 13);

const int altura    = 40;
const int zonaMorta = 21;
const int areaLivre = altura - zonaMorta;
// ─────────────────────────────────────────────────────────────

unsigned long lastSendMs = 0;
const unsigned long SEND_INTERVAL_MS = 30000UL;   // 30 seconds

// =============================================================
void setup() {
  Serial.begin(9600);
}

// =============================================================
void loop() {
  // ── Sensor reading (original logic, unchanged) ─────────────
  int leitura   = leitor.read();
  int distancia = leitura - zonaMorta;

  float porcentagem = 100 - (((float)distancia / areaLivre) * 100);

  if (porcentagem < 0)   porcentagem = 0;
  if (porcentagem > 100) porcentagem = 100;

  // ── Send one line every 30 seconds ─────────────────────────
  // Format: <drain_code>,<percentage_integer>
  // Example: 000001,73
  unsigned long now = millis();
  if (now - lastSendMs >= SEND_INTERVAL_MS) {
    lastSendMs = now;
    Serial.print(DRAIN_CODE);
    Serial.print(",");
    Serial.println((int)porcentagem);
  }

  delay(200);
}
