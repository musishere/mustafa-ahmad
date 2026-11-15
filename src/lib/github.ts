export type Contributions = { days: { date: string; level: number }[]; total: string | null };

export function parseContributions(html: string): Contributions {
  const days = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="([0-4])"/g)]
    .map((m) => ({ date: m[1], level: Number(m[2]) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  const total = html.match(/([\d,]+)\s+contributions?\s+in the last year/)?.[1] ?? null;
  return { days, total };
}

// ponytail: GitHub's public calendar HTML, not a stable API; swap for GraphQL + token if the markup changes.
export async function fetchContributions(user: string): Promise<Contributions | null> {
  try {
    const res = await fetch(`https://github.com/users/${user}/contributions`, {
      headers: { 'X-Requested-With': 'XMLHttpRequest' },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const parsed = parseContributions(await res.text());
    return parsed.days.length ? parsed : null;
  } catch {
    return null;
  }
}
