import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface LinkProfileViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const LinkProfileView: React.FC<LinkProfileViewProps> = ({ onNavigate, onShowToast }) => {
  const [firstName, setFirstName] = useState('Luca');
  const [lastName, setLastName] = useState('Borg');
  const [dob, setDob] = useState('2012-06-14');
  const [orderPhysicalCard, setOrderPhysicalCard] = useState(true);

  const handleNext = () => {
    onShowToast("Profile details saved! Next: review legal disclosures.", 'badge');
    onNavigate('onboarding_consent');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-20">
      {/* Step Indicator */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-bold text-[#0b2a4a]">Step 2 of 5</span>
        <span>Link Child Profile</span>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-[#0b2a4a] h-full w-2/5 rounded-full"></div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Link Luca's Profile</h1>
        <p className="text-xs text-slate-500 mt-1">
          Verify personal details that will be embossed on Luca's debit card.
        </p>
      </div>

      {/* Live Card Preview */}
      <div className="w-full bg-gradient-to-tr from-[#00152d] to-[#0b2a4a] rounded-2xl p-4 text-white shadow-md relative overflow-hidden">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold tracking-widest text-sky-200 uppercase text-[10px]">
            Heritage Youth
          </span>
          <span className="material-symbols-outlined text-[18px]">contactless</span>
        </div>

        <div className="my-4 flex items-center justify-between">
          <div className="w-9 h-7 rounded bg-amber-200/90 border border-amber-300"></div>
          <span className="font-mono text-sm tracking-widest text-slate-300">•••• 4829</span>
        </div>

        <div className="flex justify-between items-end">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Cardholder</span>
            <span className="text-sm font-bold tracking-wider">
              {firstName.toUpperCase()} {lastName.toUpperCase()}
            </span>
          </div>
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-[#fc6959]"></div>
            <div className="w-6 h-6 rounded-full bg-[#6ffbbe] opacity-80"></div>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0b2a4a]"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0b2a4a]"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Date of Birth</label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0b2a4a]"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">Residential Address</label>
          <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            Triq it-Torri, Sliema SLM 1601, Malta (Inherited from Parent Primary Vault)
          </p>
        </div>
      </div>

      {/* Order Physical Card Toggle */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[22px]">local_shipping</span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#0b2a4a] block">
              Deliver Physical Plastic Card
            </span>
            <span className="text-[11px] text-slate-500">Free delivery within 3–5 working days</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setOrderPhysicalCard(!orderPhysicalCard)}
          className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
            orderPhysicalCard ? 'bg-[#00a472]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
              orderPhysicalCard ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      <button
        type="button"
        onClick={handleNext}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
      >
        <span>Continue to Consent</span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  );
};
