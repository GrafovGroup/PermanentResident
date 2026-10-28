// Keep delivery on the server so validation, consent and dashboard storage remain intact.
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xdekakne';

export async function notifyFormspree(
  database: D1Database,
  reference: string,
  enquiry: Record<string, unknown>,
  consentVersion: string,
): Promise<'sent' | 'failed'> {
  const {requestId, website, assessment, ...fields} = enquiry;
  let sent = false;
  let status: number | null = null;
  try {
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: {'Content-Type': 'application/json', Accept: 'application/json'},
      redirect: 'error',
      signal: AbortSignal.timeout(10000),
      body: JSON.stringify({
        ...fields,
        reference,
        consentVersion,
        _subject: `PermanentResident.ca — ${enquiry.kind === 'partner' ? 'Professional interest' : 'Enquiry'} — ${reference}`,
        message: enquiry.preferences || 'No additional message.',
        ...(assessment ? {assessment: JSON.stringify(assessment)} : {}),
      }),
    });
    status = response.status;
    const result = await response.json() as {ok?: boolean};
    sent = response.ok && result.ok === true;
  } catch {
    // A delivery failure must never discard an already-saved enquiry.
  }
  try {
    await database.prepare('INSERT INTO audit (id,enquiry_id,actor,action,detail,created_at) VALUES (?,?,?,?,?,?)')
      .bind(crypto.randomUUID(), reference, 'system', sent ? 'formspree_sent' : 'formspree_failed',
        JSON.stringify({status}), new Date().toISOString()).run();
  } catch {
    // Do not ask visitors to resubmit after storage or delivery has succeeded.
    console.error('Formspree delivery audit unavailable', reference);
  }
  return sent ? 'sent' : 'failed';
}
