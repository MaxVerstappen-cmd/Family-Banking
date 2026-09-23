import React, { useState } from 'react';
import { ScreenId } from '../../types';
import { PARENT_PROFILE } from '../../data/mockData';

interface EnrolmentViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const EnrolmentView: React.FC<EnrolmentViewProps> = ({ onNavigate, onShowToast }) => {
  const [agreedTerms, setAgreedTerms] = useState(true);

  const handleContinue = () => {
    if (!agreedTerms) {
      onShowToast('Please accept the family banking terms to proceed', 'error');
      return;
    }
    onNavigate('onboarding_link_profile');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-20">
      {/* Step Indicator */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-bold text-[#0b2a4a]">Step 1 of 5</span>
        <span>Enrolment Confirmation</span>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-[#0b2a4a] h-full w-1/5 rounded-full"></div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Confirm Your Enrolment</h1>
        <p className="text-xs text-slate-500 mt-1">
          We matched your profile from Heritage Banking records. Review your details below.
        </p>
      </div>

      {/* Parent Information Card */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-3">
          <img
            src={PARENT_PROFILE.avatarUrl}
            alt={PARENT_PROFILE.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0b2a4a]/20"
          />
          <div>
            <h3 className="text-sm font-bold text-[#0b2a4a]">{PARENT_PROFILE.name}</h3>
            <p className="text-xs text-slate-500">{PARENT_PROFILE.email}</p>
            <span className="inline-block mt-0.5 px-2 py-0.2 rounded bg-emerald-50 text-emerald-800 text-[10px] font-bold">
              Verified Parent / Legal Guardian
            </span>
          </div>
        </div>

        <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Customer CIF</span>
            <span className="block font-mono font-semibold text-[#0b2a4a]">{PARENT_PROFILE.cif}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase">Phone Number</span>
            <span className="block font-mono font-semibold text-[#0b2a4a]">{PARENT_PROFILE.phone}</span>
          </div>
        </div>
      </div>

      {/* Primary Funding Source */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Primary Family Funding Account
        </span>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
            <div>
              <span className="text-xs font-bold text-[#0b2a4a] block">{PARENT_PROFILE.primaryAccount.name}</span>
              <span className="text-[11px] font-mono text-slate-500">•••• {PARENT_PROFILE.primaryAccount.last4}</span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#0b2a4a]">
            €{PARENT_PROFILE.primaryAccount.balance.toLocaleString('en-EU', { minimumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Detected Eligible Children */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#0b2a4a]">Eligible Children on Record</span>
          <span className="px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#0b2a4a] text-[10px] font-bold">
            2 Detected
          </span>
        </div>

        <div className="space-y-2">
          <div className="p-2.5 rounded-xl bg-[#eff4ff] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-xs flex items-center justify-center">
                LB
              </div>
              <div>
                <span className="text-xs font-bold text-[#0b2a4a] block">Luca Borg</span>
                <span className="text-[10px] text-slate-500">DOB: 14 Jun 2012 (Age 12)</span>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-800">Primary Candidate</span>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-50 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#ae3026] text-white font-bold text-xs flex items-center justify-center">
                SB
              </div>
              <div>
                <span className="text-xs font-bold text-slate-700 block">Sofia Borg</span>
                <span className="text-[10px] text-slate-500">DOB: 02 Nov 2015 (Age 9)</span>
              </div>
            </div>
            <span className="text-xs text-slate-500">Add later</span>
          </div>
        </div>
      </div>

      {/* Checkbox agreement */}
      <div className="flex items-start gap-3 px-1">
        <input
          type="checkbox"
          id="terms"
          checked={agreedTerms}
          onChange={(e) => setAgreedTerms(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded text-[#0b2a4a] accent-[#0b2a4a]"
        />
        <label htmlFor="terms" className="text-xs text-slate-600 leading-snug">
          I confirm I am the legal parent/guardian of Luca Borg and authorize the creation of supervised
          youth sub-accounts in accordance with EU PSD2.
        </label>
      </div>

      {/* Button */}
      <button
        type="button"
        onClick={handleContinue}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
      >
        <span>Confirm &amp; Link Luca</span>
        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
      </button>
    </div>
  );
};
