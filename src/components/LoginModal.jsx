import React, { useState, useEffect } from 'react';

/**
 * Animated Login Buddies (interactive mascot eyes & hands)
 */
export function LoginBuddy({ mood = 'idle', shakeKey = 0 }) {
  const containerClass = `login-buddies login-buddies--${mood} ${
    shakeKey > 0 ? 'login-buddies-shake' : ''
  }`;

  return (
    <div className={containerClass} key={shakeKey}>
      {['a', 'b'].map((id) => (
        <div key={id} className={`login-buddy login-buddy--${id}`}>
          <span className="login-buddy-ear login-buddy-ear--left" />
          <span className="login-buddy-ear login-buddy-ear--right" />
          <div className="login-buddy-face">
            <span className="login-buddy-patch login-buddy-patch--left">
              <span className="login-buddy-eye">
                <span className="login-buddy-pupil" />
              </span>
              <span className="login-buddy-eye-happy" />
            </span>
            <span className="login-buddy-patch login-buddy-patch--right">
              <span className="login-buddy-eye">
                <span className="login-buddy-pupil" />
              </span>
              <span className="login-buddy-eye-happy" />
            </span>
            <span className="login-buddy-blush login-buddy-blush--left" />
            <span className="login-buddy-blush login-buddy-blush--right" />
            <span className="login-buddy-nose" />
            <span className="login-buddy-mouth" />
          </div>
          <div className="login-buddy-hands">
            <span className="login-buddy-hand login-buddy-hand--left" />
            <span className="login-buddy-hand login-buddy-hand--right" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Fullscreen Modern Login Dialog
 */
export function LoginModal({ error, onLogin, success = false }) {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('');
  const [mood, setMood] = useState('idle');
  const [attempts, setAttempts] = useState(0);
  const [shakeKey, setShakeKey] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (attempts > 0 && error) {
      setShakeKey((prev) => prev + 1);
    }
  }, [error, attempts]);

  useEffect(() => {
    if (!success) {
      setIsExiting(false);
      return;
    }
    setMood('happy');
    const timer = setTimeout(() => setIsExiting(true), 350);
    return () => clearTimeout(timer);
  }, [success]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    setAttempts((prev) => prev + 1);
    onLogin(username, password);
  };

  return (
    <div className="modal" style={{ display: 'flex', zIndex: 1000 }}>
      <div className={`modal-content login-card shadow-2xl ${isExiting ? 'login-card--exiting' : ''}`}>
        <div className="login-card-brand">
          <LoginBuddy mood={mood} shakeKey={shakeKey} />
          <h2>{success ? 'Đăng nhập thành công!' : 'Chào mừng trở lại!'}</h2>
          <p>
            {success
              ? 'Đang chuyển đến trang quản lý...'
              : 'Đăng nhập để tiếp tục theo dõi và quản lý toàn bộ hạ tầng mạng.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-card-form">
          <h3>
            <span className="login-card-form-icon">
              <i className={`fas ${success ? 'fa-check text-emerald-500' : 'fa-lock'}`} />
            </span>
            {success ? 'Đang mở bảng điều khiển' : 'Xác thực quản trị viên'}
          </h3>

          <fieldset className="space-y-4" disabled={success} style={{ border: 'none', padding: 0, margin: 0 }}>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Tài khoản
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setMood('watching')}
                onBlur={() => setMood('idle')}
                className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-bold outline-none"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                Mật khẩu
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setMood('shy')}
                onBlur={() => setMood('idle')}
                className="w-full mt-1.5 p-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 rounded-xl text-sm font-bold outline-none"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 font-bold flex items-center gap-1.5">
                <i className="fas fa-exclamation-circle" /> {error}
              </p>
            )}
          </fieldset>

          <button
            type="submit"
            disabled={success}
            className="login-card-submit mt-4 flex items-center justify-center gap-2 cursor-pointer"
          >
            {success ? (
              <i className="fas fa-circle-notch fa-spin text-lg" />
            ) : (
              <>
                <i className="fas fa-sign-in-alt mr-1" /> Đăng nhập
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
