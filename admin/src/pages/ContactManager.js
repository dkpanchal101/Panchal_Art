import React, { useState, useEffect } from 'react';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';
import { Mail, Search, Trash2, Eye, Loader2 } from 'lucide-react';

const ContactManager = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const fetchInquiries = async () => {
    try {
      setLoading(true);
      const res = await api.get(ENDPOINTS.INQUIRIES_LIST);
      if (res.data && res.data.success && res.data.data.inquiries) {
        setInquiries(res.data.data.inquiries);
      }
    } catch (err) {
      console.error('Fetch inquiries error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleOpenDetail = async (inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.isRead) {
      try {
        await api.put(ENDPOINTS.INQUIRY_READ(inquiry._id));
        fetchInquiries();
      } catch (err) {
        console.error('Mark read error:', err);
      }
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact submission?')) return;

    try {
      const res = await api.delete(ENDPOINTS.INQUIRY_ITEM(id));
      if (res.data && res.data.success) {
        if (selectedInquiry && selectedInquiry._id === id) setSelectedInquiry(null);
        fetchInquiries();
      }
    } catch (err) {
      console.error('Delete inquiry error:', err);
      alert('Error deleting submission.');
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesFilter = filterStatus === 'all' || 
      (filterStatus === 'unread' && !item.isRead) ||
      (filterStatus === 'read' && item.isRead);
    
    const matchesSearch = search === '' ||
      (item.name && item.name.toLowerCase().includes(search.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(search.toLowerCase())) ||
      (item.phone && item.phone.toLowerCase().includes(search.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      
      {/* Title Bar */}
      <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-secondary mb-4">
        <div>
          <span className="badge bg-success text-white uppercase fs-8 mb-1">Customer Communications</span>
          <h1 className="h3 font-weight-bold text-white m-0">Contact Leads Manager</h1>
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
                placeholder="Search leads by name, email, phone..."
                className="form-control bg-dark border-secondary text-light fs-7"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-8 d-flex flex-wrap gap-1 justify-content-md-end">
            <button
              onClick={() => setFilterStatus('all')}
              className={`btn btn-xs ${filterStatus === 'all' ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
            >
              All ({inquiries.length})
            </button>
            <button
              onClick={() => setFilterStatus('unread')}
              className={`btn btn-xs ${filterStatus === 'unread' ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
            >
              Unread ({inquiries.filter(i => !i.isRead).length})
            </button>
            <button
              onClick={() => setFilterStatus('read')}
              className={`btn btn-xs ${filterStatus === 'read' ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
            >
              Read ({inquiries.filter(i => i.isRead).length})
            </button>
          </div>

        </div>
      </div>

      {/* Datatable */}
      {loading ? (
        <div className="py-5 text-center text-muted">
          <Loader2 size={32} className="animate-spin text-warning mb-2" />
          <div className="fs-7">Loading Contact Submissions...</div>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <div className="card bg-dark border-secondary rounded-3 p-5 text-center text-muted">
          <Mail size={40} className="mx-auto mb-2 opacity-50" />
          <div className="fs-6 font-weight-bold">No contact submissions found.</div>
        </div>
      ) : (
        <div className="card bg-dark border-secondary rounded-3 overflow-hidden shadow-sm">
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle fs-7 mb-0">
              <thead>
                <tr className="text-muted fs-8 uppercase tracking-wider">
                  <th>Contact Person</th>
                  <th>Service Interest</th>
                  <th>Received Date</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInquiries.map(item => (
                  <tr key={item._id} className={!item.isRead ? 'fw-bold' : ''}>
                    <td>
                      <div className="text-white">{item.name}</div>
                      <div className="text-muted fs-8 font-weight-normal">{item.phone} • {item.email}</div>
                    </td>
                    <td>
                      <span className="badge bg-secondary text-light fs-8">{item.service || 'General Inquiry'}</span>
                      {item.message && (
                        <div className="text-muted fs-8 text-truncate font-weight-normal" style={{ maxWidth: '240px' }}>
                          {item.message}
                        </div>
                      )}
                    </td>
                    <td className="text-muted fs-8 font-weight-normal">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`badge ${!item.isRead ? 'bg-success text-white' : 'bg-secondary text-light'} fs-8`}>
                        {!item.isRead ? 'New Lead' : 'Read'}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="d-flex justify-content-end gap-1">
                        <button
                          onClick={() => handleOpenDetail(item)}
                          className="btn btn-outline-warning btn-xs"
                          title="Inspect Lead Details"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="btn btn-outline-danger btn-xs"
                          title="Delete Lead"
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

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary text-white rounded-3 shadow-lg">
              
              <div className="modal-header border-secondary">
                <h5 className="modal-title fs-6 font-weight-bold text-white d-flex align-items-center gap-2">
                  <Mail size={18} className="text-success" />
                  <span>Contact Lead Detail Inspection</span>
                </h5>
                <button onClick={() => setSelectedInquiry(null)} className="btn-close btn-close-white"></button>
              </div>

              <div className="modal-body space-y-3">
                <div className="row g-3">
                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Client Name</label>
                    <div className="fs-6 font-weight-bold text-white">{selectedInquiry.name}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Phone Number</label>
                    <div className="fs-7 text-warning font-weight-bold">{selectedInquiry.phone}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Email Address</label>
                    <div className="fs-7 text-light">{selectedInquiry.email}</div>
                  </div>

                  <div className="col-12 col-md-6">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Service Category</label>
                    <div className="fs-7 text-white font-weight-bold">{selectedInquiry.service || 'General Inquiry'}</div>
                  </div>

                  <div className="col-12">
                    <label className="text-muted fs-8 uppercase font-weight-bold">Message / Inquiry Details</label>
                    <div className="bg-secondary bg-opacity-20 p-3 rounded-2 text-light fs-7 border border-secondary">
                      {selectedInquiry.message || 'No additional message provided.'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="modal-footer border-secondary">
                <button onClick={() => setSelectedInquiry(null)} className="btn btn-sm btn-outline-secondary text-light">
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

export default ContactManager;
