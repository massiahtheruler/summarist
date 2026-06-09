import type { ReactNode } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Sidebar } from "@/components/Sidebar";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__content">
        <header className="app-header">
          <SearchBar />
        </header>
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
