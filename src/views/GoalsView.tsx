import React, { useState } from 'react';
import { ScreenId, GoalItem, ChildAccount } from '../types';

interface GoalsViewProps {
  childrenAccounts: ChildAccount[];
  goals: GoalItem[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onUpdateGoal?: (goalId: string, updates: Partial<GoalItem>) => void;
  onAddGoal?: (newGoal: GoalItem) => void;
}

export const GoalsView: React.FC<GoalsViewProps> = ({
  childrenAccounts,
  goals,
  onNavigate,
  onShowToast,
  onUpdateGoal,
  onAddGoal,
}) => {
  const [selectedChildId, setSelectedChildId] = useState<'luca' | 'sofia'>('luca');
  const [showNewGoalModal, setShowNewGoalModal] = useState(false);
  const [topUpGoal, setTopUpGoal] = useState<GoalItem | null>(null);
  const [topUpAmount, setTopUpAmount] = useState('15.00');

  // Form state for new goal
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('50.00');
  const [newGoalCategory, setNewGoalCategory] = useState('Sports & Hobbies');

  const lucaGoals = goals.filter((g) => g.childId === 'luca' && !g.isArchived);
  const sofiaGoals = goals.filter((g) => g.childId === 'sofia' && !g.isArchived);
  const archivedLucaGoals = goals.filter((g) => g.childId === 'luca' && g.isArchived);

  const totalCurrent = lucaGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = lucaGoals.reduce((sum, g) => sum + g.targetAmount, 0);
  const percentFunded = totalTarget > 0 ? Math.round((totalCurrent / totalTarget) * 100) : 0;
  const totalMatchContributions = lucaGoals.reduce((sum, g) => sum + g.totalMatchedSoFar, 0);

  const handleToggleMatch = (goal: GoalItem) => {
    if (onUpdateGoal) {
      onUpdateGoal(goal.id, { parentMatchEnabled: !goal.parentMatchEnabled });
      onShowToast(
        !goal.parentMatchEnabled
          ? `Parent Match activated (50%) for ${goal.title}!`
          : `Parent Match paused for ${goal.title}`,
        'volunteer_activism'
      );
    }
  };

  const handleExecuteTopUp = () => {
    if (!topUpGoal) return;
    const amt = parseFloat(topUpAmount) || 0;
    if (amt <= 0) return;

    if (onUpdateGoal) {
      const matchInc = topUpGoal.parentMatchEnabled ? amt * 0.5 : 0;
      onUpdateGoal(topUpGoal.id, {
        currentAmount: Math.min(topUpGoal.targetAmount, topUpGoal.currentAmount + amt),
        totalMatchedSoFar: topUpGoal.totalMatchedSoFar + matchInc,
      });
    }

    onShowToast(`Transferred €${amt.toFixed(2)} into ${topUpGoal.title} SafeLock Vault!`, 'savings');
    setTopUpGoal(null);
  };

  const handleLaunchIdea = (title: string, target: number) => {
    if (onAddGoal) {
      const created: GoalItem = {
        id: `goal-${Date.now()}`,
        childId: 'sofia',
        title,
        category: 'Learning & Fun',
        icon: 'stars',
        currentAmount: 0,
        targetAmount: target,
        targetDate: '15 Aug 2024',
        status: 'on_track',
        statusLabel: 'On Track',
        weeklyNeeded: Math.round(target / 6),
        allowanceDeductionPercent: 20,
        allowanceDeductionAmount: 2.0,
        parentMatchEnabled: true,
        parentMatchPercent: 50,
        parentMatchMax: 30,
        totalMatchedSoFar: 0,
      };
      onAddGoal(created);
      onShowToast(`Created goal "${title}" for Sofia!`, 'rocket_launch');
    }
  };

  const handleCreateNewGoalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGoalTitle.trim()) return;

    const target = parseFloat(newGoalTarget) || 50;
    if (onAddGoal) {
      const created: GoalItem = {
        id: `goal-${Date.now()}`,
        childId: selectedChildId,
        title: newGoalTitle,
        category: newGoalCategory,
        icon: 'stars',
        currentAmount: 0,
        targetAmount: target,
        targetDate: '30 Sep 2024',
        status: 'on_track',
        statusLabel: 'On Track',
        weeklyNeeded: Math.round(target / 8),
        allowanceDeductionPercent: 20,
        allowanceDeductionAmount: 3.0,
        parentMatchEnabled: true,
        parentMatchPercent: 50,
        parentMatchMax: 40,
        totalMatchedSoFar: 0,
      };
      onAddGoal(created);
      onShowToast(`New SafeLock Goal "${newGoalTitle}" created!`, 'verified');
    }
    setShowNewGoalModal(false);
    setNewGoalTitle('');
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28">
      {/* Top Child Selector Toggle (Exact Image 1 & 2) */}
      <div className="pt-2">
        <div className="bg-[#eff4ff] p-1 rounded-2xl flex items-center shadow-2xs">
          <button
            type="button"
            onClick={() => setSelectedChildId('luca')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedChildId === 'luca'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#0091ff] text-white text-[10px] font-bold flex items-center justify-center">
              LB
            </div>
            <span>Luca</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                selectedChildId === 'luca' ? 'bg-blue-100 text-[#0b2a4a]' : 'bg-slate-200 text-slate-600'
              }`}
            >
              2
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSelectedChildId('sofia')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              selectedChildId === 'sofia'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <div className="w-5 h-5 rounded-full bg-[#ff7b1a] text-white text-[10px] font-bold flex items-center justify-center">
              SB
            </div>
            <span>Sofia</span>
            <span
              className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                selectedChildId === 'sofia' ? 'bg-orange-100 text-orange-800' : 'bg-slate-200 text-slate-600'
              }`}
            >
              0
            </span>
          </button>
        </div>
      </div>

      {/* ===================== VIEW 1: LUCA'S GOALS (EXACT IMAGE 1) ===================== */}
      {selectedChildId === 'luca' && (
        <>
          {/* Header Card: Luca Borg Header + New Goal button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full bg-[#0091ff] text-white text-sm font-bold flex items-center justify-center shadow-xs">
                LB
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-bold text-[#0b2a4a]">Luca Borg</h2>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    Age 12
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">Junior Smart Card •••• 4819</p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setShowNewGoalModal(true)}
              className="px-3 py-1.5 rounded-xl bg-blue-50 text-[#0b2a4a] text-xs font-bold flex items-center gap-1 hover:bg-blue-100 active:scale-95 transition-all border border-blue-200/60"
            >
              <span className="material-symbols-outlined text-[16px] text-rose-500">add</span>
              <span>New Goal</span>
            </button>
          </div>

          {/* Aggregate Total Vault Card (Exact Image 1) */}
          <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Total Towards Goals
              </span>
              <span className="text-xs font-bold text-[#00a472]">{percentFunded}% Funded</span>
            </div>

            <div className="flex items-baseline justify-between">
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-extrabold text-[#0b1c30] font-mono">
                  €{totalCurrent.toFixed(2)}
                </span>
                <span className="text-sm text-slate-400 font-mono">
                  / €{totalTarget.toFixed(2)}
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-blue-50 text-[#0b2a4a] text-[11px] font-bold">
                2 Active
              </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#0b2a4a] transition-all duration-500"
                style={{ width: `${percentFunded}%` }}
              ></div>
            </div>

            {/* Match Contributions footer */}
            <div className="pt-1 flex items-center justify-between text-xs text-slate-600 border-t border-slate-100">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-rose-500">volunteer_activism</span>
                <span>Maria's match contributions:</span>
              </div>
              <span className="font-bold text-[#0b2a4a] font-mono">+€{totalMatchContributions.toFixed(2)}</span>
            </div>
          </section>

          {/* Goal 1: New Mountain Bike (70% Funded) */}
          {lucaGoals[0] && (
            <article className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-3.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0b2a4a] flex items-center justify-center shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">directions_bike</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0b2a4a]">
                      {lucaGoals[0].title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00a472] border border-emerald-200/60">
                        On Track
                      </span>
                      <span className="text-[11px] text-slate-400">~€12.50/wk needed</span>
                    </div>
                  </div>
                </div>

                {/* Circular Percentage Dial */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      className="text-[#0b2a4a]"
                      strokeWidth="3.5"
                      strokeDasharray="100"
                      strokeDashoffset={100 - Math.round((lucaGoals[0].currentAmount / lucaGoals[0].targetAmount) * 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-extrabold text-[#0b2a4a]">70%</span>
                </div>
              </div>

              {/* Vault Stats */}
              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Vault
                  </span>
                  <span className="font-extrabold text-[#0b2a4a] font-mono text-sm">
                    €{lucaGoals[0].currentAmount.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono"> of €{lucaGoals[0].targetAmount.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Target Date
                  </span>
                  <span className="font-bold text-[#0b2a4a]">{lucaGoals[0].targetDate}</span>
                  <span className="text-[11px] text-rose-500 font-bold block">(6 wks)</span>
                </div>
              </div>

              {/* Weekly deduction note */}
              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span className="material-symbols-outlined text-[16px] text-blue-500">sync_alt</span>
                <span>20% from weekly allowance (€3.00/wk) + chore bonuses</span>
              </div>

              {/* Parent Match Card (Exact Image 1) */}
              <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/70 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[18px] text-rose-500">volunteer_activism</span>
                    <div>
                      <span className="text-xs font-bold text-[#0b2a4a] block">
                        Parent Match: {lucaGoals[0].parentMatchEnabled ? '50% Active' : 'Off'}
                      </span>
                      <p className="text-[10px] text-slate-500">You add €0.50 for every €1.00 Luca saves</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleToggleMatch(lucaGoals[0])}
                    className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                      lucaGoals[0].parentMatchEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                        lucaGoals[0].parentMatchEnabled ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between pt-1 border-t border-blue-200/50 text-[11px]">
                  <span className="bg-white/80 px-2 py-0.5 rounded-md font-semibold text-slate-700">
                    Total matched so far: €{lucaGoals[0].totalMatchedSoFar.toFixed(2)}
                  </span>
                  <span className="text-slate-600 font-medium flex items-center gap-1">
                    Matching 50% • Max €50
                    <span className="material-symbols-outlined text-[14px]">tune</span>
                  </span>
                </div>
              </div>

              {/* Actions: Top Up Goal, Edit, More */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setTopUpGoal(lucaGoals[0])}
                  className="flex-1 h-11 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Top Up Goal</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast(`Editing "${lucaGoals[0].title}" target and timeline`, 'edit')}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0b2a4a] flex items-center justify-center transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast("SafeLock Vault options: Freeze deposits, change ledger rules", "more_horiz")}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0b2a4a] flex items-center justify-center transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">more_horiz</span>
                </button>
              </div>
            </article>
          )}

          {/* Goal 2: PlayStation Game Bundle (Needs Attention) */}
          {lucaGoals[1] && (
            <article className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-3.5">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center shadow-2xs">
                    <span className="material-symbols-outlined text-[24px]">sports_esports</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#0b2a4a]">
                      {lucaGoals[1].title}
                    </h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
                        Needs Attention
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">Pacing behind schedule</p>
                  </div>
                </div>

                {/* Circular Percentage Dial */}
                <div className="relative w-12 h-12 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      className="text-slate-100"
                      strokeWidth="3.5"
                      stroke="currentColor"
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      className="text-rose-500"
                      strokeWidth="3.5"
                      strokeDasharray="100"
                      strokeDashoffset={100 - Math.round((lucaGoals[1].currentAmount / lucaGoals[1].targetAmount) * 100)}
                      strokeLinecap="round"
                      stroke="currentColor"
                    />
                  </svg>
                  <span className="absolute text-[11px] font-extrabold text-[#0b2a4a]">25%</span>
                </div>
              </div>

              {/* Vault Stats */}
              <div className="flex items-center justify-between text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Current Vault
                  </span>
                  <span className="font-extrabold text-[#0b2a4a] font-mono text-sm">
                    €{lucaGoals[1].currentAmount.toFixed(2)}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono"> of €{lucaGoals[1].targetAmount.toFixed(2)}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Target Date
                  </span>
                  <span className="font-bold text-[#0b2a4a]">{lucaGoals[1].targetDate}</span>
                </div>
              </div>

              {/* Match Savings: Off */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-slate-500">savings</span>
                  <div>
                    <span className="text-xs font-bold text-[#0b2a4a] block">Match Savings: Off</span>
                    <p className="text-[10px] text-slate-500">Incentivize Luca with 25% or 50% matching</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleMatch(lucaGoals[1])}
                  className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                    lucaGoals[1].parentMatchEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                      lucaGoals[1].parentMatchEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setTopUpGoal(lucaGoals[1])}
                  className="flex-1 h-11 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-[0.98] transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">add_circle</span>
                  <span>Top Up Goal</span>
                </button>
                <button
                  type="button"
                  onClick={() => onShowToast(`Editing "${lucaGoals[1].title}" target and timeline`, 'edit')}
                  className="w-11 h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#0b2a4a] flex items-center justify-center transition-all active:scale-95"
                >
                  <span className="material-symbols-outlined text-[18px]">edit</span>
                </button>
              </div>
            </article>
          )}

          {/* 1 Completed Goal Archived (Exact Image 1) */}
          <div className="p-3.5 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-[#00a472] flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">verified</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#0b2a4a]">1 Completed Goal</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                    Archived
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 truncate">
                  LEGO Technic Mars Rover • €50.00 Reached
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onShowToast("Goal archive: LEGO Technic Mars Rover released April 2024", "history")}
              className="text-xs font-bold text-[#0b2a4a] flex items-center gap-0.5 hover:underline"
            >
              <span>HISTORY</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>

          {/* Primary Create New Savings Goal Button */}
          <button
            type="button"
            onClick={() => setShowNewGoalModal(true)}
            className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create New Savings Goal</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </>
      )}

      {/* ===================== VIEW 2: SOFIA'S GOALS (EXACT IMAGE 2) ===================== */}
      {selectedChildId === 'sofia' && (
        <>
          {/* Sofia Borg Header */}
          <div className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-[#ff7b1a] text-white text-sm font-bold flex items-center justify-center shadow-xs">
                  SB
                </div>
                <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00a472] text-white flex items-center justify-center text-[9px]">
                  <span className="material-symbols-outlined text-[10px]">verified</span>
                </span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h2 className="text-base font-bold text-[#0b2a4a]">Sofia Borg</h2>
                  <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                    Age 9
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-mono">Junior Pocket •••• 590</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Available
              </span>
              <span className="text-base font-extrabold text-[#0b2a4a] font-mono">€48.30</span>
            </div>
          </div>

          {/* Empty State Banner (Exact Image 2) */}
          <section className="bg-white rounded-3xl p-6 shadow-2xs border border-slate-200/80 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center mx-auto text-[#0b2a4a]">
              <span className="material-symbols-outlined text-[32px] text-blue-600">flag_circle</span>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/60 inline-flex items-center gap-1">
                <span className="material-symbols-outlined text-[12px]">flag</span>
                <span>Ready for Milestones</span>
              </span>
              <h3 className="text-xl font-extrabold text-[#0b1c30]">No Savings Goals Yet</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Help Sofia build smart money habits. Set a target for something she loves, track progress, and boost her savings with parental matching.
              </p>
            </div>

            <div className="pt-1">
              <span className="text-xs font-bold text-[#ae3026] flex items-center justify-center gap-1.5">
                <span className="material-symbols-outlined text-[15px]">trending_up</span>
                <span>Kids save 3x faster with interactive targets</span>
              </span>
            </div>
          </section>

          {/* Why Set Up Goals? Financial Literacy (Exact Image 2) */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0b2a4a]">Why Set Up Goals?</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Financial Literacy
              </span>
            </div>

            <div className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 divide-y divide-slate-100 space-y-3">
              {/* Feature 1 */}
              <div className="flex items-start gap-3 pt-1">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">track_changes</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b2a4a]">Set Achievable Targets</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Sofia learns patience and delayed gratification with real-time visual progress bars and milestone badges.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-3 pt-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">volunteer_activism</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs font-bold text-[#0b2a4a]">Parent Match Incentive</h4>
                    <span className="text-[9px] font-bold bg-rose-100 text-rose-800 px-1.5 py-0.2 rounded-full">
                      Family Bonus
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Promise to match 25%, 50%, or 100% of what she stashes from chores, weekly allowances, or gifts.
                  </p>
                </div>
              </div>

              {/* Feature 3 */}
              <div className="flex items-start gap-3 pt-3">
                <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0b2a4a]">Protected SafeLock™</h4>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Savings are sequestered from everyday debit purchases until Sofia completes the goal or you unlock it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Goal Ideas for Sofia (Popular with 9-year-olds) (Exact Image 2) */}
          <section className="space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#0b2a4a]">Goal Ideas for Sofia</h3>
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
                Tap to Launch
              </span>
            </div>

            <div className="space-y-2">
              {/* Idea 1: New Roller Skates */}
              <button
                type="button"
                onClick={() => handleLaunchIdea('New Roller Skates', 45)}
                className="w-full p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#0b2a4a] text-left flex items-center justify-between transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">skateboarding</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0b2a4a] group-hover:text-blue-700">
                      New Roller Skates
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      <span>Recommended target</span>
                      <span>•</span>
                      <span className="text-slate-600 font-semibold">Age 9 Favorite</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#0b2a4a] font-mono">€45.00</span>
                  <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#0b2a4a]">
                    chevron_right
                  </span>
                </div>
              </button>

              {/* Idea 2: Science Camp Trip */}
              <button
                type="button"
                onClick={() => handleLaunchIdea('Science Camp Trip', 80)}
                className="w-full p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#0b2a4a] text-left flex items-center justify-between transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">science</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0b2a4a] group-hover:text-indigo-700">
                      Science Camp Trip
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      <span>Summer project</span>
                      <span>•</span>
                      <span className="text-rose-500 font-bold">Includes Parent Match</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#0b2a4a] font-mono">€80.00</span>
                  <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#0b2a4a]">
                    chevron_right
                  </span>
                </div>
              </button>

              {/* Idea 3: Books & Art Supplies */}
              <button
                type="button"
                onClick={() => handleLaunchIdea('Books & Art Supplies', 30)}
                className="w-full p-4 rounded-3xl bg-white border border-slate-200/80 shadow-2xs hover:border-[#0b2a4a] text-left flex items-center justify-between transition-all group active:scale-[0.99]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[22px]">palette</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0b2a4a] group-hover:text-amber-700">
                      Books &amp; Art Supplies
                    </h4>
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mt-0.5">
                      <span>Quick starter</span>
                      <span>•</span>
                      <span className="text-slate-600 font-semibold">~3 weeks to achieve</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#0b2a4a] font-mono">€30.00</span>
                  <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#0b2a4a]">
                    chevron_right
                  </span>
                </div>
              </button>
            </div>
          </section>

          {/* Primary CTA for Sofia */}
          <button
            type="button"
            onClick={() => setShowNewGoalModal(true)}
            className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Create Sofia's First Goal</span>
          </button>

          <button
            type="button"
            onClick={() => onShowToast("Parent guide: Teaching kids delayed gratification & matching perks", "menu_book")}
            className="text-xs font-bold text-[#0b2a4a] flex items-center justify-center gap-1 hover:underline pt-1"
          >
            <span>Learn more about teaching kids to save</span>
            <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
          </button>
        </>
      )}

      {/* Footer Safeguard Note */}
      <div className="text-center text-[10px] text-slate-400 flex items-center justify-center gap-1 pt-2">
        <span className="material-symbols-outlined text-[13px] text-[#00a472]">verified_user</span>
        <span>Heritage Family Safeguard • Deposit Protection Scheme Verified</span>
      </div>

      {/* Top Up Goal Modal */}
      {topUpGoal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-600">savings</span>
                <h3 className="text-sm font-bold text-[#0b2a4a]">Top Up SafeLock Vault</h3>
              </div>
              <button
                type="button"
                onClick={() => setTopUpGoal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="text-center space-y-1">
              <p className="text-xs text-slate-500">Deposit from Maria's Platinum Vault into</p>
              <h4 className="text-sm font-bold text-[#0b2a4a]">{topUpGoal.title}</h4>
              <div className="text-2xl font-mono font-extrabold text-[#0b2a4a] pt-2">
                €{parseFloat(topUpAmount || '0').toFixed(2)}
              </div>
            </div>

            <div className="grid grid-cols-4 gap-1.5">
              {['5.00', '10.00', '15.00', '25.00'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTopUpAmount(amt)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    topUpAmount === amt
                      ? 'bg-[#0b2a4a] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  €{amt}
                </button>
              ))}
            </div>

            {topUpGoal.parentMatchEnabled && (
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/60 text-xs text-blue-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px] text-rose-500">volunteer_activism</span>
                <span>Includes 50% Parent Match (+€{(parseFloat(topUpAmount || '0') * 0.5).toFixed(2)})!</span>
              </div>
            )}

            <button
              type="button"
              onClick={handleExecuteTopUp}
              className="w-full h-12 rounded-2xl bg-[#0b2a4a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95"
            >
              <span>Confirm &amp; Deposit</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      )}

      {/* Create New Goal Modal */}
      {showNewGoalModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-3xl p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-blue-600">add_task</span>
                <h3 className="text-sm font-bold text-[#0b2a4a]">
                  New Goal for {selectedChildId === 'luca' ? 'Luca' : 'Sofia'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowNewGoalModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewGoalSubmit} className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Science Telescope or Skate Helmet"
                  value={newGoalTitle}
                  onChange={(e) => setNewGoalTitle(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0b2a4a] focus:outline-none focus:border-[#0b2a4a]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Target Amount (€ EUR)
                </label>
                <input
                  type="number"
                  step="5"
                  required
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-mono font-bold text-[#0b2a4a] focus:outline-none focus:border-[#0b2a4a]"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Category
                </label>
                <select
                  value={newGoalCategory}
                  onChange={(e) => setNewGoalCategory(e.target.value)}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs text-[#0b2a4a] focus:outline-none bg-white"
                >
                  <option value="Sports & Hobbies">Sports &amp; Hobbies</option>
                  <option value="Gaming & Digital">Gaming &amp; Digital</option>
                  <option value="Learning & Fun">Learning &amp; Fun</option>
                  <option value="Travel & Outdoors">Travel &amp; Outdoors</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200/60 text-[11px] text-blue-900">
                Automatic 50% Parent Match enabled by default. Funds are locked safely in SafeLock™.
              </div>

              <button
                type="submit"
                className="w-full h-12 rounded-2xl bg-[#0b2a4a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md active:scale-95"
              >
                <span>Save SafeLock Goal</span>
                <span className="material-symbols-outlined text-[16px]">check</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
