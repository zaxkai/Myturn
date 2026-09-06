import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

function SignInPage({ onSignIn, onNavigateSignUp, onNotify, lastSignedUpName }) {
  const { t } = usePreferences();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const firstName = lastSignedUpName?.split(' ')[0];

  const submit = async (event) => {
    event.preventDefault();
    if (!email.trim() || !password) {
      onNotify('Isi email dan password terlebih dahulu.');
      return;
    }
    setIsSubmitting(true);
    await onSignIn({ email: email.trim(), password, rememberMe });
    setIsSubmitting(false);
  };

  return (
    <main className="auth-page">
      <div className="auth-grid">
        <div className="auth-photo card-overlay" role="img" aria-label="Ruang tunggu yang tenang dan modern">
          <div className="auth-quote-card">
            <h2>{firstName ? `Selamat datang kembali, ${firstName}.` : 'Clarity in the Queue.'}</h2>
            <p>{firstName ? 'Masuk untuk melanjutkan pengalaman antre tanpa menunggu.' : 'Experience a composed, frictionless wait.'}</p>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <p className="auth-wordmark">MYTURN</p>
            <p className="auth-subtitle">{t('welcomeBack')}</p>

            <form className="auth-form" onSubmit={submit}>
              <label className="auth-field">
                <span>{t('email')}</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="name@company.com" autoComplete="email" />
              </label>
              <label className="auth-field">
                <span>{t('password')}</span>
                <div className="password-input">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label className="show-password-field">
                <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
                {showPassword ? t('hidePassword') : t('showPassword')}
              </label>

              <div className="auth-row">
                <label className="checkbox-field">
                  <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                  {t('rememberMe')}
                </label>
                <button type="button" className="link-button" onClick={() => onNotify('Fitur reset password akan segera tersedia.')}>{t('forgotPassword')}</button>
              </div>

              <button type="submit" className="claim-button auth-submit" disabled={isSubmitting}>{isSubmitting ? 'Memproses…' : t('signIn')}</button>
            </form>

            <div className="auth-divider"><span>{t('orContinue')}</span></div>
            <div className="auth-social">
              <button type="button" onClick={() => onNotify('Login Google akan segera tersedia.')}>Google</button>
              <button type="button" onClick={() => onNotify('Login Apple akan segera tersedia.')}>Apple</button>
            </div>

            <p className="auth-switch">
              {t('noAccount')}{' '}
              <button type="button" onClick={onNavigateSignUp}>{t('signUp')}</button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignInPage;
