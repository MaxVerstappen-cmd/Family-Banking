import React from 'react';
import { ScreenId } from '../../types';

interface WelcomeViewProps {
  onNavigate: (screen: ScreenId) => void;
}

export const WelcomeView: React.FC<WelcomeViewProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col w-full min-h-[85vh] justify-between pb-12">
      {/* Top Media & Hero */}
      <div className="flex flex-col">
        <div className="relative w-full h-64 overflow-hidden rounded-b-3xl shadow-md">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBz-d8-oQCxA8AAIa0-7G0DD4s97PeTivWHUaN1KM1o_Ee9RFq92WYbFaS6DCfORh8LZlFOUbov2gwaDeZyfPjQQPiYhbjAHEaf5kr8R1Betg-oCT01zLMesjxs1P8H04VZD3BYJ553UogeckdmRzcHr-3Hl-DQNDZrsRZY9K7boNkR5iGDi2KymHjcgnIP2_t5VS2PIJ20TW_defALb0NLQ5er-CcnbURD4UklfKWxs-mg5fFTDen1xA"
            alt="Family in kitchen"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00152d]/90 via-[#00152d]/30 to-transparent flex items-end p-6">
            <div className="text-white">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-sky-200">
                Heritage Family
              </span>
              <h1 className="text-2xl font-bold mt-2 leading-tight">
                Empower Your Kids with Smart Money Habits
              </h1>
            </div>
          </div>
        </div>

        {/* Feature Highlights */}
        <div className="px-5 mt-6 space-y-4">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[22px]">credit_card</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b2a4a]">Youth Contactless Debit Cards</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real Mastercard cards with instant parent lock, category limits, and zero overdraft risk.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#ffdad5]/60 text-[#ae3026] flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[22px]">savings</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b2a4a]">Chores &amp; Automated Allowances</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Turn chores into paid bounties with photo verification, and schedule automated pocket money.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 shadow-2xs">
              <span className="material-symbols-outlined text-[22px]">verified_user</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#0b2a4a]">Total Parental Oversight</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Real-time purchase notifications, customizable spending caps, and instant fund transfers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="px-5 mt-8 space-y-3">
        <button
          type="button"
          onClick={() => onNavigate('onboarding_enrolment')}
          className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
        >
          <span>Get Started</span>
          <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
        </button>

        <p className="text-center text-[11px] text-slate-400">
          Already a Heritage Bank customer? Enrolment takes less than 2 minutes.
        </p>
      </div>
    </div>
  );
};
