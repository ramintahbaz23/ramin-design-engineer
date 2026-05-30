'use client';

import { useEffect, useState } from 'react';
import { useSplash } from '@/contexts/SplashContext';
import {
  fetchLatestProfilePush,
  GITHUB_PROFILE_URL,
  type CommitInfo,
} from '@/lib/github-activity';

function formatTimeAgo(isoDate: string): string {
  const d = new Date(isoDate);
  const now = new Date();
  const sec = Math.floor((now.getTime() - d.getTime()) / 1000);
  if (sec < 60) return 'Last commit just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `Last commit ${min} minute${min === 1 ? '' : 's'} ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `Last commit ${hr} hour${hr === 1 ? '' : 's'} ago`;
  const day = Math.floor(hr / 24);
  return `Last commit ${day} day${day === 1 ? '' : 's'} ago`;
}

function formatWithCommas(n: number): string {
  return n.toLocaleString();
}

export default function GitHubCommitBadge() {
  const { splashDone } = useSplash();
  const [info, setInfo] = useState<CommitInfo | null>(null);

  useEffect(() => {
    if (!splashDone) return;
    if (typeof window !== 'undefined') {
      const cached = sessionStorage.getItem('commit-cache');
      if (cached) {
        try {
          const { sha, date, additions, deletions } = JSON.parse(cached);
          if (
            typeof sha === 'string' &&
            typeof date === 'string' &&
            typeof additions === 'number' &&
            typeof deletions === 'number'
          ) {
            setInfo({ sha, date, additions, deletions });
            return;
          }
        } catch {
          // invalid cache, fall through to fetch
        }
      }
    }

    let cancelled = false;

    async function loadCommit() {
      try {
        const commit = await fetchLatestProfilePush();
        if (!cancelled && commit) {
          setInfo(commit);
        }
      } catch {
        if (!cancelled) setInfo(null);
      }
    }

    loadCommit();
    return () => {
      cancelled = true;
    };
  }, [splashDone]);

  if (!info) return null;

  const timeAgo = formatTimeAgo(info.date);
  const delStr = formatWithCommas(info.deletions);
  const addStr = formatWithCommas(info.additions);

  return (
    <a
      href={GITHUB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: 0,
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: 11,
        color: 'rgba(255,255,255,0.75)',
        textDecoration: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{ color: 'inherit' }}>{info.sha}</span>
      <span style={{ margin: '0 6px', opacity: 0.6 }}>·</span>
      <span style={{ color: 'rgba(248,113,113,0.95)' }}>-{delStr}</span>
      <span style={{ margin: '0 2px', opacity: 0.6 }}> </span>
      <span style={{ color: 'rgba(134,239,172,0.95)' }}>+{addStr}</span>
      <span style={{ margin: '0 6px', opacity: 0.6 }}>·</span>
      <span style={{ color: 'rgba(255,255,255,0.6)' }}>{timeAgo}</span>
    </a>
  );
}
