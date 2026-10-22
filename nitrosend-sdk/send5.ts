/** First send with @nitrosend/sdk. Node 22.18, tsx 4.20, sdk 0.11.7, TypeScript 5.9 strict. */
import { Nitrosend } from '@nitrosend/sdk';
async function main(): Promise<void> {
  const key = process.env.NITROSEND_API_KEY;
  if (!key) throw new Error('NITROSEND_API_KEY is not set');
  const to = process.env.TO_EMAIL ?? 'proof@dogfood.nitrosend.net';
  const ns = new Nitrosend(key);
  const t0 = Date.now();
  const msg = await ns.messages.send({
    channel: 'email', to, subject: 'SDK first send from a script',
    html: '<p>Sent with <code>@nitrosend/sdk</code> by a script, no dashboard.</p>',
  }, `ozma-sdk-first-${t0}`);
  console.log('queued', msg.id, msg.status, `after ${Date.now() - t0}ms`);
  for (let i = 0; i < 8; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    const page = await ns.messages.list({ limit: 1 });
    const latest = page.data?.[0];
    console.log('poll', i + 1, latest?.id, latest?.status);
    if (latest?.id === msg.id && latest.status === 'sent') break;
  }
}
main().catch((e: unknown) => { console.error(e); process.exit(1); });
