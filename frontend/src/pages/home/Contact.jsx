import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import { FiMapPin, FiPhone, FiMail, FiCheckCircle, FiSend, FiAlertCircle } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

function Contact() {
  const { user } = useContext(AuthContext);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
   
    console.log("Form Data:", formData);

    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setError('Please fill in all fields.');
      setIsSubmitting(false);
      return;
    }
    try {
     
      await axios.post('http://localhost:5000/api/contact/send', formData);
      
      setIsSuccess(true);
      
      setFormData({ name: '', email: '', subject: '', message: '' });
      
    } catch (err) {
      console.error("Error sending message:", err);
      setError(err.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Luxury Header Section with Navigation Bar */}
      <div className="bg-[#0a152d] relative pb-24 overflow-hidden shadow-xl">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#eab308] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Navigation Bar */}
        <header className="relative z-20 flex justify-between items-center px-6 md:px-12 py-8 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold tracking-widest text-[#eab308]">FURNITURE 3D</span>
          </div>
          
          <nav className="hidden md:flex gap-8 lg:gap-10 text-sm font-semibold tracking-widest uppercase">
            <Link to="/" className="hover:text-[#eab308] transition-colors">Home</Link>
            <Link to="/About" className="hover:text-[#eab308] transition-colors">About</Link>
            <Link to="/Contact" className="text-[#eab308] border-b-2 border-[#eab308] pb-1">Contact</Link>
          </nav>

          <div>
            {user ? (
              <Link to="/designer-dashboard" className="text-sm border border-[#eab308] text-[#eab308] hover:bg-[#eab308] hover:text-[#0a152d] px-6 py-2.5 rounded-full font-bold tracking-wider transition-all">
                Dashboard
              </Link>
            ) : (
              <Link to="/login" className="text-sm border border-white/30 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors font-medium tracking-wider uppercase">
                Login
              </Link>
            )}
          </div>
        </header>

        {/* Hero Title Section */}
        <div className="max-w-4xl mx-auto text-center relative z-10 mt-10 px-6">
          <p className="text-[#eab308] font-bold tracking-[0.2em] uppercase mb-4 text-sm">
            We're Here to Help
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            Get in Touch
          </h1>
          <div className="w-20 h-1 bg-[#eab308] mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Have a question about our 3D design software or need support for your in-store consultations? Reach out to our team.
          </p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Left Side: Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            
            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-50 text-[#0a152d] rounded-full flex items-center justify-center mb-6">
                <FiMapPin size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-2 font-serif">Our Headquarters</h3>
              <p className="text-slate-600 leading-relaxed">
                123 Furniture Avenue,<br />
                Design District, Colombo 03,<br />
                Sri Lanka.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-50 text-[#0a152d] rounded-full flex items-center justify-center mb-6">
                <FiPhone size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-2 font-serif">Call Us</h3>
              <p className="text-slate-600 leading-relaxed mb-1">
                <strong>Sales:</strong> +94 11 234 5678
              </p>
              <p className="text-slate-600 leading-relaxed">
                <strong>Support:</strong> +94 11 876 5432
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-shadow duration-300">
              <div className="w-14 h-14 bg-blue-50 text-[#0a152d] rounded-full flex items-center justify-center mb-6">
                <FiMail size={24} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-2 font-serif">Email Us</h3>
              <p className="text-slate-600 leading-relaxed">
                support@furniture3d.com<br />
                hello@furniture3d.com
              </p>
            </div>

          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-12 h-full">
              <h2 className="text-3xl font-bold text-[#0a152d] mb-2 font-serif">Send a Message</h2>
              <p className="text-slate-500 mb-8">Fill out the form below and our team will get back to you within 24 hours.</p>

              {isSuccess ? (
                // Success State (HCI Principle: Clear Feedback)
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center h-[350px] flex flex-col justify-center items-center animate-pulse">
                  <FiCheckCircle size={64} className="text-emerald-500 mb-6" />
                  <h3 className="text-2xl font-bold text-emerald-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-emerald-600">Thank you for reaching out. We will contact you shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="mt-8 px-8 py-3 bg-white border border-emerald-200 text-emerald-700 rounded-full font-bold hover:bg-emerald-100 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                // Form
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Your Name</label>
                      <input 
                        type="text" 
                        required 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a152d] focus:bg-white transition-all outline-none" 
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a152d] focus:bg-white transition-all outline-none" 
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      required 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a152d] focus:bg-white transition-all outline-none" 
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                    <textarea 
                      required 
                      rows="5"
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0a152d] focus:bg-white transition-all outline-none resize-none" 
                      placeholder="Type your message here..."
                    ></textarea>
                  </div>

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center py-4 px-8 rounded-xl font-bold text-white transition-all duration-300 ${
                      isSubmitting ? 'bg-[#0a152d]/70 cursor-not-allowed' : 'bg-[#0a152d] hover:bg-slate-800 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </span>
                    ) : (
                      <>
                        <FiSend className="mr-2" size={18} /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;