import React, { useState, useEffect } from 'react';
import api from '../api';
import { ENDPOINTS } from '../api/endpoints';
import { 
  ImageIcon, Plus, Trash2, Eye, EyeOff, Upload, Loader2, 
  Search, CheckCircle, AlertCircle 
} from 'lucide-react';

const SERVER_BASE = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

const getFullImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${SERVER_BASE}${url.startsWith('/') ? '' : '/'}${url}`;
};

const GalleryManager = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState(null);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('RADIUM CUTTING');
  const [customCategory, setCustomCategory] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const defaultCategories = [
    'RADIUM CUTTING',
    '3D ACRYLIC & LED BOARDS',
    'CAR GLASS TINTING',
    'FLEX BANNERS',
    'LOGO & DIGITAL DESIGN',
    'PRINTING'
  ];

  const fetchGallery = async () => {
    try {
      setLoading(true);
      const res = await api.get(ENDPOINTS.GALLERY_LIST);
      if (res.data && res.data.success && res.data.data && Array.isArray(res.data.data.gallery)) {
        setItems(res.data.data.gallery);
      }
    } catch (err) {
      console.error('Fetch gallery error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const uniqueItemCategories = Array.from(
    new Set(items.map(i => i.category ? i.category.trim() : '').filter(Boolean))
  );
  const dynamicCategories = Array.from(
    new Set([...defaultCategories, ...uniqueItemCategories])
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setMsg({ type: 'danger', text: 'Please select an image file to upload.' });
      return;
    }

    const finalCat = category === '__NEW__' ? customCategory.trim() : category.trim();

    if (!finalCat) {
      setMsg({ type: 'danger', text: 'Please provide or select a category name.' });
      return;
    }

    setSubmitting(true);
    setMsg(null);

    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('title', title || 'Custom Signage Project');
      formData.append('category', finalCat);
      formData.append('description', description || '');
      formData.append('isPublished', 'true');

      const res = await api.post(ENDPOINTS.GALLERY_ADD, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data && res.data.success) {
        setMsg({ type: 'success', text: 'Gallery asset uploaded and published successfully!' });
        setTitle('');
        setDescription('');
        setCustomCategory('');
        setImageFile(null);
        setImagePreview(null);
        setShowAddModal(false);
        fetchGallery();
      } else {
        setMsg({ type: 'danger', text: res.data.message || 'Failed to upload image.' });
      }
    } catch (err) {
      console.error('Create gallery error:', err);
      const errorText = err.response?.data?.message || 
                        err.response?.data?.error || 
                        (err.response?.data?.errors && err.response.data.errors.map(e => e.msg).join(', ')) ||
                        err.message || 
                        'Error uploading gallery asset.';
      setMsg({ type: 'danger', text: errorText });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      const res = await api.delete(ENDPOINTS.GALLERY_ITEM(id));
      if (res.data && res.data.success) {
        fetchGallery();
      }
    } catch (err) {
      console.error('Delete error:', err);
      alert('Error deleting gallery item.');
    }
  };

  const handleTogglePublish = async (id) => {
    try {
      await api.put(ENDPOINTS.GALLERY_PUBLISH(id));
      fetchGallery();
    } catch (err) {
      console.error('Publish error:', err);
    }
  };

  const filteredItems = items.filter(item => {
    const itemCatNormalized = (item.category || '').trim().toLowerCase();
    const filterNormalized = categoryFilter.trim().toLowerCase();
    
    const matchesCat = categoryFilter === 'all' || itemCatNormalized === filterNormalized;
    const matchesSearch = search === '' || 
      (item.title && item.title.toLowerCase().includes(search.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div>
      
      {/* Title Bar */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 pb-3 border-bottom border-secondary mb-4">
        <div>
          <span className="badge bg-warning text-dark uppercase fs-8 mb-1">Asset Catalog</span>
          <h1 className="h3 font-weight-bold text-white m-0">Gallery Portfolio Publisher</h1>
        </div>

        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn btn-warning text-dark font-weight-bold btn-sm d-flex align-items-center gap-1 shadow-sm"
        >
          <Plus size={16} />
          <span>Upload Portfolio Asset</span>
        </button>
      </div>

      {msg && (
        <div className={`alert alert-${msg.type} py-2.5 px-3 fs-7 rounded-3 mb-4 d-flex align-items-center justify-content-between`}>
          <div className="d-flex align-items-center gap-2">
            {msg.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
            <span>{msg.text}</span>
          </div>
          <button onClick={() => setMsg(null)} className="btn-close btn-close-white"></button>
        </div>
      )}

      {/* Filter & Search Toolbar */}
      <div className="card bg-dark border-secondary rounded-3 p-3 mb-4">
        <div className="row g-2 align-items-center">
          
          <div className="col-12 col-md-4">
            <div className="input-group input-group-sm">
              <span className="input-group-text bg-secondary border-secondary text-light">
                <Search size={14} />
              </span>
              <input
                type="text"
                placeholder="Search assets by title or category..."
                className="form-control bg-dark border-secondary text-light fs-7"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-md-8 d-flex flex-wrap gap-1 justify-content-md-end">
            <button
              onClick={() => setCategoryFilter('all')}
              className={`btn btn-xs ${categoryFilter === 'all' ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
            >
              All ({items.length})
            </button>

            {dynamicCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`btn btn-xs ${categoryFilter === cat ? 'btn-warning text-dark font-weight-bold' : 'btn-outline-secondary text-light'}`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* Gallery Grid Display */}
      {loading ? (
        <div className="py-5 text-center text-muted">
          <Loader2 size={32} className="animate-spin text-warning mb-2" />
          <div className="fs-7">Loading Portfolio Assets...</div>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="card bg-dark border-secondary rounded-3 p-5 text-center text-muted">
          <ImageIcon size={40} className="mx-auto mb-2 opacity-50" />
          <div className="fs-6 font-weight-bold">No portfolio assets found.</div>
          <div className="fs-8">Click "Upload Portfolio Asset" above to add new images.</div>
        </div>
      ) : (
        <div className="row g-4">
          {filteredItems.map(item => (
            <div key={item._id} className="col-12 col-sm-6 col-lg-4">
              <div className="card bg-dark border-secondary rounded-3 overflow-hidden h-100 shadow-sm">
                
                {/* Image Box */}
                <div className="position-relative bg-black" style={{ height: '220px' }}>
                  <img
                    src={getFullImageUrl(item.imageUrl)}
                    alt={item.title || 'Gallery item'}
                    className="w-100 h-100 object-fit-cover"
                  />
                  <div className="position-absolute top-0 start-0 p-2">
                    <span className="badge bg-dark bg-opacity-75 text-warning border border-warning border-opacity-50 fs-8 uppercase">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="position-absolute top-0 end-0 p-2">
                    <button
                      onClick={() => handleTogglePublish(item._id)}
                      className={`btn btn-xs ${item.isPublished !== false ? 'btn-success' : 'btn-secondary'} rounded-circle`}
                      title={item.isPublished !== false ? 'Published (Click to Unpublish)' : 'Unpublished (Click to Publish)'}
                    >
                      {item.isPublished !== false ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                  </div>
                </div>

                {/* Card Body */}
                <div className="card-body p-3 d-flex flex-column justify-content-between text-white">
                  <div>
                    <h5 className="fs-6 font-weight-bold text-white mb-1">{item.title || 'Custom Signage Asset'}</h5>
                    {item.description && (
                      <p className="text-muted fs-8 text-truncate mb-2">{item.description}</p>
                    )}
                  </div>

                  <div className="d-flex justify-content-between align-items-center pt-2 border-top border-secondary">
                    <span className="text-muted fs-8">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>

                    <button
                      onClick={() => handleDelete(item._id)}
                      className="btn btn-outline-danger btn-xs"
                      title="Delete Asset"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload Modal */}
      {showAddModal && (
        <div className="modal d-block bg-black bg-opacity-75" tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content bg-dark border-secondary text-white rounded-3 shadow-lg">
              
              <div className="modal-header border-secondary">
                <h5 className="modal-title fs-6 font-weight-bold text-white d-flex align-items-center gap-2">
                  <Upload size={18} className="text-warning" />
                  <span>Upload New Portfolio Asset</span>
                </h5>
                <button onClick={() => setShowAddModal(false)} className="btn-close btn-close-white"></button>
              </div>

              <form onSubmit={handleAddSubmit}>
                <div className="modal-body space-y-3">
                  
                  <div>
                    <label className="form-label fs-8 fw-bold uppercase text-muted">Select Image File *</label>
                    <input
                      type="file"
                      required
                      accept="image/*"
                      className="form-control bg-dark border-secondary text-light fs-7"
                      onChange={handleFileChange}
                    />
                  </div>

                  {imagePreview && (
                    <div className="text-center bg-black p-2 rounded-3 border border-secondary">
                      <img src={imagePreview} alt="Preview" style={{ maxHeight: '180px', objectFit: 'contain' }} className="rounded-2" />
                    </div>
                  )}

                  <div>
                    <label className="form-label fs-8 fw-bold uppercase text-muted">Asset Title</label>
                    <input
                      type="text"
                      className="form-control bg-dark border-secondary text-light fs-7"
                      placeholder="e.g. Commercial Storefront Radium Lettering"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>

                  <div>
                    <label className="form-label fs-8 fw-bold uppercase text-muted">Category *</label>
                    <select
                      className="form-select bg-dark border-secondary text-light fs-7 mb-2"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      {dynamicCategories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                      <option value="__NEW__">+ Create New Category...</option>
                    </select>

                    {category === '__NEW__' && (
                      <input
                        type="text"
                        required
                        className="form-control bg-dark border-warning text-light fs-7"
                        placeholder="Type custom category name (e.g. 3D Neon Signs)"
                        value={customCategory}
                        onChange={(e) => setCustomCategory(e.target.value)}
                      />
                    )}
                  </div>

                  <div>
                    <label className="form-label fs-8 fw-bold uppercase text-muted">Description (Optional)</label>
                    <textarea
                      rows={2}
                      className="form-control bg-dark border-secondary text-light fs-7"
                      placeholder="Technical material details..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>

                </div>

                <div className="modal-footer border-secondary">
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-sm btn-outline-secondary text-light">
                    Cancel
                  </button>
                  <button type="submit" disabled={submitting} className="btn btn-sm btn-warning text-dark font-weight-bold d-flex align-items-center gap-1">
                    {submitting ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
                    <span>Publish Asset</span>
                  </button>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default GalleryManager;
