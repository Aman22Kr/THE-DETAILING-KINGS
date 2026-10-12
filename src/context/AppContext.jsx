import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

const LOCAL_STORAGE_KEYS = {
  BOOKINGS: 'tdm_saved_bookings',
  FRANCHISE_INQUIRIES: 'tdm_franchise_inquiries',
  CONTACT_MESSAGES: 'tdm_contact_messages',
  FAVORITE_OUTLETS: 'tdm_favorite_outlets',
};

export const AppProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedServiceSlug, setSelectedServiceSlug] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  
  const [toastMessage, setToastMessage] = useState(null);

  // LocalStorage state initialization
  const [savedBookings, setSavedBookings] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.BOOKINGS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [franchiseInquiries, setFranchiseInquiries] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.FRANCHISE_INQUIRIES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [contactMessages, setContactMessages] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.CONTACT_MESSAGES);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [favoriteOutlets, setFavoriteOutlets] = useState(() => {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEYS.FAVORITE_OUTLETS);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Sync to LocalStorage on updates
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.BOOKINGS, JSON.stringify(savedBookings));
  }, [savedBookings]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FRANCHISE_INQUIRIES, JSON.stringify(franchiseInquiries));
  }, [franchiseInquiries]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.CONTACT_MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.FAVORITE_OUTLETS, JSON.stringify(favoriteOutlets));
  }, [favoriteOutlets]);

  // Toast Helper
  const showToast = (text, type = 'success') => {
    setToastMessage({ text, type, id: Date.now() });
    setTimeout(() => {
      setToastMessage(null);
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
