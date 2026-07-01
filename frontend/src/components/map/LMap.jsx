import { useEffect, useRef, useCallback } from "react";

export default function LMap({ bueiros, trabalhadores, filter, search, onSelect, showW }) {
  const ref = useRef(null);
  const map = useRef(null);
  const mks = useRef([]);
  const wmks = useRef([]);
  const L = useRef(null);

  useEffect(() => {
    if (!ref.current || map.current) return;
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    s.onload = () => {
      if(!document.getElementById('leaflet-css')) {
        const lnk = document.createElement("link");
        lnk.id = 'leaflet-css';
        lnk.rel = "stylesheet";
        lnk.href = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
        document.head.appendChild(lnk);
      }
      L.current = window.L;
      // Using a more elegant dark map tile layer
      const m = L.current.map(ref.current, { center: [-23.5489, -46.6388], zoom: 12, zoomControl: false, attributionControl: false });
      
      // CartoDB Dark Matter for a sleek look
      L.current.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", { maxZoom: 19 }).addTo(m);
      map.current = m; 
      render();
    };
    document.head.appendChild(s);
    return () => { if (map.current) { map.current.remove(); map.current = null; } };
  }, []);

  const render = useCallback(() => {
    if (!map.current || !L.current) return;
    mks.current.forEach(m => m.remove()); mks.current = [];
    wmks.current.forEach(m => m.remove()); wmks.current = [];
    
    const cols = { vazio: "#34d399", metade: "#fbbf24", cheio: "#f87171" };
    
    const filtered = bueiros.filter(b => 
      (filter === "all" || b.status === filter) &&
      (!search || (b.codigo.includes(search) || b.end.toLowerCase().includes(search.toLowerCase()) || b.bairro.toLowerCase().includes(search.toLowerCase())))
    );
    
    filtered.forEach(b => {
      const c = cols[b.status];
      const isCrit = b.status === "cheio";
      const anim = isCrit ? `animation: pulseMarker 2s ease-out infinite;` : "";
      
      // Professional GIS marker style
      const ic = L.current.divIcon({
        className: "",
        html: `
          <style>@keyframes pulseMarker{0%{box-shadow:0 0 0 0 ${c}80}70%{box-shadow:0 0 0 10px transparent}100%{box-shadow:0 0 0 0 transparent}}</style>
          <div style="width:20px;height:20px;border-radius:50%;background:${c};border:3px solid var(--bg-surface);display:flex;align-items:center;justify-content:center;cursor:pointer;${anim}" title="${b.codigo}">
          </div>
        `,
        iconSize: [20, 20], iconAnchor: [10, 10]
      });
      
      const mk = L.current.marker([b.lat, b.lng], { icon: ic }).addTo(map.current);
      mk.on("click", () => onSelect && onSelect(b));
      mks.current.push(mk);
    });
    
    if (showW && trabalhadores) {
      trabalhadores.filter(t => t.status === "online").forEach(t => {
        const ic = L.current.divIcon({
          className: "",
          html: `<div style="width:24px;height:24px;border-radius:4px;background:#3b82f6;border:2px solid var(--bg-surface);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:bold;color:#fff">W</div>`,
          iconSize: [24, 24], iconAnchor: [12, 12]
        });
        wmks.current.push(L.current.marker([t.lat, t.lng], { icon: ic }).addTo(map.current));
      });
    }
  }, [bueiros, trabalhadores, filter, search, onSelect, showW]);

  useEffect(() => { render(); }, [render]);

  return <div ref={ref} style={{ width: "100%", height: "100%", background: "var(--bg-main)" }} />;
}
