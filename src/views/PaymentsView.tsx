import React, { useState } from 'react';
import { ScreenId, ChildAccount } from '../types';
import { PARENT_PROFILE } from '../data/mockData';

interface PaymentsViewProps {
  childrenAccounts: ChildAccount[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onSendMoney: (childId: string, amount: number, note: string, isRecurring: boolean) => void;
}

export const PaymentsView: React.FC<PaymentsViewProps> = ({
  childrenAccounts,
  onNavigate,
  onShowToast,
  onSendMoney,
}) => {
  const [selectedChildId, setSelectedChildId] = useState<string>('luca');
  const [amount, setAmount] = useState<string>('25.00');
  const [isRecurring, setIsRecurring] = useState<boolean>(false);
  const [frequencyDay, setFrequencyDay] = useState<string>('Friday');
  const [selectedTag, setSelectedTag] = useState<string>('Weekly Allowance');
  const [note, setNote] = useState<string>('Great job on math homework this week!');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const selectedChild =
    childrenAccounts.find((c) => c.id === selectedChildId) || childrenAccounts[0];

  const handlePreset = (val: string) => {
    setAmount(val);
  };

  const handleTransfer = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) {
      onShowToast('Please enter a valid amount', 'error');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onSendMoney(selectedChildId, num, note, isRecurring);
      onShowToast(
        isRecurring
          ? `Recurring allowance of €${num.toFixed(2)} set for ${selectedChild.name} every ${frequencyDay}!`
          : `Sent €${num.toFixed(2)} to ${selectedChild.name}!`,
        'payments'
      );
      setAmount('15.00');
    }, 600);
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-24">
      {/* Header Context */}
      <div className="pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Direct Family Transfers
        </span>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Send Money &amp; Allowance</h1>
        <p className="text-xs text-slate-500">
          Transfer instantly from your Heritage Current Account with zero fees.
        </p>
      </div>

      <form onSubmit={handleTransfer} className="space-y-4">
        {/* Source Account Card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-bold uppercase tracking-wider text-[10px]">From Account</span>
            <span className="flex items-center gap-1 text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Verified
            </span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0b2a4a] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                <span className="material-symbols-outlined text-[20px]">account_balance</span>
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#0b2a4a]">{PARENT_PROFILE.primaryAccount.name}</h4>
                <p className="text-xs font-mono text-slate-500">
                  •••• {PARENT_PROFILE.primaryAccount.last4}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#0b2a4a] block">
                €{PARENT_PROFILE.primaryAccount.balance.toLocaleString('en-EU', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[10px] text-slate-400">Available</span>
            </div>
          </div>
        </div>

        {/* Destination Child Selector */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-700 block">Select Child</label>
          <div className="grid grid-cols-2 gap-2">
            {childrenAccounts.map((child) => {
              const isSelected = child.id === selectedChildId;
              return (
                <button
                  key={child.id}
                  type="button"
                  onClick={() => setSelectedChildId(child.id)}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all text-left ${
                    isSelected
                      ? 'bg-[#eff4ff] border-[#0b2a4a] ring-2 ring-blue-500/20 shadow-xs'
                      : 'bg-white border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={child.avatarUrl}
                    alt={child.name}
                    className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow-2xs"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#0b2a4a] truncate block">
                      {child.name}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      Bal: €{child.balance.toFixed(2)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Amount Entry & Presets */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          <label className="text-xs font-bold text-slate-700 block">Transfer Amount</label>
          <div className="flex items-center justify-center py-2">
            <span className="text-3xl font-bold text-[#0b2a4a] mr-1">€</span>
            <input
              type="number"
              step="0.5"
              min="1"
              max="500"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-4xl font-bold text-[#0b2a4a] text-center w-36 border-b-2 border-[#0b2a4a] focus:outline-none font-mono"
            />
          </div>

          <div className="grid grid-cols-4 gap-2 pt-1">
            {['5.00', '10.00', '20.00', '50.00'].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => handlePreset(preset)}
                className={`py-2 rounded-xl text-xs font-bold transition-all ${
                  amount === preset
                    ? 'bg-[#0b2a4a] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                €{preset.split('.')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Transfer Frequency (One-time vs Recurring) */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          <label className="text-xs font-bold text-slate-700 block">Transfer Schedule</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setIsRecurring(false)}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                !isRecurring
                  ? 'bg-[#eff4ff] border-[#0b2a4a] text-[#0b2a4a] font-bold'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">bolt</span>
              <div>
                <span className="text-xs block">One-time Instant</span>
                <span className="text-[10px] text-slate-500 font-normal">Immediate top-up</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setIsRecurring(true)}
              className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all ${
                isRecurring
                  ? 'bg-[#eff4ff] border-[#0b2a4a] text-[#0b2a4a] font-bold'
                  : 'bg-white border-slate-200 text-slate-600'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">event_repeat</span>
              <div>
                <span className="text-xs block">Weekly Allowance</span>
                <span className="text-[10px] text-slate-500 font-normal">Auto recurring</span>
              </div>
            </button>
          </div>

          {isRecurring && (
            <div className="pt-2 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
              <span>Payout day:</span>
              <select
                value={frequencyDay}
                onChange={(e) => setFrequencyDay(e.target.value)}
                className="px-2 py-1 rounded-lg border border-slate-200 text-xs font-bold text-[#0b2a4a] focus:outline-none"
              >
                <option value="Friday">Every Friday at 08:00 AM</option>
                <option value="Saturday">Every Saturday at 09:00 AM</option>
                <option value="Monday">Every Monday at 07:30 AM</option>
                <option value="1st of Month">Monthly on 1st</option>
              </select>
            </div>
          )}
        </div>

        {/* Purpose & Note */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          <label className="text-xs font-bold text-slate-700 block">Category &amp; Note</label>
          <div className="flex flex-wrap gap-1.5">
            {['Weekly Allowance', 'Reward / Gift', 'School / Books', 'Outing', 'Chores Bounty'].map(
              (tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    selectedTag === tag
                      ? 'bg-[#0b2a4a] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {tag}
                </button>
              )
            )}
          </div>

          <textarea
            rows={2}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add an encouraging note..."
            className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0b2a4a] focus:outline-none"
          />
        </div>

        {/* Daily limit notice */}
        <div className="flex items-center gap-2 px-1 text-xs text-slate-500">
          <span className="material-symbols-outlined text-[16px] text-[#00a472]">check_circle</span>
          <span>Daily deposit headroom: €100.00 max • Instant availability</span>
        </div>

        {/* Primary Submit Button */}
        <button
          type="submit"
          disabled={isProcessing}
          className="w-full h-14 rounded-2xl bg-[#fc6959] hover:opacity-90 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all disabled:opacity-50"
        >
          {isProcessing ? (
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              <span>Processing Transfer...</span>
            </div>
          ) : (
            <>
              <span className="material-symbols-outlined text-[22px]">send</span>
              <span>
                {isRecurring ? 'Schedule Allowance' : 'Send'} €{parseFloat(amount || '0').toFixed(2)} to {selectedChild.name}
              </span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};
