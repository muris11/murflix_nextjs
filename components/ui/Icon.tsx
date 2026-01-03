import { SVGProps, ReactNode } from "react";

export type IconName =
  | "play"
  | "pause"
  | "stop"
  | "plus"
  | "minus"
  | "check"
  | "x"
  | "chevron-left"
  | "chevron-right"
  | "chevron-up"
  | "chevron-down"
  | "search"
  | "user"
  | "settings"
  | "logout"
  | "home"
  | "film"
  | "tv"
  | "heart"
  | "heart-filled"
  | "thumbs-up"
  | "thumbs-down"
  | "info"
  | "volume"
  | "volume-mute"
  | "fullscreen"
  | "fullscreen-exit"
  | "menu"
  | "bell"
  | "star"
  | "clock"
  | "calendar"
  | "globe"
  | "external-link"
  | "spinner";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconName;
  size?: number | string;
  className?: string;
}

const iconPaths: Record<IconName, ReactNode> = {
  play: <path d="M8 5v14l11-7z" />,
  pause: (
    <>
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </>
  ),
  stop: <rect x="4" y="4" width="16" height="16" rx="2" />,
  plus: <path d="M12 5v14m-7-7h14" strokeWidth="2" strokeLinecap="round" />,
  minus: <path d="M5 12h14" strokeWidth="2" strokeLinecap="round" />,
  check: <path d="M20 6L9 17l-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  x: (
    <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  "chevron-left": <path d="M15 18l-6-6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "chevron-right": <path d="M9 18l6-6-6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "chevron-up": <path d="M18 15l-6-6-6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "chevron-down": <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  search: (
    <>
      <circle cx="11" cy="11" r="8" strokeWidth="2" />
      <path d="M21 21l-4.35-4.35" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  user: (
    <>
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" strokeWidth="2" />
    </>
  ),
  settings: (
    <path d="M12 15a3 3 0 100-6 3 3 0 000 6z M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeWidth="2" />
  ),
  logout: (
    <>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17l5-5-5-5M21 12H9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  home: (
    <>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9 22V12h6v10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  film: (
    <>
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" strokeWidth="2" />
      <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" strokeWidth="2" />
    </>
  ),
  tv: (
    <>
      <rect x="2" y="7" width="20" height="15" rx="2" ry="2" strokeWidth="2" />
      <path d="M17 2l-5 5-5-5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  heart: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "heart-filled": <path fill="currentColor" d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />,
  "thumbs-up": <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  "thumbs-down": <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3zm7-13h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  info: (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 16v-4M12 8h.01" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  volume: (
    <>
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "volume-mute": (
    <>
      <path d="M11 5L6 9H2v6h4l5 4V5z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M23 9l-6 6M17 9l6 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  fullscreen: (
    <>
      <path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  "fullscreen-exit": (
    <>
      <path d="M4 14h3a2 2 0 012 2v3M20 10h-3a2 2 0 01-2-2V5M14 20v-3a2 2 0 012-2h3M10 4v3a2 2 0 01-2 2H5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  menu: (
    <>
      <path d="M3 12h18M3 6h18M3 18h18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  bell: <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" strokeWidth="2" />
    </>
  ),
  "external-link": (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  spinner: (
    <path d="M12 2v4m0 12v4m10-10h-4M6 12H2m15.07-5.07l-2.83 2.83M9.76 14.24l-2.83 2.83m11.14 0l-2.83-2.83M9.76 9.76L6.93 6.93" strokeWidth="2" strokeLinecap="round" />
  ),
};

// Icons that should use stroke instead of fill
const strokeIcons: IconName[] = [
  "plus", "minus", "check", "x",
  "chevron-left", "chevron-right", "chevron-up", "chevron-down",
  "search", "user", "settings", "logout", "home", "film", "tv",
  "heart", "thumbs-up", "thumbs-down", "info",
  "volume", "volume-mute", "fullscreen", "fullscreen-exit",
  "menu", "bell", "star", "clock", "calendar", "globe", "external-link", "spinner"
];

export default function Icon({
  name,
  size = 24,
  className = "",
  ...props
}: IconProps) {
  const isStroke = strokeIcons.includes(name);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isStroke ? "none" : "currentColor"}
      stroke={isStroke ? "currentColor" : "none"}
      strokeWidth={isStroke ? 2 : 0}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`inline-block flex-shrink-0 ${className}`}
      aria-hidden="true"
      {...props}
    >
      {iconPaths[name]}
    </svg>
  );
}

// Named exports for common icons
export function PlayIcon(props: Omit<IconProps, "name">) {
  return <Icon name="play" {...props} />;
}

export function SearchIcon(props: Omit<IconProps, "name">) {
  return <Icon name="search" {...props} />;
}

export function MenuIcon(props: Omit<IconProps, "name">) {
  return <Icon name="menu" {...props} />;
}

export function CloseIcon(props: Omit<IconProps, "name">) {
  return <Icon name="x" {...props} />;
}

export function ChevronLeftIcon(props: Omit<IconProps, "name">) {
  return <Icon name="chevron-left" {...props} />;
}

export function ChevronRightIcon(props: Omit<IconProps, "name">) {
  return <Icon name="chevron-right" {...props} />;
}

export function UserIcon(props: Omit<IconProps, "name">) {
  return <Icon name="user" {...props} />;
}

export function BellIcon(props: Omit<IconProps, "name">) {
  return <Icon name="bell" {...props} />;
}

export function SpinnerIcon(props: Omit<IconProps, "name">) {
  return <Icon name="spinner" className={`animate-spin ${props.className || ""}`} {...props} />;
}
