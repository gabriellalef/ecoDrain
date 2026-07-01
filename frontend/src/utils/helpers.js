export const tAgo = (iso) => {
  const m = Math.floor((Date.now() - new Date(iso)) / 60000);
  return m < 60 ? `${m}min` : m < 1440 ? `${Math.floor(m / 60)}h` : `${Math.floor(m / 1440)}d`;
};

export const hav = (a, b, c, d) => {
  const R = 6371, dA = ((c - a) * Math.PI) / 180, dB = ((d - b) * Math.PI) / 180;
  const x = Math.sin(dA / 2) ** 2 + Math.cos(a * Math.PI / 180) * Math.cos(c * Math.PI / 180) * Math.sin(dB / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
};

export const genHist = (nivel) => {
  const now = Date.now();
  return Array.from({ length: 24 }, (_, i) => ({
    t: new Date(now - (23 - i) * 3600000).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
    v: Math.max(0, Math.min(100, nivel + (Math.random() - .5) * 14 - (23 - i) * .35))
  }));
};
