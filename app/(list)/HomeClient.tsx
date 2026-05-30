'use client';

import { useEffect, useCallback } from 'react';
import SplashScreen from '@/components/SplashScreen';
import MobileVideoPreloader from '@/components/MobileVideoPreloader';
import { useSplash } from '@/contexts/SplashContext';
import { fetchLatestProfilePush } from '@/lib/github-activity';

// Prefetch URLs (must match TopBar and GitHubCommitBadge)
const DC_LAT = 38.9072;
const DC_LON = -77.0369;
const OPEN_METEO_URL = `https://api.open-meteo.com/v1/forecast?latitude=${DC_LAT}&longitude=${DC_LON}&current=temperature_2m,weather_code&temperature_unit=fahrenheit`;

export const photoboomMetadata = {
  id: 'photoboom',
  title: 'Photo boom',
  date: 'March 23, 2025',
  cardDate: 'Mar 2025',
  cardDescription: 'An exploding image gallery interaction.',
  href: '/photoboom',
  shareTitle: 'Photo boom — Ramin — Designer',
  shareText: 'An exploding image gallery interaction exploring motion as feedback.',
};

export default function HomeClient() {
  const { splashDone, setSplashDone } = useSplash();

  useEffect(() => {
    (document.activeElement as HTMLElement)?.blur();
  }, []);

  // Prefetch weather and commit during splash so TopBar can read from sessionStorage
  useEffect(() => {
    if (!splashDone) return;
    if (typeof window === 'undefined') return;
    fetch(OPEN_METEO_URL)
      .then((res) => res.json())
      .then((data) => {
        const c = data?.current;
        if (c != null) {
          sessionStorage.setItem(
            'weather-cache',
            JSON.stringify({ temp: Math.round(c.temperature_2m), code: c.weather_code })
          );
        }
      })
      .catch(() => {});
    fetchLatestProfilePush()
      .then((commit) => {
        if (!commit) return;
        sessionStorage.setItem('commit-cache', JSON.stringify(commit));
      })
      .catch(() => {});
  }, [splashDone]);

  useEffect(() => {
    if (localStorage.getItem('leftForWork') === 'true') {
      localStorage.removeItem('leftForWork');
      setSplashDone(true);
    }
  }, [setSplashDone]);

  const handleComplete = useCallback(() => {
    setSplashDone(true);
    if (typeof sessionStorage !== 'undefined') sessionStorage.setItem('splashDone', 'true');
  }, [setSplashDone]);

  // List (CraftPage) is rendered by (list)/layout when splashDone; we only render splash here
  return (
    <>
      {!splashDone && <SplashScreen onComplete={handleComplete} />}
      {splashDone && <MobileVideoPreloader />}
      <div className={!splashDone ? 'splash-hidden' : ''} />
    </>
  );
}
