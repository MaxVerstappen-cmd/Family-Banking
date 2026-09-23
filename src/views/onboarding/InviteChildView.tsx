import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface InviteChildViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const InviteChildView: React.FC<InviteChildViewProps> = ({ onNavigate, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const inviteLink = 'https://heritage.family/join?token=LUC-8942-BRG';

  const handleCopy = () => {
    navigator.clipboard?.writeText(inviteLink);
    setCopied(true);
    onShowToast('Invite link copied to clipboard!', 'content_copy');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-20">
      {/* Step Indicator */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-bold text-[#0b2a4a]">Step 4 of 5</span>
        <span>Invite Child</span>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-[#0b2a4a] h-full w-4/5 rounded-full"></div>
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Invite Luca to Connect</h1>
        <p className="text-xs text-slate-500 mt-1">
          Scan the QR code with Luca's iPhone or send him the secure link.
        </p>
      </div>

      {/* QR Code Presentation Card */}
      <div className="bg-white rounded-3xl p-6 shadow-md border border-slate-200/80 flex flex-col items-center text-center space-y-4">
        {/* Decorative QR Code */}
        <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-inner flex flex-col items-center justify-center">
          {/* SVG QR Code Simulation */}
          <div className="w-48 h-48 bg-slate-900 rounded-xl p-2 relative flex items-center justify-center">
            {/* Corner Markers */}
            <div className="absolute top-3 left-3 w-8 h-8 border-4 border-white rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-xs"></div>
            </div>
            <div className="absolute top-3 right-3 w-8 h-8 border-4 border-white rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-xs"></div>
            </div>
            <div className="absolute bottom-3 left-3 w-8 h-8 border-4 border-white rounded-md flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-xs"></div>
            </div>

            {/* Simulated Data Grid */}
            <div className="grid grid-cols-6 gap-1 w-24 h-24">
              {Array.from({ length: 36 }).map((_, i) => (
                <div
                  key={i}
                  className={`rounded-xs ${
                    i % 2 === 0 || i % 5 === 0 ? 'bg-white' : 'bg-transparent'
                  }`}
                />
              ))}
            </div>

            {/* Center Bank Shield Logo Badge */}
            <div className="absolute w-10 h-10 bg-[#0b2a4a] rounded-xl border-2 border-white flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-[20px] text-white">shield</span>
            </div>
          </div>
        </div>

        {/* Expiration Countdown */}
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#eff4ff] text-slate-700 text-xs font-semibold">
          <span className="material-symbols-outlined text-[16px] text-[#00a472]">timer</span>
          <span>Invite code expires in 14:32</span>
        </div>

        {/* Instructions */}
        <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
          Open the Camera app on Luca's iPhone and point at this code. A prompt will guide him through
          device pairing.
        </p>
      </div>

      {/* Copy Link Alternative */}
      <div className="bg-white rounded-2xl p-3.5 shadow-sm border border-slate-200/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Or Send Via Message
        </span>
        <div className="flex items-center gap-2">
          <input
            type="text"
            readOnly
            value={inviteLink}
            className="flex-1 bg-slate-50 px-3 py-2 rounded-xl text-xs font-mono text-slate-600 border border-slate-200 select-all"
          />
          <button
            type="button"
            onClick={handleCopy}
            className="px-3 py-2 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold shrink-0 hover:bg-[#00152d]"
          >
            {copied ? 'Copied! ✓' : 'Copy'}
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onNavigate('onboarding_verify_device')}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
      >
        <span>Child Has Scanned (Verify Device)</span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  );
};
