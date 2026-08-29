import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';
import { UserCheck, KeyRound, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updating, setUpdating] = useState(false);
  const [msg, setMsg] = useState(null);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg({ type: 'danger', text: 'New password and confirmation do not match.' });
      return;
    }

    setUpdating(true);
    setMsg(null);

    try {
      const res = await api.put(ENDPOINTS.UPDATE_PASSWORD, {
        currentPassword,
        newPassword
      });

      if (res.data && res.data.success) {
        setMsg({ type: 'success', text: 'Security password updated successfully!' });
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setMsg({ type: 'danger', text: res.data.message || 'Failed to update password.' });
      }
    } catch (err) {
      console.error('Update password error:', err);
      setMsg({ type: 'danger', text: err.response?.data?.message || 'Error changing password.' });
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="max-w-3xl">
      
      {/* Title Bar */}
      <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary mb-4">
        <div>
          <span className="badge bg-warning text-dark uppercase fs-8 mb-1">Security Portal</span>
          <h1 className="h3 font-weight-bold text-white m-0">Administrator Profile & Security</h1>
        </div>
      </div>

      {msg && (
        <div className={`alert alert-${msg.type} py-2.5 px-3 fs-7 rounded-3 mb-4 d-flex align-items-center gap-2`}>
          {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{msg.text}</span>
        </div>
      )}

      {/* Account Info Card */}
      <div className="card bg-dark border-secondary rounded-3 p-4 text-white mb-4 shadow-sm">
        <h5 className="fs-6 font-weight-bold text-white mb-3 d-flex align-items-center gap-2">
          <UserCheck size={18} className="text-warning" />
          <span>Account Overview</span>
        </h5>

        <div className="row g-3 fs-7">
          <div className="col-12 col-md-4">
            <label className="text-muted fs-8 uppercase font-weight-bold">Full Name</label>
            <div className="fw-bold text-white">{user?.fullName || 'Administrator'}</div>
          </div>

          <div className="col-12 col-md-4">
            <label className="text-muted fs-8 uppercase font-weight-bold">Email Address</label>
            <div className="fw-bold text-warning">{user?.email || 'admin@panchalart.com'}</div>
          </div>

          <div className="col-12 col-md-4">
            <label className="text-muted fs-8 uppercase font-weight-bold">Assigned Role</label>
            <div>
              <span className="badge bg-warning text-dark uppercase fs-8">
                {user?.role || 'Super Admin'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Security Password Change Card */}
      <div className="card bg-dark border-secondary rounded-3 p-4 text-white shadow-sm">
        <h5 className="fs-6 font-weight-bold text-white mb-3 d-flex align-items-center gap-2">
          <KeyRound size={18} className="text-warning" />
          <span>Change Administrator Password</span>
        </h5>

        <form onSubmit={handlePasswordChange} className="space-y-3">
          <div>
            <label className="form-label fs-8 fw-bold uppercase text-muted">Current Password *</label>
            <input
              type="password"
              required
              className="form-control bg-dark border-secondary text-light fs-7"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label fs-8 fw-bold uppercase text-muted">New Password *</label>
            <input
              type="password"
              required
              minLength={6}
              className="form-control bg-dark border-secondary text-light fs-7"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div>
            <label className="form-label fs-8 fw-bold uppercase text-muted">Confirm New Password *</label>
            <input
              type="password"
              required
              minLength={6}
              className="form-control bg-dark border-secondary text-light fs-7"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={updating}
              className="btn btn-warning fw-bold text-dark fs-7 px-4 shadow-sm d-inline-flex align-items-center gap-2"
            >
              {updating ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
              <span>Update Password</span>
            </button>
          </div>
        </form>
      </div>

    </div>
  );
};

export default Profile;
