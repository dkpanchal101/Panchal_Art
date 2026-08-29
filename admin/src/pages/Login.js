import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2, ShieldCheck } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg('');

    const res = await login(email, password);
    setSubmitting(false);

    if (res.success) {
      navigate('/dashboard');
    } else {
      setErrorMsg(res.message);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-light d-flex align-items-center justify-content-center p-3">
      <div className="card bg-dark text-light border-secondary shadow-lg rounded-4 p-4" style={{ maxWidth: '420px', width: '100%' }}>
        
        <div className="text-center mb-4">
          <div className="rounded-circle bg-warning text-dark d-inline-flex align-items-center justify-content-center mb-3 shadow" style={{ width: '54px', height: '54px' }}>
            <Lock size={26} />
          </div>
          <h2 className="fw-extrabold text-white mb-1">Admin Control Portal</h2>
          <div className="text-muted fs-7">Panchal Art Internal Operations</div>
        </div>

        {errorMsg && (
          <div className="alert alert-danger py-2 px-3 fs-7 rounded-3 mb-3 d-flex align-items-center gap-2">
            <ShieldCheck size={16} className="text-danger flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          <div>
            <label className="form-label fs-8 fw-bold text-uppercase tracking-wider text-muted">
              Administrator Email
            </label>
            <div className="input-group">
              <span className="input-group-text bg-secondary border-secondary text-light">
                <Mail size={16} />
              </span>
              <input
                type="email"
                required
                className="form-control bg-dark border-secondary text-light fs-7"
                placeholder="admin@panchalart.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label fs-8 fw-bold text-uppercase tracking-wider text-muted">
              Security Password
            </label>
            <div className="input-group">
              <span className="input-group-text bg-secondary border-secondary text-light">
                <Lock size={16} />
              </span>
              <input
                type="password"
                required
                className="form-control bg-dark border-secondary text-light fs-7"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-warning py-2.5 fw-bold text-dark fs-7 rounded-3 mt-2 shadow-sm d-flex align-items-center justify-content-center gap-2"
          >
            {submitting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <Lock size={16} />
                <span>Authorize Admin Access</span>
              </>
            )}
          </button>
        </form>

        <div className="text-center mt-4 text-muted fs-8">
          Default Superadmin: <strong>admin@panchalart.com</strong> / <strong>admin123</strong>
        </div>

      </div>
    </div>
  );
};

export default Login;
