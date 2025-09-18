  import React, { useState } from 'react';

  const API = import.meta.env.PROD ? '/api' : (import.meta.env.VITE_API_URL || 'http://localhost:4000/api');

  export default function CurrencyConverter() {
    const [value, setValue] = useState(''); const [rates, setRates] = useState({ COP: '', EUR: '' }); const [resu, setResu] = useState(null);
    
    async function convert() {
      const v = Number(value); if (Number.isNaN(v)) return alert('Valor inválido');
      const r = await fetch(`${API}/currency`, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({ from: 'USD', value: v, rates: { ...(rates.COP ? { COP: Number(rates.COP) } : {}), ...(rates.EUR ? { EUR: Number(rates.EUR) } : {}) } }) });
      const text = await r.text(); try{ setResu(JSON.parse(text)); } catch(e){ console.error('No JSON:', text); alert('Respuesta inválida'); }
    }
    return (<div><h2>Moneda (USD → COP, EUR)</h2><input value={value} onChange={e=>setValue(e.target.value)} placeholder="USD" /><div style={{marginTop:8}}><small>Opcional: tipo de cambio</small><br/><input placeholder="COP por USD" value={rates.COP} onChange={e=>setRates(s=>({...s, COP: e.target.value}))} /><input placeholder="EUR por USD" value={rates.EUR} onChange={e=>setRates(s=>({...s, EUR: e.target.value}))} /></div><button onClick={convert} style={{marginTop:8}}>Convertir</button>{resu && <pre>{JSON.stringify(resu,null,2)}</pre>}</div>);
  }
