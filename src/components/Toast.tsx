import React from 'react';

interface ToastProps {
  message: string;
  icon?: string;
  visible: boolean;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed top-20 left-4 right-4 z-50 pointer-events-none flex justify-center animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#0b2a4a] text-white shadow-xl max-w-sm w-full border border-blue-900/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="material-symbols-outlined text-[#4edea3] text-[22px] shrink-0">
            {icon}
          </span>
          <span className="text-sm font-medium leading-tight truncate">{message}</span>
        </div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">Instant Sync</span>
      </div>
    </div>
  );
};
