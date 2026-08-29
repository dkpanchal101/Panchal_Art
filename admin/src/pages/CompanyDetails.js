import React, { useState, useEffect } from 'react';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';
import { Save, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const CompanyDetails = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    description: '',
    phone: '',
    email: '',
    website: '',
    address: '',
    city: '',
    state: '',
    country: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await api.get(ENDPOINTS.COMPANY);
      if (res.data && res.data.success && res.data.data.company) {
        const c = res.data.data.company;
        setFormData({
          companyName: c.companyName || '',
          description: c.description || '',
          phone: c.phone || '',
          email: c.email || '',
          website: c.website || '',
          address: c.address || '',
          city: c.city || '',
          state: c.state || '',
          country: c.country || ''
        });
      }
    } catch (err) {
      console.error('Fetch company error:', err);
      setMsg({ type: 'danger', text: 'Error loading company profile data.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg(null);

    try {
      const res = await api.put(ENDPOINTS.COMPANY, formData);
      if (res.data && res.data.success) {
        setMsg({ type: 'success', text: 'Company details updated successfully!' });
      } else {
        setMsg({ type: 'danger', text: res.data.message || 'Failed to update company.' });
      }
    } catch (err) {
      console.error('Update company error:', err);
      setMsg({ type: 'danger', text: err.response?.data?.message || 'Error saving company details.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-5 text-center text-muted">
        <Loader2 size={32} className="animate-spin text-warning mb-2" />
        <div className="fs-7">Loading Company Data...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary mb-4">
        <div>
          <span className="badge bg-warning text-dark uppercase fs-8 mb-1">Company Profile</span>
          <h1 className="h3 font-weight-bold text-white m-0">Organization & Location Settings</h1>
        </div>
      </div>

      {msg && (
        <div className={`alert alert-${msg.type} py-2.5 px-3 fs-7 rounded-3 mb-4 d-flex align-items-center gap-2`}>
          {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span>{msg.text}</span>
        </div>
      )}

      <div className="card bg-dark border-secondary rounded-3 p-4 text-white">
        <form onSubmit={handleSubmit} className="row g-3">
          
          <div className="col-12 col-md-6">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Company Name *</label>
            <input
              type="text"
              name="companyName"
              required
              className="form-control bg-dark border-secondary text-light fs-7"
              value={formData.companyName}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Website URL</label>
            <input
              type="url"
              name="website"
              className="form-control bg-dark border-secondary text-light fs-7"
              placeholder="https://panchalart.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Official Phone *</label>
            <input
              type="text"
              name="phone"
              required
              className="form-control bg-dark border-secondary text-light fs-7"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Official Email *</label>
            <input
              type="email"
              name="email"
              required
              className="form-control bg-dark border-secondary text-light fs-7"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Full Workshop / Office Address</label>
            <input
              type="text"
              name="address"
              className="form-control bg-dark border-secondary text-light fs-7"
              placeholder="In front of Railway Station, Thasara - 388250"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fs-8 fw-bold uppercase text-muted">City / Town</label>
            <input
              type="text"
              name="city"
              className="form-control bg-dark border-secondary text-light fs-7"
              placeholder="Thasara"
              value={formData.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fs-8 fw-bold uppercase text-muted">State</label>
            <input
              type="text"
              name="state"
              className="form-control bg-dark border-secondary text-light fs-7"
              placeholder="Gujarat"
              value={formData.state}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Country</label>
            <input
              type="text"
              name="country"
              className="form-control bg-dark border-secondary text-light fs-7"
              placeholder="India"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          <div className="col-12">
            <label className="form-label fs-8 fw-bold uppercase text-muted">Business / Technical Description</label>
            <textarea
              name="description"
              rows={4}
              className="form-control bg-dark border-secondary text-light fs-7"
              placeholder="Master precision signage engineering and custom fabrication services..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="col-12 pt-3">
            <button
              type="submit"
              disabled={saving}
              className="btn btn-warning fw-bold text-dark fs-7 px-4 shadow-sm d-inline-flex align-items-center gap-2"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Save Company Details</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CompanyDetails;
