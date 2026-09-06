import { useState } from 'react';
import { BarChart3, Clock3, ShieldCheck, Star, Users } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

function StarRow({ rating }) {
  return (
    <span className="review-stars" aria-label={`${rating} dari 5 bintang`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Star key={index} size={15} fill={index < rating ? 'currentColor' : 'none'} strokeWidth={1.6} />
      ))}
    </span>
  );
}

function InstitutionPage({ institution, onNotify, onBack, onClaimQueue, onBookSlot }) {
  const { t } = usePreferences();
  const [selectedSession, setSelectedSession] = useState('sore');
  const [date, setDate] = useState('');
  const [visitTime, setVisitTime] = useState('16:00');
  const [isBooking, setIsBooking] = useState(false);
  const [selectedChartIndex, setSelectedChartIndex] = useState(() => Math.max(institution.timeline.findIndex((point) => point.tone === 'recommended'), 0));

  const sessions = [
    { id: 'pagi', label: 'Pagi (08-12)', time: '09:00' },
    { id: 'siang', label: 'Siang (Penuh)', time: '12:00', disabled: true },
    { id: 'sore', label: 'Sore (15-18)', time: '16:00' },
  ];
  const visitorFallback = [18, 34, 61, 43, 12];
  const chartPoints = institution.timeline.map((point, index) => ({ ...point, visitors: point.visitors ?? visitorFallback[index] }));
  const maxVisitors = Math.max(...chartPoints.map((point) => point.visitors), 1);
  const chartScale = Math.ceil(maxVisitors / 10) * 10;
  const peakPoint = chartPoints.find((point) => point.visitors === maxVisitors);
  const selectedPoint = chartPoints[selectedChartIndex] ?? chartPoints[0];
  const crowdLevel = (point) => {
    if (point.tone === 'busy') return t('crowdBusy');
    if (point.tone === 'recommended' || point.tone === 'quiet') return t('crowdQuiet');
    return t('crowdNormal');
  };

  const claimQueue = () => {
    onClaimQueue(institution);
  };

  const submitBooking = async (event) => {
    event.preventDefault();
    if (!date) {
      onNotify('Pilih tanggal terlebih dahulu untuk booking slot.');
      return;
    }
    const session = sessions.find((item) => item.id === selectedSession);
    setIsBooking(true);
    await onBookSlot(institution, { date, sessionLabel: session?.label ?? '', sessionTime: visitTime, sessionId: session?.id ?? 'pagi' });
    setIsBooking(false);
  };

  return (
    <main className="institution-page">
      <section className="institution-hero section-pad">
        <div className="institution-copy">
          <button className="back-link" onClick={onBack}>&larr; {t('backExplore')}</button>
          <p className="eyebrow"><span className="eyebrow-dot" />{institution.type.toUpperCase()}</p>
          <h1>{institution.name}</h1>
          <p className="institution-description">{institution.description}</p>

          <div className="institution-stats">
            <article className="stat-card">
              <Clock3 size={20} />
              <div>
                <span>{t('currentWait')}</span>
                <strong>{institution.wait === '—' ? '—' : `${institution.wait}mnt`}</strong>
              </div>
            </article>
            <article className="stat-card">
              <Users size={20} />
              <div>
                <span>{t('runningQueue')}</span>
                <strong>{institution.queueCount}</strong>
              </div>
            </article>
          </div>

          <button className="claim-button" onClick={claimQueue}>{t('claimQueue')}</button>
        </div>

        <div className="hero-photo institution-photo" role="img" aria-label={`Ruang tunggu ${institution.name}`}>
          <div className="photo-tag"><span>MYTURN</span><strong>Queue at a glance</strong></div>
          <span className="verified-badge"><ShieldCheck size={15} /> AI Verified: Anti-Spam Queue</span>
        </div>
      </section>

      <section className="institution-panels section-pad-small">
        <article className="prediction-card">
          <div className="prediction-heading">
            <div>
              <h2>{t('bestHour')}</h2>
              <p>{t('crowdEstimate')}</p>
            </div>
            <BarChart3 size={20} className="prediction-icon" />
          </div>
          <div className="visitor-chart" aria-label={t('crowdEstimate')}>
            <div className="visitor-chart-summary">
              <div><span>{selectedPoint.time}</span><strong>{selectedPoint.visitors} {t('visitors')}</strong><small>{crowdLevel(selectedPoint)}</small></div>
              <p><b>{peakPoint.time}</b> · {t('peakCrowd')}</p>
            </div>
            <div className="visitor-chart-legend"><span><i /> {t('estimatedVisitors')}</span><strong>{maxVisitors} {t('visitors')}</strong></div>
            <div className="visitor-bar-chart" role="group" aria-label={t('estimatedVisitors')}>
              <div className="visitor-axis" aria-hidden="true"><span>{chartScale}</span><span>{Math.round(chartScale / 2)}</span><span>0</span></div>
              <div className="visitor-bars">
                {chartPoints.map((point, index) => (
                  <button
                    type="button"
                    className={`visitor-bar-group tone-${point.tone} ${selectedChartIndex === index ? 'is-selected' : ''}`}
                    key={point.time}
                    onClick={() => setSelectedChartIndex(index)}
                    aria-pressed={selectedChartIndex === index}
                    aria-label={t('selectChartTime', { time: point.time, count: point.visitors, level: crowdLevel(point) })}
                  >
                    <span className="visitor-bar-value">{point.visitors}</span>
                    <span className="visitor-bar-track"><i style={{ height: `${Math.max((point.visitors / chartScale) * 100, 7)}%` }} /></span>
                    <span className="visitor-bar-time">{point.time}</span>
                    <small>{point.label || crowdLevel(point)}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </article>

        <article className="booking-card">
          <span className="beta-badge">BETA</span>
          <h2>{t('bookingSlot')}</h2>
          <p>{t('bookingIntro')}</p>
          <form onSubmit={submitBooking}>
            <label className="date-field">
              {t('chooseDate')}
              <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
            </label>
            <label className="date-field">
              Jam kunjungan
              <input type="time" value={visitTime} onChange={(event) => setVisitTime(event.target.value)} />
            </label>
            <div className="session-field">
              <span>{t('chooseSession')}</span>
              <div className="session-grid">
                {sessions.map((session) => (
                  <button
                    type="button"
                    key={session.id}
                    disabled={session.disabled}
                    className={`session-button ${selectedSession === session.id ? 'is-selected' : ''}`}
                    onClick={() => { setSelectedSession(session.id); setVisitTime(session.time); }}
                  >
                    {session.label}
                  </button>
                ))}
              </div>
            </div>
            <button type="submit" className="claim-button outline" disabled={isBooking}>{isBooking ? 'Memproses…' : t('bookThisSlot')}</button>
          </form>
        </article>
      </section>

      <section className="institution-reviews section-pad-small">
        <div className="reviews-heading">
          <h2>{t('visitorReviews')}</h2>
          <button className="view-all-link" onClick={() => onNotify('Semua ulasan akan segera tersedia.')}>Lihat Semua</button>
        </div>
        <div className="review-grid">
          {institution.userReviews.map((review) => (
            <article className="review-card" key={review.name}>
              <StarRow rating={review.rating} />
              <p className="review-text">&ldquo;{review.text}&rdquo;</p>
              <div className="review-author">
                <span className="avatar">{review.name.charAt(0)}</span>
                <div>
                  <strong>{review.name}</strong>
                  <span>{review.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default InstitutionPage;
