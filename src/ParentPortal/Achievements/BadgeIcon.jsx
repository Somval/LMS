import React from "react";
import { Award } from "lucide-react";

// An achievement's icon can be an image link or an emoji/text. With neither, a fallback icon is drawn.
export default function BadgeIcon({
  icon,
  title,
  className = "w-full h-full object-contain rounded-full",
  textClass = "text-4xl",
  Fallback = Award,
  fallbackClass = "w-1/2 h-1/2 text-blue-600",
}) {
  if (icon && /^(https?:\/\/|\/)/.test(icon)) {
    return <img src={icon} alt={title} className={className} />;
  }
  if (icon) {
    return (
      <span aria-hidden="true" className={`${textClass} leading-none`}>
        {icon}
      </span>
    );
  }
  return <Fallback aria-hidden="true" className={fallbackClass} />;
}
