import { useMemo, useState } from 'react';
import { Building2, ChevronRight, CircleStar, ClipboardList } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

function HistoryPage({ onNotify, entries = [] }) {
  const { t } = usePreferences();
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(3);

  const safeEntries = useMemo(
    () => (Array.isArray(entries) ? entries : []).map((entry, index) => ({
      ...entry,
      id: entry.id ?? `history-${index}`,
      name: entry.name || 'Institusi MyTurn',
      service: entry.service || 'Layanan antrean',
      queue: entry.queue || '-',
      date: entry.date || 'Tanggal tidak tersedia',
      status: ['active', 'completed', 'cancelled'].includes(entry.status) ? entry.status : 'active',
      points: Number.isFinite(Number(entry.points)) ? Number(entry.points) : 0,
      Icon: typeof entry.Icon === 'function' ? entry.Icon : Building2,
    })),
    [entries],
  );

  const filteredAll = useMemo(
    () => (filter === 'all' ? safeEntries : safeEntries.filter((entry) => entry.status === filter)),
    [safeEntries, filter],
  );
  const visibleEntries = filteredAll.slice(0, visibleCount);

  const selectFilter = (nextFilter) => {
    setFilter(nextFilter);
    setVisibleCount(3);
  };

  const canLoadMore = filteredAll.length > visibleCount;

  const totalVisits = safeEntries.length;
  const totalPoints = safeEntries.reduce((sum, entry) => sum + entry.points, 0);

  return (
    <main className="history-page section-pad-small">
      <section className="history-hero">
        <div><p className="eyebrow">AKTIVITAS AKUN</p><h1>{t('historyTitle')}</h1><p>{t('historyIntro')}</p></div>
        <div className="history-stats" aria-label="Ringkasan riwayat">
          <article><span>{t('totalVisits')}</span><strong>{totalVisits}</strong></article>
          <article className="points-stat"><span>{t('pointsEarned')}</span><strong><CircleStar size={35} />{totalPoints}</strong></article>
        </div>
      </section>

      <section className="history-content" aria-label="Daftar riwayat antrean">
        <div className="history-filters" role="group" aria-label="Filter riwayat">
          {[['all', t('allHistory')], ['completed', t('completed')], ['active', t('active')], ['cancelled', t('cancelled')]].map(([value, label]) => <button key={value} onClick={() => selectFilter(value)} className={filter === value ? 'active' : ''}>{label}</button>)}
        </div>

        <div className="history-list">
          {visibleEntries.map(({ id, name, service, queue, date, status, points, Icon }) => {
            const EntryIcon = Icon ?? Building2;
            return (
              <button className="history-item" key={id} onClick={() => onNotify(`Detail ${name} akan segera tersedia.`)}>
                <span className={`history-icon ${status}`}><EntryIcon size={31} /></span>
                <span className="history-entry-copy"><span className="history-name">{name} <i className={`history-status ${status}`}>{status}</i></span><span className="history-service">{service} · Queue #{queue}</span><span className="history-date">{date}</span></span>
                <span className={`history-points ${status}`}>{status === 'completed' ? `+${points}` : '0'} <CircleStar size={20} /></span>
                <ChevronRight className="history-arrow" size={28} />
              </button>
            );
          })}
        </div>

        {!visibleEntries.length && (
          <div className="history-empty">
            <span className="history-empty-icon"><ClipboardList size={30} /></span>
            <h2>Belum ada riwayat</h2>
            <p>{t('noHistory')}</p>
          </div>
        )}
        {canLoadMore && <div className="load-more"><button onClick={() => setVisibleCount((count) => count + 3)}>{t('loadMore')}</button></div>}
        {!canLoadMore && visibleEntries.length > 3 && <p className="history-end">{t('allHistoryShown')}</p>}
      </section>
    </main>
  );
}

export default HistoryPage;
