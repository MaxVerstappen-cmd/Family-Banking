import React, { useState } from 'react';
import { ScreenId, ChildAccount } from '../types';

interface ChildDetailViewProps {
  child: ChildAccount;
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onUpdateChild: (childId: string, updates: Partial<ChildAccount>) => void;
}

export const ChildDetailView: React.FC<ChildDetailViewProps> = ({
  child,
  onNavigate,
  onShowToast,
  onUpdateChild,
}) => {
  const [showFullCardNumber, setShowFullCardNumber] = useState(false);
  const [showCvvModal, setShowCvvModal] = useState(false);
  const [isFrozen, setIsFrozen] = useState(!child.isCardActive);
  const [posLimit, setPosLimit] = useState(30);
  const [atmLimit, setAtmLimit] = useState(20);
  const [atmEnabled, setAtmEnabled] = useState(true);
  const [contactlessEnabled, setContactlessEnabled] = useState(true);
  const [onlineEnabled, setOnlineEnabled] = useState(true);
  const [abroadEnabled, setAbroadEnabled] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [showLostStolenModal, setShowLostStolenModal] = useState(false);
  const [pinRevealed, setPinRevealed] = useState(false);

  const handleToggleFreeze = () => {
    const nextState = !isFrozen;
    setIsFrozen(nextState);
    onUpdateChild(child.id, { isCardActive: !nextState });
    onShowToast(
      nextState ? "Luca's card is now frozen" : "Luca's card is now active for everyday use",
      nextState ? 'lock' : 'check_circle'
    );
  };

  const handleRevealPin = () => {
    setShowPinModal(true);
    setPinRevealed(false);
    setTimeout(() => {
      setPinRevealed(true);
      onShowToast("Biometric authorized: PIN revealed", "fingerprint");
    }, 800);
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-24">
      {/* Header breadcrumb & Title */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-400">
          <span>Parental Controls</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#ae3026]">Card Management</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Luca's Card</h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/60">
            <span className={`w-2 h-2 rounded-full ${isFrozen ? 'bg-amber-500' : 'bg-[#00a472] animate-pulse'}`}></span>
            <span className={`text-[11px] font-bold tracking-wider uppercase ${isFrozen ? 'text-amber-700' : 'text-[#00a472]'}`}>
              {isFrozen ? 'FROZEN' : 'ACTIVE'}
            </span>
          </div>
        </div>
        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Manage virtual &amp; physical Mastercard controls, safety boundaries, and primary funding for Luca (Age 12).
        </p>
      </div>

      {/* Physical / Virtual Card (Exact Image 1 styling) */}
      <section aria-label="Luca's Mastercard" className="relative group mt-1">
        <div className="w-full bg-gradient-to-br from-[#ea4833] via-[#e53e29] to-[#ce2b17] rounded-3xl p-5 text-white shadow-xl shadow-red-900/15 overflow-hidden relative border border-white/15">
          {/* Subtle glossy curvature overlay */}
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-12 -bottom-12 w-48 h-48 rounded-full bg-black/15 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between h-52">
            {/* Top row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-white/20 flex items-center justify-center backdrop-blur-xs">
                  <span className="material-symbols-outlined text-[16px] text-white">account_balance</span>
                </div>
                <span className="text-xs font-bold tracking-wider text-white">
                  HERITAGE <span className="font-light text-white/90">FAMILY</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-black/25 px-2.5 py-0.5 rounded-full text-white/90 backdrop-blur-xs">
                  ADD-ON
                </span>
                <span className="material-symbols-outlined text-[18px] text-white/90">contactless</span>
              </div>
            </div>

            {/* Chip row */}
            <div className="mt-3 flex items-center justify-between">
              {/* Metallic Golden Chip */}
              <div className="w-11 h-8 rounded-md bg-gradient-to-tr from-[#f3cf65] via-[#ffe58f] to-[#e1b83d] p-1 shadow-sm border border-amber-300/80 flex flex-col justify-between">
                <div className="h-0.5 w-full bg-amber-700/40 rounded"></div>
                <div className="h-2.5 w-full flex justify-between gap-1">
                  <div className="w-2.5 h-full bg-amber-700/30 rounded-xs"></div>
                  <div className="w-2.5 h-full bg-amber-700/30 rounded-xs"></div>
                </div>
                <div className="h-0.5 w-full bg-amber-700/40 rounded"></div>
              </div>
            </div>

            {/* Card Number */}
            <div className="flex items-center justify-between my-auto pt-2">
              <div className="text-lg font-mono tracking-widest text-white font-semibold flex items-center gap-2">
                {showFullCardNumber ? (
                  <span>5412 8942 6730 4819</span>
                ) : (
                  <span>•••• &nbsp;•••• &nbsp;•••• &nbsp;4819</span>
                )}
              </div>
              <button
                type="button"
                onClick={() => setShowFullCardNumber(!showFullCardNumber)}
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center transition-colors text-white"
                title="Toggle Card Number"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {showFullCardNumber ? 'visibility_off' : 'visibility'}
                </span>
              </button>
            </div>

            {/* Bottom: Cardholder, Expiry, Mastercard Circles */}
            <div className="flex items-end justify-between pt-1">
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/70 font-semibold">
                  CARDHOLDER
                </span>
                <span className="text-xs font-bold tracking-wider text-white">
                  LUCA BORG
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-widest text-white/70 font-semibold">
                  EXPIRES
                </span>
                <span className="text-xs font-bold tracking-wider text-white font-mono">
                  08/28
                </span>
              </div>

              {/* Mastercard circles */}
              <div className="flex items-center -space-x-2">
                <div className="w-7 h-7 rounded-full bg-[#eb001b] opacity-95"></div>
                <div className="w-7 h-7 rounded-full bg-[#f79e1b] opacity-95"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick action buttons underneath card */}
        <div className="grid grid-cols-2 gap-2 mt-2.5">
          <button
            type="button"
            onClick={() => setShowCvvModal(true)}
            className="h-11 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">pin</span>
            <span>Show CVV / PIN</span>
          </button>
          <button
            type="button"
            onClick={() => onShowToast("Added to Luca's Apple Wallet on iPhone 13", "wallet")}
            className="h-11 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:bg-slate-50 text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">account_balance_wallet</span>
            <span>Apple Wallet</span>
          </button>
        </div>
      </section>

      {/* Freeze Luca's Card Toggle */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-[#0b2a4a]">
            <span className="material-symbols-outlined text-[22px]">ac_unit</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0b2a4a]">Freeze Luca's Card</h3>
            <p className="text-xs text-slate-500">
              {isFrozen ? 'Card temporarily locked for purchases' : 'Card active for everyday use'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleToggleFreeze}
          className={`w-12 h-7 rounded-full p-0.5 transition-colors relative flex items-center ${
            isFrozen ? 'bg-[#ea4833]' : 'bg-slate-300'
          }`}
        >
          <div
            className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
              isFrozen ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </section>

      {/* Funding Source Card */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Funding Source
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-[#ae3026]">
            Overdraft Shield
          </span>
        </div>

        <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0b2a4a] text-white flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#0b2a4a] truncate">Maria's Platinum Debit</h4>
              <p className="text-[11px] text-slate-500 font-mono truncate">
                •••• 8842 · Balance: €4,850.00
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onShowToast("Primary family account linked: Maria's Platinum Debit", "swap_horiz")}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0b2a4a] hover:bg-slate-50 shrink-0 shadow-2xs"
          >
            Switch
          </button>
        </div>

        <div className="flex items-start gap-2 text-[11px] text-slate-500 leading-snug">
          <span className="material-symbols-outlined text-[16px] text-emerald-600 shrink-0 mt-0.5">
            verified_user
          </span>
          <span>
            Settled automatically via Maria's primary account. Sub-account limits prevent overdraft liability.
          </span>
        </div>
      </section>

      {/* Daily Limits */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0b2a4a] text-[20px]">tune</span>
            <h3 className="text-sm font-bold text-[#0b2a4a]">Daily Limits</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Resets 00:00 CET</span>
        </div>

        {/* POS & Online Spend */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#0b2a4a]">POS &amp; Online Spend</span>
            <span className="text-sm font-bold text-[#0b2a4a] font-mono">
              €{posLimit.toFixed(2)} <span className="text-slate-400 text-xs font-normal">/ day</span>
            </span>
          </div>
          <input
            type="range"
            min="5"
            max="100"
            step="5"
            value={posLimit}
            onChange={(e) => setPosLimit(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ea4833]"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>€5 min</span>
            <span>€50</span>
            <span>€100 max</span>
          </div>
        </div>

        {/* ATM Cash Withdrawals */}
        <div className="space-y-1.5 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-slate-600">local_atm</span>
              <span className="text-xs font-bold text-[#0b2a4a]">ATM Cash Withdrawals</span>
            </div>
            <button
              type="button"
              onClick={() => setAtmEnabled(!atmEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                atmEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  atmEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-slate-500">Daily withdrawal limit</span>
            <span className="text-sm font-bold text-[#0b2a4a] font-mono">
              €{atmLimit.toFixed(2)} <span className="text-slate-400 text-xs font-normal">/ day</span>
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="60"
            step="5"
            disabled={!atmEnabled}
            value={atmLimit}
            onChange={(e) => setAtmLimit(parseFloat(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#ea4833] disabled:opacity-40"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>€10</span>
            <span>€60 max</span>
          </div>
        </div>
      </section>

      {/* Allowed Channels */}
      <section className="bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 space-y-4">
        <h3 className="text-sm font-bold text-[#0b2a4a]">Allowed Channels</h3>

        <div className="space-y-3">
          {/* Contactless */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#0b2a4a]">
                <span className="material-symbols-outlined text-[18px]">contactless</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0b2a4a]">Contactless (NFC)</h4>
                <p className="text-[11px] text-slate-500">Tap &amp; Pay up to €50 without PIN</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setContactlessEnabled(!contactlessEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                contactlessEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  contactlessEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Online Purchases */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#0b2a4a]">
                <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0b2a4a]">Online Purchases</h4>
                <p className="text-[11px] text-slate-500">E-commerce &amp; in-app payments</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOnlineEnabled(!onlineEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                onlineEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  onlineEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100"></div>

          {/* Foreign Currency */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[#0b2a4a]">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#0b2a4a]">Foreign Currency &amp; Abroad</h4>
                <p className="text-[11px] text-slate-500">Blocked outside Eurozone</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAbroadEnabled(!abroadEnabled)}
              className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                abroadEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  abroadEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Action Links */}
      <section className="space-y-2">
        <button
          type="button"
          onClick={handleRevealPin}
          className="w-full bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">lock_reset</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#0b2a4a]">View PIN Remotely</h4>
              <p className="text-[11px] text-slate-500">Requires Maria's Face ID biometric</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-slate-400 text-[20px]">chevron_right</span>
        </button>

        <button
          type="button"
          onClick={() => setShowLostStolenModal(true)}
          className="w-full bg-white rounded-2xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between hover:bg-rose-50/50 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#ae3026] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
            <div className="text-left">
              <h4 className="text-xs font-bold text-[#ae3026]">Report Lost or Stolen</h4>
              <p className="text-[11px] text-slate-500">Permanently cancel &amp; order free replacement</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#ae3026] text-[20px]">chevron_right</span>
        </button>
      </section>

      {/* CVV / PIN Modal */}
      {showCvvModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0b2a4a]">Security Credentials</h3>
              <button
                type="button"
                onClick={() => setShowCvvModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                <span className="text-xs text-slate-500">Card PIN</span>
                <span className="text-lg font-mono font-bold text-[#0b2a4a] tracking-widest">4821</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                <span className="text-xs text-slate-500">CVV / CVC</span>
                <span className="text-lg font-mono font-bold text-[#0b2a4a] tracking-widest">419</span>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center">
                <span className="text-xs text-slate-500">Card Number</span>
                <span className="text-xs font-mono font-bold text-[#0b2a4a]">5412 8942 6730 4819</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowCvvModal(false)}
              className="w-full py-3 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold shadow-md"
            >
              Close Credentials
            </button>
          </div>
        </div>
      )}

      {/* PIN Remote Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 rounded-full bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[28px]">
                {pinRevealed ? 'pin' : 'fingerprint'}
              </span>
            </div>

            <div>
              <h3 className="text-base font-bold text-[#0b2a4a]">Remote PIN Inspection</h3>
              <p className="text-xs text-slate-500 mt-1">
                {pinRevealed ? "Luca's ATM & POS Chip PIN is:" : 'Verifying Maria Borg Face ID...'}
              </p>
            </div>

            {pinRevealed ? (
              <div className="py-4">
                <span className="text-4xl font-mono font-bold tracking-[0.3em] text-[#0b2a4a] bg-slate-100 px-6 py-2 rounded-2xl border border-slate-200">
                  4821
                </span>
                <p className="text-[11px] text-slate-400 mt-3">This PIN is encrypted with hardware enclave</p>
              </div>
            ) : (
              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden my-4">
                <div className="h-full bg-[#00a472] w-2/3 animate-pulse"></div>
              </div>
            )}

            <button
              type="button"
              onClick={() => setShowPinModal(false)}
              className="w-full py-3 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold shadow-md"
            >
              Done
            </button>
          </div>
        </div>
      )}

      {/* Report Lost / Stolen Modal */}
      {showLostStolenModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-[#ae3026] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[24px]">warning</span>
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-[#0b2a4a]">Permanently Cancel Card?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                This will immediately deactivate Mastercard •••• 4819. A new replacement card will be dispatched free of charge to your Sliema address.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowLostStolenModal(false)}
                className="flex-1 py-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold hover:bg-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLostStolenModal(false);
                  setIsFrozen(true);
                  onShowToast("Card cancelled. Replacement dispatched to Sliema address!", "local_shipping");
                }}
                className="flex-1 py-3 rounded-xl bg-[#ae3026] text-white text-xs font-bold hover:bg-red-700 shadow-sm"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
