import React from 'react';
import { ScreenId } from '../types';

interface TransferSuccessViewProps {
  transferDetails: {
    childId: string;
    childName: string;
    amount: number;
    reason: string;
    note: string;
    isRecurring: boolean;
  };
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const TransferSuccessView: React.FC<TransferSuccessViewProps> = ({
  transferDetails,
  onNavigate,
  onShowToast,
}) => {
  const amount = transferDetails.amount || 25.0;
  const childName = transferDetails.childName || 'Luca Borg';
  const isLuca = childName.includes('Luca');
  const note = transferDetails.note || 'For science project supplies & lunch';
  const category = transferDetails.reason || 'Bookstore / School';

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-24">
      {/* Top Success Badge & Confirmation (Exact Image 5) */}
      <section className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 text-center space-y-3 pt-6 relative overflow-hidden">
        <div className="relative inline-flex items-center justify-center">
          {/* Main green circle */}
          <div className="w-16 h-16 rounded-full bg-[#00a472] text-white flex items-center justify-center shadow-lg shadow-emerald-700/20">
            <span className="material-symbols-outlined text-[34px]">check</span>
          </div>
          {/* Secondary lightning badge */}
          <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-xs border-2 border-white">
            <span className="material-symbols-outlined text-[14px]">bolt</span>
          </div>
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/70 text-[#00a472] text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a472]"></span>
            <span>SEPA Instant Settlement • Completed</span>
          </div>

          <div className="text-3.5xl font-extrabold text-[#0b1c30] font-mono tracking-tight mt-2">
            €{amount.toFixed(2)} <span className="text-sm font-sans font-bold text-slate-400">EUR</span>
          </div>

          <p className="text-xs text-slate-600 font-medium mt-1">
            Successfully sent to <strong>{childName}</strong>
          </p>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-mono mt-2 bg-slate-50 py-1 px-3 rounded-full border border-slate-100 max-w-fit mx-auto">
            <span className="material-symbols-outlined text-[13px]">schedule</span>
            <span>Today, 14:28 CET</span>
            <span>•</span>
            <span>Ref #TRX-982410-LB</span>
          </div>
        </div>
      </section>

      {/* Account Impact Card (Exact Image 5) */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Account Impact
          </span>
          <span className="text-[10px] font-bold text-[#00a472] flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">check_circle</span>
            Zero Waiting Time
          </span>
        </div>

        {/* From Maria's Platinum Vault */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#0b2a4a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
            </div>
            <div className="min-w-0">
              <span className="text-[10px] text-slate-400 block">From Maria's Account</span>
              <h4 className="text-xs font-bold text-[#0b2a4a] truncate">Platinum Vault (•••• 8842)</h4>
              <p className="text-[10px] text-slate-400">Avail. bal: €4,825.00</p>
            </div>
          </div>
          <span className="text-sm font-bold text-slate-700 font-mono">-€{amount.toFixed(2)}</span>
        </div>

        {/* Divider badge */}
        <div className="relative flex items-center justify-center py-1">
          <div className="w-full border-t border-dashed border-slate-200"></div>
          <div className="absolute bg-[#eff4ff] border border-blue-200/80 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#0b2a4a] flex items-center gap-1 shadow-2xs">
            <span className="material-symbols-outlined text-[12px] text-[#00a472]">verified_user</span>
            <span>Instant Family Shield Transfer</span>
            <span className="material-symbols-outlined text-[12px]">arrow_downward</span>
          </div>
        </div>

        {/* To Luca */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-2xl ${isLuca ? 'bg-[#0091ff]' : 'bg-[#ff7b1a]'} text-white font-bold text-xs flex items-center justify-center shadow-2xs`}
              >
                {isLuca ? 'LB' : 'SB'}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00a472] text-white flex items-center justify-center text-[8px]">
                <span className="material-symbols-outlined text-[10px]">bolt</span>
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <h4 className="text-xs font-bold text-[#0b2a4a]">{childName}</h4>
                <span className="text-[10px] text-slate-400 bg-slate-100 px-1.5 py-0.2 rounded-full">
                  {isLuca ? 'Age 12' : 'Age 9'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Junior Smart Card (•••• {isLuca ? '4819' : '1042'})
              </p>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-slate-400">Card Balance:</span>
                <span className="font-bold text-[#00a472] font-mono">€{(14.5 + amount).toFixed(2)}</span>
                <span className="text-slate-400 line-through">€14.50</span>
              </div>
            </div>
          </div>
          <span className="text-sm font-bold text-[#00a472] font-mono">+€{amount.toFixed(2)}</span>
        </div>

        {/* Delivery Box */}
        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">stay_current_portrait</span>
            </div>
            <div>
              <h5 className="text-xs font-bold text-[#0b2a4a]">Delivered to {childName.split(' ')[0]}'s iPhone</h5>
              <p className="text-[10px] text-slate-500">Push notification sent &amp; instant balance updated</p>
            </div>
          </div>
          <span className="material-symbols-outlined text-[#00a472] text-[18px]">check_circle</span>
        </div>
      </section>

      {/* Transaction Details (Exact Image 5) */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#0b2a4a] text-[18px]">receipt_long</span>
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Transaction Details
          </h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="pb-2.5 flex items-center justify-between">
            <span className="text-slate-500">Category</span>
            <span className="font-bold text-[#0b2a4a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-amber-600">school</span>
              <span>{category}</span>
            </span>
          </div>

          <div className="py-2.5 flex items-center justify-between gap-4">
            <span className="text-slate-500 shrink-0">Memo / Note</span>
            <span className="font-medium text-[#0b2a4a] text-right italic truncate">"{note}"</span>
          </div>

          <div className="py-2.5 flex items-center justify-between">
            <span className="text-slate-500">Transfer Fee</span>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-[#0b2a4a]">€0.00</span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-50 text-[#00a472] px-2 py-0.5 rounded-full border border-emerald-200/60">
                Free Family Transfer
              </span>
            </div>
          </div>

          <div className="pt-2.5 flex items-center justify-between">
            <span className="text-slate-500">Settlement Mode</span>
            <span className="font-bold text-[#0b2a4a] flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-[#00a472]">bolt</span>
              <span>Instant SEPA (&lt; 5 seconds)</span>
            </span>
          </div>
        </div>
      </section>

      {/* Allowance Schedule Card (Exact Image 5) */}
      <section className="p-4 rounded-3xl bg-[#eff4ff] border border-blue-200/70 space-y-2.5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-2xl bg-white text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[18px]">event_repeat</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0b2a4a] uppercase tracking-wider">
              Allowance Schedule
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              Next automated pocket money: <strong>€15.00</strong> scheduled for <strong>Friday, 7 June at 16:00</strong>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            onShowToast("Opening automated standing orders schedule...", "calendar_today");
          }}
          className="w-full text-right text-xs font-bold text-[#0b2a4a] flex items-center justify-end gap-1 hover:underline pt-1"
        >
          <span>Manage recurring allowances</span>
          <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </section>

      {/* Primary and Secondary Action Buttons (Exact Image 5) */}
      <div className="space-y-2.5 pt-1">
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
        >
          <span>Done &amp; Back to Family Hub</span>
          <span className="material-symbols-outlined text-[18px]">check_circle</span>
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onShowToast(`Transfer confirmation shared with ${childName}!`, 'share')}
            className="h-12 rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">share</span>
            <span>Share with {childName.split(' ')[0]}</span>
          </button>

          <button
            type="button"
            onClick={() => onShowToast("Official European SEPA transfer receipt PDF generated", "download")}
            className="h-12 rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-2xs"
          >
            <span className="material-symbols-outlined text-[16px]">download</span>
            <span>Download Receipt</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('payments')}
          className="w-full py-2.5 text-xs font-bold text-[#0b2a4a] flex items-center justify-center gap-1.5 hover:underline"
        >
          <span className="material-symbols-outlined text-[16px]">swap_horiz</span>
          <span>Make Another Transfer</span>
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-slate-400 pt-1">
        Protected by 256-bit bank-grade encryption • Licensed European Credit Institution
      </p>
    </div>
  );
};
