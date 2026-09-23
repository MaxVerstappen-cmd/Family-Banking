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
  const [selectedChild, setSelectedChild] = useState<'luca' | 'sofia'>('luca');
  const [showPin, setShowPin] = useState(false);
  const [showTopUpSheet, setShowTopUpSheet] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('20.00');

  const isLuca = selectedChild === 'luca';
  const currentChildName = isLuca ? 'Luca' : 'Sofia';
  const currentAge = isLuca ? 12 : 9;
  const currentBalance = isLuca ? child.balance : 85.00;
  const currentLast4 = isLuca ? child.cardLast4 : '7104';

  const handleToggleFreeze = () => {
    const nextState = !child.isCardActive;
    onUpdateChild(child.id, { isCardActive: nextState });
    onShowToast(
      nextState ? `${currentChildName}'s card is active` : `${currentChildName}'s card is frozen`,
      nextState ? 'credit_card' : 'lock'
    );
  };

  const handleToggleOnline = () => {
    const nextState = !child.onlinePaymentsEnabled;
    onUpdateChild(child.id, { onlinePaymentsEnabled: nextState });
    onShowToast(
      nextState ? 'Online payments enabled (max €30)' : 'Online payments blocked',
      nextState ? 'toggle_on' : 'toggle_off'
    );
  };

  const handleToggleContactless = () => {
    const nextState = !child.contactlessEnabled;
    onUpdateChild(child.id, { contactlessEnabled: nextState });
    onShowToast(
      nextState ? 'Contactless in-store enabled' : 'Contactless in-store disabled',
      nextState ? 'toggle_on' : 'toggle_off'
    );
  };

  const handleToggleAtm = () => {
    const nextState = !child.atmEnabled;
    onUpdateChild(child.id, { atmEnabled: nextState });
    onShowToast(
      nextState ? 'ATM cash withdrawals enabled' : 'ATM withdrawals locked',
      nextState ? 'toggle_on' : 'toggle_off'
    );
  };

  const handleInstantTopUp = () => {
    const amt = parseFloat(topUpAmount) || 20;
    onUpdateChild(child.id, { balance: child.balance + amt });
    setShowTopUpSheet(false);
    onShowToast(`Instant Top Up of €${amt.toFixed(2)} sent to ${currentChildName}!`, 'add_circle');
  };

  return (
    <div className="flex flex-col w-full px-4 gap-5 pb-12">
      {/* Child Selector Segmented Switcher */}
      <section aria-label="Family Profile Selection" className="pt-2">
        <div className="bg-[#eff4ff] p-1.5 rounded-full flex items-center gap-1 shadow-2xs border border-blue-100/60">
          {/* Luca Tab */}
          <button
            type="button"
            onClick={() => setSelectedChild('luca')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full transition-all active:scale-[0.98] ${
              isLuca
                ? 'bg-white text-[#0b1c30] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-[#0b1c30]'
            }`}
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#0b2a4a] via-sky-600 to-sky-300 flex items-center justify-center text-white text-xs font-bold shadow-inner">
              <span>LB</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#6ffbbe] border border-white"></span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">Luca</span>
              <span className="text-[10px] text-slate-500">12 yrs • Active</span>
            </div>
          </button>

          {/* Sofia Tab */}
          <button
            type="button"
            onClick={() => setSelectedChild('sofia')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-full transition-all active:scale-[0.98] ${
              !isLuca
                ? 'bg-white text-[#0b1c30] shadow-xs font-semibold'
                : 'text-slate-600 hover:text-[#0b1c30]'
            }`}
          >
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#ae3026] to-[#fc6959] flex items-center justify-center text-white text-xs font-bold">
              <span>SB</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold leading-tight">Sofia</span>
              <span className="text-[10px] text-slate-500">9 yrs</span>
            </div>
          </button>
        </div>
      </section>

      {/* Digital Debit Card Preview */}
      <section aria-label="Youth Debit Card" className="relative group">
        <div className="w-full bg-gradient-to-br from-[#0b2a4a] via-[#00152d] to-[#213145] rounded-2xl p-5 text-white shadow-xl overflow-hidden relative transition-all duration-300 hover:shadow-2xl border border-white/10">
          {/* Ambient Decorative Waves */}
          <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-blue-300/10 blur-2xl pointer-events-none"></div>
          <div className="absolute -left-10 -bottom-10 w-44 h-44 rounded-full bg-[#fc6959]/15 blur-xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col justify-between h-48">
            {/* Top Row: Bank Badge & Contactless */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest uppercase bg-white/15 px-2.5 py-1 rounded-full text-[#d3e4ff] backdrop-blur-xs">
                  Heritage Youth
                </span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    child.isCardActive
                      ? 'bg-[#6ffbbe] text-[#002113]'
                      : 'bg-[#fc6959] text-white'
                  }`}
                >
                  {child.isCardActive ? 'ACTIVE' : 'FROZEN'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#d3e4ff]">
                <span className="material-symbols-outlined text-[20px] rotate-90">contactless</span>
                <span className="material-symbols-outlined text-[22px]">wifi</span>
              </div>
            </div>

            {/* Middle Row: EMV Chip & Balance Glance */}
            <div className="flex items-center justify-between mt-2">
              {/* Realistic Holographic Chip */}
              <div className="w-11 h-8 rounded-lg bg-gradient-to-tr from-[#cbdbf5] via-[#d3e4fe] to-[#eff4ff] p-1 shadow-sm flex flex-col justify-between overflow-hidden border border-amber-300/60">
                <div className="h-0.5 w-full bg-slate-400/60 rounded"></div>
                <div className="h-2.5 w-full flex justify-between gap-1">
                  <div className="w-2.5 h-full bg-slate-400/40 rounded-sm"></div>
                  <div className="w-2.5 h-full bg-slate-400/40 rounded-sm"></div>
                </div>
                <div className="h-0.5 w-full bg-slate-400/60 rounded"></div>
              </div>

              <div className="flex flex-col items-end">
                <span className="text-[11px] font-medium text-slate-300">Available Balance</span>
                <span className="text-3xl font-bold tracking-tight text-white font-mono">
                  €{currentBalance.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Bottom Row: Card Details & Expiry */}
            <div className="flex items-end justify-between pt-2">
              <div className="flex flex-col">
                <span className="text-sm tracking-wider font-semibold text-white">
                  {currentChildName} Borg
                </span>
                <div className="flex items-center gap-2 text-slate-300">
                  <span className="text-xs font-mono tracking-widest">•••• {currentLast4}</span>
                  <span className="text-[11px] text-slate-400">EXP 08/28</span>
                </div>
              </div>
              {/* Mastercard circles */}
              <div className="flex items-center -space-x-2.5 opacity-90">
                <div className="w-7 h-7 rounded-full bg-[#fc6959] mix-blend-screen opacity-90"></div>
                <div className="w-7 h-7 rounded-full bg-[#6ffbbe] mix-blend-screen opacity-80"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action Pill beneath card */}
        <div className="mt-2 flex items-center justify-between px-1 text-xs text-slate-600">
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#00a472]">verified_user</span>
            Protected by Heritage SafeGuard
          </span>
          <button
            type="button"
            onClick={() => {
              setShowPin(!showPin);
              onShowToast(showPin ? 'PIN hidden' : 'PIN: 4821 • CVV: 419', 'visibility');
            }}
            className="text-xs font-bold text-[#0b2a4a] hover:underline flex items-center gap-0.5"
          >
            {showPin ? 'Hide PIN & CVV' : 'Show PIN & CVV'}
            <span className="material-symbols-outlined text-[16px]">
              {showPin ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>
      </section>

      {/* Parental Card Controls & Safety Switches */}
      <section aria-label="Card Controls and Safety toggles" className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0b2a4a]">Card Controls &amp; Safety</h2>
          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#dce9ff] px-2 py-0.5 rounded-full text-[#0b2a4a]">
            Instant Sync
          </span>
        </div>

        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-4">
          {/* Toggle 1: Card Active / Freeze */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                  child.isCardActive ? 'bg-[#6ffbbe]/25 text-[#00a472]' : 'bg-rose-100 text-rose-700'
                }`}
              >
                <span className="material-symbols-outlined text-[22px]">
                  {child.isCardActive ? 'credit_card' : 'lock'}
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#0b2a4a]">Card Status</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      child.isCardActive
                        ? 'bg-[#6ffbbe] text-[#002113]'
                        : 'bg-rose-100 text-rose-700'
                    }`}
                  >
                    {child.isCardActive ? 'Active' : 'Frozen'}
                  </span>
                </div>
                <span className="text-xs text-slate-500 truncate">Instant freeze blocks all purchases</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleFreeze}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors relative flex items-center ${
                child.isCardActive ? 'bg-[#6ffbbe]' : 'bg-[#fc6959]'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform flex items-center justify-center ${
                  child.isCardActive ? 'translate-x-5' : 'translate-x-0'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    child.isCardActive ? 'text-[#00a472]' : 'text-[#ae3026]'
                  }`}
                >
                  {child.isCardActive ? 'lock_open' : 'lock'}
                </span>
              </div>
            </button>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Toggle 2: Online Payments */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-[#0b2a4a]">Online Payments</span>
                  <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                    Max €30/tx
                  </span>
                </div>
                <span className="text-xs text-slate-500 truncate">Websites &amp; App Store checkout</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleOnline}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors relative flex items-center ${
                child.onlinePaymentsEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
                  child.onlinePaymentsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Toggle 3: Contactless */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#dce9ff] text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">contactless</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold text-[#0b2a4a]">Contactless In-Store</span>
                <span className="text-xs text-slate-500 truncate">Tap-to-pay at POS terminals</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleContactless}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors relative flex items-center ${
                child.contactlessEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
                  child.contactlessEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100 w-full"></div>

          {/* Toggle 4: ATM Withdrawals */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">local_atm</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold text-[#0b2a4a]">ATM Cash Withdrawals</span>
                  <span className="material-symbols-outlined text-[15px] text-slate-400">help_outline</span>
                </div>
                <span className="text-xs text-[#ae3026] truncate">Parent approval required</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleToggleAtm}
              className={`w-12 h-7 rounded-full p-0.5 transition-colors relative flex items-center ${
                child.atmEnabled ? 'bg-[#0b2a4a]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full bg-white shadow-xs transform transition-transform ${
                  child.atmEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>
        </div>
      </section>

      {/* Spending Limits & Budget Progress Card */}
      <section aria-label="Budget and Spending Limits" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#fc6959] text-[22px]">donut_large</span>
            <h2 className="text-base font-bold text-[#0b2a4a]">Weekly Spending Limit</h2>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('spending_limits')}
            className="text-xs font-bold text-[#0b2a4a] hover:underline"
          >
            Edit Limit
          </button>
        </div>

        {/* Main Spent vs Total Gauge */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-[#0b2a4a]">€35.00</span>
              <span className="text-xs text-slate-500">of €50.00 spent</span>
            </div>
            <span className="text-xs font-bold text-[#fc6959]">70%</span>
          </div>

          {/* Progress Track Bar */}
          <div className="w-full h-3 rounded-full bg-slate-100 overflow-hidden relative">
            <div
              className="h-full bg-[#fc6959] rounded-full transition-all duration-500"
              style={{ width: '70%' }}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>€15.00 remaining this week</span>
            <span>Resets Monday</span>
          </div>
        </div>

        {/* Monthly Category Breakdown */}
        <div className="pt-2 flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Category Breakdown (October)
          </span>
          <div className="grid grid-cols-3 gap-2">
            {/* Category 1: Treats */}
            <div className="bg-[#eff4ff] p-2.5 rounded-xl flex flex-col gap-1 border border-blue-50">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[18px] text-[#ae3026]">icecream</span>
                <span className="text-[10px] text-slate-500">51%</span>
              </div>
              <span className="text-xs font-bold text-[#0b2a4a]">€18.00</span>
              <span className="text-[11px] text-slate-500 truncate">Snacks &amp; Treats</span>
            </div>

            {/* Category 2: School */}
            <div className="bg-[#eff4ff] p-2.5 rounded-xl flex flex-col gap-1 border border-blue-50">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[18px] text-[#0b2a4a]">menu_book</span>
                <span className="text-[10px] text-slate-500">35%</span>
              </div>
              <span className="text-xs font-bold text-[#0b2a4a]">€12.40</span>
              <span className="text-[11px] text-slate-500 truncate">Books &amp; School</span>
            </div>

            {/* Category 3: Gaming */}
            <div className="bg-[#eff4ff] p-2.5 rounded-xl flex flex-col gap-1 border border-blue-50">
              <div className="flex items-center justify-between">
                <span className="material-symbols-outlined text-[18px] text-[#00a472]">sports_esports</span>
                <span className="text-[10px] text-slate-500">14%</span>
              </div>
              <span className="text-xs font-bold text-[#0b2a4a]">€4.60</span>
              <span className="text-[11px] text-slate-500 truncate">Gaming</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pocket Money & Allowance Settings Card */}
      <section aria-label="Allowance and Pocket Money Settings" className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-[#6ffbbe]/30 text-[#00a472] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">savings</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Automated Pocket Money
              </span>
              <span className="text-base font-bold text-[#0b2a4a]">€15.00 every Friday</span>
            </div>
          </div>
        </div>

        {/* Next Payout Pill Notice */}
        <div className="bg-[#eff4ff] rounded-xl p-2.5 flex items-center justify-between border border-blue-50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#00a472]">calendar_today</span>
            <span className="text-xs text-slate-700">
              Next payout: <span className="font-bold text-[#0b2a4a]">In 2 days</span> (Fri, Oct 25)
            </span>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#dce9ff] text-[#0b2a4a]">
            Auto
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('spending_limits')}
          className="w-full h-11 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[18px]">tune</span>
          Adjust Allowance &amp; Rules
        </button>
      </section>

      {/* Luca's Recent Activity */}
      <section aria-label="Recent Activity" className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0b2a4a]">Luca's Recent Activity</h2>
          <button
            type="button"
            onClick={() => onNavigate('family')}
            className="text-xs font-bold text-[#0b2a4a] hover:underline"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 divide-y divide-slate-100 overflow-hidden">
          <div className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-[#ae3026] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">icecream</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b2a4a] truncate">Gelateria Del Corso</span>
                <span className="text-[11px] text-slate-400">Today, 15:42 • Contactless</span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-bold text-[#0b2a4a]">-€4.50</span>
              <span className="text-[10px] text-slate-400">Approved</span>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">menu_book</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b2a4a] truncate">Mondadori Junior Bookstore</span>
                <span className="text-[11px] text-slate-400">Yesterday, 17:15 • Chip &amp; PIN</span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-bold text-[#0b2a4a]">-€12.40</span>
              <span className="text-[10px] text-slate-400">Approved</span>
            </div>
          </div>

          <div className="p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-[#6ffbbe]/30 text-[#00a472] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">payments</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-bold text-[#0b2a4a] truncate">Weekly Allowance Deposit</span>
                <span className="text-[11px] text-slate-400">Fri 18 Oct • Automatic Transfer</span>
              </div>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <span className="text-xs font-bold text-[#00a472]">+€15.00</span>
              <span className="text-[10px] font-bold text-[#00a472]">Completed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Primary Action: Top Up */}
      <div className="pt-1">
        <button
          type="button"
          onClick={() => setShowTopUpSheet(true)}
          className="w-full h-14 rounded-2xl bg-[#fc6959] hover:opacity-95 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.99]"
        >
          <span className="material-symbols-outlined text-[22px]">add_circle</span>
          Top Up {currentChildName}'s Account
        </button>
        <p className="text-center text-xs text-slate-400 mt-2">
          Instant transfer from Maria's Primary Family Vault
        </p>
      </div>

      {/* Instant Top Up Bottom Sheet Modal */}
      {showTopUpSheet && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fc6959]">add_circle</span>
                <h3 className="text-base font-bold text-[#0b2a4a]">Instant Top Up for {currentChildName}</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowTopUpSheet(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="flex flex-col items-center py-2">
              <span className="text-xs text-slate-500 mb-1">Enter Top-Up Amount</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold text-[#0b2a4a]">€</span>
                <input
                  type="number"
                  value={topUpAmount}
                  onChange={(e) => setTopUpAmount(e.target.value)}
                  className="text-3xl font-bold text-[#0b2a4a] text-center w-28 border-b-2 border-[#0b2a4a] focus:outline-none"
                  step="5"
                />
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {['10.00', '20.00', '30.00', '50.00'].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setTopUpAmount(preset)}
                  className={`py-1.5 rounded-lg text-xs font-bold transition-all ${
                    topUpAmount === preset
                      ? 'bg-[#0b2a4a] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  €{preset.split('.')[0]}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleInstantTopUp}
              className="w-full py-3.5 rounded-xl bg-[#fc6959] text-white font-bold text-sm shadow-md active:scale-95 transition-all"
            >
              Transfer €{parseFloat(topUpAmount || '0').toFixed(2)} to {currentChildName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
