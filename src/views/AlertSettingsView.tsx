import React, { useState } from 'react';
import { ScreenId } from '../types';

interface AlertSettingsViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const AlertSettingsView: React.FC<AlertSettingsViewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [triggers, setTriggers] = useState({
    everyTransaction: true,
    overspendLimit: true,
    declinedTransaction: true,
    taskCompleted: true,
    moneyRequest: true,
    goalAchieved: true,
  });

  const [pushSound, setPushSound] = useState(true);
  const [emergencyBypass, setEmergencyBypass] = useState(true);

  const toggleTrigger = (key: keyof typeof triggers) => {
    setTriggers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const enabledCount = Object.values(triggers).filter(Boolean).length;

  const handleSave = () => {
    onShowToast('Guardrail alert preferences saved securely!', 'verified_user');
    onNavigate('alerts');
  };

  const handleReset = () => {
    setTriggers({
      everyTransaction: true,
      overspendLimit: true,
      declinedTransaction: true,
      taskCompleted: true,
      moneyRequest: true,
      goalAchieved: true,
    });
    onShowToast('Alert guardrails reset to European banking defaults', 'restore');
  };

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28">
      {/* Title & Header Section (Exact Image 5) */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Alert Settings</h1>
          <p className="text-xs text-slate-500 mt-0.5">Family Banking Guardrails</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-100 shadow-2xs">
          <span className="material-symbols-outlined text-[22px]">notifications_active</span>
        </div>
      </div>

      {/* Scope Pill Banner (Exact Image 5) */}
      <div className="bg-white rounded-3xl p-3 shadow-2xs border border-slate-200/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="flex -space-x-1.5">
            <div className="w-7 h-7 rounded-full bg-[#0091ff] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              LB
            </div>
            <div className="w-7 h-7 rounded-full bg-[#ff7b1a] text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
              SB
            </div>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
              Monitoring Active
            </span>
            <span className="text-xs font-bold text-[#0b2a4a]">Luca (12) &amp; Sofia (9)</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onShowToast("Scope encompasses all active child accounts (Luca & Sofia)", "group")}
          className="text-xs font-bold text-[#0b2a4a] bg-blue-50 px-3 py-1 rounded-full border border-blue-100 hover:bg-blue-100"
        >
          Manage Scope
        </button>
      </div>

      {/* Real-time Parental Supervision Dark Card (Exact Image 5) */}
      <div className="bg-[#0b2a4a] text-white rounded-3xl p-5 shadow-sm space-y-2 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none"></div>
        <div className="flex items-center gap-2 text-[#6ffbbe] text-xs font-bold uppercase tracking-wider">
          <span className="material-symbols-outlined text-[16px]">shield</span>
          <span>Real-time Parental Supervision</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed relative z-10">
          Customize how and when you receive instant push notifications and SMS alerts for your children's financial activities and milestone achievements.
        </p>
      </div>

      {/* Guardrail Triggers (Exact Image 5) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>Guardrail Triggers</span>
          <span className="font-normal lowercase">{enabledCount} of 6 enabled</span>
        </div>

        {/* Trigger 1: Every Transaction */}
        <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">contactless</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0b2a4a]">Every Transaction</h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  Receive an immediate push notification every time a card purchase or contactless payment is made.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTrigger('everyTransaction')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-3 ${
                triggers.everyTransaction ? 'bg-[#00301e]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  triggers.everyTransaction ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
            <span className="text-[10px] font-bold text-[#00a472] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">check</span>
              Push: Active
            </span>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">notifications_off</span>
              SMS: Inactive
            </span>
          </div>
        </article>

        {/* Trigger 2: Overspend / Limit Reached */}
        <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">trending_up</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0b2a4a]">Overspend / Limit Reached</h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  Alert when a transaction reaches 80% or 100% of daily spend cap (€30.00) or weekly limit.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTrigger('overspendLimit')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-3 ${
                triggers.overspendLimit ? 'bg-[#00301e]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  triggers.overspendLimit ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-1 border-t border-slate-100">
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">tune</span>
              Trigger at 80% (€24.00)
            </span>
          </div>
        </article>

        {/* Trigger 3: Declined Transaction */}
        <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-2.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">credit_card_off</span>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#0b2a4a]">Declined Transaction</h3>
                <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                  Instant alert if a card is declined due to insufficient funds, blocked merchant category, or incorrect PIN.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => toggleTrigger('declinedTransaction')}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-3 ${
                triggers.declinedTransaction ? 'bg-[#00301e]' : 'bg-slate-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                  triggers.declinedTransaction ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="pt-1 border-t border-slate-100">
            <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200/60 inline-flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">shield</span>
              Recommended for safety
            </span>
          </div>
        </article>

        {/* Trigger 4: Task Completed */}
        <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">checklist</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#0b2a4a]">Task Completed</h3>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                Notify when Luca or Sofia marks a chore or homework task as completed and submits proof.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleTrigger('taskCompleted')}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-3 ${
              triggers.taskCompleted ? 'bg-[#00301e]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                triggers.taskCompleted ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </article>

        {/* Trigger 5: Money Request */}
        <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-[#0b2a4a] flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">mail</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#0b2a4a]">Money Request</h3>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                Prompt immediate review when a child submits an ad-hoc pocket money request with amount and reason.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleTrigger('moneyRequest')}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-3 ${
              triggers.moneyRequest ? 'bg-[#00301e]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                triggers.moneyRequest ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </article>

        {/* Trigger 6: Goal Achieved */}
        <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[20px]">emoji_events</span>
            </div>
            <div>
              <h3 className="text-xs font-bold text-[#0b2a4a]">Goal Achieved</h3>
              <p className="text-[11px] text-slate-500 leading-snug mt-0.5">
                Celebrate milestones! Alert when a savings goal reaches 100% or is ready for parent matching payout.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => toggleTrigger('goalAchieved')}
            className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 shrink-0 ml-3 ${
              triggers.goalAchieved ? 'bg-[#00301e]' : 'bg-slate-300'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                triggers.goalAchieved ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </article>
      </section>

      {/* Delivery Preferences (Exact Image 5) */}
      <section className="bg-blue-50/70 rounded-3xl p-5 border border-blue-200/70 space-y-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px] text-[#0b2a4a]">tune</span>
            <h3 className="text-xs font-bold text-[#0b2a4a]">Delivery Preferences</h3>
          </div>
          <span className="text-[10px] font-bold bg-white text-[#0b2a4a] px-2.5 py-0.5 rounded-full shadow-2xs">
            Always On
          </span>
        </div>

        <div className="space-y-3 text-xs">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-[18px] text-slate-600 shrink-0 mt-0.5">
              notifications_active
            </span>
            <div>
              <h4 className="font-bold text-[#0b2a4a]">Delivery Mode: Instant Push (Sound On)</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                High-priority alerts trigger instant audible chime and banner.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 pt-2 border-t border-blue-200/50">
            <span className="material-symbols-outlined text-[18px] text-rose-500 shrink-0 mt-0.5">
              notifications_paused
            </span>
            <div>
              <h4 className="font-bold text-[#0b2a4a]">Emergency Bypass</h4>
              <p className="text-[11px] text-slate-600 mt-0.5">
                Overrides Do Not Disturb for declined cards or suspicious merchant attempts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons: Save & Reset (Exact Image 5) */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={handleSave}
          className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-sm font-bold flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">check</span>
          <span>Save Alert Preferences</span>
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="w-full py-2.5 text-xs font-bold text-slate-500 hover:text-[#0b2a4a] transition-colors"
        >
          Reset to Recommended Defaults
        </button>
      </div>

      {/* Footer (Exact Image 5) */}
      <div className="text-center space-y-1 pt-1 text-[10px] text-slate-400">
        <div className="flex items-center justify-center gap-1 font-bold text-[#00a472]">
          <span className="material-symbols-outlined text-[13px]">shield</span>
          <span>Heritage Family Banking Guardrails</span>
        </div>
        <p className="tracking-wider uppercase">
          256-Bit Bank Grade Security • Instant Settlement Sync
        </p>
      </div>
    </div>
  );
};
