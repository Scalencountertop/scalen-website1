────
  try {
    const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':      'application/json',
        'x-api-key':         apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model:      'claude-haiku-4-5-20251001', // Fast & cost-effective for chat
        max_tokens: 512,
        system:     system || '',
        messages:   cleanMessages,
      }),
    });
 
    if (!anthropicRes.ok) {
      const errText = await anthropicRes.text();
      console.error('Anthropic API error:', anthropicRes.status, errText);
      return res.status(anthropicRes.status).json({
        error: `Anthropic API error: ${anthropicRes.status}`,
      });
    }
 
    const data = await anthropicRes.json();
    return res.status(200).json(data);
 
  } catch (err) {
    console.error('Fetch to Anthropic failed:', err);
    return res.status(500).json({ error: 'Failed to reach Anthropic API.' });
  }
}
 
