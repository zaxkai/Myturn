import { useState } from 'react';
import { BellRing, Check, LockKeyhole, LogOut, ShieldCheck, Trophy } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

function ProfilePage({ currentUser, notifications = [], onUpdateProfile, onLogout, onNotify, onNavigateSignIn }) {
  const { language, setLanguage, theme, setTheme, t } = usePreferences();
  const [phone, setPhone] = useState(currentUser?.phone ?? '');

  if (!currentUser) {
    return (
      <main className="profile-page section-pad-small">
        <section className="profile-empty"><LockKeyhole size={36} /><h1>{t('signIn')} {t('profile').toLowerCase()}</h1><p>{t('noQueueBody')}</p><button className="claim-button" onClick={onNavigateSignIn}>{t('signIn')}</button></section>
      </main>
    );
  }

  const firstName = currentUser.fullName.split(' ')[0];
  const initials = currentUser.fullName.split(' ').map((name) => name[0]).join('').slice(0, 2).toUpperCase();
  const switchTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    onNotify(theme === 'dark' ? t('themeLightOn') : t('themeDarkOn'));
  };
  const switchLanguage = () => {
    const nextLanguage = language === 'id' ? 'en' : 'id';
    setLanguage(nextLanguage);
    onNotify(t('languageChanged', { language: nextLanguage === 'id' ? t('indonesian') : t('english') }));
  };

  return (
    <main className="profile-page section-pad-small">
      <div className="profile-layout">
        <aside className="profile-settings">
          <p className="eyebrow">{t('accountPreferences')}</p>
          <h1>{t('profileSettings')}</h1>
          <button className="setting-row" onClick={switchLanguage}><span>{t('language')}</span><b>{language === 'id' ? t('indonesian') : t('english')}</b></button>
          <button className="setting-row" onClick={switchTheme} aria-pressed={theme === 'dark'}><span>{t('darkMode')}</span><i className={theme === 'dark' ? 'is-on' : ''}><em /></i></button>
          <button className="profile-logout" onClick={onLogout}><LogOut size={18} /> {t('signOut')}</button>
        </aside>

        <section className="profile-content">
          <article className="profile-banner">
            <div className="profile-avatar" aria-label={`Avatar ${currentUser.fullName}`}><span>{initials}</span></div>
            <div><p className="eyebrow">{t('profileAccount')}</p><h2>{currentUser.fullName}</h2><p>{t('activeReporter')}</p></div>
          </article>

          <div className="profile-summary-grid">
            <article className="total-points"><span>{t('totalPoints')}</span><strong>2,450</strong><p>+450 points this month</p></article>
            <article className="badges-card"><span>{t('badges')}</span><div className="badges"><div><i className="badge-icon earned"><Trophy size={26} /></i><b>{t('fastReporter')}</b></div><div><i className="badge-icon"><ShieldCheck size={26} /></i><b>{t('trusted')}</b></div></div></article>
          </div>

          <article className="profile-contact-card">
            <div><p className="eyebrow">NOTIFIKASI WHATSAPP</p><h2>Nomor WhatsApp</h2><p>Gunakan nomor ini untuk pengingat konsultasi Anda.</p></div>
            <form onSubmit={(event) => { event.preventDefault(); onUpdateProfile({ phone: phone.trim() }); }}><input type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="08xxxxxxxxxx" /><button className="claim-button" type="submit">Simpan Nomor</button></form>
          </article>

          <article className="profile-notifications">
            <div className="profile-notification-heading"><div><p className="eyebrow">PENGINGAT KONSULTASI</p><h2><BellRing size={22} /> Notifikasi konsultasi</h2></div><span>{notifications.filter((item) => !item.read).length} baru</span></div>
            {notifications.length ? <div className="consultation-list">{notifications.map((item) => <div className="consultation-notice" key={item.id}><strong>{item.title}</strong><p>{item.detail}</p></div>)}</div> : <p className="profile-notification-empty">Belum ada konsultasi yang dijadwalkan.</p>}
          </article>

          <article className="achievement-card">
            <p className="eyebrow">{t('journey')}</p><h2>{t('achievementMap')}</h2>
            <div className="achievement-list">
              <div className="achievement done"><i><Check size={17} /></i><div><h3>{t('observer')}</h3><p>{t('completeFive')}</p></div></div>
              <div className="achievement current"><i><Trophy size={17} /></i><div><h3>{t('activeReporterLevel')} <small>({t('current')})</small></h3><p>{t('completeTwenty')}</p><span className="achievement-progress"><em /></span></div></div>
              <div className="achievement locked"><i><LockKeyhole size={16} /></i><div><h3>{t('queueExpert')}</h3><p>{t('completeFifty')}</p></div></div>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}

export default ProfilePage;
