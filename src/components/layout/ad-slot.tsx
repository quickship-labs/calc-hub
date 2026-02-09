'use client';
import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';

interface AdSlotProps {
  slot?: string;
  format?: string;
  className?: string;
}

export function AdSlot({ slot = 'auto', format = 'auto', className = '' }: AdSlotProps) {
  useEffect(() => {
    if (!siteConfig.adsensePublisherId) return;
    try {
      const w = window as unknown as { adsbygoogle: Record<string, unknown>[] };
      (w.adsbygoogle = w.adsbygoogle || []).push({});
    } catch (_e) {}
  }, []);

  if (!siteConfig.adsensePublisherId) {
    return (
      <div className={`bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm my-6 ${className}`}>
        Ad Space
      </div>
    );
  }

  return (
    <div className={`my-6 ${className}`}>
      <ins className="adsbygoogle" style={{ display: 'block' }}
        data-ad-client={siteConfig.adsensePublisherId}
        data-ad-slot={slot} data-ad-format={format}
        data-full-width-responsive="true" />
    </div>
  );
}
