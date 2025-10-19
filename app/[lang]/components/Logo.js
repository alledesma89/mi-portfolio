"use client";

import React, { useState } from 'react';

// Small helper to render logos consistently.
// Uses a plain <img> to avoid Next/Image optimization quirks with SVGs
export default function Logo({ src, alt = '', size = 56, className = '', frame = true, fit = 'contain', circle = false }) {
  // Ensure we use absolute URLs on the client to avoid relative resolution
  const makeAbsolute = (s) => {
    if (!s) return s;
    if (typeof window === 'undefined') return s;
    try {
      // Normalize path: remove any leading locale segment like /es/ or /en/
      let pathname = s;
      // Remove origin if present
      try {
        const parsed = new URL(s, window.location.origin);
        pathname = parsed.pathname + parsed.search + parsed.hash;
      } catch (e) {
        // leave as-is
      }
      // Strip leading locale segment: /es/... or /en/...
      pathname = pathname.replace(/^\/[a-z]{2}(?=\/)/, '');
      const url = new URL(pathname, window.location.origin);
      return url.href;
    } catch (e) {
      return s;
    }
  };

  // Initialize with raw src to keep server and client HTML consistent.
  const [currentSrc, setCurrentSrc] = useState(src);
  const [attempt, setAttempt] = useState(0);
  // Compute absolute URL only on client after mount to avoid SSR/CSR mismatch
  React.useEffect(() => {
    const abs = makeAbsolute(src);
    setCurrentSrc(abs);
    // reset attempt so tryAlternatives will consider fallbacks from absolute
    setAttempt(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);
  const [loaded, setLoaded] = useState(false);

  const wrapperSize = typeof size === 'number' ? size : size;

  // For circular avatars we want the image to occupy the full square of `size`.
  // For inline logos we allow the image to scale down preserving aspect ratio.
  let style;
  let innerMax;
  if (circle) {
    style = {
      width: wrapperSize,
      height: wrapperSize,
      objectFit: fit,
      display: 'block',
      objectPosition: 'center',
      borderRadius: '50%',
    };
    // allow the image to fill the given size for avatars
    innerMax = wrapperSize;
  } else {
    style = {
      width: 'auto',
      maxWidth: wrapperSize,
      height: 'auto',
      objectFit: fit,
      display: 'block',
      margin: '0 auto',
      objectPosition: 'center',
    };
    // calculate a sensible inner max to avoid logos overflowing small pills
    innerMax = (typeof size === 'number' ? Math.max(size - 16, 24) : 40);
  }

  const tryAlternatives = () => {
    // Try a set of fallbacks deterministically
    const original = src || '';
    const fallbacks = [];
    // 1) absolute origin + original (handles leading slash or not)
    if (typeof window !== 'undefined') fallbacks.push(makeAbsolute(original));
    // 2) absolute origin + '/media/...' as a safe default (if original was just filename)
    if (typeof window !== 'undefined' && !original.includes('/media/')) {
      const maybe = '/media/' + original.replace(/^\//, '');
      fallbacks.push(makeAbsolute(maybe));
    }
    // 3) finally try original
    fallbacks.push(original);

    if (attempt < fallbacks.length) {
      const next = fallbacks[attempt];
      console.warn(`[Logo] trying fallback src (#${attempt + 1}):`, next);
      setCurrentSrc(next);
      setAttempt((a) => a + 1);
    } else {
      console.warn('[Logo] all fallbacks exhausted for', src);
      setCurrentSrc(null);
    }
  };

  const isDev = typeof process !== 'undefined' ? process.env.NODE_ENV !== 'production' : true;

  if (!currentSrc) {
    return (
      <div style={{ display: 'inline-block', width: size, textAlign: 'center' }} className={className}>
        <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: 6 }}>
          <svg width={size * 0.6} height={size * 0.6} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" rx="4" fill="#e5e7eb" />
            <path d="M6 12h12M6 8h12M6 16h8" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'inline-block', textAlign: 'center' }} className={className}>
      {/* eslint-disable-next-line jsx-a11y/img-redundant-alt */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: circle ? wrapperSize : 'auto', height: circle ? wrapperSize : 'auto' }}>
      <img
        src={currentSrc}
        alt={alt || 'logo'}
        style={{
          ...style,
          filter: loaded ? 'none' : undefined,
          background: frame ? '#fff' : 'transparent',
          border: frame ? '1px solid #e5e7eb' : 'none',
          borderRadius: circle ? '50%' : (frame ? 6 : 0),
          overflow: 'hidden',
          maxWidth: innerMax,
          maxHeight: innerMax,
          display: 'block',
          objectPosition: 'center',
        }}
        loading="lazy"
        onError={() => tryAlternatives()}
        onLoad={() => setLoaded(true)}
      />
      </div>
      {/* Debug URL removed to avoid showing host in UI; use console logs if needed */}
    </div>
  );
}
