import React, { useState } from 'react';
import TimeConverter from './components/TimeConverter';
import WeightConverter from './components/WeightConverter';
import TempConverter from './components/TempConverter';
import CurrencyConverter from './components/CurrencyConverter';


export default function App() {
  
  const [tab, setTab] = useState('time');
  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: 20 }}>
      <h1>Convertidor (React + Node 👀)</h1>
      <nav style={{ marginBottom: 20 }}>
        <button onClick={() => setTab('time')}>Tiempo</button>
        <button onClick={() => setTab('weight')}>Peso</button>
        <button onClick={() => setTab('temp')}>Temperatura</button>
        <button onClick={() => setTab('currency')}>Moneda</button>
      </nav>
      <section style={{ border: '1px solid #ddd', padding: 16, borderRadius: 8 }}>
        {tab === 'time' && <TimeConverter />}
        {tab === 'weight' && <WeightConverter />}
        {tab === 'temp' && <TempConverter />}
        {tab === 'currency' && <CurrencyConverter />}
      </section>
    </div>
  );
}
