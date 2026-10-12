import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const AppContext = createContext();

const LOCAL_STORAGE_KEYS = {
  BOOKINGS: 'tdm_saved_bookings',
  FRANCHISE_INQUIRIES: 'tdm_franchise_inquiries',
  CONTACT_MESSAGES: 'tdm_contact_messages',
  FAVORITE_OUTLETS: 'tdm_favorite_outlets',
};

const readStoredArray = (key) => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = window.localStorage.getItem(key);
    const parsed = stored ? JSON.parse(stored) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

const saveStoredValue = (key, value) => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage can be unavailable in private browsing or when its quota is full.
  }
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState(null);
  const toastTimeoutRef = useRef(null);

  const [savedBookings, setSavedBookings] = useState(() => readStoredArray(LOCAL_STORAGE_KEYS.BOOKINGS));
  const [franchiseInquiries, setFranchiseInquiries] = useState(() => readStoredArray(LOCAL_STORAGE_KEYS.FRANCHISE_INQUIRIES));
  const [contactMessages, setContactMessages] = useState(() => readStoredArray(LOCAL_STORAGE_KEYS.CONTACT_MESSAGES));
  const [favoriteOutlets, setFavoriteOutlets] = useState(() => readStoredArray(LOCAL_STORAGE_KEYS.FAVORITE_OUTLETS));

  useEffect(() => {
    saveStoredValue(LOCAL_STORAGE_KEYS.BOOKINGS, savedBookings);
  }, [savedBookings]);

  useEffect(() => {
    saveStoredValue(LOCAL_STORAGE_KEYS.FRANCHISE_INQUIRIES, franchiseInquiries);
  }, [franchiseInquiries]);

  useEffect(() => {
    saveStoredValue(LOCAL_STORAGE_KEYS.CONTACT_MESSAGES, contactMessages);
  }, [contactMessages]);

  useEffect(() => {
    saveStoredValue(LOCAL_STORAGE_KEYS.FAVORITE_OUTLETS, favoriteOutlets);
  }, [favoriteOutlets]);

  useEffect(() => () => clearTimeout(toastTimeoutRef.current), []);

  // Toast Helper
  const showToast = (text, type = 'success') => {
    clearTimeout(toastTimeoutRef.current);
    const id = Date.now();
    setToastMessage({ text, type, id });
    toastTimeoutRef.current = setTimeout(() => {
      setToastMessage((currentToast) => currentToast?.id === id ? null : currentToast);
    }, 4000);
  };

  // Actions
  const navigateTo = (page, serviceSlug = null) => {
    setCurrentPage(page);
    if (serviceSlug) {
      setSelectedServiceSlug(serviceSlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addBooking = (bookingData) => {
    const newBooking = {
      ...bookingData,
      id: 'TDM-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'Confirmed'
    };
    setSavedBookings((prev) => [newBooking, ...prev]);
    showToast(`Booking Successful! Order ID: ${newBooking.id}`);
    setIsBookingModalOpen(false);
  };

  const cancelBooking = (id) => {
    setSavedBookings((prev) => prev.filter(b => b.id !== id));
    showToast('Booking cancelled successfully', 'info');
  };

  const addFranchiseInquiry = (inquiryData) => {
    const newInquiry = {
      ...inquiryData,
      id: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
      submittedAt: new Date().toISOString()
    };
    setFranchiseInquiries((prev) => [newInquiry, ...prev]);
    showToast('Franchise Inquiry Submitted! Our Expansion Director will contact you within 24 hours.');
  };

  const addContactMessage = (msgData) => {
    const newMsg = {
      ...msgData,
      id: 'MSG-' + Math.floor(1000 + Math.random() * 9000),
      sentAt: new Date().toISOString()
    };
    setContactMessages((prev) => [newMsg, ...prev]);
    showToast('Thank you! Your message has been routed to customer support.');
  };

  const toggleFavoriteOutlet = (outletId) => {
    setFavoriteOutlets((prev) => {
      if (prev.includes(outletId)) {
        showToast('Outlet removed from favorites', 'info');
        return prev.filter(id => id !== outletId);
      } else {
        showToast('Outlet saved to your favorites!');
        return [...prev, outletId];
      }
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedServiceSlug,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isBookingModalOpen,
        setIsBookingModalOpen,
        toastMessage,
        savedBookings,
        franchiseInquiries,
        contactMessages,
        favoriteOutlets,
        navigateTo,
        addBooking,
        cancelBooking,
        addFranchiseInquiry,
        addContactMessage,
        toggleFavoriteOutlet,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
