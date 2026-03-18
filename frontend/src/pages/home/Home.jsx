import React from 'react';
import { Link } from 'react-router-dom';
import { FiMonitor, FiLayers, FiLayout } from 'react-icons/fi';

function Home({ user }) {
  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      
      {/* HERO SECTION (Full Screen with Background Image) */}
      <div className="relative min-h-screen flex flex-col justify-between">
        
        {/* Background Image & Dark Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Interior" 
            className="w-full h-full object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Top Navigation Bar */}
        <header className="relative z-10 flex justify-between items-center px-6 md:px-12 py-8 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold tracking-widest text-[#eab308]">FURNITURE 3D</span>
          </div>
          
          <nav className="hidden md:flex gap-10 text-sm font-semibold tracking-widest uppercase">
            <a href="#" className="hover:text-[#eab308] transition-colors">Home</a>
            <a href="About" className="hover:text-[#eab308] transition-colors">About</a>
            <a href="Contact" className="hover:text-[#eab308] transition-colors">Contact</a>
          </nav>

          <div>
            {user ? (
              <span className="text-sm border border-white/30 px-6 py-2.5 rounded-full font-medium tracking-wider">
                {user.name}
              </span>
            ) : (
              <Link to="/login" className="text-sm border border-white/30 px-6 py-2.5 rounded-full hover:bg-white hover:text-black transition-colors font-medium tracking-wider uppercase">
                Login
              </Link>
            )}
          </div>
        </header>

        {/* Center Text (Titles) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 -mt-10">
          <p className="text-[#eab308] font-bold tracking-[0.3em] uppercase mb-4 text-sm md:text-base">
            Welcome to the future of retail
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-wide" style={{ textShadow: '0 4px 20px rgba(0,0,0,0.5)' }}>
            FURNITURE 3D
          </h1>
          <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed">
            Experience world-class layout planning, stunning 3D visualizations, and the finest in-store customer hospitality.
          </p>
        </div>

        {/* Floating Action Bar  */}
        <div className="relative z-20 mx-auto w-11/12 max-w-5xl bg-white rounded-3xl md:rounded-full p-3 md:p-4 mb-12 shadow-2xl flex flex-col md:flex-row items-center justify-between">
          
          <div className="flex w-full md:w-auto justify-center md:justify-start flex-1 px-6 border-b md:border-b-0 md:border-r border-slate-200 py-3 md:py-0">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Access Role</p>
              <p className="text-sm font-extrabold text-[#0a152d]">In-Store Designer</p>
            </div>
          </div>

          <div className="flex w-full md:w-auto justify-center md:justify-start flex-1 px-6 border-b md:border-b-0 md:border-r border-slate-200 py-3 md:py-0">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Capabilities</p>
              <p className="text-sm font-extrabold text-[#0a152d]">2D & 3D Layouts</p>
            </div>
          </div>

          <div className="flex w-full md:w-auto justify-center md:justify-start flex-1 px-6 py-3 md:py-0">
            <div className="text-center md:text-left">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">System Status</p>
              <p className={`text-sm font-extrabold ${user ? 'text-emerald-600' : 'text-red-500'}`}>
                {user ? 'Authenticated' : 'Login Required'}
              </p>
            </div>
          </div>

          <div className="w-full md:w-auto mt-4 md:mt-0 px-2">
            {user ? (
              <Link to="/designer-dashboard" className="block w-full text-center bg-[#0a152d] hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl">
                DASHBOARD
              </Link>
            ) : (
              <Link to="/register" className="block w-full text-center bg-[#0a152d] hover:bg-slate-800 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg hover:shadow-xl">
                START DESIGNING
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Features Section (Below the fold) */}
      <div id="features" className="py-24 bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-[#0a152d]">Our Core Features</h2>
            <div className="w-24 h-1 bg-[#eab308] mx-auto mt-4 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="text-[#0a152d] bg-slate-50 w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6">
                <FiLayout size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-4">Smart 2D Layouts</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Drag and drop furniture with precise scaling and coloring to match exact room dimensions.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="text-[#0a152d] bg-slate-50 w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6">
                <FiMonitor size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-4">Immersive 3D Views</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Instantly convert floor plans into realistic 3D environments with dynamic shading and lighting.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-center">
              <div className="text-[#0a152d] bg-slate-50 w-20 h-20 mx-auto flex items-center justify-center rounded-full mb-6">
                <FiLayers size={32} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-4">HCI Optimized</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                Designed with core usability principles to ensure a seamless and error-free consultation process.
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

export default Home;