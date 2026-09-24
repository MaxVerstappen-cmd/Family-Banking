import React, { useState } from 'react';
import { ScreenId, ChildAccount } from '../types';
import { PARENT_PROFILE } from '../data/mockData';

interface PaymentsViewProps {
  childrenAccounts: ChildAccount[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSetTransferState?: (details: {
    childId: string;
    childName: string;
    amount: number;
    reason: string;
    note: string;
    isRecurring: boolean;
  }) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  childrenAccounts,
  onNavigate,
  onShowToast,
  onSetTransferState,
}) => {
  const [transferMode, setTransferMode] = useState<'onetime' | 'recurring'>('onetime');
  const [selectedChildId, setSelectedChildId] = useState<string>('luca');
  const [amountStr, setAmountStr] = useState<string>('25.00');
  const [selectedReason, setSelectedReason] = useState<string>('Bookstore / School');
  const [customNote, setCustomNote] = useState<string>('For science project supplies & lunch');

  const selectedChild =
    childrenAccounts.find((c) => c.id === selectedChildId) || childrenAccounts[0];

  // Numeric Keypad Handlers
  const handleKeypadPress = (val: string) => {
    if (val === 'clear') {
      setAmountStr('0.00');
      return;
    }

    if (val === 'backspace') {
      if (amountStr.length <= 1 || amountStr === '0.00') {
        setAmountStr('0.00');
      } else {
        const trimmed = amountStr.slice(0, -1);
        setAmountStr(trimmed || '0');
      }
      return;
    }

    if (amountStr === '0.00' || amountStr === '0') {
      if (val === '.') {
        setAmountStr('0.');
      } else {
        setAmountStr(val);
      }
      return;
    }

    // Limit decimal places to 2
    if (amountStr.includes('.')) {
      const parts = amountStr.split('.');
      if (parts[1]?.length >= 2) return;
    }

    if (val === '.' && amountStr.includes('.')) return;

    if (amountStr.length > 6) return;

    setAmountStr(amountStr + val);
  };

  const handleQuickAdd = (addVal: number) => {
    const current = parseFloat(amountStr) || 0;
    const next = (current + addVal).toFixed(2);
    setAmountStr(next);
  };

  const handleProceedReview = () => {
    const amt = parseFloat(amountStr);
    if (isNaN(amt) || amt <= 0) {
      onShowToast('Please enter an amount greater than €0.00', 'error');
      return;
    }

    if (onSetTransferState) {
      onSetTransferState({
        childId: selectedChild.id,
        childName: selectedChild.name,
        amount: amt,
        reason: selectedReason,
        note: customNote,
        isRecurring: transferMode === 'recurring',
      });
    }

    onNavigate('transfer_review');
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-24">
      {/* Category & Title (Exact Image 3) */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-400">
          <span>Parental Transfers</span>
          <span className="text-slate-300">•</span>
          <span className="flex items-center gap-1 text-[#ae3026]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ae3026]"></span>
            Instant &amp; Scheduled
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0b1c30] mt-1">Transfer to Child</h1>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          Fund your child's smart debit account instantly or set up recurring automated pocket allowances.
        </p>
      </div>

      {/* Segmented Transfer Mode: One-time vs Recurring */}
      <div className="bg-[#eff4ff] p-1 rounded-2xl flex items-center shadow-2xs">
        <button
          type="button"
          onClick={() => setTransferMode('onetime')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            transferMode === 'onetime'
              ? 'bg-[#0b2a4a] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">bolt</span>
          <span>One-time Transfer</span>
        </button>

        <button
          type="button"
          onClick={() => setTransferMode('recurring')}
          className={`flex-1 py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            transferMode === 'recurring'
              ? 'bg-[#0b2a4a] text-white shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          <span>Recurring Allowance</span>
        </button>
      </div>

      {/* Select Child Beneficiary (Exact Image 3) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Select Child Beneficiary</span>
          <span className="text-slate-400 font-normal lowercase">2 Linked Accounts</span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Luca */}
          <button
            type="button"
            onClick={() => setSelectedChildId('luca')}
            className={`p-3.5 rounded-3xl border text-left transition-all relative ${
              selectedChildId === 'luca'
                ? 'bg-white border-[#0b2a4a] ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {selectedChildId === 'luca' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0b2a4a] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
            )}
            <div className="w-9 h-9 rounded-full bg-[#0091ff] text-white font-bold text-xs flex items-center justify-center shadow-2xs mb-2">
              LB
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#0b2a4a]">Luca</span>
              <span className="text-[11px] text-slate-400">(Age 12)</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Junior Smart •••• 412</span>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Balance</span>
              <span className="text-xs font-bold text-[#0b2a4a] font-mono">€14.50</span>
            </div>
          </button>

          {/* Sofia */}
          <button
            type="button"
            onClick={() => setSelectedChildId('sofia')}
            className={`p-3.5 rounded-3xl border text-left transition-all relative ${
              selectedChildId === 'sofia'
                ? 'bg-white border-[#0b2a4a] ring-2 ring-blue-500/20 shadow-xs'
                : 'bg-white border-slate-200/80 hover:bg-slate-50'
            }`}
          >
            {selectedChildId === 'sofia' && (
              <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#0b2a4a] text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-[14px]">check</span>
              </div>
            )}
            <div className="w-9 h-9 rounded-full bg-[#ff7b1a] text-white font-bold text-xs flex items-center justify-center shadow-2xs mb-2">
              SB
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xs font-bold text-[#0b2a4a]">Sofia</span>
              <span className="text-[11px] text-slate-400">(Age 9)</span>
            </div>
            <span className="text-[10px] text-slate-500 block">Junior Pocket •••• 590</span>
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[10px] text-slate-400">Balance</span>
              <span className="text-xs font-bold text-[#0b2a4a] font-mono">€48.30</span>
            </div>
          </button>
        </div>
      </section>

      {/* Funding Account (Exact Image 3) */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Funding Account
          </span>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#eff4ff] text-[#0b2a4a]">
            DEFAULT
          </span>
        </div>

        <div className="p-3 rounded-2xl bg-[#eff4ff]/60 border border-blue-100/80 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0b2a4a] text-white flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[20px]">credit_card</span>
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-[#0b2a4a] truncate">Maria's Platinum Vault</h4>
              <p className="text-[11px] text-slate-500 font-mono truncate">
                •••• 8842 · Available: €4,850.00
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onShowToast("Switched funding account to Everyday Checking", "swap_horiz")}
            className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50 shrink-0"
          >
            <span className="material-symbols-outlined text-[18px]">swap_vert</span>
          </button>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-slate-500">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">verified_user</span>
          <span>Direct settled with Instant SEPA &amp; Overdraft Shield protection.</span>
        </div>
      </section>

      {/* Transfer Amount Section with Keypad (Exact Image 3) */}
      <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-4">
        <div className="text-center space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Transfer Amount
          </span>
          <div className="flex items-center justify-center">
            <span className="text-4xl font-extrabold text-[#0b1c30] font-mono tracking-tight">
              €{amountStr}
            </span>
            <span className="w-0.5 h-8 bg-[#0b2a4a] ml-1 animate-pulse"></span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#00a472]">
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            <span>Instant delivery • Zero fees</span>
          </div>
        </div>

        {/* Quick Amount Pills */}
        <div className="grid grid-cols-5 gap-1.5 pt-1">
          {[5, 10, 20, 50].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleQuickAdd(val)}
              className="py-2 rounded-xl bg-[#eff4ff] hover:bg-blue-100/70 text-[#0b2a4a] text-xs font-bold transition-all active:scale-95"
            >
              +€{val}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleKeypadPress('clear')}
            className="py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold transition-all active:scale-95"
          >
            Clear
          </button>
        </div>

        {/* Full Numeric Keypad (Exact Image 3) */}
        <div className="grid grid-cols-3 gap-2 pt-2 max-w-sm mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '0', 'backspace'].map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => handleKeypadPress(key)}
              className="h-12 rounded-2xl bg-slate-50 hover:bg-slate-100 text-[#0b2a4a] text-base font-bold flex items-center justify-center transition-all active:scale-95 shadow-2xs"
            >
              {key === 'backspace' ? (
                <span className="material-symbols-outlined text-[20px] text-slate-600">backspace</span>
              ) : (
                key
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Transfer Reason Pills (Exact Image 3) */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 font-bold uppercase tracking-wider">
          <span>Transfer Reason</span>
          <span className="text-slate-400 font-normal lowercase">Visible in child app</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'Pocket Money', label: 'Pocket Money', icon: 'icecream' },
            { id: 'School Trip', label: 'School Trip', icon: 'directions_bus' },
            { id: 'Bookstore / School', label: 'Bookstore / School', icon: 'menu_book' },
          ].map((item) => {
            const isSelected = selectedReason === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedReason(item.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all ${
                  isSelected
                    ? 'bg-[#0b2a4a] text-white shadow-xs'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Custom Note to Child */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
          Custom Note to Child
        </span>
        <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/60">
          <span className="material-symbols-outlined text-[18px] text-slate-400">edit_note</span>
          <input
            type="text"
            maxLength={60}
            value={customNote}
            onChange={(e) => setCustomNote(e.target.value)}
            placeholder="Add a message for your child..."
            className="flex-1 bg-transparent text-xs text-[#0b2a4a] focus:outline-none"
          />
          <span className="text-[10px] text-slate-400">{customNote.length}/60</span>
        </div>
      </section>

      {/* Info Callout */}
      <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-blue-200/60 flex items-start gap-2.5">
        <span className="material-symbols-outlined text-[18px] text-[#00a472] shrink-0 mt-0.5">
          verified
        </span>
        <p className="text-[11px] text-slate-600 leading-relaxed">
          Transfers arrive in seconds via SEPA Instant. Protected by 256-bit bank encryption and child safety limits.
        </p>
      </div>

      {/* Primary Action Button (Exact Image 3) */}
      <button
        type="button"
        onClick={handleProceedReview}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-sm font-bold flex items-center justify-between px-5 shadow-lg active:scale-[0.98] transition-all"
      >
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px] text-emerald-400">lock</span>
          <span>Review Transfer to {selectedChild.name.split(' ')[0]} (€{parseFloat(amountStr || '0').toFixed(2)})</span>
        </div>
        <div className="flex items-center gap-1 bg-white/15 px-2.5 py-1 rounded-full text-[10px] uppercase font-bold tracking-wider">
          <span>Instant Free</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </div>
      </button>

      {/* Footer */}
      <p className="text-center text-[10px] text-slate-400 pt-1">
        Heritage Family Bank • Licensed European Credit Institution
      </p>
    </div>
  );
};
