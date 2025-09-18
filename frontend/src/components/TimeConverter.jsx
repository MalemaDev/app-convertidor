import React, { useState } from 'react';
const API = import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:4000/api');
export default function TimeConverter() {
  const [from, setFrom] = useState('hours');
  const [value, setValue] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const convert = async () => {
    const v = Number(value);
    if (Number.isNaN(v)) return alert('Valor inválido');
    setLoading(true);
    try {
      const r = await fetch(`${API}/time`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from, value: v })
      });
      const text = await r.text();
      try { const data = JSON.parse(text); setResult(data); }
      catch(e){ console.error('No JSON recibido:', text); alert('Respuesta inválida del servidor (ver consola).'); }
    } finally { setLoading(false); }
  };
  return (
    <div>
      <h2>Tiempo</h2>
      <label>Convertir desde:
        <select value={from} onChange={e => setFrom(e.target.value)}>
          <option value="hours">Horas → Minutos, Segundos</option>
          <option value="days">Días → Meses, Años</option>
        </select>
      </label>
      <div><input value={value} onChange={e=>setValue(e.target.value)} placeholder="Ingresa número" />
      <button onClick={convert} disabled={loading}>Convertir</button></div>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
