import React, { useState } from 'react';
import { ScreenId } from '../../types';

interface ConsentViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ConsentView: React.FC<ConsentViewProps> = ({ onNavigate, onShowToast }) => {
  const [c1, setC1] = useState(true);
  const [c2, setC2] = useState(true);
  const [c3, setC3] = useState(true);

  const canContinue = c1 && c2 && c3;

  const handleConsent = () => {
    if (!canContinue) {
      onShowToast('All three mandatory consents must be checked', 'error');
      return;
    }
    onShowToast('Parental consent recorded with digital certificate', 'verified');
    onNavigate('onboarding_invite');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-20">
      {/* Step Indicator */}
      <div className="pt-2 flex items-center justify-between text-xs text-slate-500">
        <span className="font-bold text-[#0b2a4a]">Step 3 of 5</span>
        <span>Parental Consent</span>
      </div>

      <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
        <div className="bg-[#0b2a4a] h-full w-3/5 rounded-full"></div>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Parental Consent &amp; Legal Disclosures</h1>
        <p className="text-xs text-slate-500 mt-1">
          Mandatory compliance framework governed by the Malta Financial Services Authority (MFSA) and
          EU PSD2 regulations for minor digital banking.
        </p>
      </div>

      {/* Scrollable Regulatory Text Box */}
      <div className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200 max-h-48 overflow-y-auto text-[11px] text-slate-600 space-y-2 leading-relaxed font-mono">
        <p className="font-bold text-slate-800">
          SECTION 1.0 — PARENTAL RESPONSIBILITY &amp; JUNIOR ACCOUNT MANDATE
        </p>
        <p>
          By authorizing this mandate, you confirm that you are the parent or legal guardian of Luca Borg
          (DOB 14/06/2012). The minor youth card is an electronic money payment instrument linked to your
          parental vault. All transactions initiated by the minor remain under parent supervisory control.
        </p>
        <p className="font-bold text-slate-800">
          SECTION 2.0 — OVERDRAFT PROHIBITION &amp; REAL-TIME SETTLEMENT
        </p>
        <p>
          Youth debit cards are strictly pre-funded. Overdraft facilities and debt generation are
          prohibited by system invariant. In cases where offline transactions settle beyond available
          funds, the parental primary checking account will cover balances automatically.
        </p>
        <p className="font-bold text-slate-800">
          SECTION 3.0 — DATA PRIVACY &amp; MINOR PROTECTION (GDPR-K)
        </p>
        <p>
          Data collected for Luca Borg is restricted strictly to financial transaction logging, fraud
          prevention, and parental notifications. Heritage Bank will never sell or monetize minor usage
          metrics.
        </p>
      </div>

      {/* 3 Checkbox disclosures */}
      <div className="space-y-3 bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80">
        <div className="flex items-start gap-3">
          <input
            type="checkbox"
            id="c1"
            checked={c1}
            onChange={(e) => setC1(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-[#0b2a4a] accent-[#0b2a4a]"
          />
          <label htmlFor="c1" className="text-xs text-slate-700 leading-snug">
            <span className="font-bold block text-[#0b2a4a]">Parental Authorization</span>
            I authorize Heritage Bank to issue a youth debit card in the name of Luca Borg under my direct
            supervision.
          </label>
        </div>

        <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
          <input
            type="checkbox"
            id="c2"
            checked={c2}
            onChange={(e) => setC2(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-[#0b2a4a] accent-[#0b2a4a]"
          />
          <label htmlFor="c2" className="text-xs text-slate-700 leading-snug">
            <span className="font-bold block text-[#0b2a4a]">Automatic Spending Limits</span>
            I acknowledge that default safety limits (€30/day, €150/mo) will apply immediately upon card
            activation.
          </label>
        </div>

        <div className="flex items-start gap-3 pt-2 border-t border-slate-100">
          <input
            type="checkbox"
            id="c3"
            checked={c3}
            onChange={(e) => setC3(e.target.checked)}
            className="mt-0.5 w-4 h-4 rounded text-[#0b2a4a] accent-[#0b2a4a]"
          />
          <label htmlFor="c3" className="text-xs text-slate-700 leading-snug">
            <span className="font-bold block text-[#0b2a4a]">Parent Liability &amp; Disclosures</span>
            I accept the Heritage Family Banking Terms and understand that I can freeze or cancel the card
            at any time.
          </label>
        </div>
      </div>

      {/* Digital Signature timestamp */}
      <div className="flex items-center justify-between px-2 text-[10px] text-slate-400 font-mono">
        <span>Maria Borg • CIF •••••••• 8492</span>
        <span>SHA-256 Signature • Live Validated</span>
      </div>

      <button
        type="button"
        onClick={handleConsent}
        disabled={!canContinue}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] disabled:opacity-40 text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
      >
        <span className="material-symbols-outlined text-[20px]">verified</span>
        <span>I Consent &amp; Continue</span>
      </button>
    </div>
  );
};
