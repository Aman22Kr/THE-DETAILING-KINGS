import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BRAND_INFO } from '../data';
import { Phone, MapPin, Search, Calendar, Menu, X, Shield, ChevronDown, BookmarkCheck } from 'lucide-react';

export default function Navbar() {
  const { navigateTo, currentPage, setIsSearchOpen, setIsBookingModalOpen, savedBookings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services & Products', hasDropdown: true },
    { id: 'pricing', label: 'Pricing & Packages' },
    { id: 'outlets', label: 'Find Studio (150+)' },
    { id: 'franchise', label: 'Franchise ROI' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact' }
  ];

  const serviceLinks = [
    { slug: 'ceramic-coating', title: 'Ceramic Coating (Labocosmetica)' },
    { slug: 'paint-protection-film', title: 'Paint Protection Film (PPF)' },
    { slug: 'car-detailing', title: 'Full Car Detailing & Spa' },
    { slug: 'windshield-protection-film', title: 'Windshield Protection (WPF)' },
    { slug: 'bike-detailing', title: 'Superbike Detailing & Ceramic' },
    { slug: 'vinyl-wrap', title: 'Car Vinyl Wraps & Restyling' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#0A0B0E]/95 backdrop-blur-md border-b border-brand-border/60">
      {/* Top Hotline Bar */}
      <div className="bg-[#12141A] text-xs text-brand-gray border-b border-brand-border/40 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-6">
            <a href={`tel:${BRAND_INFO.phone}`} className="flex items-center space-x-1.5 hover:text-brand-red transition-colors">
              <Phone className="w-3.5 h-3.5 text-brand-red" />
              <span>Toll Free: <strong className="text-white">{BRAND_INFO.tollFree}</strong></span>
            </a>
            <span className="hidden md:inline-flex items-center space-x-1">
              <MapPin className="w-3.5 h-3.5 text-brand-gold" />
              <span>150+ Certified Detailing Studios in India</span>
            </span>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigateTo('my-bookings')}
              className="flex items-center space-x-1.5 text-brand-gray hover:text-white transition-colors py-0.5 px-2 rounded bg-brand-surface border border-brand-border/50 text-xs"
            >
              <BookmarkCheck className="w-3.5 h-3.5 text-brand-red" />
              <span>My Bookings</span>
              {savedBookings.length > 0 && (
                <span className="bg-brand-red text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                  {savedBookings.length}
                </span>
              )}
            </button>
            <button
              onClick={() => navigateTo('franchise')}
              className="hidden sm:inline-block text-brand-gold hover:underline font-semibold"
            >
              Become a Franchisee
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex items-center justify-between">
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-red to-red-800 flex items-center justify-center shadow-red-glow group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider text-white font-heading uppercase flex items-center gap-1">
              THE <span className="text-brand-red">DETAILING</span> MAFIA
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-brand-gold font-semibold">
              Perfection is in the Details
            </span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-5">
          {navItems.map((item) => item.hasDropdown ? (
            <div key={item.id} className="relative" onMouseEnter={() => setServicesDropdownOpen(true)} onMouseLeave={() => setServicesDropdownOpen(false)}>
              <button onClick={() => navigateTo('services')} className="flex items-center gap-1 text-xs font-bold uppercase hover:text-brand-red">{item.label}<ChevronDown className="w-3 h-3" /></button>
              {servicesDropdownOpen && <div className="absolute top-6 left-0 w-64 rounded-lg border border-brand-border bg-brand-surface py-2 shadow-2xl">{serviceLinks.map((service) => <button key={service.slug} onClick={() => navigateTo('service-detail', service.slug)} className="block w-full px-4 py-2 text-left text-xs hover:bg-brand-red/10 hover:text-brand-red">{service.title}</button>)}</div>}
            </div>
          ) : <button key={item.id} onClick={() => navigateTo(item.id)} className={`text-xs font-bold uppercase hover:text-brand-red ${currentPage === item.id ? 'text-brand-red' : ''}`}>{item.label}</button>)}
        </nav>
        <div className="hidden sm:flex items-center gap-2"><button onClick={() => setIsSearchOpen(true)} className="rounded border border-brand-border p-2 hover:text-brand-red"><Search className="w-4 h-4" /></button><button onClick={() => setIsBookingModalOpen(true)} className="btn-primary rounded px-4 py-2 text-xs"><Calendar className="mr-2 w-4 h-4" />Book Now</button></div>
        <div className="flex sm:hidden gap-2"><button onClick={() => setIsSearchOpen(true)} className="p-2"><Search className="w-5 h-5" /></button><button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">{mobileMenuOpen ? <X/> : <Menu/>}</button></div>
      </div>
      {mobileMenuOpen && <div className="lg:hidden space-y-1 border-t border-brand-border bg-brand-dark p-4">{navItems.map((item) => <button key={item.id} onClick={() => { navigateTo(item.id); setMobileMenuOpen(false); }} className="block w-full p-3 text-left text-xs font-bold uppercase hover:bg-brand-surface">{item.label}</button>)}<button onClick={() => { setIsBookingModalOpen(true); setMobileMenuOpen(false); }} className="btn-primary mt-2 w-full rounded py-3 text-xs">Book Appointment</button></div>}
    </header>
  );
}

