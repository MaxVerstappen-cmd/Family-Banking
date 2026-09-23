import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface BindDeviceViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const BindDeviceView: React.FC<BindDeviceViewProps> = ({ onNavigate, onShowToast }) => {
  const [isBound, setIsBound] = useState(false);
  const [isBinding, setIsBinding] = useState(false);

  const handleBind = () => {
    setIsBinding(true);
    setTimeout(() => {
      setIsBinding(false);
      setIsBound(true);
      onShowToast("Luca's iPhone 13 is securely bound and active!", 'devices');
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-20">
      {/* Step Indicator */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-bold text-[#00a472]">Final Step</span>
        <span>Hardware Enclave Binding</span>
      </div>

      <div className="w-full bg-[#00a472] h-1.5 rounded-full"></div>

      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-50 text-[#00a472] flex items-center justify-center mx-auto mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[36px]">
            {isBound ? 'verified' : 'phonelink_lock'}
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">
          {isBound ? 'Luca is All Set!' : 'Authenticate & Bind Device'}
        </h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          {isBound
            ? 'Luca’s card is activated and his app is synchronized in real time.'
            : 'Authorize Maria Borg’s digital guardian signature to finalize hardware binding.'}
        </p>
      </div>

      {/* Device Specification Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <span className="text-xs font-bold text-[#0b2a4a]">Paired Hardware Enclave</span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            Apple A15 Bionic
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-[#0b2a4a]">
            <span className="material-symbols-outlined text-[24px]">phone_iphone</span>
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#0b2a4a]">Luca’s iPhone 13</h4>
            <p className="text-xs text-slate-500">iOS 17.4 • Sliema Cellular Network</p>
          </div>
        </div>

        <div className="bg-slate-50 p-2.5 rounded-xl text-[11px] text-slate-500 font-mono flex justify-between">
          <span>Enclave Device Key:</span>
          <span className="text-slate-800 font-bold">SHA-256 • 9FA2...B014</span>
        </div>
      </div>

      {!isBound ? (
        <button
          type="button"
          onClick={handleBind}
          disabled={isBinding}
          className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all disabled:opacity-50"
        >
          {isBinding ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Signing Device Enclave...</span>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-[22px]">fingerprint</span>
              <span>Sign with Face ID</span>
            </>
          )}
        </button>
      ) : (
        <div className="space-y-3 animate-in fade-in">
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
              Enrolment Complete
            </span>
            <p className="text-xs text-emerald-900">
              Luca's Mastercard (•••• 4829) is loaded in his Apple Wallet. He can now tap to pay in
              accordance with your parental spending limits!
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="w-full h-14 rounded-2xl bg-[#00a472] hover:bg-emerald-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
          >
            <span>Launch Family Banking Hub</span>
            <span className="material-symbols-outlined text-[20px]">rocket_launch</span>
          </button>
        </div>
      )}
    </div>
  );
};
