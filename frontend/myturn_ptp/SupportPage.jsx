import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, BookOpen, Building2, ChevronDown, FileText, Mail, MessageSquare, Search, Send, Smartphone, Tag, UserCog, X } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

const topics = [
  { id: 'account', Icon: UserCog, title: { id: 'Manajemen Akun', en: 'Account Management' }, description: { id: 'Perbarui profil, kata sandi, dan pengaturan akun.', en: 'Update your profile, password, and account settings.' } },
  { id: 'booking', Icon: Smartphone, title: { id: 'Booking Antrean', en: 'Queue Booking' }, description: { id: 'Cara mengambil, membatalkan, dan mengelola giliran.', en: 'How to book, cancel, and manage your turns.' } },
  { id: 'rewards', Icon: Tag, title: { id: 'Poin & Hadiah', en: 'Points & Rewards' }, description: { id: 'Memahami poin loyalitas dan lencana Anda.', en: 'Understand your loyalty points and badges.' } },
  { id: 'institution', Icon: Building2, title: { id: 'Bantuan Institusi', en: 'Institution Support' }, description: { id: 'Panduan untuk institusi yang mengelola antrean.', en: 'Guides for institutions managing their queues.' } },
];

const articles = [
  { id: 'update-profile', topic: 'account', title: { id: 'Memperbarui profil dan nomor WhatsApp', en: 'Update your profile and WhatsApp number' }, summary: { id: 'Simpan nomor WhatsApp agar pengingat konsultasi dapat dikirim.', en: 'Save a WhatsApp number so consultation reminders can reach you.' }, body: { id: ['Buka menu Profil dari navigasi utama.', 'Masukkan nomor WhatsApp aktif pada kartu Notifikasi WhatsApp.', 'Tekan “Simpan Nomor”, lalu aktifkan notifikasi WhatsApp dari halaman Antrean.'], en: ['Open Profile from the main navigation.', 'Enter an active WhatsApp number in the WhatsApp Notifications card.', 'Select “Save Number”, then enable WhatsApp notifications from the Queue page.'] } },
  { id: 'book-slot', topic: 'booking', title: { id: 'Cara booking slot waktu', en: 'How to book a time slot' }, summary: { id: 'Pilih tanggal, sesi, dan jam kunjungan yang paling sesuai.', en: 'Choose the visit date, session, and time that suit you.' }, body: { id: ['Buka detail institusi dari halaman Jelajahi.', 'Pada Booking Slot Waktu, pilih tanggal, sesi, dan jam kunjungan.', 'Tekan “Booking Slot Ini”. Nomor antrean dan detail jadwal akan muncul pada halaman Antrean.'], en: ['Open an institution detail page from Explore.', 'Under Book a Time Slot, choose the date, session, and visit time.', 'Select “Book This Slot”. Your queue number and schedule will appear on the Queue page.'] } },
  { id: 'cancel-queue', topic: 'booking', title: { id: 'Membatalkan antrean atau booking', en: 'Cancel a queue or booking' }, summary: { id: 'Batalkan tiket aktif jika Anda tidak dapat hadir.', en: 'Cancel an active ticket when you cannot attend.' }, body: { id: ['Buka halaman Antrean.', 'Pilih tiket yang ingin dibatalkan.', 'Tekan tombol “Batalkan”. Tiket dipindahkan ke Riwayat dengan status Dibatalkan.'], en: ['Open the Queue page.', 'Find the ticket you want to cancel.', 'Select “Cancel”. The ticket moves to History with a Cancelled status.'] } },
  { id: 'points', topic: 'rewards', title: { id: 'Mendapatkan poin dan lencana', en: 'Earn points and badges' }, summary: { id: 'Selesaikan kunjungan untuk menambah poin MyTurn.', en: 'Complete visits to earn MyTurn points.' }, body: { id: ['Lakukan check-in saat tiba di institusi.', 'Tekan “Selesaikan” setelah konsultasi atau layanan selesai.', 'Poin akan masuk ke Riwayat dan progres lencana dapat dilihat pada Profil.'], en: ['Check in when you arrive at the institution.', 'Select “Complete” after the consultation or service finishes.', 'Points appear in History and badge progress is available in Profile.'] } },
  { id: 'institution-live', topic: 'institution', title: { id: 'Memperbarui status antrean institusi', en: 'Update an institution queue status' }, summary: { id: 'Panduan singkat untuk memastikan data antrean tetap akurat.', en: 'A quick guide to keep queue data accurate.' }, body: { id: ['Perbarui kapasitas dan sisa antrean dari dashboard institusi.', 'Pastikan data waktu tunggu diperbarui ketika kondisi berubah.', 'Pengunjung akan melihat pembaruan pada peta dan halaman detail institusi.'], en: ['Update capacity and remaining queue from the institution dashboard.', 'Refresh the wait-time data whenever conditions change.', 'Visitors will see updates on the map and institution detail page.'] } },
];

const faqKeys = [['faqCancelQ', 'faqCancelA'], ['faqMissQ', 'faqMissA'], ['faqOtherQ', 'faqOtherA'], ['faqContactQ', 'faqContactA']];

function SupportPage({ onNotify }) {
  const { t, language } = usePreferences();
  const [query, setQuery] = useState('');
  const [searchedQuery, setSearchedQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [openFaqId, setOpenFaqId] = useState('faqCancelQ');
  const [supportPanel, setSupportPanel] = useState(null);
  const [contact, setContact] = useState({ name: '', email: '', message: '' });
  const [chatMessages, setChatMessages] = useState([]);
  const [chatDraft, setChatDraft] = useState('');
  const resultsRef = useRef(null);
  const copy = (value) => value[language] ?? value.id;
  const faqs = useMemo(() => faqKeys.map(([id, answer]) => ({ id, question: t(id), answer: t(answer) })), [t]);
  const normalizedQuery = searchedQuery.trim().toLowerCase();
  const visibleArticles = useMemo(() => articles.filter((article) => {
    const matchesTopic = !selectedTopic || article.topic === selectedTopic;
    const text = [copy(article.title), copy(article.summary), ...copy(article.body)].join(' ').toLowerCase();
    return matchesTopic && (!normalizedQuery || text.includes(normalizedQuery));
  }), [language, normalizedQuery, selectedTopic]);
  const showResults = () => window.requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  const submitSearch = (event) => { event.preventDefault(); setSelectedTopic(null); setSelectedArticle(null); setSearchedQuery(query); showResults(); };
  const selectTopic = (topicId) => { setSelectedTopic(topicId); setSelectedArticle(null); setSearchedQuery(''); setQuery(''); showResults(); };
  const selectArticle = (article) => { setSelectedArticle(article); setSupportPanel(null); showResults(); };
  const topicTitle = selectedTopic ? copy(topics.find((topic) => topic.id === selectedTopic).title) : null;

  const submitContact = (event) => {
    event.preventDefault();
    if (!contact.name.trim() || !contact.email.trim() || !contact.message.trim()) {
      onNotify(language === 'id' ? 'Lengkapi nama, email, dan pesan terlebih dahulu.' : 'Please complete your name, email, and message first.');
      return;
    }
    onNotify(language === 'id' ? 'Pesan bantuan telah dicatat. Tim kami akan membalas melalui email.' : 'Your support request has been recorded. Our team will reply by email.');
    setContact({ name: '', email: '', message: '' });
  };
  const submitChat = (event) => {
    event.preventDefault();
    if (!chatDraft.trim()) return;
    const text = chatDraft.trim();
    setChatMessages((messages) => [...messages, { id: `${Date.now()}-user`, from: 'user', text }, { id: `${Date.now()}-agent`, from: 'agent', text: language === 'id' ? 'Terima kasih. Tim bantuan kami sedang meninjau pesan Anda.' : 'Thank you. Our support team is reviewing your message.' }]);
    setChatDraft('');
  };
  const resetResults = () => { setSelectedTopic(null); setSelectedArticle(null); setSearchedQuery(''); setQuery(''); };

  return (
    <main className="support-page">
      <section className="support-hero section-pad">
        <p className="eyebrow">MYTURN SUPPORT</p><h1>{t('supportHero')}</h1><p className="support-intro">{t('supportIntro')}</p>
        <form className="support-search" onSubmit={submitSearch} role="search" aria-label={t('searchHelp')}>
          <Search size={20} strokeWidth={2.2} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchHelp')} />
          {query && <button type="button" className="support-search-clear" onClick={() => { setQuery(''); setSearchedQuery(''); }} aria-label="Hapus pencarian"><X size={17} /></button>}
          <button type="submit" className="support-search-submit">{language === 'id' ? 'Cari' : 'Search'}</button>
        </form>
      </section>

      <section className="support-topics section-pad-small">
        <div className="section-heading centered"><h2>{t('browseTopics')}</h2><p>{t('topicIntro')}</p></div>
        <div className="topics-grid">{topics.map(({ id, Icon, title, description }) => <button key={id} className={`topic-card ${selectedTopic === id ? 'is-selected' : ''}`} onClick={() => selectTopic(id)} aria-pressed={selectedTopic === id}><span className="topic-icon"><Icon size={22} /></span><h3>{copy(title)}</h3><p>{copy(description)}</p></button>)}</div>
      </section>

      <section className="support-results section-pad-small" ref={resultsRef} aria-live="polite">
        <div className="support-results-heading"><div><p className="eyebrow">{selectedArticle ? (language === 'id' ? 'PANDUAN' : 'GUIDE') : (language === 'id' ? 'PUSAT BANTUAN' : 'HELP CENTRE')}</p><h2>{selectedArticle ? copy(selectedArticle.title) : selectedTopic ? topicTitle : normalizedQuery ? `${language === 'id' ? 'Hasil untuk' : 'Results for'} “${searchedQuery}”` : language === 'id' ? 'Artikel populer' : 'Popular articles'}</h2></div>{(selectedTopic || selectedArticle || normalizedQuery) && <button className="support-back-button" onClick={resetResults}>{selectedArticle ? <ArrowLeft size={17} /> : <X size={17} />}{language === 'id' ? 'Lihat semua' : 'View all'}</button>}</div>
        {selectedArticle ? <article className="support-article"><p>{copy(selectedArticle.summary)}</p><ol>{copy(selectedArticle.body).map((step) => <li key={step}>{step}</li>)}</ol><button className="help-button article-help" onClick={() => setSupportPanel('email')}><Mail size={17} />{language === 'id' ? 'Masih butuh bantuan?' : 'Still need help?'}</button></article> : <div className="article-grid">{visibleArticles.map((article) => <button className="article-card" key={article.id} onClick={() => selectArticle(article)}><BookOpen size={20} /><span><strong>{copy(article.title)}</strong><p>{copy(article.summary)}</p></span></button>)}</div>}
        {!selectedArticle && !visibleArticles.length && <div className="support-no-results"><Search size={25} /><h3>{language === 'id' ? 'Artikel tidak ditemukan' : 'No articles found'}</h3><p>{language === 'id' ? 'Coba gunakan kata kunci lain atau pilih topik di atas.' : 'Try another keyword or choose one of the topics above.'}</p></div>}
      </section>

      <section className="support-faq section-pad-small"><div className="section-heading centered"><h2>{t('faq')}</h2><p>{t('faqIntro')}</p></div><div className="faq-list">{faqs.map(({ id, question, answer }) => { const isOpen = openFaqId === id; return <div className={`faq-item ${isOpen ? 'is-open' : ''}`} key={id}><button className="faq-question" onClick={() => setOpenFaqId(isOpen ? null : id)} aria-expanded={isOpen}><span>{question}</span><ChevronDown size={19} /></button>{isOpen && <p className="faq-answer">{answer}</p>}</div>; })}</div></section>

      <section className="support-help section-pad-small">
        <div className="section-heading centered"><h2>{t('needHelp')}</h2><p>{t('needHelpIntro')}</p></div>
        <div className="help-grid">
          <article className="help-card"><span className="help-icon"><Mail size={24} /></span><h3>{language === 'id' ? 'Dukungan Email' : 'Email Support'}</h3><p>{language === 'id' ? 'Kirim pesan dan tim kami akan membalas dalam 24 jam.' : "Send us a message and we'll reply within 24 hours."}</p><button className="help-button" onClick={() => setSupportPanel('email')}>{t('contactUs')}</button></article>
          <article className="help-card"><span className="help-icon"><MessageSquare size={24} /></span><h3>Live Chat</h3><p>{language === 'id' ? 'Mulai percakapan dengan tim bantuan MyTurn.' : 'Start a conversation with the MyTurn support team.'}</p><button className="help-button" onClick={() => setSupportPanel('chat')}>{t('startChat')}</button></article>
          <article className="help-card"><span className="help-icon"><FileText size={24} /></span><h3>{language === 'id' ? 'Dokumentasi' : 'Documentation'}</h3><p>{language === 'id' ? 'Baca panduan penggunaan MyTurn secara mandiri.' : 'Read MyTurn guides at your own pace.'}</p><button className="help-button outline" onClick={() => setSupportPanel('docs')}>{t('readDocs')}</button></article>
        </div>
        {supportPanel && <section className="support-action-panel" aria-live="polite"><button className="support-panel-close" onClick={() => setSupportPanel(null)} aria-label="Tutup panel"><X size={20} /></button>
          {supportPanel === 'email' && <form className="support-contact-form" onSubmit={submitContact}><div><p className="eyebrow">EMAIL SUPPORT</p><h2>{language === 'id' ? 'Kirim pesan kepada kami' : 'Send us a message'}</h2><p>{language === 'id' ? 'Pesan dicatat pada aplikasi demo dan belum mengirim email sungguhan.' : 'This request is recorded in the demo and does not send a real email yet.'}</p></div><input value={contact.name} onChange={(event) => setContact({ ...contact, name: event.target.value })} placeholder={language === 'id' ? 'Nama Anda' : 'Your name'} /><input type="email" value={contact.email} onChange={(event) => setContact({ ...contact, email: event.target.value })} placeholder="email@example.com" /><textarea value={contact.message} onChange={(event) => setContact({ ...contact, message: event.target.value })} placeholder={language === 'id' ? 'Bagaimana kami dapat membantu?' : 'How can we help?'} rows="4" /><button className="help-button" type="submit"><Send size={17} />{language === 'id' ? 'Kirim permintaan' : 'Send request'}</button></form>}
          {supportPanel === 'chat' && <div className="support-chat"><div><p className="eyebrow">LIVE CHAT</p><h2>{language === 'id' ? 'Mulai percakapan' : 'Start a conversation'}</h2><p>{language === 'id' ? 'Asisten demo akan membalas langsung di halaman ini.' : 'The demo assistant will reply directly on this page.'}</p></div><div className="chat-log">{chatMessages.length ? chatMessages.map((message) => <p className={`chat-message ${message.from}`} key={message.id}>{message.text}</p>) : <p className="chat-empty">{language === 'id' ? 'Halo! Ada yang bisa kami bantu?' : 'Hello! How can we help?'}</p>}</div><form onSubmit={submitChat}><input value={chatDraft} onChange={(event) => setChatDraft(event.target.value)} placeholder={language === 'id' ? 'Tulis pesan Anda…' : 'Write your message…'} /><button className="help-button" type="submit"><Send size={17} />{language === 'id' ? 'Kirim' : 'Send'}</button></form></div>}
          {supportPanel === 'docs' && <div className="support-docs"><p className="eyebrow">MYTURN DOCS</p><h2>{language === 'id' ? 'Panduan cepat MyTurn' : 'MyTurn quick guide'}</h2><p>{language === 'id' ? 'Pilih panduan untuk membukanya di pusat bantuan ini.' : 'Choose a guide to open it in this help centre.'}</p><div>{articles.slice(0, 4).map((article) => <button key={article.id} onClick={() => selectArticle(article)}><BookOpen size={17} />{copy(article.title)}</button>)}</div></div>}
        </section>}
      </section>
    </main>
  );
}

export default SupportPage;
