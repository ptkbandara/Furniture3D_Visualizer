import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiTarget, FiSliders, FiShield, FiBox, FiLayers, FiArrowLeft } from 'react-icons/fi';
import { AuthContext } from '../../context/AuthContext';

function About() {
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Luxury Header Section with Navigation Bar */}
      <div className="bg-[#0a152d] relative pb-24 overflow-hidden shadow-xl">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-[#eab308] opacity-10 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Navigation Bar  */}
        <header className="relative z-20 flex justify-between items-center px-6 md:px-12 py-8 text-white">
          <div className="flex items-center gap-3">
            <span className="text-xl md:text-2xl font-bold tracking-widest text-[#eab308]">FURNITURE 3D</span>
          </div>
          
          <nav className="hidden md:flex gap-10 text-sm font-semibold tracking-widest uppercase">
            <Link to="/" className="hover:text-[#eab308] transition-colors">Home</Link>
            <Link to="/About" className="text-[#eab308] border-b-2 border-[#eab308] pb-1">About</Link>
            <Link to="/Contact" className="hover:text-[#eab308] transition-colors">Contact</Link>
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
            Discover Our Purpose
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6">
            About Furniture 3D
          </h1>
          <div className="w-20 h-1 bg-[#eab308] mx-auto mb-8 rounded-full"></div>
          <p className="text-lg md:text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed">
            Bridging the gap between imagination and reality for furniture buyers through state-of-the-art spatial visualization.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
        
        {/* Product Vision Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-8 md:p-12 mb-12 flex flex-col md:flex-row gap-8 items-start md:items-center hover:shadow-xl transition-shadow duration-300">
          <div className="w-20 h-20 bg-blue-50 text-[#0a152d] rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-blue-100">
            <FiTarget size={40} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-[#0a152d] mb-4 font-serif">Product Vision</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
              This web-based application was developed for furniture retailers to significantly enhance the 
              in-store customer experience. We understand that customers often struggle to visualize how 
              selected furniture items (chairs, dining tables, side tables, etc.) would look in their specific rooms.
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-[#0a152d] text-center mb-10 font-serif">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-slate-50 text-[#0a152d] rounded-full flex items-center justify-center mb-6">
                <FiSliders size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-3">1. Configure Room</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Designers collaborate with customers to enter exact room dimensions, shape, and preferred color schemes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-slate-50 text-[#0a152d] rounded-full flex items-center justify-center mb-6">
                <FiBox size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-3">2. 2D Floor Plan</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Create precise 2D layouts using intuitive drag-and-drop tools to arrange furniture spatially.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center hover:-translate-y-2 transition-transform duration-300">
              <div className="w-16 h-16 mx-auto bg-slate-50 text-[#0a152d] rounded-full flex items-center justify-center mb-6">
                <FiLayers size={28} />
              </div>
              <h3 className="text-xl font-bold text-[#0a152d] mb-3">3. 3D Visualization</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Instantly generate a 3D environment with realistic lighting, shadows, and shading for a lifelike view.
              </p>
            </div>

          </div>
        </div>

        {/* HCI & UX Principles Card */}
        <div className="bg-[#0a152d] rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-2 bg-[#eab308]"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
            <div className="w-16 h-16 bg-white/10 text-[#eab308] rounded-full flex items-center justify-center shrink-0 border border-white/20">
              <FiShield size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-3">HCI & UX Principles</h2>
              <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                Built with core Human-Computer Interaction (HCI) principles, our interface ensures clarity, 
                efficiency, and immediate feedback. Error prevention mechanisms and an intuitive layout guarantee 
                that designers can operate the tool smoothly during fast-paced customer consultations without technical hurdles.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;