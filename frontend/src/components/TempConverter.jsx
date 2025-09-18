import React, { useState } from 'react';
const API = import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:4000/api');
export default function TempConverter() {
  const [value, setValue] = useState(''); const [resu, setResu] = useState(null);
  async function convert() {
    const v = Number(value); if (Number.isNaN(v)) return alert('Valor inválido');
    const r = await fetch(`${API}/temp`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ from: 'K', value: v }) });
    const text = await r.text(); try{ setResu(JSON.parse(text)); } catch(e){ console.error('No JSON:', text); alert('Respuesta inválida'); }
  }
  return (<div><h2>Temperatura (K → F, C)</h2><input value={value} onChange={e=>setValue(e.target.value)} placeholder="Kelvin" /><button onClick={convert}>Convertir</button>{resu && <pre>{JSON.stringify(resu,null,2)}</pre>}</div>);
}
