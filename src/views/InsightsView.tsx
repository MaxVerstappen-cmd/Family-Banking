import React, { useState } from 'react';
import { ScreenId, ChildAccount } from '../types';

interface InsightsViewProps {
  childrenAccounts: ChildAccount[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  childrenAccounts,
  onNavigate,
  onShowToast,
}) => {
  const [lucaGoalProgress, setLucaGoalProgress] = useState(180);
  const [sofiaGoalProgress, setSofiaGoalProgress] = useState(56);
  const [showAddGoalModal, setShowAddGoalModal] = useState(false);

  const handleMatchSofia = () => {
    setSofiaGoalProgress((prev) => Math.min(80, prev + 10));
    onShowToast('Matched! €10.00 added to Sofia’s Rollerblades goal!', 'military_tech');
  };

  const handleMatchLuca = () => {
    setLucaGoalProgress((prev) => Math.min(350, prev + 20));
    onShowToast('Matched! €20.00 added to Luca’s Gaming Console goal!', 'military_tech');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-24">
      {/* Title */}
      <div className="pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Financial Growth &amp; Analytics
        </span>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Family Insights &amp; Goals</h1>
        <p className="text-xs text-slate-500">
          Track savings habits, match milestones, and cultivate financial independence.
        </p>
      </div>

      {/* Goal Spotlight Cards */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0b2a4a]">Savings Targets &amp; Bounties</h2>
          <button
            type="button"
            onClick={() => setShowAddGoalModal(true)}
            className="text-xs font-bold text-[#fc6959] hover:opacity-85 flex items-center gap-0.5"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>New Goal</span>
          </button>
        </div>

        {/* Sofia's Rollerblades */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-400 to-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0">
                SB
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Sofia • Age 9
                </span>
                <h3 className="text-sm font-bold text-[#0b2a4a]">Rollerblades &amp; Helmet</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#0b2a4a]">€{sofiaGoalProgress} / €80</span>
              <span className="text-[10px] text-emerald-600 font-bold block">
                {Math.round((sofiaGoalProgress / 80) * 100)}% Reached
              </span>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-400 to-rose-500 rounded-full transition-all duration-500"
              style={{ width: `${(sofiaGoalProgress / 80) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">€{80 - sofiaGoalProgress} to go</span>
            <button
              type="button"
              onClick={handleMatchSofia}
              className="px-3 py-1.5 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold hover:bg-[#00152d] transition-all flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
              <span>Pledge +€10 Match</span>
            </button>
          </div>
        </div>

        {/* Luca's Gaming Console */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                LB
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Luca • Age 12
                </span>
                <h3 className="text-sm font-bold text-[#0b2a4a]">Next-Gen Gaming Console</h3>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-[#0b2a4a]">€{lucaGoalProgress} / €350</span>
              <span className="text-[10px] text-sky-600 font-bold block">
                {Math.round((lucaGoalProgress / 350) * 100)}% Reached
              </span>
            </div>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
              style={{ width: `${(lucaGoalProgress / 350) * 100}%` }}
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-500">€{350 - lucaGoalProgress} to go</span>
            <button
              type="button"
              onClick={handleMatchLuca}
              className="px-3 py-1.5 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold hover:bg-[#00152d] transition-all flex items-center gap-1 active:scale-95"
            >
              <span className="material-symbols-outlined text-[14px]">volunteer_activism</span>
              <span>Pledge +€20 Match</span>
            </button>
          </div>
        </div>
      </div>

      {/* Category Spending Breakdown */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0b2a4a]">October Spending Breakdown</h2>
          <span className="text-xs font-bold text-slate-600 font-mono">Total €81.50</span>
        </div>

        {/* Stacked bar chart */}
        <div className="w-full h-4 rounded-full overflow-hidden flex">
          <div style={{ width: '42%' }} className="bg-[#fc6959]" title="Snacks & Treats 42%"></div>
          <div style={{ width: '30%' }} className="bg-[#0b2a4a]" title="Books & School 30%"></div>
          <div style={{ width: '18%' }} className="bg-[#4edea3]" title="Gaming 18%"></div>
          <div style={{ width: '10%' }} className="bg-slate-300" title="Other 10%"></div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#fc6959]"></span>
            <span className="text-slate-600">Snacks &amp; Treats: €34.00 (42%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#0b2a4a]"></span>
            <span className="text-slate-600">Books &amp; School: €24.80 (30%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4edea3]"></span>
            <span className="text-slate-600">Gaming &amp; Apps: €14.60 (18%)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-300"></span>
            <span className="text-slate-600">Other / Transit: €8.10 (10%)</span>
          </div>
        </div>
      </div>

      {/* Financial Coaching Tips */}
      <div className="p-4 bg-[#eff4ff] rounded-2xl border border-blue-200/60 flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-white text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-xs">
          <span className="material-symbols-outlined text-[22px]">psychology</span>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#0b2a4a]">
            Coaching Recommendation
          </h4>
          <p className="text-xs text-slate-700 leading-relaxed mt-0.5">
            Luca spent 35% on education and reading this month. Commend his choices to reinforce positive
            learning investments!
          </p>
        </div>
      </div>

      {/* Add Goal Modal */}
      {showAddGoalModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-5 max-w-sm w-full space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0b2a4a]">New Savings Goal</h3>
              <button
                type="button"
                onClick={() => setShowAddGoalModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Name</label>
                <input
                  type="text"
                  placeholder="e.g. Science Camp Equipment"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0b2a4a] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Target Amount (€)</label>
                <input
                  type="number"
                  placeholder="100.00"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0b2a4a] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowAddGoalModal(false);
                onShowToast('New savings goal created and synced with child app!', 'verified');
              }}
              className="w-full py-2.5 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold shadow-md"
            >
              Save Goal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
