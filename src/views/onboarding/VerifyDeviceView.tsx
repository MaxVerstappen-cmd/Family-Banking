import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface VerifyDeviceViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const VerifyDeviceView: React.FC<VerifyDeviceViewProps> = ({ onNavigate, onShowToast }) => {
  const [digits, setDigits] = useState(['8', '4', '9', '', '', '']);

  const handleDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...digits];
    updated[index] = val;
    setDigits(updated);
  };

  const handleAutofill = () => {
    setDigits(['8', '4', '9', '2', '1', '0']);
    onShowToast('Autofilled verification PIN from device broadcast', 'phonelink_ring');
  };

  const isComplete = digits.every((d) => d !== '');

  const handleVerify = () => {
    if (!isComplete) {
      onShowToast('Please enter all 6 digits', 'error');
      return;
    }
    onShowToast('Device PIN confirmed! Proceeding to biometric binding.', 'verified');
    onNavigate('onboarding_bind_device');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-6 pb-20">
      {/* Step Indicator */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-bold text-[#0b2a4a]">Step 5 of 5</span>
        <span>Device Pairing</span>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-[#0b2a4a] h-full w-full rounded-full"></div>
      </div>

      <div className="text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center mx-auto mb-3 shadow-xs">
          <span className="material-symbols-outlined text-[32px]">smartphone</span>
        </div>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Verify Child Linking</h1>
        <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
          Enter the 6-digit confirmation code displayed on Luca's iPhone screen.
        </p>
      </div>

      {/* 6 Digit Inputs */}
      <div className="flex justify-center gap-2 pt-2">
        {digits.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleDigitChange(idx, e.target.value)}
            className="w-12 h-14 rounded-2xl bg-white border-2 border-slate-200 focus:border-[#0b2a4a] text-center font-bold text-xl text-[#0b2a4a] shadow-xs focus:outline-none transition-all"
          />
        ))}
      </div>

      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleAutofill}
          className="text-xs font-bold text-[#0b2a4a] underline flex items-center gap-1 hover:opacity-80"
        >
          <span className="material-symbols-outlined text-[16px]">magic_button</span>
          <span>Autofill Demo Code (849210)</span>
        </button>
      </div>

      {/* Security Shield Card */}
      <div className="bg-[#eff4ff] rounded-2xl p-4 border border-blue-200/60 flex items-start gap-3">
        <span className="material-symbols-outlined text-[22px] text-[#00a472] shrink-0 mt-0.5">
          security
        </span>
        <div className="text-xs text-slate-700 leading-relaxed">
          <span className="font-bold text-[#0b2a4a] block">Instant Family Shield</span>
          Pairing binds Luca's device hardware ID directly to your account. No other device will be able
          to access his funds without your direct re-authorization.
        </div>
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={!isComplete}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] disabled:opacity-40 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">check</span>
        <span>Verify &amp; Bind Device</span>
      </button>
    </div>
  );
};
