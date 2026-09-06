import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { usePreferences } from './PreferencesContext.jsx';

function SignUpPage({ onSignUp, onNavigateSignIn, onNotify }) {
  const { t } = usePreferences();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    if (!fullName.trim() || !email.trim() || !password) {
      onNotify('Lengkapi semua kolom terlebih dahulu.');
      return;
    }
    if (password.length < 6) {
      onNotify('Password minimal 6 karakter.');
      return;
    }
    if (password !== confirmPassword) {
      onNotify('Konfirmasi password tidak cocok.');
      return;
    }
    onSignUp({ fullName: fullName.trim(), email: email.trim(), password, rememberMe });
  };

  return (
    <main className="auth-page">
      <div className="auth-grid">
        <div className="auth-photo tinted" role="img" aria-label="Lobi modern tempat MyTurn digunakan">
          <p className="auth-wordmark on-photo">MYTURN</p>
          <div className="auth-photo-caption">
            <h2>Clarity in the Queue.</h2>
            <p>Experience a composed, frictionless wait.</p>
          </div>
        </div>

        <div className="auth-form-panel">
          <div className="auth-form-inner">
            <h1>{t('createAccount')}</h1>
            <p className="auth-subtitle">{t('joinMyturn')}</p>

            <form className="auth-form uppercase-labels" onSubmit={submit}>
              <label className="auth-field">
                <span>{t('fullName')}</span>
                <input value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Jane Doe" autoComplete="name" />
              </label>
              <label className="auth-field">
                <span>{t('email')}</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="jane@example.com" autoComplete="email" />
              </label>
              <label className="auth-field">
                <span>{t('password')}</span>
                <div className="password-input">
                  <input type={showPassword ? 'text' : 'password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? t('hidePassword') : t('showPassword')}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>
              <label className="auth-field">
                <span>{t('confirmPassword')}</span>
                <div className="password-input">
                  <input type={showPassword ? 'text' : 'password'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="••••••••" autoComplete="new-password" />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? t('hidePassword') : t('showPassword')}>
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <label className="show-password-field">
                <input type="checkbox" checked={showPassword} onChange={(event) => setShowPassword(event.target.checked)} />
                {showPassword ? t('hidePassword') : t('showPassword')}
              </label>

              <label className="checkbox-field">
                <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                {t('rememberMe')}
              </label>

              <button type="submit" className="claim-button auth-submit">{t('signUp')}</button>
            </form>

            <div className="auth-divider"><span>{t('orContinue')}</span></div>
            <div className="auth-social">
              <button type="button" onClick={() => onNotify('Login Google akan segera tersedia.')}>Google</button>
              <button type="button" onClick={() => onNotify('Login Apple akan segera tersedia.')}>Apple</button>
            </div>

            <p className="auth-switch">
              {t('haveAccount')}{' '}
              <button type="button" onClick={onNavigateSignIn}>{t('signIn')}</button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default SignUpPage;
