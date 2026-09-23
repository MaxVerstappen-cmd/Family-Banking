import React, { useState } from 'react';
import { ScreenId, SpendingLimitsConfig } from '../types';
import { INITIAL_SPENDING_LIMITS } from '../data/mockData';

interface SpendingLimitsViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const SpendingLimitsView: React.FC<SpendingLimitsViewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [limits, setLimits] = useState<SpendingLimitsConfig>(INITIAL_SPENDING_LIMITS);
  const [gamingRestricted, setGamingRestricted] = useState<boolean>(true);
  const [showBiometricModal, setShowBiometricModal] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  const handleSliderChange = (key: keyof SpendingLimitsConfig, value: number) => {
    setLimits((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    setShowBiometricModal(true);
    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setTimeout(() => {
        setShowBiometricModal(false);
        onShowToast("Luca's spending limits updated & cryptographically signed!", 'security');
        onNavigate('child_luca');
      }, 500);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-24">
      {/* Title & Child Context */}
      <div className="pt-2 flex items-center gap-3">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_bQ9OLZc4Eve5Msr7qn0C3RVOdzJUSKl2H-VoWFQ9QjlzS5pfQ9bORxtqYg5iZb0SpxOm-MfmDZQM0cSySeEf-02U1BO9rvo9gwhwkup7aiJm-ZIwmKPnbxoq2nw8vE84Sa5T1BZzIoKKhy1zv8HiVjgNEZUqAUTK74cJ-TK3_Fyot2Zgq95WGwWgVD9O6aDbicDnNIGfMPDjCWphnb88cvcTUYz2Ox7MXRRCtxPfZNF9M_gFdomUlA"
          alt="Luca Borg"
          className="w-12 h-12 rounded-full object-cover ring-2 ring-[#0b2a4a]/20 shadow-xs"
        />
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Cardholder Safeguards
          </span>
          <h1 className="text-xl font-bold text-[#0b2a4a]">Luca's Spending Limits</h1>
          <p className="text-xs text-slate-500">Mastercard •• 4829 • Real-time card restrictions</p>
        </div>
      </div>

      {/* Main Sliders & Ceilings */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-5">
        {/* Daily Spend Limit */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b2a4a]">Daily Spend Limit</span>
            <span className="text-base font-bold text-[#0b2a4a] font-mono">
              €{limits.dailySpend.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={limits.dailySpend}
            onChange={(e) => handleSliderChange('dailySpend', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b2a4a]"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>€5 min</span>
            <span className="text-emerald-700 font-semibold">Recommended for 12y: €25–€35</span>
            <span>€100 max</span>
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        {/* Single Transaction Limit */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b2a4a]">Single Transaction Limit</span>
            <span className="text-base font-bold text-[#0b2a4a] font-mono">
              €{limits.singleTx.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="50"
            step="5"
            value={limits.singleTx}
            onChange={(e) => handleSliderChange('singleTx', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b2a4a]"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>€5</span>
            <span>Blocks any single purchase exceeding limit</span>
            <span>€50</span>
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        {/* Monthly Spending Cap */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b2a4a]">Monthly Spending Cap</span>
            <span className="text-base font-bold text-[#0b2a4a] font-mono">
              €{limits.monthlyCap.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="50"
            max="500"
            step="25"
            value={limits.monthlyCap}
            onChange={(e) => handleSliderChange('monthlyCap', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b2a4a]"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>€50</span>
            <span>Hard monthly limit for all channels</span>
            <span>€500</span>
          </div>
        </div>

        <div className="h-px bg-slate-100"></div>

        {/* Online Purchase Limit */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b2a4a]">Online Purchase Limit</span>
            <span className="text-base font-bold text-[#0b2a4a] font-mono">
              €{limits.onlinePurchase.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="5"
            value={limits.onlinePurchase}
            onChange={(e) => handleSliderChange('onlinePurchase', parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b2a4a]"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>€0 (Disabled)</span>
            <span>Websites &amp; App Store checkout</span>
            <span>€50</span>
          </div>
        </div>
      </div>

      {/* Parental Approval Threshold */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#fc6959]">notifications_active</span>
            <div>
              <span className="text-xs font-bold text-[#0b2a4a] block">Require Approval Above</span>
              <span className="text-[11px] text-slate-500">Sends instant prompt to Maria's phone</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() =>
              setLimits((prev) => ({
                ...prev,
                requireApprovalAbove: !prev.requireApprovalAbove,
              }))
            }
            className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
              limits.requireApprovalAbove ? 'bg-[#00a472]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                limits.requireApprovalAbove ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {limits.requireApprovalAbove && (
          <div className="pt-2 flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-600">Threshold:</span>
            {['10.00', '15.00', '20.00', '30.00'].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setLimits((prev) => ({ ...prev, approvalCeiling: parseFloat(val) }))}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  limits.approvalCeiling === parseFloat(val)
                    ? 'bg-[#0b2a4a] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                €{val.split('.')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Mandatory Regulatory Restrictions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-xs font-bold text-[#0b2a4a] uppercase tracking-wider">
            Protected Merchant Categories
          </h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800">
            EU Youth Protected
          </span>
        </div>

        <div className="space-y-2 text-xs">
          {[
            { label: 'Gambling & Betting', icon: 'casino' },
            { label: 'Alcohol & Tobacco Stores', icon: 'liquor' },
            { label: 'Adult Entertainment', icon: 'no_adult_content' },
            { label: 'Cryptocurrency & Forex Exchanges', icon: 'currency_bitcoin' },
          ].map((cat) => (
            <div
              key={cat.label}
              className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-700"
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#ae3026]">
                  {cat.icon}
                </span>
                <span className="font-medium">{cat.label}</span>
              </div>
              <span className="flex items-center gap-1 text-[11px] font-bold text-[#ae3026]">
                <span className="material-symbols-outlined text-[14px]">lock</span>
                Blocked
              </span>
            </div>
          ))}

          {/* Optional Gaming Category */}
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#eff4ff] border border-blue-100 text-slate-700">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-[#0b2a4a]">
                sports_esports
              </span>
              <div>
                <span className="font-bold text-[#0b2a4a] block">Gaming &amp; Microtransactions</span>
                <span className="text-[10px] text-slate-500">Cap in-game credits to €10/mo</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setGamingRestricted(!gamingRestricted)}
              className={`w-10 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                gamingRestricted ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  gamingRestricted ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={handleSave}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all hover:bg-[#00152d]"
      >
        <span className="material-symbols-outlined text-[20px]">fingerprint</span>
        <span>Save Limits with Face ID</span>
      </button>

      {/* Simulated Biometric Verification Modal */}
      {showBiometricModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px] animate-pulse">fingerprint</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b2a4a]">Face ID Verification</h3>
              <p className="text-xs text-slate-500 mt-1">
                {isVerifying ? 'Scanning Maria Borg...' : 'Parental Signature Confirmed!'}
              </p>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#00a472] transition-all duration-700 ${
                  isVerifying ? 'w-1/2' : 'w-full'
                }`}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
