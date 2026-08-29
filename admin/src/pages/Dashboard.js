import React, { useEffect, useState } from 'react';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';
import { 
  ImageIcon, MessageSquareQuote, Mail, Building2, 
  Loader2, RefreshCw, Sparkles, ArrowUpRight 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.get(ENDPOINTS.DASHBOARD_STATS);
      if (res.data && res.data.success) {
        setData(res.data.data);
      } else {
        setError('Failed to load dashboard metrics.');
      }
    } catch (err) {
      console.error('Dashboard fetch error:', err);
      setError('Unable to fetch live analytics from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="py-5 text-center text-muted">
        <Loader2 size={36} className="animate-spin text-warning mb-2" />
        <div className="fs-7 fw-bold uppercase">Loading Real Dashboard Analytics...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger p-4 rounded-3 text-center">
        <div className="fw-bold mb-2">{error}</div>
        <button onClick={fetchStats} className="btn btn-outline-danger btn-sm">
          <RefreshCw size={14} className="me-1" /> Retry Fetching Analytics
        </button>
      </div>
    );
  }

  const { stats, company, recentQuotes, recentInquiries } = data || {};

  return (
    <div className="space-y-4">
      
      {/* Page Title Bar */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 pb-3 border-bottom border-secondary mb-4">
        <div>
          <span className="badge bg-warning text-dark uppercase tracking-wider fs-8 mb-1">
            <Sparkles size={12} className="me-1" /> Executive Dashboard
          </span>
          <h1 className="h3 font-weight-bold text-white m-0">Operations Control Overview</h1>
        </div>

        <button onClick={fetchStats} className="btn btn-sm btn-outline-secondary text-light d-flex align-items-center gap-1">
          <RefreshCw size={14} />
          <span>Refresh Live Metrics</span>
        </button>
      </div>

      {/* 4 Primary Metric Stat Cards */}
      <div className="row g-3 mb-4">
        
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card stat-card rounded-3 p-3 text-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-8 fw-bold uppercase tracking-wider">Gallery Assets</span>
              <div className="p-2 rounded-2 bg-warning bg-opacity-10 text-warning">
                <ImageIcon size={20} />
              </div>
            </div>
            <div className="h2 font-weight-bold m-0 text-warning">{stats?.totalGallery || 0}</div>
            <div className="text-muted fs-8 mt-1">Published portfolio images</div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card stat-card rounded-3 p-3 text-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-8 fw-bold uppercase tracking-wider">Quote Requests</span>
              <div className="p-2 rounded-2 bg-info bg-opacity-10 text-info">
                <MessageSquareQuote size={20} />
              </div>
            </div>
            <div className="h2 font-weight-bold m-0 text-info">{stats?.totalQuotes || 0}</div>
            <div className="text-muted fs-8 mt-1">
              <strong className="text-warning">{stats?.pendingQuotes || 0}</strong> pending review
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card stat-card rounded-3 p-3 text-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-8 fw-bold uppercase tracking-wider">Contact Leads</span>
              <div className="p-2 rounded-2 bg-success bg-opacity-10 text-success">
                <Mail size={20} />
              </div>
            </div>
            <div className="h2 font-weight-bold m-0 text-success">{stats?.totalInquiries || 0}</div>
            <div className="text-muted fs-8 mt-1">
              <strong className="text-warning">{stats?.unreadInquiries || 0}</strong> unread submissions
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card stat-card rounded-3 p-3 text-white h-100">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <span className="text-muted fs-8 fw-bold uppercase tracking-wider">Company HQ</span>
              <div className="p-2 rounded-2 bg-primary bg-opacity-10 text-primary">
                <Building2 size={20} />
              </div>
            </div>
            <div className="fs-6 font-weight-bold text-white truncate">{company?.companyName || 'Panchal Art'}</div>
            <div className="text-muted fs-8 mt-1 truncate">{company?.address || 'Thasara, Gujarat'}</div>
          </div>
        </div>

      </div>

      {/* Recent Activity Tables */}
      <div className="row g-4">
        
        {/* Recent Quote Requests */}
        <div className="col-12 col-lg-6">
          <div className="card bg-dark border-secondary rounded-3 p-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-secondary mb-3">
              <h5 className="m-0 fs-6 font-weight-bold text-white d-flex align-items-center gap-2">
                <MessageSquareQuote size={16} className="text-warning" />
                <span>Recent Quote Requests</span>
              </h5>
              <Link to="/quotes" className="btn btn-xs btn-outline-warning text-warning fs-8">
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            {recentQuotes && recentQuotes.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-dark table-hover table-sm align-middle fs-7 mb-0">
                  <thead>
                    <tr className="text-muted fs-8">
                      <th>Client</th>
                      <th>Service</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentQuotes.map((q) => (
                      <tr key={q._id}>
                        <td>
                          <div className="fw-bold text-white">{q.name}</div>
                          <div className="text-muted fs-8">{q.phone}</div>
                        </td>
                        <td className="text-light">{q.service}</td>
                        <td>
                          <span className={`badge ${
                            q.status === 'pending' ? 'bg-warning text-dark' :
                            q.status === 'approved' ? 'bg-success' : 'bg-secondary'
                          } fs-8`}>
                            {q.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-muted fs-8 py-4 text-center">No quote submissions recorded yet.</div>
            )}
          </div>
        </div>

        {/* Recent Contact Inquiries */}
        <div className="col-12 col-lg-6">
          <div className="card bg-dark border-secondary rounded-3 p-3">
            <div className="d-flex justify-content-between align-items-center pb-2 border-bottom border-secondary mb-3">
              <h5 className="m-0 fs-6 font-weight-bold text-white d-flex align-items-center gap-2">
                <Mail size={16} className="text-success" />
                <span>Recent Contact Leads</span>
              </h5>
              <Link to="/contacts" className="btn btn-xs btn-outline-success text-success fs-8">
                View All <ArrowUpRight size={12} />
              </Link>
            </div>

            {recentInquiries && recentInquiries.length > 0 ? (
              <div className="table-responsive">
                <table className="table table-dark table-hover table-sm align-middle fs-7 mb-0">
                  <thead>
                    <tr className="text-muted fs-8">
                      <th>Name</th>
                      <th>Email</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentInquiries.map((c) => (
                      <tr key={c._id}>
                        <td>
                          <div className="fw-bold text-white">{c.name}</div>
                          <div className="text-muted fs-8">{c.phone}</div>
                        </td>
                        <td className="text-light truncate" style={{ maxWidth: '140px' }}>{c.email}</td>
                        <td>
                          <span className={`badge ${c.isRead ? 'bg-secondary' : 'bg-success'} fs-8`}>
                            {c.isRead ? 'Read' : 'New'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-muted fs-8 py-4 text-center">No contact inquiries recorded yet.</div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;
