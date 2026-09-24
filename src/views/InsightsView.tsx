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
  const [selectedChildId, setSelectedChildId] = useState<'luca' | 'sofia'>('luca');
  const [currentPeriod, setCurrentPeriod] = useState('May 2024');

  const categories = [
    {
      name: 'Books & Education',
      desc: 'School supplies, library',
      percent: 35,
      amount: 49.88,
      color: '#0b2a4a',
      badgeColor: 'bg-blue-900',
    },
    {
      name: 'Snacks & Cafes',
      desc: 'Afternoon cafeteria, treats',
      percent: 28,
      amount: 39.90,
      color: '#ff6b4a',
      badgeColor: 'bg-orange-500',
    },
    {
      name: 'Gaming & Digital',
      desc: 'Steam arcade, add-on',
      percent: 22,
      amount: 31.35,
      color: '#6366f1',
      badgeColor: 'bg-indigo-500',
    },
    {
      name: 'Transport & Other',
      desc: 'Metro refill, bike lock',
      percent: 15,
      amount: 21.37,
      color: '#00a472',
      badgeColor: 'bg-emerald-500',
    },
  ];

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28">
      {/* Child Selector Tabs (Exact Image 3) */}
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
              L
            </div>
            <span>Luca (12)</span>
            <span className="text-[10px] text-slate-400 font-mono">Card •••• 4819</span>
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
              S
            </div>
            <span>Sofia (9)</span>
            <span className="text-[10px] text-slate-400">Junior Card</span>
          </button>
        </div>
      </div>

      {/* Month Selector Bar (Exact Image 3) */}
      <div className="bg-white rounded-3xl p-3 shadow-2xs border border-slate-200/80 flex items-center justify-between">
        <button
          type="button"
          onClick={() => onShowToast('Showing April 2024 statements', 'calendar_month')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_left</span>
        </button>

        <div className="text-center">
          <div className="text-sm font-bold text-[#0b2a4a]">{currentPeriod}</div>
          <div className="text-[9px] font-bold uppercase tracking-wider text-[#00a472]">
            Current Period
          </div>
        </div>

        <button
          type="button"
          onClick={() => onShowToast('Current active period is May 2024', 'info')}
          className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100"
        >
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </button>
      </div>

      {/* Period Spent vs Cap Pill */}
      <div className="bg-[#eff4ff] py-1.5 px-4 rounded-full text-center text-xs font-bold text-[#0b2a4a] border border-blue-200/60 max-w-fit mx-auto">
        Spent: <span className="font-mono">€142.50</span> • Cap: <span className="font-mono">€180.00</span>
      </div>

      {/* Monthly Spend by Category (Donut Chart & Breakdown) (Exact Image 3) */}
      <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0b2a4a]">Monthly Spend by Category</h2>
            <p className="text-[11px] text-slate-400">Luca's active card expenditures</p>
          </div>
          <button
            type="button"
            onClick={() => onShowToast('Categorization automatically classified by PSD2 merchant MCC codes', 'info')}
            className="text-slate-400 hover:text-slate-600"
          >
            <span className="material-symbols-outlined text-[18px]">info</span>
          </button>
        </div>

        {/* Donut Chart representation */}
        <div className="relative w-44 h-44 mx-auto flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            {/* Background track */}
            <circle cx="18" cy="18" r="14" fill="none" stroke="#f1f5f9" strokeWidth="4" />
            {/* Books: 35% */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#0b2a4a"
              strokeWidth="4"
              strokeDasharray="30.7 57.3"
              strokeDashoffset="0"
            />
            {/* Snacks: 28% */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#ff6b4a"
              strokeWidth="4"
              strokeDasharray="24.6 63.4"
              strokeDashoffset="-30.7"
            />
            {/* Gaming: 22% */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#6366f1"
              strokeWidth="4"
              strokeDasharray="19.3 68.7"
              strokeDashoffset="-55.3"
            />
            {/* Transport: 15% */}
            <circle
              cx="18"
              cy="18"
              r="14"
              fill="none"
              stroke="#00a472"
              strokeWidth="4"
              strokeDasharray="13.2 74.8"
              strokeDashoffset="-74.6"
            />
          </svg>

          {/* Center text */}
          <div className="absolute text-center space-y-0.5">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
              May Total
            </span>
            <div className="text-xl font-extrabold text-[#0b1c30] font-mono leading-none">
              €142.50
            </div>
            <span className="inline-block text-[9px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#00a472]">
              79% of cap
            </span>
          </div>
        </div>

        {/* Legend / Categories List */}
        <div className="space-y-3 pt-2">
          {categories.map((c) => (
            <div key={c.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2.5">
                <span className={`w-3 h-3 rounded-full ${c.badgeColor} shrink-0`}></span>
                <div>
                  <h4 className="font-bold text-[#0b2a4a]">{c.name}</h4>
                  <p className="text-[10px] text-slate-400">{c.desc}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded-md">
                  {c.percent}%
                </span>
                <span className="font-extrabold text-[#0b2a4a] font-mono">€{c.amount.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Spend vs. Monthly Cap (Exact Image 3) */}
      <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0b2a4a]">Spend vs. Monthly Cap</h3>
            <p className="text-[11px] text-slate-400">€180.00 baseline safety threshold</p>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
            Within Safe Headroom
          </span>
        </div>

        <div className="flex items-baseline justify-between pt-1">
          <div>
            <span className="text-2xl font-extrabold text-[#0b1c30] font-mono">€142.50</span>
            <span className="text-xs text-slate-500 ml-1">used</span>
          </div>
          <div className="text-right">
            <span className="text-sm font-extrabold text-[#0b2a4a]">79%</span>
            <span className="text-[10px] text-slate-400 block font-mono">80% CAP</span>
          </div>
        </div>

        {/* Dual Progress Bar with Cap Marker */}
        <div className="relative w-full h-3 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-900 via-rose-500 to-rose-600 rounded-full"
            style={{ width: '79%' }}
          ></div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
          <span>€0.00</span>
          <span className="font-bold text-[#0b2a4a]">€37.50 remaining</span>
          <span>€180.00 limit</span>
        </div>

        {/* Healthy spending pace callout */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-start gap-2.5">
          <span className="material-symbols-outlined text-[18px] text-[#00a472] shrink-0 mt-0.5">
            check_circle
          </span>
          <div className="text-xs text-slate-700 leading-snug">
            <span className="font-bold text-[#0b2a4a] block">Healthy spending pace</span>
            <p className="text-[11px] text-slate-600 mt-0.5">
              Luca is averaging €4.59/day. At this rate, he will end the month <strong>€14.20 below his cap</strong> with 8 days left.
            </p>
          </div>
        </div>
      </section>

      {/* Savings & Vault Accumulation (Exact Image 3) */}
      <section className="bg-white rounded-3xl p-5 shadow-2xs border border-slate-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#0b2a4a]">Savings &amp; Vault Accumulation</h3>
            <p className="text-[11px] text-slate-400">Personal Vault: "Mountain Bike Fund"</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#00a472] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
          </div>
        </div>

        {/* Velocity Pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00a472] text-[10px] font-bold uppercase tracking-wider border border-emerald-200/60">
          <span className="material-symbols-outlined text-[13px]">bolt</span>
          <span>+30% Savings velocity vs. last month</span>
        </div>

        {/* Bar chart: Feb, Mar, Apr, May */}
        <div className="pt-2 flex items-end justify-between px-4 h-36 border-b border-slate-100 pb-2">
          {/* Feb */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 font-mono">€40</span>
            <div className="w-12 h-10 rounded-xl bg-blue-100"></div>
            <span className="text-xs text-slate-500 font-medium">Feb</span>
          </div>

          {/* Mar */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 font-mono">€95</span>
            <div className="w-12 h-18 rounded-xl bg-blue-200"></div>
            <span className="text-xs text-slate-500 font-medium">Mar</span>
          </div>

          {/* Apr */}
          <div className="flex flex-col items-center gap-1.5">
            <span className="text-[10px] font-bold text-slate-400 font-mono">€150</span>
            <div className="w-12 h-24 rounded-xl bg-blue-300"></div>
            <span className="text-xs text-slate-500 font-medium">Apr</span>
          </div>

          {/* May (Current) */}
          <div className="flex flex-col items-center gap-1.5 relative">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              <span className="text-[10px] font-extrabold text-[#0b2a4a] font-mono">€195</span>
            </div>
            <div className="w-12 h-28 rounded-xl bg-[#0b2a4a] shadow-xs"></div>
            <span className="text-xs text-[#0b2a4a] font-bold">May</span>
          </div>
        </div>

        {/* Parental Co-Contribution Card */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[18px]">volunteer_activism</span>
            </div>
            <div>
              <h4 className="font-bold text-[#0b2a4a]">Parental Co-Contribution</h4>
              <p className="text-[10px] text-slate-500">Active 1:1 match for milestone target</p>
            </div>
          </div>
          <span className="text-sm font-extrabold text-[#0b2a4a] font-mono">+€35.00</span>
        </div>
      </section>

      {/* Smart Money Habits: Luca (Exact Image 3) */}
      <section className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-blue-50 text-[#0b2a4a] flex items-center justify-center">
            <span className="material-symbols-outlined text-[18px]">psychology</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#0b2a4a]">Smart Money Habits: Luca</h3>
            <p className="text-[10px] text-slate-400">Pedagogical behavioural coaching</p>
          </div>
        </div>

        <div className="space-y-2.5">
          {/* Habit 1: Smart Impulse Control */}
          <div className="p-4 rounded-3xl bg-blue-50/60 border border-blue-200/60 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-[#00a472]">timelapse</span>
                <h4 className="text-xs font-bold text-[#0b2a4a]">Smart Impulse Control</h4>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-[#00a472]">
                Great
              </span>
            </div>
            <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
              Luca waited <strong>5 days</strong> before purchasing his gaming pack, avoiding an impulsive tap and deliberating carefully.
            </p>
          </div>

          {/* Habit 2: Consistent Goal Builder */}
          <div className="p-4 rounded-3xl bg-blue-50/60 border border-blue-200/60 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-blue-600">savings</span>
                <h4 className="text-xs font-bold text-[#0b2a4a]">Consistent Goal Builder</h4>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Steady
              </span>
            </div>
            <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
              He systematically allocates <strong>20% of every chore payout</strong> directly into his Mountain Bike Vault.
            </p>
          </div>

          {/* Habit 3: Opportunity for Growth */}
          <div className="p-4 rounded-3xl bg-blue-50/60 border border-blue-200/60 space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-rose-500">lightbulb</span>
                <h4 className="text-xs font-bold text-[#0b2a4a]">Opportunity for Growth</h4>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                Tip
              </span>
            </div>
            <p className="text-[11px] text-slate-600 pl-6 leading-relaxed">
              <strong>28% of his spending</strong> concentrates in Thursday afternoon cafeteria treats. Discussing batch snack prep could preserve €15/mo.
            </p>
          </div>
        </div>
      </section>

      {/* Primary Link Button: Configure Luca's Alert Rules (Exact Image 3) */}
      <button
        type="button"
        onClick={() => onNavigate('alert_settings')}
        className="w-full h-13 rounded-2xl bg-[#eff4ff] hover:bg-[#dce9ff] text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-2 border border-blue-200/80 transition-all active:scale-[0.98] shadow-2xs"
      >
        <span className="material-symbols-outlined text-[18px]">tune</span>
        <span>Configure Luca's Alert Rules</span>
        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
      </button>
    </div>
  );
};
