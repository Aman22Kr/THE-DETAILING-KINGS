import React from 'react';
import { useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ToastNotification from './components/ToastNotification';
import { BookingModal, SearchModal } from './components/BookingModal';
import { Home, Services, ServiceDetail, Pricing, Outlets } from './pages/Pages';
import { Franchise, About, Contact, MyBookings } from './pages/Additional';

export default function App(){
 const {currentPage}=useApp();
 const pages={home:<Home/>,services:<Services/>, 'service-detail':<ServiceDetail/>,pricing:<Pricing/>,outlets:<Outlets/>,franchise:<Franchise/>,about:<About/>,contact:<Contact/>, 'my-bookings':<MyBookings/>};
 return <><Navbar/><main>{pages[currentPage]||<Home/>}</main><Footer/><BookingModal/><SearchModal/><ToastNotification/></>;
}
