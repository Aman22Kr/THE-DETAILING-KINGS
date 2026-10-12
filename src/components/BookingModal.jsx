import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { OUTLETS, SERVICES } from '../data';

const createInitialForm = () => ({ name: '', phone: '', vehicle: '', service: SERVICES[0].title, outlet: OUTLETS[0].name, date: '' });

const getToday = () => {
 const today = new Date();
 const offset = today.getTimezoneOffset() * 60_000;
 return new Date(today.getTime() - offset).toISOString().slice(0, 10);
};

export function BookingModal() {
 const { isBookingModalOpen, setIsBookingModalOpen, addBooking } = useApp();
 const [form, setForm] = useState(createInitialForm);
 const today = getToday();
 if (!isBookingModalOpen) return null;
 const submit=(e)=>{e.preventDefault(); if(form.date < today) return; addBooking(form); setForm(createInitialForm());};
 return <div className="fixed inset-0 z-50 grid place-items-center bg-black/80 p-4" role="dialog" aria-modal="true" aria-labelledby="booking-modal-title"><form onSubmit={submit} className="w-full max-w-lg rounded-2xl border border-brand-border bg-brand-surface p-6 shadow-2xl"><div className="mb-5 flex justify-between"><div><p className="text-brand-red text-xs font-bold uppercase">Kings Concierge</p><h2 id="booking-modal-title" className="text-2xl font-heading">Book Your Detailing Slot</h2></div><button type="button" onClick={()=>setIsBookingModalOpen(false)} aria-label="Close booking form"><X/></button></div><div className="grid gap-3 sm:grid-cols-2">{[['name','Your name'],['phone','Phone number'],['vehicle','Vehicle make & model']].map(([key,label])=><input key={key} required placeholder={label} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="rounded-lg border border-brand-border bg-brand-black p-3 text-sm outline-none focus:border-brand-red" />)}<input required type="date" min={today} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} className="rounded-lg border border-brand-border bg-brand-black p-3 text-sm outline-none focus:border-brand-red"/><select value={form.service} onChange={e=>setForm({...form,service:e.target.value})} className="rounded-lg border border-brand-border bg-brand-black p-3 text-sm">{SERVICES.map(s=><option key={s.id}>{s.title}</option>)}</select><select value={form.outlet} onChange={e=>setForm({...form,outlet:e.target.value})} className="rounded-lg border border-brand-border bg-brand-black p-3 text-sm">{OUTLETS.map(o=><option key={o.id}>{o.name}</option>)}</select></div><button className="btn-primary mt-5 w-full rounded-lg py-3 text-sm">Confirm Appointment Request</button><p className="mt-3 text-center text-[11px] text-brand-gray">Demo booking stored securely in this browser.</p></form></div>;
}

export function SearchModal() {
 const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, navigateTo }=useApp();
 const items=[...SERVICES.map(s=>({type:'Service',title:s.title,action:()=>navigateTo('service-detail',s.slug)})),...OUTLETS.map(o=>({type:'Studio',title:`${o.city} — ${o.name}`,action:()=>navigateTo('outlets')}))];
 const matches=items.filter(i=>i.title.toLowerCase().includes(searchQuery.toLowerCase())).slice(0,8);
 if(!isSearchOpen)return null;
 return <div className="fixed inset-0 z-50 bg-black/85 p-4"><div className="mx-auto mt-20 max-w-2xl rounded-2xl border border-brand-border bg-brand-surface p-5"><div className="flex gap-3"><input autoFocus value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} placeholder="Search services, PPF, ceramic coating, city..." className="flex-1 bg-transparent text-lg outline-none"/><button onClick={()=>setIsSearchOpen(false)}><X/></button></div><div className="mt-4 border-t border-brand-border pt-2">{matches.map((m,i)=><button key={i} onClick={()=>{m.action();setIsSearchOpen(false);setSearchQuery('');}} className="block w-full rounded-lg px-3 py-3 text-left hover:bg-brand-red/10"><small className="mr-3 text-brand-red">{m.type}</small>{m.title}</button>)}{!matches.length&&<p className="p-4 text-brand-gray">No relevant result found.</p>}</div></div></div>;
}
