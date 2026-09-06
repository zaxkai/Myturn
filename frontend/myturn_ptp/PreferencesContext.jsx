import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const dictionary = {
  id: {
    queue: 'Antrean', explore: 'Jelajahi', history: 'Riwayat', support: 'Bantuan', profile: 'Profil',
    signIn: 'Masuk', signUp: 'Daftar', signOut: 'Keluar', language: 'Bahasa', darkMode: 'Mode Gelap',
    indonesian: 'Indonesia', english: 'Inggris', themeDarkOn: 'Mode gelap diaktifkan.', themeLightOn: 'Mode terang diaktifkan.', languageChanged: 'Bahasa diubah ke {language}.',
    welcome: 'Antre tanpa menunggu.', heroIntro: 'Manajemen antrean premium yang menggantikan kecemasan dengan kejelasan. Temukan institusi, lihat estimasi waktu, dan hemat waktu Anda yang berharga.',
    searchInstitution: 'Cari rumah sakit, bank, klinik...', findNearby: 'Temukan yang terdekat', liveMap: 'Peta Antrean Langsung', mapIntro: 'Pantau kepadatan secara real-time di sekitar Anda, atau ketik nama institusi di kotak pencarian atas lalu pilih dari daftar saran untuk memusatkan peta.', useLocation: 'Gunakan lokasi saat ini',
    featured: 'Institusi Unggulan', bestTime: 'Waktu Terbaik untuk Berkunjung', estimate: 'Estimasi waktu', queueNow: 'Antrean Berjalan', community: 'Komunitas MyTurn', leaderboard: 'Papan Peringkat Komunitas',
    active: 'Aktif', cancelled: 'Dibatalkan', completed: 'Selesai', closed: 'Tutup', minutes: 'mnt', hour: 'jam', waitSummary: 'Kira-kira {duration} tersisa sebelum giliran Anda ({count} orang lagi).', noInstitutions: 'Tidak ada institusi yang sesuai dengan pencarian Anda.',
    yourQueue: 'Antrean Anda Hari Ini', noQueue: 'Belum ada antrean aktif', noQueueBody: 'Ambil antrean atau booking slot dari halaman detail institusi untuk melihatnya di sini.', yourNumber: 'Nomor Anda', currentQueue: 'Antrean Sekarang', estimatedCall: 'Estimasi Panggil', peopleAhead: '{count} orang lagi', visitDate: 'Tanggal kunjungan', cancel: 'Batalkan', checkIn: 'Check-in di lokasi', reminders: 'Pengingat', pushNotification: 'Notifikasi Push H-3 Antrean', whatsappNotification: 'Notifikasi WhatsApp', visitHistory: 'Riwayat Kunjungan', seeAll: 'Lihat Semua', latestEstimate: 'Perkiraan Terbaru', waitEstimate: 'Estimasi Waktu Tunggu',
    historyTitle: 'Riwayat', historyIntro: 'Tinjau sesi antrean terdahulu dan poin yang Anda peroleh.', totalVisits: 'Total kunjungan (bulan)', pointsEarned: 'Poin diperoleh', allHistory: 'Semua riwayat', loadMore: 'Muat lagi', noHistory: 'Tidak ada riwayat dengan status ini.', allHistoryShown: 'Semua riwayat sudah ditampilkan.',
    supportHero: 'Halo, ada yang bisa kami bantu?', supportIntro: 'Telusuri panduan kami, temukan jawaban cepat, atau hubungi kami langsung. Kami siap membuat pengalaman Anda lebih tenang.', searchHelp: 'Cari artikel, panduan, atau kata kunci...', browseTopics: 'Jelajahi Topik', topicIntro: 'Pilih kategori untuk menemukan artikel dan panduan terkait.', faq: 'Pertanyaan yang Sering Diajukan', faqIntro: 'Jawaban cepat untuk pertanyaan paling umum.', needHelp: 'Masih butuh bantuan?', needHelpIntro: 'Tim bantuan kami siap membantu Anda lebih lanjut.', contactUs: 'Hubungi Kami', startChat: 'Mulai Chat', readDocs: 'Baca Dokumentasi',
    accountManagement: 'Manajemen Akun', queueBooking: 'Booking Antrean', pointsRewards: 'Poin & Hadiah', institutionSupport: 'Bantuan Institusi',
    profileSettings: 'Pengaturan', accountPreferences: 'Preferensi Akun', profileAccount: 'Akun MyTurn', activeReporter: 'Pelapor Aktif · Bergabung 2024', totalPoints: 'Total Poin', badges: 'Lencana Diperoleh', achievementMap: 'Peta Pencapaian', journey: 'Perjalanan MyTurn', fastReporter: 'Pelapor Cepat', trusted: 'Terpercaya', observer: 'Level 1: Pengamat', activeReporterLevel: 'Level 2: Pelapor Aktif', queueExpert: 'Level 3: Ahli Antrean', current: 'Saat Ini', completeFive: 'Selesaikan 5 laporan antrean.', completeTwenty: 'Selesaikan 20 laporan antrean. (15/20)', completeFifty: 'Selesaikan 50 laporan antrean.',
    createAccount: 'Buat Akun', welcomeBack: 'Selamat datang kembali. Silakan masukkan detail Anda.', joinMyturn: 'Bergabunglah dengan MyTurn untuk pengalaman antre yang lancar.', fullName: 'Nama Lengkap', email: 'Alamat Email', password: 'Kata Sandi', confirmPassword: 'Konfirmasi Kata Sandi', rememberMe: 'Ingat saya', forgotPassword: 'Lupa kata sandi?', orContinue: 'Atau lanjut dengan', noAccount: 'Belum punya akun?', haveAccount: 'Sudah punya akun?',
    backExplore: 'Kembali ke Jelajahi', currentWait: 'Waktu Tunggu Saat Ini', runningQueue: 'Antrean Berjalan', claimQueue: 'Ambil Antrean Sekarang', bestHour: 'Prediksi Jam Terbaik', crowdEstimate: 'Estimasi kepadatan pengunjung hari ini.', estimatedVisitors: 'Estimasi pengunjung', visitors: 'pengunjung', crowdQuiet: 'Sepi', crowdNormal: 'Normal', crowdBusy: 'Ramai', peakCrowd: 'Puncak kepadatan', recommendedTime: 'Waktu rekomendasi', selectChartTime: 'Pilih waktu {time}: sekitar {count} pengunjung, {level}', bookingSlot: 'Booking Slot Waktu', bookingIntro: 'Ambil slot spesifik untuk kunjungan mendatang (Eksperimental).', chooseDate: 'Pilih Tanggal', chooseSession: 'Pilih Sesi', bookThisSlot: 'Booking Slot Ini', visitorReviews: 'Ulasan Pengunjung',
    faqCancelQ: 'Bagaimana cara membatalkan antrean saya?', faqCancelA: 'Buka tab Antrean lalu pilih “Batalkan” pada tiket aktif Anda. Nomor antrean akan langsung dilepas dan posisi Anda tidak akan dipertahankan.', faqMissQ: 'Apa yang terjadi jika saya melewatkan giliran?', faqMissA: 'Jika Anda melewatkan giliran, tiket akan ditandai dibatalkan dan dipindahkan ke belakang antrean. Anda dapat check-in kembali untuk menerima nomor baru.', faqOtherQ: 'Apakah saya bisa memesan antrean untuk orang lain?', faqOtherA: 'Bisa. Saat check-in, tambahkan nama dan nomor telepon pengunjung pada pilihan “Pesan untuk orang lain” agar pengingat dikirim ke orang yang tepat.', faqContactQ: 'Bagaimana cara menghubungi institusi tertentu?', faqContactA: 'Buka kartu institusi pada peta Jelajahi lalu pilih daftar institusinya untuk melihat detail kontak, atau hubungi kami untuk bantuan.', showPassword: 'Tampilkan kata sandi', hidePassword: 'Sembunyikan kata sandi',
  },
  en: {
    queue: 'Queue', explore: 'Explore', history: 'History', support: 'Support', profile: 'Profile',
    signIn: 'Sign In', signUp: 'Sign Up', signOut: 'Sign Out', language: 'Language', darkMode: 'Dark Mode',
    indonesian: 'Indonesian', english: 'English', themeDarkOn: 'Dark mode enabled.', themeLightOn: 'Light mode enabled.', languageChanged: 'Language changed to {language}.',
    welcome: 'Queue without waiting.', heroIntro: 'Premium queue management that replaces anxiety with clarity. Discover institutions, see time estimates, and save your valuable time.',
    searchInstitution: 'Search hospitals, banks, clinics...', findNearby: 'Find what is nearby', liveMap: 'Live Queue Map', mapIntro: 'Monitor real-time crowding near you, or type an institution name above and choose a suggestion to focus the map.', useLocation: 'Use current location',
    featured: 'Featured Institutions', bestTime: 'Best Time to Visit', estimate: 'Estimated time', queueNow: 'Current Queue', community: 'MyTurn Community', leaderboard: 'Community Leaderboard',
    active: 'Active', cancelled: 'Cancelled', completed: 'Completed', closed: 'Closed', minutes: 'min', hour: 'hour', waitSummary: 'About {duration} remaining before your turn ({count} people ahead).', noInstitutions: 'No institutions match your search.',
    yourQueue: 'Your Queue Today', noQueue: 'No active queue yet', noQueueBody: 'Take a queue number or book a slot from an institution detail page to see it here.', yourNumber: 'Your Number', currentQueue: 'Current Queue', estimatedCall: 'Estimated Call', peopleAhead: '{count} people ahead', visitDate: 'Visit date', cancel: 'Cancel', checkIn: 'Check in on site', reminders: 'Reminders', pushNotification: 'Push notification 3 places before your turn', whatsappNotification: 'WhatsApp notification', visitHistory: 'Visit History', seeAll: 'See all', latestEstimate: 'Latest estimate', waitEstimate: 'Estimated Wait Time',
    historyTitle: 'History', historyIntro: 'Review your past queue sessions and earned points.', totalVisits: 'Total visits (month)', pointsEarned: 'Points earned', allHistory: 'All history', loadMore: 'Load more', noHistory: 'There is no history with this status.', allHistoryShown: 'All history has been shown.',
    supportHero: 'Hello, how can we help?', supportIntro: "Explore our guides, find quick answers, or reach out directly. We're here to make your experience serene.", searchHelp: 'Search for articles, guides, or keywords...', browseTopics: 'Browse Topics', topicIntro: 'Select a category to find related articles and guides.', faq: 'Frequently Asked Questions', faqIntro: 'Quick answers to our most common inquiries.', needHelp: 'Still need help?', needHelpIntro: 'Our support team is ready to assist you further.', contactUs: 'Contact Us', startChat: 'Start Chat', readDocs: 'Read Docs',
    accountManagement: 'Account Management', queueBooking: 'Queue Booking', pointsRewards: 'Points & Rewards', institutionSupport: 'Institution Support',
    profileSettings: 'Settings', accountPreferences: 'Account Preferences', profileAccount: 'MyTurn Account', activeReporter: 'Active Reporter · Joined 2024', totalPoints: 'Total Points', badges: 'Badges Earned', achievementMap: 'Achievement Map', journey: 'MyTurn Journey', fastReporter: 'Fast Reporter', trusted: 'Trusted', observer: 'Level 1: Observer', activeReporterLevel: 'Level 2: Active Reporter', queueExpert: 'Level 3: Queue Expert', current: 'Current', completeFive: 'Complete 5 queue reports.', completeTwenty: 'Complete 20 queue reports. (15/20)', completeFifty: 'Complete 50 queue reports.',
    createAccount: 'Create an Account', welcomeBack: 'Welcome back. Please enter your details.', joinMyturn: 'Join MyTurn for a seamless waiting experience.', fullName: 'Full Name', email: 'Email Address', password: 'Password', confirmPassword: 'Confirm Password', rememberMe: 'Remember me', forgotPassword: 'Forgot password?', orContinue: 'Or continue with', noAccount: "Don't have an account?", haveAccount: 'Already have an account?',
    backExplore: 'Back to Explore', currentWait: 'Current Wait Time', runningQueue: 'Active Queue', claimQueue: 'Take a Queue Number', bestHour: 'Best Time Prediction', crowdEstimate: 'Estimated visitor density today.', estimatedVisitors: 'Estimated visitors', visitors: 'visitors', crowdQuiet: 'Quiet', crowdNormal: 'Normal', crowdBusy: 'Busy', peakCrowd: 'Peak crowd', recommendedTime: 'Recommended time', selectChartTime: 'Select {time}: about {count} visitors, {level}', bookingSlot: 'Book a Time Slot', bookingIntro: 'Choose a specific slot for a future visit (Experimental).', chooseDate: 'Choose Date', chooseSession: 'Choose Session', bookThisSlot: 'Book This Slot', visitorReviews: 'Visitor Reviews',
    faqCancelQ: 'How do I cancel my place in the queue?', faqCancelA: 'Open the Queue tab and select “Cancel” on your active ticket. Your spot will be released immediately and your position will not be held.', faqMissQ: 'What happens if I miss my turn?', faqMissA: 'If you miss your turn, your ticket is marked as cancelled and moved to the back of the line. You can check in again to receive a new number.', faqOtherQ: 'Can I book a queue spot for someone else?', faqOtherA: 'Yes. During check-in, add the visitor’s name and phone number under “Book for someone else” so reminders are sent to the right person.', faqContactQ: 'How do I contact a specific institution?', faqContactA: 'Visit the institution card on the Explore map and select its listing for contact details, or reach out through our Contact page for help.', showPassword: 'Show password', hidePassword: 'Hide password',
  },
};

const PreferencesContext = createContext(null);
const PREFERENCE_VERSION = '2';

function savedPreference(key, fallback) {
  const isCurrent = localStorage.getItem('myturn-preferences-version') === PREFERENCE_VERSION;
  return isCurrent ? localStorage.getItem(key) || fallback : fallback;
}

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() => savedPreference('myturn-language', 'id'));
  const [theme, setTheme] = useState(() => savedPreference('myturn-theme', 'light'));

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('myturn-language', language);
    localStorage.setItem('myturn-theme', theme);
    localStorage.setItem('myturn-preferences-version', PREFERENCE_VERSION);
  }, [language, theme]);

  const value = useMemo(() => ({
    language, setLanguage, theme, setTheme,
    t: (key, vars = {}) => (dictionary[language][key] || dictionary.id[key] || key).replace(/\{(\w+)\}/g, (_, name) => vars[name] ?? ''),
  }), [language, theme]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);
  if (!context) throw new Error('usePreferences must be used within PreferencesProvider');
  return context;
}
