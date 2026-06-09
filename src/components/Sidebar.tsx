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
