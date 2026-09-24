import React, { useState } from 'react';
import { ScreenId, ChildAccount, TransactionItem } from '../types';

interface HomeViewProps {
  childrenAccounts: ChildAccount[];
  transactions: TransactionItem[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onUpdateChild: (childId: string, updates: Partial<ChildAccount>) => void;
  onApproveChoreFast: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  childrenAccounts,
  transactions,
  onNavigate,
  onShowToast,
  onUpdateChild,
  onApproveChoreFast,
}) => {
  const [chorePaid, setChorePaid] = useState(false);
  const [matchDone, setMatchDone] = useState(false);

  const luca = childrenAccounts.find((c) => c.id === 'luca') || childrenAccounts[0];
  const sofia = childrenAccounts.find((c) => c.id === 'sofia') || childrenAccounts[1];

  const totalBalance = childrenAccounts.reduce((acc, c) => acc + c.balance, 0);

  const handleToggleFreeze = (child: ChildAccount) => {
    const nextState = !child.isCardActive;
    onUpdateChild(child.id, { isCardActive: nextState });
    onShowToast(
      nextState ? `${child.name}'s card is active` : `${child.name}'s card is frozen`,
      nextState ? 'credit_card' : 'lock'
    );
  };

  const handlePayChore = () => {
    setChorePaid(true);
    onApproveChoreFast();
    onShowToast('€3.00 Sent to Luca! Great job encouraging responsibility.', 'payments');
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Parent Greeting & Overview Banner */}
      <section className="px-4 pt-3 pb-4">
        <div className="flex items-center justify-between gap-2 mb-2">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Family Banking Hub
            </span>
            <h1 className="text-2xl font-bold text-[#0b2a4a] leading-tight">
              Good morning, Maria
            </h1>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dce9ff] text-[#0b2a4a] shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#4edea3] inline-block animate-pulse"></span>
            <span className="text-xs font-bold">2 Active</span>
          </div>
        </div>

        {/* Total Managed Capital Summary Card */}
        <div className="mt-2 p-5 rounded-2xl bg-[#0b2a4a] text-white shadow-md relative overflow-hidden">
          {/* Decorative backdrop */}
          <div className="absolute -right-8 -bottom-10 w-44 h-44 rounded-full bg-blue-600/20 blur-2xl pointer-events-none"></div>
          <div className="absolute top-2 right-4 text-blue-200/10 pointer-events-none">
            <span className="material-symbols-outlined text-[80px]">shield_with_heart</span>
          </div>

          <div className="relative z-10">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-xs uppercase font-bold tracking-wider">Total Youth Balances</span>
              <span className="flex items-center gap-1 text-[#6ffbbe] text-xs font-bold">
                <span className="material-symbols-outlined text-[16px]">trending_up</span>
                +€18.00 this month
              </span>
            </div>
            <div className="mt-1 flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-white">
                €{totalBalance.toFixed(2)}
              </span>
              <span className="text-xs text-slate-300">across 2 accounts</span>
            </div>
            <div className="mt-4 pt-2 flex items-center justify-between bg-white/10 px-3.5 py-2.5 rounded-xl backdrop-blur-md">
              <div className="flex items-center gap-2 text-slate-200">
                <span className="material-symbols-outlined text-[18px] text-[#6ffbbe]">event_repeat</span>
                <span className="text-xs">Next allowance payout:</span>
              </div>
              <span className="text-xs font-bold text-[#ffdad5]">Friday (€25.00)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Child Accounts Showcase (Horizontal Peek Stack) */}
      <section className="mt-1">
        <div className="px-4 flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-[#0b2a4a]">Managed Accounts</h2>
            <span className="px-2 py-0.5 rounded-full bg-[#dce9ff] text-slate-700 text-xs font-semibold">
              Luca &amp; Sofia
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('family')}
            className="text-xs font-bold text-[#fc6959] hover:opacity-80 transition-opacity flex items-center gap-0.5"
          >
            <span>Details</span>
            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
          </button>
        </div>

        <div className="flex gap-3 overflow-x-auto px-4 pb-2 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar">
          {/* Card 1: Luca */}
          {luca && (
            <article className="shrink-0 w-[84vw] max-w-[340px] snap-center rounded-2xl bg-white p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 p-0.5 flex items-center justify-center text-white shadow-xs">
                    <span className="text-sm font-bold tracking-wider">{luca.initials}</span>
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#0b2a4a] text-white text-[9px] font-bold">
                      {luca.age}y
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-[#0b2a4a]">{luca.name}</h3>
                      {luca.isCardActive && (
                        <span
                          className="material-symbols-outlined text-[16px] text-emerald-500"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          title="Card Active"
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Mastercard •• {luca.cardLast4}</span>
                  </div>
                </div>

                {/* Freeze / Lock Switch */}
                <div className="flex flex-col items-end gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFreeze(luca)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                      luca.isCardActive ? 'bg-[#00a472]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        luca.isCardActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span
                    className={`text-[10px] font-bold ${
                      luca.isCardActive ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {luca.isCardActive ? 'Active' : 'Frozen'}
                  </span>
                </div>
              </div>

              <div className="my-3 p-3 bg-[#eff4ff] rounded-xl">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-600">Available Funds</span>
                  <span className="text-2xl font-bold text-[#0b2a4a]">€{luca.balance.toFixed(2)}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-slate-500 text-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#00a472]">schedule</span>
                  <span>€{luca.scheduledAllowance.toFixed(2)} scheduled for Fri</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('payments')}
                  className="h-10 rounded-xl bg-[#fc6959] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[16px]">send_money</span>
                  <span>Send Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('child_luca')}
                  className="h-10 rounded-xl bg-slate-100 text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Controls</span>
                </button>
              </div>
            </article>
          )}

          {/* Card 2: Sofia */}
          {sofia && (
            <article className="shrink-0 w-[84vw] max-w-[340px] snap-center rounded-2xl bg-white p-4 shadow-sm border border-slate-200/80 flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-400 to-amber-500 p-0.5 flex items-center justify-center text-white shadow-xs">
                    <span className="text-sm font-bold tracking-wider">{sofia.initials}</span>
                    <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-full bg-[#ae3026] text-white text-[9px] font-bold">
                      {sofia.age}y
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="text-base font-bold text-[#0b2a4a]">{sofia.name}</h3>
                      {sofia.isCardActive && (
                        <span
                          className="material-symbols-outlined text-[16px] text-emerald-500"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                          title="Card Active"
                        >
                          verified
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-slate-500 font-mono">Mastercard •• {sofia.cardLast4}</span>
                  </div>
                </div>

                {/* Freeze / Lock Switch */}
                <div className="flex flex-col items-end gap-1">
                  <button
                    type="button"
                    onClick={() => handleToggleFreeze(sofia)}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                      sofia.isCardActive ? 'bg-[#00a472]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        sofia.isCardActive ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                  <span
                    className={`text-[10px] font-bold ${
                      sofia.isCardActive ? 'text-emerald-700' : 'text-red-600'
                    }`}
                  >
                    {sofia.isCardActive ? 'Active' : 'Frozen'}
                  </span>
                </div>
              </div>

              <div className="my-3 p-3 bg-[#eff4ff] rounded-xl">
                <div className="flex items-baseline justify-between">
                  <span className="text-xs text-slate-600">Available Funds</span>
                  <span className="text-2xl font-bold text-[#0b2a4a]">€{sofia.balance.toFixed(2)}</span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-slate-500 text-xs">
                  <span className="material-symbols-outlined text-[14px] text-[#00a472]">schedule</span>
                  <span>€{sofia.scheduledAllowance.toFixed(2)} scheduled for Fri</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => onNavigate('payments')}
                  className="h-10 rounded-xl bg-[#fc6959] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all hover:opacity-90"
                >
                  <span className="material-symbols-outlined text-[16px]">send_money</span>
                  <span>Send Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('spending_limits')}
                  className="h-10 rounded-xl bg-slate-100 text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-1 hover:bg-slate-200 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">tune</span>
                  <span>Controls</span>
                </button>
              </div>
            </article>
          )}
        </div>
      </section>

      {/* Chores Review Urgent Banner */}
      <section className="px-4 mt-4">
        {!chorePaid ? (
          <div className="rounded-2xl bg-[#ffdad5] p-4 relative overflow-hidden shadow-xs border border-rose-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#fc6959] text-white flex items-center justify-center shrink-0 shadow-xs">
                <span className="material-symbols-outlined text-[22px]">assignment_turned_in</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="px-2 py-0.5 rounded-full bg-[#fc6959] text-white text-[10px] font-bold uppercase tracking-wider">
                    2 Pending Review
                  </span>
                </div>
                <p className="text-sm font-semibold text-[#410001] mt-1 truncate">
                  Luca completed <span className="font-bold">"Clean Bedroom"</span>
                </p>
                <p className="text-xs text-[#8c1712]">
                  Reward waiting: <span className="font-bold text-[#ae3026]">€3.00</span>
                </p>
              </div>
            </div>
            <div className="mt-3 pt-1 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => onNavigate('approvals')}
                className="px-3.5 py-2 rounded-xl bg-white text-slate-800 text-xs font-bold shadow-xs active:scale-95 transition-transform hover:bg-slate-50"
              >
                Inspect Proof
              </button>
              <button
                type="button"
                onClick={handlePayChore}
                className="px-4 py-2 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-transform hover:bg-[#00152d]"
              >
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span>Pay €3.00 Now</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-center">
            <span className="material-symbols-outlined text-[28px] text-emerald-600">check_circle</span>
            <p className="text-sm font-bold text-[#0b2a4a] mt-1">€3.00 Sent to Luca!</p>
            <p className="text-xs text-slate-600">Bedroom task approved and deposited into his youth card.</p>
          </div>
        )}
      </section>

      {/* Quick Family Actions Strip */}
      <section className="px-4 mt-6">
        <h2 className="text-base font-bold text-[#0b2a4a] mb-2">Parent Tools</h2>
        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() => onNavigate('payments')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-100 transition-colors group text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shadow-xs group-active:scale-95 transition-transform border border-slate-200/60">
              <span className="material-symbols-outlined text-[24px]">bolt</span>
            </div>
            <span className="text-[11px] font-medium text-slate-700">Quick Send</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('tasks')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-100 transition-colors group text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shadow-xs group-active:scale-95 transition-transform border border-slate-200/60">
              <span className="material-symbols-outlined text-[24px]">task_alt</span>
            </div>
            <span className="text-[11px] font-medium text-slate-700">Set Chores</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('goals')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-100 transition-colors group text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shadow-xs group-active:scale-95 transition-transform border border-slate-200/60">
              <span className="material-symbols-outlined text-[24px]">flag</span>
            </div>
            <span className="text-[11px] font-medium text-slate-700">Child Goals</span>
          </button>

          <button
            type="button"
            onClick={() => onNavigate('spending_limits')}
            className="flex flex-col items-center gap-1.5 p-2 rounded-2xl hover:bg-slate-100 transition-colors group text-center"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shadow-xs group-active:scale-95 transition-transform border border-slate-200/60">
              <span className="material-symbols-outlined text-[24px]">admin_panel_settings</span>
            </div>
            <span className="text-[11px] font-medium text-slate-700">Safety Lock</span>
          </button>
        </div>
      </section>

      {/* Recent Youth Activity Feed */}
      <section className="px-4 mt-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold text-[#0b2a4a]">Recent Family Activity</h2>
            <span className="w-2 h-2 rounded-full bg-[#fc6959]"></span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('family')}
            className="text-xs font-bold text-[#0b2a4a] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="rounded-2xl bg-white p-2 shadow-sm border border-slate-200/80 divide-y divide-slate-100">
          {transactions.slice(0, 3).map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-2.5 hover:bg-slate-50 transition-colors rounded-xl">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#eff4ff] flex items-center justify-center text-[#0b2a4a] shrink-0">
                  <span className="material-symbols-outlined text-[20px]">{tx.icon}</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-semibold text-[#0b2a4a] truncate">{tx.merchant}</span>
                    <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {tx.childName}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-400">
                    <span>{tx.timestamp}</span>
                    <span>•</span>
                    <span className="text-slate-500">{tx.category}</span>
                  </div>
                </div>
              </div>
              <div className="text-right shrink-0 pl-2">
                <span
                  className={`text-sm font-bold font-mono tracking-tight ${
                    tx.amount > 0 ? 'text-[#00a472]' : 'text-[#0b2a4a]'
                  }`}
                >
                  {tx.amount > 0 ? `+€${tx.amount.toFixed(2)}` : `-€${Math.abs(tx.amount).toFixed(2)}`}
                </span>
                <p className="text-[10px] text-slate-400">{tx.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Educational Nudge Card */}
      <section className="px-4 mt-6">
        <div className="p-4 rounded-2xl bg-[#e5eeff] flex items-center gap-3 border border-blue-200/60">
          <div className="w-12 h-12 rounded-xl bg-white text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[24px]">school</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#0b2a4a] truncate">
              Youth Financial Coaching
            </h3>
            <p className="text-xs text-slate-700 leading-snug mt-0.5 line-clamp-2">
              Sofia is 70% toward her 'Rollerblades' goal. Consider offering a 1:1 match reward!
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setMatchDone(true);
              onShowToast('Matching pledge created: Sofia will receive 1:1 match upon goal completion!', 'handshake');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-transform active:scale-95 ${
              matchDone ? 'bg-emerald-700 text-white' : 'bg-[#00152d] text-white hover:bg-[#0b2a4a]'
            }`}
          >
            {matchDone ? 'Matched! ✓' : 'Match'}
          </button>
        </div>
      </section>
    </div>
  );
};
