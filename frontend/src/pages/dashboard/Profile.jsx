import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FiGrid, FiFolder, FiCreditCard, FiUser, FiHeadphones, FiLogOut, FiCheckCircle, FiAlertCircle, FiLock } from 'react-icons/fi';

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  
  useEffect(() => {
    const fetchProfile = async () => {
      if (user && user.userId) {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/profile/${user.userId}`);
          setFormData({ name: response.data.name, username: response.data.username, password: '' });
        } catch (error) {
          console.error("Error fetching profile:", error);
          setMessage({ type: 'error', text: 'Failed to load profile data.' });
        } finally {
          setIsLoading(false);
        }
      }
    };
    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  
  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await axios.put(`http://localhost:5000/api/auth/profile/${user.userId}`, {
        name: formData.name,
        password: formData.password
      });
      setMessage({ type: 'success', text: response.data.message });
      setFormData({ ...formData, password: '' }); 
    } catch (error) {
      setMessage({ type: 'error', text: error.response?.data?.error || 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] font-sans overflow-hidden">
      
      {/* Dark Sidebar */}
      <div className="w-64 bg-[#0a152d] text-white flex flex-col shadow-xl z-20">
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          <span className="text-lg font-bold tracking-widest text-white">FURNITURE 3D</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link to="/designer-dashboard" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiGrid className="mr-3 text-red-400" size={18} /> Dashboard
          </Link>
          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiFolder className="mr-3 text-blue-400" size={18} /> My Designs
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiCreditCard className="mr-3 text-cyan-400" size={18} /> Payments
          </a>
          
          <Link to="/profile" className="flex items-center px-4 py-3 bg-white/10 border-l-4 border-blue-500 text-white rounded-r-lg font-medium transition-all">
            <FiUser className="mr-3 text-purple-400" size={18} /> Profile
          </Link>
          <a href="#" className="flex items-center px-4 py-3 text-slate-400 hover:bg-white/5 hover:text-white rounded-lg font-medium transition-colors">
            <FiHeadphones className="mr-3 text-pink-400" size={18} /> Support
          </a>
        </nav>

        <div className="p-4">
          <button onClick={handleLogout} className="w-full flex items-center justify-center px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-bold transition-colors shadow-sm">
            <FiLogOut className="mr-2" size={18} /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-16 bg-[#0a152d] text-white flex items-center justify-between px-8 z-10 shrink-0">
          <div className="flex-1"></div>
          <div className="flex items-center space-x-6 text-sm font-semibold">
            <Link to="/" className="hover:text-blue-400 transition-colors">Home</Link>
            <Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link>
            <Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link>
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold ml-4 border-2 border-slate-300">
              {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Scrollable Profile Content */}
        <main className="flex-1 overflow-y-auto p-8 md:p-10 flex justify-center">
          <div className="w-full max-w-3xl">
            
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-[#0a152d] mb-2 font-serif">My Profile</h1>
              <p className="text-slate-500">Manage your personal information and security settings.</p>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
              {isLoading ? (
                <div className="p-12 text-center text-slate-500">Loading profile data...</div>
              ) : (
                <div className="flex flex-col md:flex-row">
                  
                  {/* Left Side: Avatar & Name */}
                  <div className="md:w-1/3 bg-slate-50 p-8 flex flex-col items-center justify-center border-r border-slate-100">
                    <div className="w-32 h-32 bg-gradient-to-tr from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-5xl font-bold shadow-lg mb-4 border-4 border-white">
                      {formData.name ? formData.name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <h2 className="text-xl font-bold text-[#0a152d] text-center">{formData.name}</h2>
                    <p className="text-sm text-slate-500 mt-1 uppercase tracking-widest font-semibold text-center">Designer</p>
                  </div>

                  {/* Right Side: Form */}
                  <div className="md:w-2/3 p-8 md:p-10">
                    
                    {message.text && (
                      <div className={`p-4 rounded-xl flex items-start mb-6 ${message.type === 'error' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'}`}>
                        {message.type === 'error' ? <FiAlertCircle className="mt-0.5 mr-3 flex-shrink-0" size={18} /> : <FiCheckCircle className="mt-0.5 mr-3 flex-shrink-0" size={18} />}
                        <p className="text-sm font-medium">{message.text}</p>
                      </div>
                    )}

                    <form onSubmit={handleUpdate} className="space-y-6">
                      
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <div className="relative">
                          <FiUser className="absolute left-4 top-4 text-slate-400" size={18} />
                          <input 
                            type="text" name="name" value={formData.name} onChange={handleChange} required
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a152d] outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Username <span className="text-slate-400 font-normal">(Cannot be changed)</span></label>
                        <div className="relative">
                          <FiUser className="absolute left-4 top-4 text-slate-400" size={18} />
                          <input 
                            type="text" value={formData.username} disabled
                            className="w-full pl-12 pr-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed outline-none"
                          />
                        </div>
                      </div>

                      <div className="pt-4 border-t border-slate-100">
                        <label className="block text-sm font-bold text-slate-700 mb-2">Update Password <span className="text-slate-400 font-normal">(Leave blank to keep current)</span></label>
                        <div className="relative">
                          <FiLock className="absolute left-4 top-4 text-slate-400" size={18} />
                          <input 
                            type="password" name="password" value={formData.password} onChange={handleChange}
                            placeholder="Enter new password"
                            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a152d] outline-none transition-all"
                          />
                        </div>
                      </div>

                      <div className="pt-4">
                        <button 
                          type="submit" disabled={isSaving}
                          className={`w-full py-4 rounded-xl font-bold text-white transition-all ${isSaving ? 'bg-[#0a152d]/70 cursor-not-allowed' : 'bg-[#0a152d] hover:bg-slate-800 hover:-translate-y-0.5 shadow-lg'}`}
                        >
                          {isSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                        </button>
                      </div>

                    </form>
                  </div>
                </div>
              )}
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;