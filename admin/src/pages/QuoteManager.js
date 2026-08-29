import React, { useState, useEffect } from 'react';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';
import { 
  MessageSquareQuote, Search, Loader2, Trash2, Eye 
} from 'lucide-react';

const QuoteManager = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  // Selected Quote Modal State
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const fetchQuotes = async () => {
    try {
      setLoading(true);
      const res = await api.get(ENDPOINTS.QUOTES_LIST);
      if (res.data && res.data.success && res.data.data.quotes) {
        setQuotes(res.data.data.quotes);
      }
    } catch (err) {
      console.error('Fetch quotes error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleOpenDetail = (quote) => {
    setSelectedQuote(quote);
    setNewStatus(quote.status || 'pending');
  };

  const handleUpdateStatus = async () => {
    if (!selectedQuote) return;
    setUpdating(true);

    try {
      const res = await api.put(ENDPOINTS.QUOTE_ITEM(selectedQuote._id), {
        status: newStatus
      });

      if (res.data && res.data.success) {
        setSelectedQuote(null);
        fetchQuotes();
      } else {
        alert(res.data.message || 'Failed to update quote status.');
      }
    } catch (err) {
      console.error('Update status error:', err);
      alert(err.response?.data?.message || 'Error updating quote status.');
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;

    try {
      const res = await api.delete(ENDPOINTS.QUOTE_ITEM(id));
      if (res.data && res.data.success) {
        if (selectedQuote && selectedQuote._id === id) setSelectedQuote(null);
        fetchQuotes();
      }
    } catch (err) {
      console.error('Delete quote error:', err);
      alert('Error deleting quote.');
    }
  };

  const filteredQuotes = quotes.filter(q => {
    const matchesStatus = statusFilter === 'all' || q.status === statusFilter;
    const matchesSearch = search === '' || 
      (q.name && q.name.toLowerCase().includes(search.toLowerCase())) ||
      (q.email && q.email.toLowerCase().includes(search.toLowerCase())) ||
      (q.phone && q.phone.toLowerCase().includes(search.toLowerCase())) ||
      (q.service && q.service.toLowerCase().includes(search.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning text-dark';
      case 'reviewed': return 'bg-info text-dark';
      case 'quoted': return 'bg-primary text-white';
      case 'approved': return 'bg-success text-white';
      case 'rejected': return 'bg-danger text-white';
      default: return 'bg-secondary text-white';
    }
  };

  return (
    <div>
      
      {/* Title Bar */}
      <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary mb-4">
        <div>
          <span className="badge bg-warning text-dark uppercase fs-8 mb-1">Client Requests</span>
          <h1 className="h3 font-weight-bold text-white m-0">Quote Inquiries Manager</h1>
        </div>
      </div>

      {/* Toolbar */}
      <div className="card bg-dark border-secondary rounded-3 p-3 mb-4">
        <div className="row g-2 align-items-center">
          
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-secondary border-secondary text-light">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search quotes by client name, email, phone..."
                className="form-control bg-dark border-secondary text-light fs-7"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-8 d-flex flex-wrap gap-1 justify-content-md-end">
            <button
              onClick={() => setStatusFilter('all')}
              className={`btn btn-xs ${statusFilter === 'all' ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
            >
              All ({quotes.length})
            </button>
            {['pending', 'reviewed', 'quoted', 'approved', 'rejected'].map(st => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`btn btn-xs ${statusFilter === st ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
              >
                {st.toUpperCase()} ({quotes.filter(q => q.status === st).length})
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Datatable */}
      {loading ? (
        <div className="py-5 text-center text-muted">
          <Loader2 size={32} className="animate-spin text-warning mb-2" />
          <div className="fs-7">Loading Quote Submissions...</div>
        </div>
      ) : filteredQuotes.length === 0 ? (
        <div className="card bg-dark border-secondary rounded-3 p-5 text-center text-muted">
          <MessageSquareQuote size={40} className="mx-auto mb-2 opacity-50" />
          <div className="fs-6 font-weight-bold">No quote requests found.</div>
        </div>
      ) : (
        <div className="card bg-dark border-secondary rounded-3 overflow-hidden shadow-sm">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle fs-7 mb-0">
              <thead>
                <tr className="text-muted fs-8 uppercase tracking-wider">
                  <th>Client</th>
                  <th>Service Requested</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuotes.map(q => (
                  <tr key={q._id}>
                    <td>
                      <div className="fw-bold text-white">{q.name}</div>
                      <div className="text-muted fs-8">{q.phone} • {q.email}</div>
                    </td>
                    <td>
                      <div className="text-light font-weight-bold">{q.service}</div>
                      {q.description && (
                        <div className="text-muted fs-8 text-truncate" style={{ maxWidth: '240px' }}>
                          {q.description}
                        </div>
                      )}
                    </td>
                    <td className="text-muted fs-8">
                      {new Date(q.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(q.status)} fs-8`}>
                        {(q.status || 'pending').toUpperCase()}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          onClick={() => handleOpenDetail(q)}
                          className="btn btn-outline-warning btn-xs"
                          title="Inspect Quote Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(q._id)}
                          className="btn btn-outline-danger btn-xs"
                          title="Delete Quote"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Quote Detail Modal */}
      {selectedQuote && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content bg-dark border-secondary text-white rounded-3 shadow-lg">
              
              <div className="modal-header border-secondary">
                <h5 className="modal-title fs-6 font-weight-bold text-white d-flex align-items-center gap-2">
                  <MessageSquareQuote size={18} className="text-warning" />
                  <span>Quote Request Inspection</span>
                </h5>
                <button onClick={() => setSelectedQuote(null)} className="btn-close btn-close-white"></button>
              </div>

              <div className="modal-body space-y-3">
                <div className="row g-3">
                  
                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Client Name</label>
                    <div className="fs-6 font-weight-bold text-white">{selectedQuote.name}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Contact Info</label>
                    <div className="fs-7 text-warning font-weight-bold">{selectedQuote.phone}</div>
                    <div className="fs-7 text-light">{selectedQuote.email}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Service Category</label>
                    <div className="fs-7 text-white font-weight-bold">{selectedQuote.service}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Submission Date</label>
                    <div className="fs-7 text-light">{new Date(selectedQuote.createdAt).toLocaleString()}</div>
                  </div>

                  <div className="col-12">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Project Specifications / Description</label>
                    <div className="bg-secondary bg-opacity-20 p-3 rounded-2 text-light fs-7 border border-secondary">
                      {selectedQuote.description || selectedQuote.message || 'No additional project description provided.'}
                    </div>
                  </div>

                  {selectedQuote.imageUrl && (
                    <div className="col-12">
                      <label className="text-muted fs-8 uppercase font-weight-bold">Attached Blueprint / Reference File</label>
                      <div>
                        <a href={selectedQuote.imageUrl} target="_blank" rel="noopener noreferrer">
                          <img src={selectedQuote.imageUrl} alt="Attached Blueprint" style={{ maxHeight: '200px' }} className="rounded-2 border border-secondary" />
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="col-12 pt-2">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Update Pipeline Status</label>
                    <div className="d-flex gap-2 align-items-center">
                      <select
                        className="form-select form-select-sm bg-dark border-secondary text-light fs-7"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                      >
                        <option value="pending">Pending Review</option>
                        <option value="reviewed">Reviewed by Engineer</option>
                        <option value="quoted">Quotation Sent</option>
                        <option value="approved">Approved by Client</option>
                        <option value="rejected">Rejected / Cancelled</option>
                      </select>

                      <button
                        onClick={handleUpdateStatus}
                        disabled={updating}
                        className="btn btn-warning btn-sm text-dark font-weight-bold flex-shrink-0"
                      >
                        {updating ? <Loader2 size={14} className="animate-spin" /> : 'Save Status'}
                      </button>
                    </div>
                  </div>

                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button onClick={() => setSelectedQuote(null)} className="btn btn-sm btn-outline-secondary text-light">
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default QuoteManager;
