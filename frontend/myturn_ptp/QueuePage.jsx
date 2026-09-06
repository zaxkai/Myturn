import { BellRing, Check, History, Hourglass, QrCode, Star, XCircle } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

const pastVisits = [];

function QueuePage({ tickets = [], reminderSettings, onUpdateReminder, onCancel, onCheckIn, onComplete, onNotify }) {
  const { t } = usePreferences();

  const updateReminder = (type) => {
    const wasEnabled = reminderSettings[type];
    onUpdateReminder(type);
    onNotify(wasEnabled ? 'Notifikasi dinonaktifkan.' : 'Notifikasi konsultasi diaktifkan.');
  };

  if (!tickets.length) {
    return (
      <main className="queue-page section-pad-small">
        <section className="queue-empty">
          <span className="hourglass-icon"><Hourglass size={43} /></span>
          <p className="eyebrow">{t('yourQueue')}</p>
          <h1>{t('noQueue')}</h1>
          <p>{t('noQueueBody')}</p>
        </section>
      </main>
    );
  }

  return (
    <main className="queue-page section-pad-small">
      <section className="queue-layout" aria-label="Dashboard antrean Anda">
        <div className="active-queue-list">
          {tickets.map((ticket) => (
            <article className="queue-ticket" key={ticket.id}>
              <div className="ticket-heading">
                <div>
                  <p className="eyebrow">{ticket.kind === 'booking' ? t('queueBooking') : t('yourQueue')}</p>
                  <h1>{ticket.institutionName}</h1>
                  <p>{ticket.subtitle}</p>
                  {ticket.visitDateLabel && <p className="ticket-visit-date">{t('visitDate')}: {ticket.visitDateLabel}</p>}
                </div>
                <span className="ticket-status active"><i />{ticket.isCheckedIn ? 'Checked in' : t('active')}</span>
              </div>

              <div className="ticket-numbers">
                <div className="number-panel">
                  <span>{t('yourNumber')}</span>
                  <strong>{ticket.number}</strong>
                  <p>{t('estimatedCall')}: <b>{ticket.estimatedCallTime}</b></p>
                </div>
                <div className="number-panel current-number">
                  <span>{t('currentQueue')}</span>
                  <strong>{ticket.currentNumber}</strong>
                  <p className="queue-progress"><b>{t('peopleAhead', { count: ticket.aheadCount })}</b><i><em style={{ width: `${ticket.queueProgress ?? 50}%` }} /></i></p>
                </div>
              </div>

              <div className="ticket-actions">
                <button className="cancel-button" onClick={() => onCancel(ticket.id)}><XCircle size={22} /> {t('cancel')}</button>
                {!ticket.isCheckedIn ? <button className="checkin-button" onClick={() => onCheckIn(ticket.id)}><QrCode size={23} /> {t('checkIn')}</button> : <button className="complete-button" onClick={() => onComplete(ticket.id)}><Check size={22} /> Selesaikan</button>}
              </div>

              <section className="wait-summary ticket-wait-summary">
                <span className="hourglass-icon"><Hourglass size={35} /></span>
                <div><p className="eyebrow">{t('latestEstimate')}</p><h2>{t('waitEstimate')}</h2><p>{ticket.waitSummary}</p></div>
              </section>
            </article>
          ))}
        </div>

        <aside className="queue-sidebar">
          <section className="reminder-card">
            <h2><BellRing size={24} /> {t('reminders')}</h2>
            <div className="reminder-row"><span>{t('pushNotification')}</span><button onClick={() => updateReminder('push')} className={`check-toggle ${reminderSettings.push ? 'checked' : ''}`} aria-label="Ubah notifikasi push" aria-pressed={reminderSettings.push}>{reminderSettings.push && <Check size={17} />}</button></div>
            <div className="reminder-row"><span>{t('whatsappNotification')}</span><button onClick={() => updateReminder('whatsapp')} className={`check-toggle ${reminderSettings.whatsapp ? 'checked' : ''}`} aria-label="Ubah notifikasi WhatsApp" aria-pressed={reminderSettings.whatsapp}>{reminderSettings.whatsapp && <Check size={17} />}</button></div>
          </section>

          <section className="visit-card">
            <div className="visit-heading"><h2><History size={24} /> {t('visitHistory')}</h2><button onClick={() => onNotify('Riwayat lengkap akan segera tersedia.')}>{t('seeAll')}</button></div>
            {pastVisits.length ? pastVisits.map((visit) => <div className="visit-row" key={visit.name}><div><h3>{visit.name}</h3><p>{visit.date}</p></div>{visit.action ? <button className="rate-button" onClick={() => onNotify('Terima kasih. Form penilaian akan segera tersedia.')}><Star size={17} /> {visit.action}</button> : <span className="stars" aria-label="5 dari 5 bintang">★★★★★</span>}</div>) : <p className="visit-empty">Belum ada riwayat kunjungan.</p>}
          </section>
        </aside>
      </section>
    </main>
  );
}

export default QueuePage;
