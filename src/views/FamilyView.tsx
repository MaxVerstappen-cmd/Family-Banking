import React, { useState } from 'react';
import { ScreenId, ChildAccount, TransactionItem } from '../types';

interface FamilyViewProps {
  childrenAccounts: ChildAccount[];
  transactions: TransactionItem[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const FamilyView: React.FC<FamilyViewProps> = ({
  childrenAccounts,
  transactions,
  onNavigate,
  onShowToast,
}) => {
  const [lucaChoreApproved, setLucaChoreApproved] = useState(false);
  const [sofiaGameApproved, setSofiaGameApproved] = useState(false);
  const [sofiaGameDeclined, setSofiaGameDeclined] = useState(false);
  const [showAssetModal, setShowAssetModal] = useState(false);

  const luca = childrenAccounts.find((c) => c.id === 'luca') || childrenAccounts[0];
  const sofia = childrenAccounts.find((c) => c.id === 'sofia') || childrenAccounts[1];
  const totalBalance = childrenAccounts.reduce((acc, c) => acc + c.balance, 0);

  const handleApproveChore = () => {
    setLucaChoreApproved(true);
    onShowToast('Approved! €3.00 deposited into Luca’s Junior card.', 'payments');
  };

  const handleAuthorizeGame = () => {
    setSofiaGameApproved(true);
    onShowToast('Authorized! One-time €4.99 token generated for Roblox.', 'lock_open');
  };

  const handleDeclineGame = () => {
    setSofiaGameDeclined(true);
    onShowToast('Purchase declined. Sofia notified.', 'block');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-10">
      {/* Family Title & Greeting Context */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a472]"></span>
            Parent Supervisor • Maria Borg
          </div>
          <h1 className="text-2xl font-bold text-[#0b2a4a] tracking-tight">My Family</h1>
        </div>
        <div className="flex items-center gap-1 bg-[#eff4ff] px-2.5 py-1 rounded-full shadow-2xs border border-blue-100">
          <span
            className="material-symbols-outlined text-[16px] text-[#00a472]"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="text-xs font-bold text-[#0b2a4a]">Protected</span>
        </div>
      </div>

      {/* Hero Card: Total Family Youth Assets */}
      <div className="w-full bg-[#0b2a4a] text-white rounded-2xl p-5 shadow-md relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-44 h-44 rounded-full bg-blue-500/15 blur-2xl pointer-events-none"></div>
        <div className="absolute right-3 bottom-3 opacity-10 text-white pointer-events-none">
          <span className="material-symbols-outlined text-[96px]">account_balance</span>
        </div>
        <div className="relative z-10 flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Total Family Youth Assets
            </span>
            <span className="flex items-center gap-1 bg-white/10 backdrop-blur-xs px-2.5 py-0.5 rounded-full text-xs font-medium text-white">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6ffbbe]"></span>
              2 Accounts Active
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-white">
              €{totalBalance.toFixed(2)}
            </span>
            <span className="flex items-center text-xs font-bold text-[#6ffbbe] bg-[#00301e]/70 px-2 py-0.5 rounded-md">
              <span className="material-symbols-outlined text-[13px] mr-0.5">trending_up</span>
              +€18.00 this month
            </span>
          </div>
          <div className="flex items-center justify-between pt-1 text-slate-300 text-xs">
            <span>Combined Junior Vault &amp; Current</span>
            <button
              type="button"
              onClick={() => setShowAssetModal(true)}
              className="flex items-center gap-1 text-white font-semibold underline underline-offset-4 active:opacity-75"
            >
              <span>Asset Analytics</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Action Grid (4 Interactive Tiles) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0b2a4a]">Quick Actions</h2>
          <span className="text-xs text-slate-400">Fast Controls</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {/* Send Money */}
          <button
            type="button"
            onClick={() => onNavigate('payments')}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md active:scale-95 transition-all text-center group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b2a4a] group-hover:bg-[#0b2a4a] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">send</span>
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-700 truncate w-full">Send Money</span>
          </button>

          {/* Allowance */}
          <button
            type="button"
            onClick={() => onNavigate('payments')}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md active:scale-95 transition-all text-center group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b2a4a] group-hover:bg-[#0b2a4a] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">calendar_month</span>
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-700 truncate w-full">Allowance</span>
          </button>

          {/* Assign Task */}
          <button
            type="button"
            onClick={() => onNavigate('tasks')}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md active:scale-95 transition-all text-center group"
          >
            <div className="w-11 h-11 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b2a4a] group-hover:bg-[#0b2a4a] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">checklist</span>
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-700 truncate w-full">Assign Task</span>
          </button>

          {/* Approvals */}
          <button
            type="button"
            onClick={() => onNavigate('approvals')}
            className="flex flex-col items-center justify-center p-3 bg-white rounded-2xl shadow-xs border border-slate-200/80 hover:shadow-md active:scale-95 transition-all text-center relative group"
          >
            <span className="absolute top-1.5 right-2 px-1.5 py-0.5 text-[9px] font-bold bg-[#fc6959] text-white rounded-full shadow-xs animate-pulse">
              2
            </span>
            <div className="w-11 h-11 rounded-xl bg-rose-50 flex items-center justify-center text-[#ae3026] group-hover:bg-[#fc6959] group-hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <span className="mt-2 text-xs font-semibold text-slate-700 truncate w-full">Approvals</span>
          </button>
        </div>
      </div>

      {/* Children's Accounts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <h2 className="text-base font-bold text-[#0b2a4a]">Children's Accounts</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-[#e5eeff] text-slate-700">
              2 Active
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('onboarding_invite')}
            className="flex items-center text-xs font-bold text-[#0b2a4a] hover:opacity-80 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px] mr-0.5">add_circle</span>
            Add Child
          </button>
        </div>

        {/* Child Card 1: Luca */}
        {luca && (
          <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#0b2a4a] font-bold text-sm">
                      {luca.initials}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-[#0b2a4a] truncate">{luca.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-semibold">
                      Age {luca.age}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Junior Smart &amp; Current</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Balance
                </span>
                <span className="text-xl font-bold text-[#0b2a4a]">€{luca.balance.toFixed(2)}</span>
              </div>
            </div>

            {/* Account Metadata */}
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#eff4ff] rounded-xl text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">IBAN / Details</span>
                <span className="font-mono text-xs font-semibold text-[#0b2a4a]">{luca.iban}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">CIF Number</span>
                <span className="font-mono text-xs font-semibold text-[#0b2a4a]">{luca.cif}</span>
              </div>
            </div>

            {/* Linked Card Status & Direct Link */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-700">
                <span
                  className="material-symbols-outlined text-[18px] text-[#00a472]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  contactless
                </span>
                <span className="text-xs font-semibold">Active Contactless Card</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('child_luca')}
                className="flex items-center gap-1 text-xs font-bold text-[#0b2a4a] hover:opacity-75 transition-opacity"
              >
                <span>Limits &amp; Details</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}

        {/* Child Card 2: Sofia */}
        {sofia && (
          <div className="w-full bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3 relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full p-0.5 bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#0b2a4a] font-bold text-sm">
                      {sofia.initials}
                    </div>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-base font-bold text-[#0b2a4a] truncate">{sofia.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[11px] bg-slate-100 text-slate-700 font-semibold">
                      Age {sofia.age}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate">Junior Savings &amp; Pocket Vault</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Balance
                </span>
                <span className="text-xl font-bold text-[#0b2a4a]">€{sofia.balance.toFixed(2)}</span>
              </div>
            </div>

            {/* Account Metadata */}
            <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#eff4ff] rounded-xl text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">IBAN / Details</span>
                <span className="font-mono text-xs font-semibold text-[#0b2a4a]">{sofia.iban}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">CIF Number</span>
                <span className="font-mono text-xs font-semibold text-[#0b2a4a]">{sofia.cif}</span>
              </div>
            </div>

            {/* Linked Card Status & Direct Link */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-1.5 text-xs text-slate-700">
                <span
                  className="material-symbols-outlined text-[18px] text-[#fc6959]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
                <span className="text-xs font-semibold">Supervised Tap &amp; Vault</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('spending_limits')}
                className="flex items-center gap-1 text-xs font-bold text-[#0b2a4a] hover:opacity-75 transition-opacity"
              >
                <span>Limits &amp; Details</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Pending Approvals Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0b2a4a]">Pending Approvals</h2>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#ffdad5] text-[#ae3026]">
              2 Action Needed
            </span>
          </div>
          <span className="text-xs text-slate-400">Parent Sign-off</span>
        </div>

        {/* Approval 1: Chore Reward (Luca) */}
        {!lucaChoreApproved ? (
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#6ffbbe]/30 flex items-center justify-center text-[#00a472] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">task_alt</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500">LUCA</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-[#00a472]">Chore Complete</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0b2a4a] truncate">Clean Bedroom &amp; Vacuum</h4>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-[#00a472]">+€3.00</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 bg-[#eff4ff] rounded-xl text-xs text-slate-700">
              <div className="flex items-center gap-1.5 pl-1">
                <span className="material-symbols-outlined text-[16px] text-[#00a472]">image</span>
                <span>Photo proof submitted (1m ago)</span>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('approvals')}
                className="text-xs text-[#0b2a4a] underline font-semibold pr-1"
              >
                View proof
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('approvals')}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 text-[#0b2a4a] text-xs font-bold hover:bg-slate-200 transition-colors"
              >
                Review
              </button>
              <button
                type="button"
                onClick={handleApproveChore}
                className="flex-1 py-2 px-3 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold hover:bg-[#00152d] shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                Approve €3.00
              </button>
            </div>
          </div>
        ) : (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Luca's bedroom chore approved &amp; €3.00 deposited!</span>
          </div>
        )}

        {/* Approval 2: Game Purchase Request (Sofia) */}
        {!sofiaGameApproved && !sofiaGameDeclined ? (
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad5]/60 flex items-center justify-center text-[#ae3026] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">sports_esports</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-500">SOFIA</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs font-semibold text-[#ae3026]">Spending Unlock</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#0b2a4a] truncate">Online Game Purchase (Roblox)</h4>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-sm font-bold text-[#0b2a4a]">€4.99</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 bg-[#eff4ff] p-2.5 rounded-xl">
              Supervised single-use debit token unlock for App Store checkout.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleDeclineGame}
                className="flex-1 py-2 px-3 rounded-xl bg-slate-100 text-[#ba1a1a] text-xs font-bold hover:bg-red-50 transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={handleAuthorizeGame}
                className="flex-1 py-2 px-3 rounded-xl bg-[#fc6959] text-white text-xs font-bold hover:opacity-90 shadow-sm active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">lock_open</span>
                Authorize
              </button>
            </div>
          </div>
        ) : sofiaGameApproved ? (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-emerald-800">
            <span className="material-symbols-outlined text-[18px]">check_circle</span>
            <span>Sofia's €4.99 Roblox token authorized!</span>
          </div>
        ) : (
          <div className="p-3 bg-slate-100 border border-slate-200 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-600">
            <span className="material-symbols-outlined text-[18px]">block</span>
            <span>Sofia's game purchase was declined.</span>
          </div>
        )}
      </div>

      {/* Financial Literacy Spotlight */}
      <div className="p-4 bg-[#eff4ff] rounded-2xl flex items-center gap-3 border border-blue-200/60">
        <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0b2a4a] shadow-xs shrink-0">
          <span className="material-symbols-outlined text-[26px]">lightbulb</span>
        </div>
        <div className="min-w-0">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b2a4a]">Family Goal Spotlight</h4>
          <p className="text-xs text-slate-600 line-clamp-2 mt-0.5">
            Luca and Sofia have saved 64% of their collective winter holiday pocket fund!
          </p>
        </div>
      </div>

      {/* Analytics Modal Dialog */}
      {showAssetModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0b2a4a]">Asset Analytics</h3>
              <button
                type="button"
                onClick={() => setShowAssetModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>
            <div className="space-y-2 text-xs text-slate-600">
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Luca's Smart Account:</span>
                <span className="font-bold text-[#0b2a4a]">€142.50 (62.6%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Sofia's Savings Vault:</span>
                <span className="font-bold text-[#0b2a4a]">€85.00 (37.4%)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-50">
                <span>Earned from chores this month:</span>
                <span className="font-bold text-emerald-600">+€18.00</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Parental match reserve:</span>
                <span className="font-bold text-[#0b2a4a]">€40.00 allocated</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowAssetModal(false)}
              className="w-full py-2.5 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
