import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, AlertCircle, Info } from 'lucide-react';

export default function ToastNotification() {
  const { toastMessage } = useApp();

  if (!toastMessage) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce transition-all duration-300">
      <div className="flex items-center space-x-3 bg-brand-surface border border-brand-red/50 text-white px-5 py-3.5 rounded-xl shadow-2xl shadow-brand-red/20 backdrop-blur-md">
        {icons[toastMessage.type] || icons.success}
        <span className="text-sm font-medium tracking-wide">{toastMessage.text}</span>
      </div>
    </div>
  );
}
