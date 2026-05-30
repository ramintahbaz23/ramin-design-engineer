export const GITHUB_USERNAME = 'ramintahbaz';
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;
const EVENTS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`;

export type CommitInfo = {
  sha: string;
  date: string;
  additions: number;
  deletions: number;
};

type PushEvent = {
  type: string;
  created_at?: string;
  repo?: { name?: string };
  payload?: { head?: string };
};

export async function fetchLatestProfilePush(): Promise<CommitInfo | null> {
  const eventsRes = await fetch(EVENTS_URL);
  if (!eventsRes.ok) return null;

  const events = (await eventsRes.json()) as PushEvent[];
  const push = events.find((event) => event.type === 'PushEvent' && event.payload?.head && event.repo?.name);
  if (!push?.payload?.head || !push.repo?.name) return null;

  const fullSha = push.payload.head;
  const commitRes = await fetch(
    `https://api.github.com/repos/${push.repo.name}/commits/${fullSha}`
  );
  if (!commitRes.ok) return null;

  const commitData = await commitRes.json();
  const stats = commitData.stats ?? {};
  const additions = typeof stats.additions === 'number' ? stats.additions : 0;
  const deletions = typeof stats.deletions === 'number' ? stats.deletions : 0;
  const date =
    (commitData.commit?.author?.date as string | undefined) ||
    push.created_at ||
    '';

  return {
    sha: fullSha.slice(0, 7),
    date,
    additions,
    deletions,
  };
}
