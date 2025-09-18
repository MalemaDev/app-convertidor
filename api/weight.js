
export default function handler(req, res) {

  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { from, value } = req.body ?? {};
  if (from !== 'kg' || typeof value !== 'number') return res.status(400).json({ error: 'from must be "kg" and value number' });

  const pounds = value * 2.2046226218;
  const grams = value * 1000;

  res.json({ kg: value, pounds: Number(pounds.toFixed(6)), grams: Number(grams.toFixed(2)) });
}
