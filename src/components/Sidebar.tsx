"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiBookOpen,
  FiHelpCircle,
  FiHome,
  FiLogIn,
  FiLogOut,
  FiSearch,
  FiSettings,
  FiStar,
} from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useReader } from "@/context/ReaderContext";

const navItems = [
  { label: "For you", href: "/for-you", icon: FiHome },
  { label: "My Library", href: "/library", icon: FiBookOpen },
  { label: "Highlights", href: null, icon: FiStar },
  { label: "Search", href: null, icon: FiSearch },
  { label: "Settings", href: "/settings", icon: FiSettings },
  { label: "Help & Support", href: null, icon: FiHelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, openAuthModal, user } = useAuth();
  const { readerSize, setReaderSize } = useReader();
  const isPlayerPage = pathname.startsWith("/player/");
  const readerOptions = [
    { label: "Small text", size: "small", text: "Aᵃ" },
    { label: "Default text", size: "medium", text: "Aₐ" },
    { label: "Large text", size: "large", text: "Aɑ" },
    { label: "Extra large text", size: "xlarge", text: "Aɑ" },
  ] as const;

  return (
    <aside className="sidebar">
      <Link className="sidebar__logo" href="/">
        <Image src="/assets/logo.png" alt="Summarist" width={495} height={114} />
      </Link>

      <nav className="sidebar__nav" aria-label="Primary">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href === pathname;
          const className = `sidebar__link ${
            isActive ? "sidebar__link--active" : ""
          } ${item.href ? "" : "sidebar__link--disabled"}`;

          if (!item.href) {
            return (
              <span className={className} key={item.label} aria-disabled="true">
                <Icon aria-hidden="true" />
                {item.label}
              </span>
            );
          }

          return (
            <Link className={className} href={item.href} key={item.label}>
              <Icon aria-hidden="true" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {isPlayerPage ? (
        <div className="reader-controls" aria-label="Reader text size">
          {readerOptions.map((option) => (
            <button
              aria-label={option.label}
              className={`reader-controls__button reader-controls__button--${option.size} ${
                readerSize === option.size ? "reader-controls__button--active" : ""
              }`}
              key={option.size}
              onClick={() => setReaderSize(option.size)}
              type="button"
            >
              {option.text}
            </button>
          ))}
        </div>
      ) : null}

      <button
        className="sidebar__auth"
        onClick={user ? logout : openAuthModal}
        type="button"
      >
        {user ? <FiLogOut aria-hidden="true" /> : <FiLogIn aria-hidden="true" />}
        {user ? "Logout" : "Login"}
      </button>
    </aside>
  );
}
