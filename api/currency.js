
export default function handler(req, res) {
  
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { from, value, rates } = req.body ?? {};
  if (from !== 'USD' || typeof value !== 'number') return res.status(400).json({ error: 'from must be "USD" and value number' });

  const fallback = { COP: 4700, EUR: 0.92 };
  const used = Object.assign({}, fallback, rates || {});

  const toCOP = value * used.COP;
  const toEUR = value * used.EUR;

  res.json({
    USD: value,
    PESOS_COP: Number(toCOP.toFixed(2)),
    EUR: Number(toEUR.toFixed(4)),
    usedRates: used
  });
}
