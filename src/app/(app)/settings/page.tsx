export default function SettingsPage() {
  return (
    <section className="settings-page">
      <h1>Settings</h1>
      <div className="settings-panel">
        <div>
          <p className="settings-panel__label">Your Subscription plan</p>
          <p className="settings-panel__value">Basic</p>
        </div>
        <a className="btn settings-panel__button" href="/choose-plan">
          Upgrade to Premium
        </a>
      </div>
      <div className="settings-panel">
        <div>
          <p className="settings-panel__label">Email</p>
          <p className="settings-panel__value">Guest user</p>
        </div>
      </div>
    </section>
  );
}
