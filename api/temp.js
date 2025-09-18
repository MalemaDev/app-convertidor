// api/temp.js
export default function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { from, value } = req.body ?? {};
  if (from !== 'K' || typeof value !== 'number') return res.status(400).json({ error: 'from must be "K" and value number' });

  const celsius = value - 273.15;
  const fahrenheit = (celsius * 9/5) + 32;

  res.json({ K: value, C: Number(celsius.toFixed(2)), F: Number(fahrenheit.toFixed(2)) });
}
