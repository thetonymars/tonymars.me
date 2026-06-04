// Vercel serverless function: receives email, creates AXL contact, returns Telegram redirect URL.
// Required env var: AXL_TOKEN  (set in Vercel project settings → Environment Variables)

const AXL_TG_BASE = 'https://secure.yellows.one/b/104257/100475';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body || {};
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const token = process.env.AXL_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'AXL_TOKEN not configured' });
  }

  // Create (or find) contact in AXL CRM
  const axlRes = await fetch('https://api.xl.ru/api/v1/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!axlRes.ok) {
    const text = await axlRes.text();
    console.error('AXL error:', axlRes.status, text);
    return res.status(502).json({ error: 'AXL API error', detail: text });
  }

  const contact = await axlRes.json();

  // AXL returns the contact object — adjust the field name if needed after first test
  const contactId = contact.id ?? contact.contact_id ?? contact.data?.id;

  const redirect = contactId
    ? `${AXL_TG_BASE}?cid=${contactId}`
    : AXL_TG_BASE;

  return res.status(200).json({ redirect });
}
