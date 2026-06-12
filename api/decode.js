// Vercel serverless function: decode the base64url email payload coming from the
// Telegram ref URL (start=REF--<payload>) back into a clean email address.
//
// ManyChat External Request (GET):
//   https://www.tonymars.me/api/decode?p={{tg_ref_payload}}
// Response: { "email": "user@example.com" }  — map $.email to the System Email field.

module.exports = function handler(req, res) {
  const p = (req.query.p || '').toString();
  if (!p) return res.status(400).json({ error: 'missing p' });

  let b64 = p.replace(/-/g, '+').replace(/_/g, '/');
  while (b64.length % 4) b64 += '=';

  let email;
  try {
    email = Buffer.from(b64, 'base64').toString('utf8');
  } catch (err) {
    return res.status(400).json({ error: 'decode failed' });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(422).json({ error: 'decoded value is not an email', value: email });
  }

  return res.status(200).json({ email });
};
