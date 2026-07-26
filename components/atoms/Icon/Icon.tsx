import React from "react";

export type IconName =
  | "logo"
  | "grid"
  | "users"
  | "wallet"
  | "arrow-down-circle"
  | "arrow-up-circle"
  | "goal"
  | "layers"
  | "chat"
  | "doc"
  | "user"
  | "support"
  | "logout"
  | "globe"
  | "chevron-down"
  | "bell"
  | "arrow-right"
  | "star"
  | "calendar"
  | "vote"
  | "hand-coin"
  | "hash"
  | "tag"
  | "search"
  | "trending-up"
  | "trending-down"
  | "shield-alert"
  | "sparkle";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name, className = "", ...props }) => {
  return (
    <svg
      className={`inline-block align-middle fill-none stroke-current stroke-2 [stroke-linecap:round] [stroke-linejoin:round] ${className}`}
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      {...props}
    >
      {name === "logo" && (
        <>
          <circle cx="9" cy="8" r="3" />
          <path d="M2.5 20c0-3.6 2.9-6.4 6.5-6.4S15.5 16.4 15.5 20" />
          <circle cx="17" cy="9" r="2.3" />
          <path d="M17.5 13.6c2.6.4 4.5 2.6 4.5 5.4" />
        </>
      )}
      {name === "grid" && (
        <>
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="13" width="8" height="8" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </>
      )}
      {name === "users" && (
        <>
          <circle cx="9" cy="8" r="3.2" />
          <path d="M2.5 20c0-3.6 2.9-6.4 6.5-6.4S15.5 16.4 15.5 20" />
          <circle cx="17" cy="9" r="2.4" />
          <path d="M17.5 13.6c2.6.4 4.5 2.6 4.5 5.4" />
        </>
      )}
      {name === "arrow-down-circle" && (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M12 7.5v9" />
          <path d="M8 12.5l4 4 4-4" />
        </>
      )}
      {name === "arrow-up-circle" && (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M12 16.5v-9" />
          <path d="M8 11.5l4-4 4 4" />
        </>
      )}
      {name === "wallet" && (
        <>
          <rect x="2.5" y="6" width="19" height="14" rx="2.3" />
          <path d="M2.5 10.5h19" />
          <circle cx="16.5" cy="14.5" r="1.4" />
        </>
      )}
      {name === "goal" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <circle cx="12" cy="12" r="5" />
          <circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "layers" && (
        <>
          <path d="M12 2.5l9.5 5.2L12 13 2.5 7.7z" />
          <path d="M2.5 12.3l9.5 5.2 9.5-5.2" />
          <path d="M2.5 17l9.5 5.2 9.5-5.2" />
        </>
      )}
      {name === "chat" && (
        <path d="M21 11.5a8.4 8.4 0 01-8.5 8.4 8.4 8.4 0 01-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 01-.9-3.8A8.4 8.4 0 0112.5 3a8.5 8.5 0 018.5 8.5z" />
      )}
      {name === "doc" && (
        <>
          <path d="M6 2.5h8.5L19 7v14.5H6z" />
          <path d="M9 13h6M9 17h6M9 9h3" />
        </>
      )}
      {name === "user" && (
        <>
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
        </>
      )}
      {name === "support" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9a3 3 0 116 0c0 2-3 2-3 5" />
          <circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "logout" && (
        <>
          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </>
      )}
      {name === "globe" && (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="M3 12h18M12 3a13 13 0 010 18M12 3a13 13 0 000 18" />
        </>
      )}
      {name === "chevron-down" && <path d="M6 9l6 6 6-6" />}
      {name === "bell" && (
        <>
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </>
      )}
      {name === "arrow-right" && <path d="M5 12h14M13 6l6 6-6 6" />}
      {name === "star" && <path d="M12 2.5l3 6.6 7 .8-5.2 4.8L18.2 21 12 17.3 5.8 21l1.4-6.3-5.2-4.8 7-.8z" />}
      {name === "calendar" && (
        <>
          <rect x="3" y="4.5" width="18" height="17" rx="2.2" />
          <path d="M16 2.5v4M8 2.5v4M3 10h18" />
        </>
      )}
      {name === "vote" && (
        <>
          <circle cx="12" cy="12" r="9.5" />
          <path d="M7.5 12.3l2.8 2.8 5.7-6" />
        </>
      )}
      {name === "hand-coin" && (
        <>
          <circle cx="8" cy="7" r="3.4" />
          <path d="M2.5 18c0-3 2.5-5.4 5.5-5.4s5.5 2.4 5.5 5.4" />
          <path d="M14 15l4.5 1.2c1 .3 1.5 1.4.9 2.2-.5.7-1.4.9-2.2.6l-3.8-1.4" />
          <path d="M17 13.5l3-1a1.4 1.4 0 011.7 2l-2 1.8" />
        </>
      )}
      {name === "hash" && <path d="M4 9h16M4 15h16M10 3L7 21M17 3l-3 18" />}
      {name === "tag" && (
        <>
          <path d="M20.5 12.5L12 21l-9-9V4h8z" />
          <circle cx="7" cy="8" r="1.4" fill="currentColor" stroke="none" />
        </>
      )}
      {name === "search" && (
        <>
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </>
      )}
      {name === "trending-up" && (
        <>
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </>
      )}
      {name === "trending-down" && (
        <>
          <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
          <polyline points="17 18 23 18 23 12" />
        </>
      )}
      {name === "shield-alert" && (
        <>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </>
      )}
      {name === "sparkle" && (
        <>
          <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" fill="currentColor" stroke="none" />
          <path d="M19 3l.75 2.25L22 6l-2.25.75L19 9l-.75-2.25L16 6l2.25-.75z" fill="currentColor" stroke="none" />
          <path d="M5 17l.5 1.5L7 19l-1.5.5L5 21l-.5-1.5L3 19l1.5-.5z" fill="currentColor" stroke="none" />
        </>
      )}
    </svg>
  );
};
