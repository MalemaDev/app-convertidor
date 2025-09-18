
export default function handler(req, res) {
  
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { from, value } = req.body ?? {};
  if (typeof value !== 'number') return res.status(400).json({ error: 'value must be number' });

  if (from === 'hours') {
    return res.json({
      hours: value,
      minutes: value * 60,
      seconds: value * 3600
    });
  }
  if (from === 'days') {
    return res.json({
      days: value,
      months: value / 30,
      years: value / 365
    });
  }
  return res.status(400).json({ error: 'from must be "hours" or "days"' });
}
