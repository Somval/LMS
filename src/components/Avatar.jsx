import React, { useEffect, useState } from "react";
import { api } from "../lib/api";

// Photos are private, so they are fetched with the login token and cached for the session.
const cache = new Map(); // server path -> object URL

export const forgetAvatar = (url) => {
  const blob = cache.get(url);
  if (blob) URL.revokeObjectURL(blob);
  cache.delete(url);
};

const initialsOf = (name = "") =>
  name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("") || "?";

// Shows the person's photo, or their initials when they have none.
// Size and shape come from className (e.g. "h-10 w-10 rounded-full").
export default function Avatar({ name, avatarUrl, className = "", textClassName = "text-sm" }) {
  const [src, setSrc] = useState(avatarUrl ? cache.get(avatarUrl) ?? null : null);

  useEffect(() => {
    let cancelled = false;
    if (!avatarUrl) {
      setSrc(null);
      return undefined;
    }
    if (cache.has(avatarUrl)) {
      setSrc(cache.get(avatarUrl));
      return undefined;
    }
    api
      .fileBlobUrl(avatarUrl)
      .then((blob) => {
        cache.set(avatarUrl, blob);
        if (!cancelled) setSrc(blob);
      })
      .catch(() => !cancelled && setSrc(null));
    return () => {
      cancelled = true;
    };
  }, [avatarUrl]);

  if (src) return <img src={src} alt={name || "Profile photo"} className={`${className} shrink-0 object-cover`} />;
  return (
    <div
      role="img"
      aria-label={name || "Profile photo"}
      className={`${className} flex shrink-0 items-center justify-center bg-indigo-600 font-semibold text-white`}
    >
      <span className={textClassName}>{initialsOf(name)}</span>
    </div>
  );
};
