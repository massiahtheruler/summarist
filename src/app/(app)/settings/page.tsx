import { Suspense } from "react";
import { SettingsContent } from "@/components/SettingsContent";

export default function SettingsPage() {
  return (
    <Suspense
      fallback={
        <section className="settings-page">
          <h1>Settings</h1>
          <div className="settings-panel">
            <p className="settings-panel__label">Loading account...</p>
          </div>
        </section>
      }
    >
      <SettingsContent />
    </Suspense>
  );
}
