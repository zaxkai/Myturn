import { useEffect, useMemo, useRef, useState } from 'react';
import L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, ZoomControl, useMap } from 'react-leaflet';
import api from './api.js';
import HistoryPage from './HistoryPage.jsx';
import QueuePage from './QueuePage.jsx';
import SupportPage from './SupportPage.jsx';
import InstitutionPage from './InstitutionPage.jsx';
import ProfilePage from './ProfilePage.jsx';
import SignInPage from './SignInPage.jsx';
import SignUpPage from './SignUpPage.jsx';
import { usePreferences } from './PreferencesContext.jsx';
import {
  Building2,
  Clock3,
  Hospital,
  MapPin,
  Menu,
  Search,
  Star,
  X,
} from 'lucide-react';

const demoInstitutions = [
  {
    id: 'klinik-sehat-utama',
    apiId: 1,
    name: 'Klinik Sehat Utama',
    rating: '4.8',
    reviews: '120 ulasan',
    wait: '15',
    status: 'Live',
    tone: 'live',
    type: 'Klinik',
    aliases: ['klinik sehat', 'klinik'],
    coordinates: [-6.1937, 106.8195],
    description: 'Pelayanan kesehatan prima dengan fasilitas modern. Kami menghargai waktu Anda dengan sistem antrean yang transparan.',
    queueCount: '04',
    timeline: [
      { time: '08:00', visitors: 22, tone: 'quiet' },
      { time: '10:00', visitors: 35, tone: 'normal' },
      { time: '12:00', visitors: 54, tone: 'busy' },
      { time: '14:00', visitors: 32, tone: 'normal' },
      { time: '16:00', visitors: 16, tone: 'recommended', label: 'Rekomendasi' },
    ],
    userReviews: [
      { name: 'Budi S.', rating: 5, time: '2 hari lalu', text: 'Sistem antrean MyTurn sangat membantu. Saya bisa memantau estimasi waktu dari rumah dan datang tepat saat giliran hampir tiba.' },
      { name: 'Ani M.', rating: 4, time: '1 minggu lalu', text: 'Dokternya ramah dan ruang tunggunya nyaman. Prediksi waktu tunggunya cukup akurat, meleset sedikit sekitar 5 menit.' },
      { name: 'Dian K.', rating: 5, time: '2 minggu lalu', text: 'Fasilitas premium. Sangat merekomendasikan fitur booking slot eksperimentalnya untuk perencanaan yang lebih pasti.' },
    ],
  },
  {
    id: 'bca-sudirman',
    apiId: 2,
    name: 'Bank Central Asia - Sudirman',
    rating: '4.9',
    reviews: '340 ulasan',
    wait: '45',
    status: 'Live',
    tone: 'live',
    type: 'Bank',
    aliases: ['bca', 'bank central asia'],
    coordinates: [-6.2082, 106.8229],
    description: 'Layanan perbankan lengkap di jantung kawasan bisnis Sudirman. Sistem antrean digital kami membantu Anda merencanakan kunjungan tanpa perlu menunggu lama di lokasi.',
    queueCount: '12',
    timeline: [
      { time: '08:00', visitors: 28, tone: 'quiet' },
      { time: '10:00', visitors: 46, tone: 'normal' },
      { time: '12:00', visitors: 74, tone: 'busy' },
      { time: '14:00', visitors: 65, tone: 'busy' },
      { time: '16:00', visitors: 19, tone: 'recommended', label: 'Rekomendasi' },
    ],
    userReviews: [
      { name: 'Rangga P.', rating: 5, time: '3 hari lalu', text: 'Antreannya jauh lebih tertib sejak pakai MyTurn. Estimasi waktunya realistis untuk jam sibuk sekalipun.' },
      { name: 'Sinta W.', rating: 5, time: '5 hari lalu', text: 'Petugasnya profesional dan sistem notifikasi H-3 sangat membantu supaya tidak lupa jadwal.' },
      { name: 'Fajar N.', rating: 4, time: '2 minggu lalu', text: 'Cukup ramai di siang hari, tapi fitur booking slot sore membantu menghindari antrean panjang.' },
    ],
  },
  {
    id: 'rs-medika-jaya',
    apiId: 3,
    name: 'RS Medika Jaya',
    rating: '4.5',
    reviews: '89 ulasan',
    wait: '—',
    status: 'Menutup',
    tone: 'closed',
    type: 'Rumah sakit',
    aliases: ['rs medika', 'rumah sakit', 'rs'],
    coordinates: [-6.2184, 106.8331],
    description: 'Rumah sakit umum dengan layanan 24 jam dan tim medis berpengalaman. Pantau status antrean IGD dan poliklinik langsung dari genggaman Anda.',
    queueCount: '—',
    timeline: [
      { time: '08:00', visitors: 58, tone: 'busy' },
      { time: '10:00', visitors: 66, tone: 'busy' },
      { time: '12:00', visitors: 47, tone: 'normal' },
      { time: '14:00', visitors: 29, tone: 'quiet' },
      { time: '16:00', visitors: 22, tone: 'recommended', label: 'Rekomendasi' },
    ],
    userReviews: [
      { name: 'Maya L.', rating: 5, time: '1 hari lalu', text: 'Poliklinik anak sangat responsif, meski sedang tutup malam ini aplikasinya tetap menampilkan info dengan jelas.' },
      { name: 'Herman T.', rating: 4, time: '6 hari lalu', text: 'Fasilitas lengkap. Semoga jam operasional bisa diperpanjang untuk layanan non-darurat.' },
      { name: 'Putri A.', rating: 5, time: '3 minggu lalu', text: 'Tim medisnya sigap. Estimasi antrean IGD di aplikasi cukup membantu keluarga yang menunggu di luar.' },
    ],
  },
];

const timeSlots = [
  { label: 'Pagi (08:00 - 10:00)', state: 'Sangat Sepi', tone: 'quiet' },
  { label: 'Siang (12:00 - 14:00)', state: 'Puncak Kepadatan', tone: 'busy' },
  { label: 'Sore (15:00 - 17:00)', state: 'Normal', tone: 'normal' },
];

const leaders = [
  { rank: 1, name: 'Budi S.', points: '1,250 Poin', title: 'Waktu Master', className: 'first' },
  { rank: 2, name: 'Siti A.', points: '980 Poin', title: 'Efisien', className: '' },
  { rank: 3, name: 'Andi W.', points: '850 Poin', title: 'Efisien', className: '' },
];

const jakartaCenter = [-6.2057, 106.8267];

// Ganti sesuai environment: bisa dipindah ke variable Vite (import.meta.env.VITE_API_URL) saat deploy.
const API_BASE_URL = 'http://127.0.0.1:8000/api';
const SHARED_TICKETS_KEY = 'myturn-shared-tickets-v1';
const QUEUE_COUNTERS_KEY = 'myturn-queue-counters-v1';
const USERS_KEY = 'myturn-local-users-v1';
const CURRENT_USER_KEY = 'myturn-current-user-v1';
const ACCOUNT_DATA_PREFIX = 'myturn-account-v1';

function readStoredJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function writeStoredJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function accountStorageKey(email, field) {
  return `${ACCOUNT_DATA_PREFIX}:${String(email ?? '').trim().toLowerCase()}:${field}`;
}

function localDateValue() {
  const now = new Date();
  const timezoneOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - timezoneOffset).toISOString().slice(0, 10);
}

function formatVisitDate(date, time, locale = 'id-ID') {
  if (!date) return '';
  const value = new Date(`${date}T${time || '09:00'}:00`);
  if (Number.isNaN(value.getTime())) return `${date}${time ? ` · ${time}` : ''}`;
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit',
  }).format(value);
}

// status_kepadatan dari backend ("Sepi" / "Normal" / "Padat", dsb) dipetakan ke
// tone visual yang sudah dipakai di CSS (quiet / normal / busy).
const CROWD_STATUS_TONE = {
  sepi: 'quiet',
  normal: 'normal',
  ramai: 'busy',
  padat: 'busy',
};

function getCrowdTone(statusKepadatan) {
  const key = String(statusKepadatan ?? '').trim().toLowerCase();
  return CROWD_STATUS_TONE[key] ?? 'normal';
}

// Menggabungkan satu item respons /institutions/live (field Bahasa Indonesia dari Laravel)
// dengan data demo yang cocok: field live (lokasi, kepadatan, sisa antrean, estimasi waktu)
// menimpa data demo, sisanya (rating, deskripsi, timeline, ulasan) tetap dari demo karena
// belum disediakan oleh endpoint ini.
function mergeWithDemoFallback(item, index) {
  const fallback = demoInstitutions.find((institution) => String(institution.apiId) === String(item.id))
    ?? demoInstitutions[index % demoInstitutions.length];

  const latitude = Number(item.latitude);
  const longitude = Number(item.longitude);
  const hasValidCoordinates = Number.isFinite(latitude) && Number.isFinite(longitude);

  return {
    ...fallback,
    id: fallback.id, // tetap pakai slug demo — ini yang dipakai untuk routing/URL, jangan ikut berubah
    apiId: item.id ?? fallback.apiId, // ID asli dari backend, dipakai saat memanggil endpoint (mis. booking)
    name: item.nama_instansi ?? fallback.name,
    type: item.tipe ?? fallback.type,
    coordinates: hasValidCoordinates ? [latitude, longitude] : fallback.coordinates,
    capacity: item.kapasitas_maksimal ?? fallback.capacity ?? null,
    queueCount: String(item.sisa_antrean ?? fallback.queueCount),
    wait: String(item.estimasi_waktu_tunggu ?? fallback.wait),
    status: item.status_kepadatan ?? fallback.status,
    tone: item.status_kepadatan ? getCrowdTone(item.status_kepadatan) : fallback.tone,
  };
}

function createMarkerIcon(tone, isUser = false) {
  return L.divIcon({
    className: 'queue-marker-wrapper',
    html: `<span class="queue-marker ${isUser ? 'user-marker' : tone}"><i></i></span>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
}

function MapViewport({ focus, markerRefs }) {
  const map = useMap();

  useEffect(() => {
    if (!focus) return undefined;

    map.flyTo(focus.coordinates, focus.zoom ?? 15, { duration: 0.75 });
    const popupTimer = window.setTimeout(() => markerRefs.current[focus.markerId]?.openPopup(), 800);
    return () => window.clearTimeout(popupTimer);
  }, [focus, map, markerRefs]);

  return null;
}

function QueueMap({ institutions, focus, userLocation, markerRefs, isLoading, error, isLiveDataLoaded }) {
  return (
    <div className="map-area" aria-label="Peta live status institusi di Jakarta">
      <MapContainer center={jakartaCenter} zoom={13} zoomControl={false} scrollWheelZoom className="leaflet-map">
        <TileLayer
          attribution={'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ZoomControl position="bottomright" />
        <MapViewport focus={focus} markerRefs={markerRefs} />
        {institutions.map((institution) => (
          <Marker
            key={institution.id}
            icon={createMarkerIcon(institution.tone)}
            position={institution.coordinates}
            ref={(marker) => { markerRefs.current[institution.id] = marker; }}
          >
            <Popup className="queue-popup">
              <p className="popup-overline"><span className={`popup-status ${institution.tone}`} />{institution.status}</p>
              <h3>{institution.name}</h3>
              <p>{institution.type} · ★ {institution.rating} ({institution.reviews})</p>
              <strong>{institution.wait === '—' ? 'Tidak tersedia' : `${institution.wait} menit`} <small>estimasi antrean</small></strong>
            </Popup>
          </Marker>
        ))}
        {userLocation && (
          <Marker
            icon={createMarkerIcon('live', true)}
            position={userLocation}
            ref={(marker) => { markerRefs.current.user = marker; }}
          >
            <Popup className="queue-popup"><p className="popup-overline">LOKASI ANDA</p><h3>Posisi saat ini</h3><p>Lokasi ini hanya dipakai untuk memusatkan peta.</p></Popup>
          </Marker>
        )}
      </MapContainer>
      <span className="map-demo-label">
        {isLoading
          ? 'Memuat data live…'
          : error
            ? `${error} (menampilkan data awal)`
            : isLiveDataLoaded
              ? 'Lokasi institusi · Live'
              : 'Lokasi institusi · Data awal (demo)'}
      </span>
    </div>
  );
}

function parsePage(pathname) {
  if (pathname === '/queue') return { page: 'queue' };
  if (pathname === '/history') return { page: 'history' };
  if (pathname === '/support') return { page: 'support' };
  if (pathname === '/profile') return { page: 'profile' };
  if (pathname === '/sign-in') return { page: 'signin' };
  if (pathname === '/sign-up') return { page: 'signup' };
  if (pathname.startsWith('/institution/')) {
    return { page: 'institution', institutionId: decodeURIComponent(pathname.replace('/institution/', '')) };
  }
  return { page: 'explore' };
}

function App() {
  const { t } = usePreferences();
  const [search, setSearch] = useState('');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [mapFocus, setMapFocus] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedInstitutionId, setSelectedInstitutionId] = useState(null);
  const [institutions, setInstitutions] = useState(demoInstitutions);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState(true);
  const [institutionsError, setInstitutionsError] = useState(null);
  const [isLiveDataLoaded, setIsLiveDataLoaded] = useState(false);
  // Tiket aktif dibagikan antar-tab agar nomor antrean tetap berurutan saat beberapa
  // pengguna membuka MyTurn. Riwayat, pengingat, dan profil selalu dipisahkan per akun.
  const [currentUser, setCurrentUser] = useState(() => readStoredJson(CURRENT_USER_KEY, null));
  const [registeredUsers, setRegisteredUsers] = useState(() => readStoredJson(USERS_KEY, []));
  const [activeTickets, setActiveTickets] = useState(() => readStoredJson(SHARED_TICKETS_KEY, []));
  const [historyEntries, setHistoryEntries] = useState([]);
  const [reminderSettings, setReminderSettings] = useState({ push: true, whatsapp: false });
  const [consultationNotifications, setConsultationNotifications] = useState([]);
  const [{ page, institutionId }, setRoute] = useState(() => parsePage(window.location.pathname));
  const [exploreHasScrolled, setExploreHasScrolled] = useState(() => window.scrollY > 48);
  const markerRefs = useRef({});
  const accountHydration = useRef({ history: false, reminders: false, notifications: false });

  const userTickets = useMemo(() => {
    if (!currentUser?.email) return [];
    return activeTickets.filter((ticket) => ticket.ownerEmail === currentUser.email.toLowerCase());
  }, [activeTickets, currentUser]);

  useEffect(() => {
    writeStoredJson(SHARED_TICKETS_KEY, activeTickets);
  }, [activeTickets]);

  useEffect(() => {
    writeStoredJson(USERS_KEY, registeredUsers);
  }, [registeredUsers]);

  useEffect(() => {
    if (!currentUser?.email) {
      localStorage.removeItem(CURRENT_USER_KEY);
      setHistoryEntries([]);
      setReminderSettings({ push: true, whatsapp: false });
      setConsultationNotifications([]);
      return;
    }

    const normalizedEmail = currentUser.email.toLowerCase();
    writeStoredJson(CURRENT_USER_KEY, currentUser);
    accountHydration.current = { history: true, reminders: true, notifications: true };
    setHistoryEntries(readStoredJson(accountStorageKey(normalizedEmail, 'history'), []));
    setReminderSettings(readStoredJson(accountStorageKey(normalizedEmail, 'reminders'), { push: true, whatsapp: false }));
    setConsultationNotifications(readStoredJson(accountStorageKey(normalizedEmail, 'notifications'), []));
  }, [currentUser]);

  useEffect(() => {
    if (accountHydration.current.history) {
      accountHydration.current.history = false;
      return;
    }
    if (currentUser?.email) writeStoredJson(accountStorageKey(currentUser.email, 'history'), historyEntries);
  }, [historyEntries, currentUser]);

  useEffect(() => {
    if (accountHydration.current.reminders) {
      accountHydration.current.reminders = false;
      return;
    }
    if (currentUser?.email) writeStoredJson(accountStorageKey(currentUser.email, 'reminders'), reminderSettings);
  }, [reminderSettings, currentUser]);

  useEffect(() => {
    if (accountHydration.current.notifications) {
      accountHydration.current.notifications = false;
      return;
    }
    if (currentUser?.email) writeStoredJson(accountStorageKey(currentUser.email, 'notifications'), consultationNotifications);
  }, [consultationNotifications, currentUser]);

  useEffect(() => {
    const syncSharedTickets = (event) => {
      if (event.key === SHARED_TICKETS_KEY) setActiveTickets(readStoredJson(SHARED_TICKETS_KEY, []));
    };
    window.addEventListener('storage', syncSharedTickets);
    return () => window.removeEventListener('storage', syncSharedTickets);
  }, []);

  useEffect(() => {
    const syncPageFromUrl = () => setRoute(parsePage(window.location.pathname));
    window.addEventListener('popstate', syncPageFromUrl);
    return () => window.removeEventListener('popstate', syncPageFromUrl);
  }, []);

  useEffect(() => {
    const updateExploreHeader = () => setExploreHasScrolled(window.scrollY > 48);
    updateExploreHeader();
    window.addEventListener('scroll', updateExploreHeader, { passive: true });
    return () => window.removeEventListener('scroll', updateExploreHeader);
  }, [page]);

  // Ambil data live status instansi dari backend Laravel saat komponen pertama kali dirender.
  useEffect(() => {
    const controller = new AbortController();

    async function fetchLiveInstitutions() {
      setIsLoadingInstitutions(true);
      setInstitutionsError(null);

      try {
        const response = await fetch(`${API_BASE_URL}/institutions/live`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Gagal mengambil data (status ${response.status})`);
        }

        const payload = await response.json();
        const apiInstitutions = Array.isArray(payload?.data) ? payload.data : [];

        if (apiInstitutions.length) {
          setInstitutions(apiInstitutions.map(mergeWithDemoFallback));
          setIsLiveDataLoaded(true);
        } else {
          setInstitutions(demoInstitutions);
          setIsLiveDataLoaded(false);
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        console.error('Gagal memuat /institutions/live:', error);
        setInstitutions(demoInstitutions);
        setIsLiveDataLoaded(false);
        setInstitutionsError('Tidak dapat memuat data live status institusi. Coba muat ulang halaman.');
      } finally {
        setIsLoadingInstitutions(false);
      }
    }

    fetchLiveInstitutions();

    return () => controller.abort();
  }, []);

  const [isSearchOpen, setSearchOpen] = useState(false);

  const matchesQuery = (institution, query) => {
    const haystack = [institution.name, institution.type, ...(institution.aliases ?? [])].join(' ').toLowerCase();
    return haystack.includes(query);
  };

  const searchSuggestions = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return [];
    return institutions.filter((institution) => matchesQuery(institution, query)).slice(0, 6);
  }, [search]);

  const notify = (text) => {
    setMessage(text);
    window.setTimeout(() => setMessage(''), 2500);
  };

  const focusInstitution = (institution) => {
    setSelectedInstitutionId(institution.id);
    setMapFocus({ coordinates: institution.coordinates, markerId: institution.id, zoom: 15 });
    document.querySelector('.queue-map')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  const findUserLocation = () => {
    if (!navigator.geolocation) {
      notify('Browser ini tidak mendukung lokasi perangkat.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        const coordinates = [coords.latitude, coords.longitude];
        setUserLocation(coordinates);
        setMapFocus({ coordinates, markerId: 'user', zoom: 15 });
        notify('Lokasi Anda ditemukan.');
      },
      (error) => {
        const messages = {
          1: 'Izin lokasi ditolak. Izinkan lokasi untuk memusatkan peta.',
          2: 'Lokasi tidak dapat ditemukan. Coba lagi sebentar.',
          3: 'Permintaan lokasi terlalu lama. Coba lagi.',
        };
        notify(messages[error.code] ?? 'Lokasi tidak dapat diakses.');
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
    );
  };

  const navigate = (nextPage, anchor = '', param = '') => {
    const path = nextPage === 'queue' ? '/queue'
      : nextPage === 'history' ? '/history'
      : nextPage === 'support' ? '/support'
      : nextPage === 'profile' ? '/profile'
      : nextPage === 'signin' ? '/sign-in'
      : nextPage === 'signup' ? '/sign-up'
      : nextPage === 'institution' ? `/institution/${encodeURIComponent(param)}`
      : '/';
    window.history.pushState({}, '', `${path}${anchor}`);
    setRoute({ page: nextPage, institutionId: nextPage === 'institution' ? param : undefined });
    setMenuOpen(false);
    window.requestAnimationFrame(() => {
      if (anchor) document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const openInstitution = (institution) => {
    navigate('institution', '', institution.id);
  };

  const MINUTES_PER_PERSON = 15;

  const formatWaitDuration = (totalMinutes) => {
    if (totalMinutes <= 60) return `${totalMinutes} ${t('minutes')}`;
    const hours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;
    return remainingMinutes ? `${hours} ${t('hour')} ${remainingMinutes} ${t('minutes')}` : `${hours} ${t('hour')}`;
  };

  const reserveQueueNumber = async (queueScope) => {
    const reserve = () => {
      const counters = readStoredJson(QUEUE_COUNTERS_KEY, {});
      const nextNumber = counters[queueScope] ?? 1;
      writeStoredJson(QUEUE_COUNTERS_KEY, { ...counters, [queueScope]: nextNumber + 1 });
      return nextNumber;
    };

    // Chrome mengunci operasi ini lintas-tab, sehingga dua tab yang menekan tombol
    // pada saat yang sama tetap memperoleh nomor berbeda.
    if (navigator.locks?.request) return navigator.locks.request('myturn-queue-number', reserve);
    return reserve();
  };

  const buildQueueState = (institution, queueNumber) => {
    const prefix = institution.name.charAt(0).toUpperCase();
    const currentNum = 1;
    const aheadCount = Math.max(queueNumber - currentNum, 0);
    const waitMinutes = aheadCount * MINUTES_PER_PERSON;
    const waitDuration = formatWaitDuration(waitMinutes);

    return {
      number: `${prefix}-${queueNumber}`,
      currentNumber: `${prefix}-${currentNum}`,
      aheadCount,
      queueProgress: Math.max(10, Math.round(100 / (aheadCount + 1))),
      estimatedCallTime: aheadCount ? `${waitDuration} lagi` : 'Sebentar lagi',
      waitSummary: aheadCount ? t('waitSummary', { duration: waitDuration, count: aheadCount }) : 'Giliran Anda sedang dipanggil. Silakan lakukan check-in di lokasi.',
    };
  };

  const addConsultationNotification = (ticket) => {
    if (!reminderSettings.push && !reminderSettings.whatsapp) return;
    const methods = [reminderSettings.push && 'push', reminderSettings.whatsapp && 'WhatsApp'].filter(Boolean).join(' dan ');
    setConsultationNotifications((items) => [{
      id: `consultation-${ticket.id}`,
      title: `Pengingat ${ticket.institutionName}`,
      detail: `Kunjungan ${ticket.visitDateLabel}. Pengingat H-3 jam akan dikirim melalui ${methods}.`,
      read: false,
    }, ...items]);
  };

  const createTicket = async (institution, details) => {
    if (!currentUser?.email) {
      notify('Silakan masuk terlebih dahulu untuk mengambil antrean.');
      navigate('signin');
      return null;
    }

    const queueScope = `${institution.apiId ?? institution.id}:${details.visitDate}:${details.sessionId ?? 'langsung'}`;
    const queueState = details.queueState ?? buildQueueState(institution, await reserveQueueNumber(queueScope));
    const ticket = {
      id: `${institution.id}-${Date.now()}`,
      institutionId: institution.id,
      institutionName: institution.name,
      ownerEmail: currentUser.email.toLowerCase(),
      subtitle: details.subtitle,
      kind: details.kind,
      visitDate: details.visitDate,
      visitTime: details.visitTime,
      visitDateLabel: formatVisitDate(details.visitDate, details.visitTime),
      sessionId: details.sessionId ?? 'langsung',
      queueScope,
      ...queueState,
      isActive: true,
    };

    setActiveTickets((tickets) => [...tickets, ticket]);
    setHistoryEntries((entries) => [
      { id: ticket.id, name: institution.name, service: details.historyService, queue: ticket.number, date: ticket.visitDateLabel, status: 'active', points: 0, Icon: Building2 },
      ...entries,
    ]);
    addConsultationNotification(ticket);
    return ticket;
  };

  const claimQueue = async (institution) => {
    if (!currentUser?.email) {
      notify('Silakan masuk terlebih dahulu untuk mengambil antrean.');
      navigate('signin');
      return;
    }

    const now = new Date();
    const visitDate = localDateValue();
    const visitTime = now.toTimeString().slice(0, 5);
    let backendQueueState;

    try {
      if (!currentUser.id) {
        throw new Error('Akun lokal tidak memiliki ID backend.');
      }

      const response = await fetch(`${API_BASE_URL}/tickets/checkin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...(localStorage.getItem('token')
            ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
            : {}),
        },
        body: JSON.stringify({
          instansi_id: institution.apiId,
          user_id: currentUser.id,
        }),
      });

      if (!response.ok) {
        throw new Error(`Check-in gagal (status ${response.status})`);
      }

      const payload = await response.json();
      const queueLabel = payload?.data?.nomor_antrean;
      if (!queueLabel) {
        throw new Error('Respons check-in tidak menyertakan nomor antrean.');
      }

      const queueNumber = Number.parseInt(String(queueLabel).match(/(\d+)$/)?.[1] ?? '', 10);
      const fallbackQueueState = buildQueueState(institution, Number.isFinite(queueNumber) ? queueNumber : 1);
      backendQueueState = { ...fallbackQueueState, number: String(queueLabel) };
    } catch (error) {
      console.warn('Check-in backend gagal, menggunakan antrean lokal:', error);
    }

    const ticket = await createTicket(institution, {
      kind: 'antrean',
      visitDate,
      visitTime,
      subtitle: `${institution.type} · Antrean langsung`,
      historyService: 'Ambil antrean langsung',
      queueState: backendQueueState,
    });
    if (!ticket) return;
    notify(`Antrean ${ticket.number} untuk ${institution.name} berhasil diambil.`);
    navigate('queue');
  };

  const getApiErrorMessage = (error, fallback) => {
    const errors = error.response?.data?.errors;
    const validationMessage = errors ? Object.values(errors).flat().find(Boolean) : null;
    return validationMessage || error.response?.data?.message || fallback;
  };

  const bookSlot = async (institution, { date, sessionLabel, sessionTime }) => {
    if (!currentUser?.email) {
      notify('Silakan masuk terlebih dahulu untuk booking slot.');
      navigate('signin');
      return false;
    }

    // Jika pengguna login lewat Laravel, simpan juga ke backend. Akun demo/lokal tetap
    // bisa diuji di frontend tanpa dipaksa kembali ke halaman login.
    if (localStorage.getItem('token')) {
      try {
        await api.post('/bookings', {
          institution_id: institution.apiId,
          tanggal_kunjungan: date,
          waktu_kunjungan: sessionTime,
        });
      } catch (error) {
        notify(getApiErrorMessage(error, 'Booking gagal. Periksa kembali data atau koneksi ke server.'));
        return false;
      }
    }

    const ticket = await createTicket(institution, {
      kind: 'booking',
      visitDate: date,
      visitTime: sessionTime,
      sessionId: sessionLabel || sessionTime,
      subtitle: `${institution.type} · Booking ${sessionLabel} · ${sessionTime}`,
      historyService: `Booking slot ${sessionLabel} · ${sessionTime}`,
    });
    if (!ticket) return false;
    notify(`Slot ${sessionLabel}, ${ticket.visitDateLabel} berhasil dibooking.`);
    navigate('queue');
    return true;
  };

  const cancelTicket = (ticketId) => {
    const ticket = userTickets.find((item) => item.id === ticketId);
    if (!ticket) return;
    setActiveTickets((tickets) => tickets.filter((item) => item.id !== ticketId));
    setHistoryEntries((entries) => entries.map((entry) => (entry.id === ticketId ? { ...entry, status: 'cancelled' } : entry)));
    notify(`Antrean ${ticket.number} berhasil dibatalkan.`);
  };

  const checkInTicket = (ticketId) => {
    const ticket = userTickets.find((item) => item.id === ticketId);
    if (!ticket) return;
    setActiveTickets((tickets) => tickets.map((item) => (item.id === ticketId ? { ...item, isCheckedIn: true } : item)));
    notify(`Check-in ${ticket.number} berhasil. Selesaikan antrean setelah kunjungan selesai.`);
  };

  const completeTicket = (ticketId) => {
    const ticket = userTickets.find((item) => item.id === ticketId);
    if (!ticket) return;
    setActiveTickets((tickets) => tickets.filter((item) => item.id !== ticketId));
    setHistoryEntries((entries) => entries.map((entry) => (entry.id === ticketId ? { ...entry, status: 'completed', points: 25 } : entry)));
    notify(`Antrean ${ticket.number} selesai. 25 poin ditambahkan.`);
  };

  const updateReminder = (type) => {
    if (type === 'whatsapp' && !currentUser?.phone) {
      notify('Tambahkan nomor WhatsApp di Profil sebelum mengaktifkan notifikasi WhatsApp.');
      return;
    }
    setReminderSettings((settings) => ({ ...settings, [type]: !settings[type] }));
  };

  const updateProfile = ({ phone }) => {
    const nextUser = { ...currentUser, phone };
    setCurrentUser(nextUser);
    setRegisteredUsers((users) => users.map((user) => (user.email.toLowerCase() === nextUser.email.toLowerCase() ? { ...user, phone } : user)));
    notify('Profil berhasil diperbarui.');
  };

  const handleSignUp = ({ fullName, email, password }) => {
    const alreadyExists = registeredUsers.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (alreadyExists) {
      notify('Email ini sudah terdaftar. Silakan Sign In.');
      return;
    }
    setRegisteredUsers((users) => [...users, { fullName, email, password, phone: '' }]);
    setCurrentUser({ fullName, email });
    notify(`Selamat datang, ${fullName.split(' ')[0]}!`);
    navigate('explore');
  };

  const handleSignIn = async ({ email, password }) => {
    try {
      const { data } = await api.post('/login', { email, password });
      const token = data?.token ?? data?.data?.token;
      if (!token) throw new Error('Respons login tidak menyertakan token.');

      localStorage.setItem('token', token);
      const apiUser = data?.user ?? data?.data?.user ?? {};
      const fullName = apiUser.nama ?? apiUser.name ?? apiUser.full_name ?? email.split('@')[0];
      const knownUser = registeredUsers.find((user) => user.email.toLowerCase() === (apiUser.email ?? email).toLowerCase());
      setCurrentUser({ id: apiUser.id, fullName, email: apiUser.email ?? email, phone: knownUser?.phone ?? '' });
      notify(`Selamat datang kembali, ${fullName.split(' ')[0]}!`);
      navigate('explore');
      return true;
    } catch (error) {
      const localUser = registeredUsers.find((user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password);
      if (localUser) {
        setCurrentUser({ fullName: localUser.fullName, email: localUser.email, phone: localUser.phone ?? '' });
        notify(`Selamat datang kembali, ${localUser.fullName.split(' ')[0]}!`);
        navigate('explore');
        return true;
      }
      notify(getApiErrorMessage(error, error.message || 'Login gagal. Periksa email atau password Anda.'));
      return false;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    notify('Anda telah keluar.');
  };

  const selectSuggestion = (institution) => {
    setSearch(institution.name);
    setSearchOpen(false);
    focusInstitution(institution);
    notify(`Menampilkan ${institution.name} di peta.`);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchSuggestions.length === 1) {
      selectSuggestion(searchSuggestions[0]);
      return;
    }
    if (searchSuggestions.length === 0 && search.trim()) {
      notify(`Tidak ditemukan institusi untuk "${search.trim()}". Pilih dari daftar saran di bawah kotak pencarian.`);
    }
  };

  const navItems = page === 'institution' ? [] : [
    { label: t('queue'), page: 'queue' },
    { label: t('explore'), page: 'explore', anchor: '#explore' },
    { label: t('history'), page: 'history' },
    { label: t('support'), page: 'support' },
    ...(currentUser ? [{ label: t('profile'), page: 'profile' }] : []),
  ];

  const activeInstitution = page === 'institution' ? institutions.find((item) => item.id === institutionId) : null;

  const renderAuthActions = (variant) => (
    <div className={`nav-actions ${variant}`}>
      {currentUser ? (
        <button className="profile-pill" onClick={() => navigate('profile')} title="Buka profil Anda" aria-label="Buka profil Anda">
          <span className="avatar-chip">{currentUser.fullName.charAt(0).toUpperCase()}</span>
          {currentUser.fullName.split(' ')[0]}
        </button>
      ) : (
        <>
          <button className="text-button" onClick={() => navigate('signin')}>{t('signIn')}</button>
          <button className="outline-button" onClick={() => navigate('signup')}>{t('signUp')}</button>
        </>
      )}
    </div>
  );

  return (
    <div className="app-shell">
      {page === 'signin' || page === 'signup' ? null : page === 'institution' ? (
        <header className="topbar topbar-minimal">
          <span className="topbar-spacer" aria-hidden="true" />
          <button className="wordmark" onClick={() => navigate('explore')} aria-label="Kembali ke halaman awal">
            MYTURN
          </button>
          {renderAuthActions('desktop-actions')}
        </header>
      ) : (
      <header className={`topbar ${page === 'explore' ? `explore-topbar ${exploreHasScrolled ? 'is-scrolled' : 'is-landing'}` : ''}`}>
        <button className="wordmark" onClick={() => navigate('explore')} aria-label="Kembali ke halaman awal">
          MYTURN
        </button>
        <nav className={isMenuOpen ? 'nav-links is-open' : 'nav-links'} aria-label="Navigasi utama">
          {navItems.map((item) => (
            <a
              key={item.label}
              className={item.page === page && (item.page !== 'explore' || item.label === 'Explore') ? 'active' : ''}
              href={`${item.page === 'queue' ? '/queue' : item.page === 'history' ? '/history' : item.page === 'support' ? '/support' : item.page === 'profile' ? '/profile' : '/'}${item.anchor ?? ''}`}
              onClick={(event) => { event.preventDefault(); navigate(item.page, item.anchor); }}
            >
              {item.label}
            </a>
          ))}
          {renderAuthActions('mobile-actions')}
        </nav>
        {renderAuthActions('desktop-actions')}
        <button className="menu-button" onClick={() => setMenuOpen((open) => !open)} aria-label="Buka menu">
          {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </header>
      )}
      {page === 'explore' && <div className={`landing-wordmark ${exploreHasScrolled ? 'is-scrolled' : ''}`} aria-hidden="true">MYTURN</div>}

      {page === 'signin' ? <SignInPage onSignIn={handleSignIn} onNavigateSignUp={() => navigate('signup')} onNotify={notify} lastSignedUpName={registeredUsers.at(-1)?.fullName} />
        : page === 'signup' ? <SignUpPage onSignUp={handleSignUp} onNavigateSignIn={() => navigate('signin')} onNotify={notify} />
        : page === 'queue' ? <QueuePage tickets={userTickets} reminderSettings={reminderSettings} onUpdateReminder={updateReminder} onCancel={cancelTicket} onCheckIn={checkInTicket} onComplete={completeTicket} onNotify={notify} />
        : page === 'history' ? <HistoryPage onNotify={notify} entries={historyEntries} />
        : page === 'support' ? <SupportPage onNotify={notify} />
        : page === 'profile' ? <ProfilePage currentUser={currentUser} notifications={consultationNotifications} onUpdateProfile={updateProfile} onLogout={handleLogout} onNotify={notify} onNavigateSignIn={() => navigate('signin')} />
        : page === 'institution' ? (
          activeInstitution
            ? <InstitutionPage institution={activeInstitution} onNotify={notify} onBack={() => navigate('explore')} onClaimQueue={claimQueue} onBookSlot={bookSlot} />
            : (
              <main className="institution-page section-pad-small">
                <p className="eyebrow">OOPS</p>
                <h1>Institusi tidak ditemukan</h1>
                <p>Institusi yang Anda cari mungkin sudah tidak tersedia.</p>
                <button className="location-button" onClick={() => navigate('explore')}>Kembali ke Explore</button>
              </main>
            )
        )
        : <main>
        <section className={`explore-stage ${exploreHasScrolled ? 'is-scrolled' : ''}`} aria-label="Pembuka MyTurn">
          <span className="stage-orbit stage-orbit-one" aria-hidden="true" />
          <span className="stage-orbit stage-orbit-two" aria-hidden="true" />
          <div className="explore-stage-copy">
            <p className="eyebrow">MYTURN · DIGITAL QUEUE EXPERIENCE</p>
            <p className="stage-kicker">Antrean yang terasa lebih tenang.</p>
            <p className="stage-scroll-cue"><i />Scroll untuk menjelajahi</p>
          </div>
          <div className="stage-status" aria-hidden="true"><span />LIVE · JAKARTA</div>
        </section>
        <section id="explore" className="hero section-pad">
          <div className="hero-copy">
            <p className="eyebrow">MYTURN · PENGALAMAN ANTRE YANG LEBIH BAIK</p>
            <h1>{t('welcome')}</h1>
            <p className="intro">{t('heroIntro')}</p>
            <form className="search-box" onSubmit={handleSearchSubmit} role="search" aria-label="Cari institusi dan tampilkan di peta" autoComplete="off">
              <Search size={22} strokeWidth={2.2} />
              <input
                value={search}
                onChange={(event) => { setSearch(event.target.value); setSearchOpen(true); }}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                placeholder={t('searchInstitution')}
              />
              {search && <button type="button" className="clear-search" onMouseDown={(event) => event.preventDefault()} onClick={() => { setSearch(''); setSearchOpen(false); }} aria-label="Hapus pencarian"><X size={17} /></button>}

              {isSearchOpen && search.trim() && (
                <ul className="search-suggestions">
                  {searchSuggestions.length ? searchSuggestions.map((institution) => (
                    <li key={institution.id}>
                      <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => selectSuggestion(institution)}>
                        <span className="suggestion-name">{institution.name}</span>
                        <span className="suggestion-type">{institution.type}</span>
                      </button>
                    </li>
                  )) : <li className="suggestion-empty">Tidak ada institusi yang cocok.</li>}
                </ul>
              )}
            </form>
          </div>
          <div className="hero-photo" role="img" aria-label="Seorang perempuan menggunakan aplikasi antrean di lobi modern">
            <div className="photo-tag"><span>MYTURN</span><strong>Queue at a glance</strong></div>
          </div>
        </section>

        <section className="queue-map">
          <div className="map-copy section-pad-small">
            <p className="eyebrow">{t('findNearby')}</p>
            <h2>{t('liveMap')}</h2>
            <p>{t('mapIntro')}</p>
            <button className="location-button" onClick={findUserLocation}><MapPin size={17} /> {t('useLocation')}</button>
          </div>
          <QueueMap
            institutions={institutions}
            focus={mapFocus}
            markerRefs={markerRefs}
            userLocation={userLocation}
            isLoading={isLoadingInstitutions}
            error={institutionsError}
            isLiveDataLoaded={isLiveDataLoaded}
          />
        </section>

        <section id="queue" className="institutions-section">
          <div className="section-heading section-pad-small"><p className="eyebrow">PILIHAN UNTUK HARI INI</p><h2>{t('featured')}</h2></div>
          <div className="institutions-grid">
            <div className="institution-list">
              {institutions.map((institution) => (
                <article
                  key={institution.id}
                  className={`institution-card ${selectedInstitutionId === institution.id ? 'is-selected' : ''}`}
                  onClick={() => openInstitution(institution)}
                  onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') openInstitution(institution); }}
                  role="button"
                  tabIndex="0"
                  aria-label={`Lihat detail ${institution.name}`}
                >
                  <div className="card-top"><span className={`status ${institution.tone}`}><i />{institution.status}</span><span className="card-type">{institution.type}</span></div>
                  <h3>{institution.name}</h3>
                  <p className="rating"><Star size={14} fill="currentColor" /> {institution.rating} ({institution.reviews})</p>
                  <p className="wait-label">{t('estimate')}</p>
                  {institution.wait === '—'
                    ? <p className="wait-time muted">{t('closed')}</p>
                    : <p className="wait-time">{institution.wait}<small>{t('minutes')}</small></p>}
                </article>
              ))}
            </div>
            <aside className="best-time-card">
              <p className="eyebrow">REKOMENDASI HARI INI</p>
              <h2><Clock3 size={25} /> {t('bestTime')}</h2>
              <p className="best-time-intro">Berdasarkan data historis, kami memprediksi waktu dengan antrean terpendek untuk institusi favorit Anda.</p>
              <div className="time-slots">
                {timeSlots.map((slot) => <div className="time-slot" key={slot.label}><span>{slot.label}</span><b className={slot.tone}>{slot.state}</b></div>)}
              </div>
            </aside>
          </div>
        </section>

        <section id="history" className="leaderboard section-pad-small">
          <div className="section-heading"><p className="eyebrow">{t('community')}</p><h2>{t('leaderboard')}</h2></div>
          <div className="leader-grid">
            {leaders.map((leader) => <article className="leader-card" key={leader.rank}><span className={`rank ${leader.className}`}>{leader.rank}</span><div><h3>{leader.name}</h3><p>{leader.points} <i /> <strong>{leader.title}</strong></p></div></article>)}
          </div>
        </section>
      </main>}

      <footer id="contact" className="footer section-pad-small">
        <div><div className="footer-brand">MYTURN</div><p>©️ 2024 MyTurn. All Rights Reserved.</p></div>
        <div className="footer-links"><a href="#privacy">Privacy Policy</a><a href="#terms">Terms of Service</a><a href="#faq">FAQ</a><a href="#contact">Contact</a></div>
      </footer>

      {message && <div className="toast" role="status">{message}</div>}
    </div>
  );
}

export default App;
