import React, { useState } from 'react';
import { ScreenId } from '../types';

interface TransferReviewViewProps {
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
  onConfirmTransfer: () => void;
}

export const TransferReviewView: React.FC<TransferReviewViewProps> = ({
  transferDetails,
  onNavigate,
  onShowToast,
  onConfirmTransfer,
}) => {
  const [authMethod, setAuthMethod] = useState<'faceid' | 'passcode'>('faceid');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const amount = transferDetails.amount || 25.0;
  const childName = transferDetails.childName || 'Luca Borg';
  const isLuca = childName.includes('Luca');
  const newBalance = isLuca ? 14.5 + amount : 48.3 + amount;
  const note = transferDetails.note || 'For science project supplies & lunch';
  const category = transferDetails.reason || 'Bookstore / School';

  const handleAuthorize = () => {
    setIsAuthenticating(true);

    setTimeout(() => {
      setIsAuthenticating(false);
      onConfirmTransfer();
      onNavigate('transfer_success');
    }, 1200);
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-24">
      {/* Top Header Breadcrumb & Status (Exact Image 4) */}
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase bg-blue-50 text-[#0b2a4a] px-2.5 py-1 rounded-full border border-blue-100">
            Step 2 of 2 • Verification &amp; Security
          </span>
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00a472] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
            <span className="material-symbols-outlined text-[13px]">verified_user</span>
            <span>PSD2 Compliant</span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-[#0b1c30] mt-2">Review &amp; Confirm</h1>
        <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
          Review transfer details before authorizing instant funding to {childName.split(' ')[0]}'s account.
        </p>
      </div>

      {/* Total Funding Amount Card (Exact Image 4) */}
      <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 text-center space-y-1 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full pointer-events-none -z-0"></div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block relative z-10">
          Total Funding Amount
        </span>
        <div className="text-3xl font-extrabold text-[#0b1c30] font-mono tracking-tight relative z-10">
          €{amount.toFixed(2)} <span className="text-sm font-sans font-bold text-slate-400">EUR</span>
        </div>
        <div className="flex items-center justify-center gap-1.5 pt-1 relative z-10">
          <div className="flex items-center gap-1 text-xs font-bold text-[#00a472] bg-emerald-50/80 px-3 py-1 rounded-full border border-emerald-200/50">
            <span className="material-symbols-outlined text-[15px]">bolt</span>
            <span>Instant delivery (&lt; 5s)</span>
            <span className="text-slate-300">•</span>
            <span>€0.00 Fee</span>
          </div>
        </div>
      </section>

      {/* From / To Flow Card (Exact Image 4) */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
        {/* FROM row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&h=120&q=80"
                alt="Maria Borg"
                className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-2xs"
              />
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#0b2a4a] text-white flex items-center justify-center text-[8px]">
                <span className="material-symbols-outlined text-[10px]">credit_card</span>
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">FROM</span>
                <span className="text-xs font-bold text-[#0b2a4a]">Maria Borg (You)</span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Platinum Current •••• 8842
              </p>
              <p className="text-[10px] text-slate-400">
                Est. balance after: €4,825.00
              </p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-slate-800 font-mono">-€{amount.toFixed(2)}</span>
        </div>

        {/* Divider with Instant Family Shield badge */}
        <div className="relative flex items-center justify-center py-1">
          <div className="w-full border-t border-dashed border-slate-200"></div>
          <div className="absolute bg-[#eff4ff] border border-blue-200/80 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider text-[#0b2a4a] flex items-center gap-1 shadow-2xs">
            <span className="material-symbols-outlined text-[12px]">arrow_downward</span>
            <span>Instant Family Shield</span>
          </div>
        </div>

        {/* TO row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="relative">
              <div
                className={`w-10 h-10 rounded-full ${isLuca ? 'bg-[#0091ff]' : 'bg-[#ff7b1a]'} text-white font-bold text-xs flex items-center justify-center shadow-2xs`}
              >
                {isLuca ? 'LB' : 'SB'}
              </div>
              <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00a472] text-white flex items-center justify-center text-[8px]">
                <span className="material-symbols-outlined text-[10px]">check</span>
              </span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TO</span>
                <span className="text-xs font-bold text-[#0b2a4a]">{childName}</span>
                <span className="text-[10px] text-slate-400">({isLuca ? 'Age 12' : 'Age 9'})</span>
              </div>
              <p className="text-[11px] text-slate-500 font-mono">
                Junior Smart Card •••• {isLuca ? '4819' : '1042'}
              </p>
              <p className="text-[10px] text-[#00a472] font-semibold">
                New card balance: €{newBalance.toFixed(2)}
              </p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-[#00a472] font-mono">+€{amount.toFixed(2)}</span>
        </div>
      </section>

      {/* Transfer Metadata Table */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 divide-y divide-slate-100 text-xs">
        <div className="pb-2.5 flex items-center justify-between">
          <span className="text-slate-500">Transfer Mode</span>
          <span className="font-bold text-[#0b2a4a]">One-time Instant Top-up</span>
        </div>
        <div className="py-2.5 flex items-center justify-between gap-4">
          <span className="text-slate-500 shrink-0">Memo</span>
          <span className="font-medium text-[#0b2a4a] text-right italic truncate">"{note}"</span>
        </div>
        <div className="pt-2.5 flex items-center justify-between">
          <span className="text-slate-500">Category</span>
          <span className="font-bold text-[#0b2a4a] flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-blue-600">menu_book</span>
            <span>{category}</span>
          </span>
        </div>
      </section>

      {/* Daily Spending Limit Guard Info Card (Exact Image 4) */}
      <section className="p-4 rounded-3xl bg-[#eff4ff] border border-blue-200/70 space-y-2">
        <div className="flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-[#0b2a4a] shrink-0 mt-0.5">
            info
          </span>
          <div className="text-xs text-slate-700 leading-snug">
            <span className="font-bold text-[#0b2a4a] block">Daily Spending Limit Guard</span>
            <p className="mt-0.5 text-slate-600 text-[11px] leading-relaxed">
              {childName.split(' ')[0]}'s daily spending cap is <strong>€30.00</strong> (<strong>€17.60 headroom left today</strong>). Top-up funds are safely pooled in his Junior Smart ledger.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-500 border-t border-blue-100/80">
          <span className="material-symbols-outlined text-[16px] text-blue-600">notifications_active</span>
          <span>Instant push alert will ping {childName.split(' ')[0]}'s device upon release.</span>
        </div>
      </section>

      {/* Strong Customer Authentication (SCA) (Exact Image 4) */}
      <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-[#0b2a4a]">Strong Customer Authentication (SCA)</h3>
              <span className="material-symbols-outlined text-[16px] text-slate-400">lock</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">Mandatory PSD2 verification for sums above €20.00</p>
          </div>
        </div>

        {/* SCA Method Toggle */}
        <div className="bg-[#eff4ff] p-1 rounded-2xl flex items-center shadow-2xs">
          <button
            type="button"
            onClick={() => setAuthMethod('faceid')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'faceid'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">sentiment_satisfied</span>
            <span>Face ID</span>
          </button>

          <button
            type="button"
            onClick={() => setAuthMethod('passcode')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              authMethod === 'passcode'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">pin</span>
            <span>6-Digit Passcode</span>
          </button>
        </div>

        {/* Biometric Ready Box (Exact Image 4) */}
        <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50 text-center space-y-2.5">
          <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto shadow-2xs">
            <span className="material-symbols-outlined text-[28px] text-[#0b2a4a]">
              face
            </span>
          </div>

          <div>
            <h4 className="text-sm font-bold text-[#0b2a4a]">Biometric Ready</h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Position front camera facing Maria Borg to verify €{amount.toFixed(2)} release.
            </p>
          </div>

          <div className="pt-1">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#00a472] bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              <span className="material-symbols-outlined text-[13px]">shield</span>
              <span>Secure Enclave Hardware Protected</span>
            </span>
          </div>
        </div>
      </section>

      {/* Buttons: Authorize & Cancel (Exact Image 4) */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          disabled={isAuthenticating}
          onClick={handleAuthorize}
          className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {isAuthenticating ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">progress_activity</span>
              <span>Authorizing with Face ID...</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[20px]">fingerprint</span>
              <span>Authorize €{amount.toFixed(2)} with Face ID</span>
            </>
          )}
        </button>

        <button
          type="button"
          onClick={() => onNavigate('payments')}
          className="w-full h-12 rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center transition-all active:scale-[0.98]"
        >
          Cancel &amp; Edit Details
        </button>
      </div>

      {/* Footer */}
      <p className="text-center text-[10px] text-slate-400 pt-1">
        Protected by 256-bit bank-grade encryption • Licensed European Credit Institution
      </p>
    </div>
  );
};
