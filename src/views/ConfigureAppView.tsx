import React, { useState } from 'react';
import { ScreenId, ChildAppFeatures } from '../types';
import { INITIAL_APP_CONFIG } from '../data/mockData';

interface ConfigureAppViewProps {
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const ConfigureAppView: React.FC<ConfigureAppViewProps> = ({
  onNavigate,
  onShowToast,
}) => {
  const [config, setConfig] = useState<ChildAppFeatures>(INITIAL_APP_CONFIG);
  const [activePreset, setActivePreset] = useState<'standard' | 'saver' | 'teen'>('standard');

  const handleToggle = (key: keyof ChildAppFeatures) => {
    setConfig((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const applyPreset = (preset: 'standard' | 'saver' | 'teen') => {
    setActivePreset(preset);
    if (preset === 'saver') {
      setConfig({
        balance: true,
        history: true,
        request: false,
        goals: true,
        tasks: true,
        card: false,
        payfriends: false,
        online: false,
      });
      onShowToast('Applied "Saver Focus" preset for age 9–11', 'savings');
    } else if (preset === 'teen') {
      setConfig({
        balance: true,
        history: true,
        request: true,
        goals: true,
        tasks: true,
        card: true,
        payfriends: true,
        online: true,
      });
      onShowToast('Applied "Full Access Teen" preset for age 14+', 'military_tech');
    } else {
      setConfig(INITIAL_APP_CONFIG);
      onShowToast('Applied "Standard Age 12" preset for Luca', 'tune');
    }
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-24">
      {/* Title */}
      <div className="pt-2">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Youth Interface Sandbox
        </span>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Configure Luca's App</h1>
        <p className="text-xs text-slate-500">
          Decide which widgets and permissions appear on Luca's iPhone screen.
        </p>
      </div>

      {/* Preset Buttons */}
      <div className="flex items-center gap-1.5 bg-[#eff4ff] p-1 rounded-xl">
        <button
          type="button"
          onClick={() => applyPreset('standard')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activePreset === 'standard'
              ? 'bg-white text-[#0b2a4a] shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          Age 12 Default
        </button>
        <button
          type="button"
          onClick={() => applyPreset('saver')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activePreset === 'saver'
              ? 'bg-white text-[#0b2a4a] shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          Saver Focus
        </button>
        <button
          type="button"
          onClick={() => applyPreset('teen')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activePreset === 'teen'
              ? 'bg-white text-[#0b2a4a] shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          Teen Access
        </button>
      </div>

      {/* Live Phone Preview Simulator */}
      <div className="w-full flex justify-center py-2">
        <div className="w-[280px] rounded-[36px] bg-[#00152d] p-3 text-white shadow-2xl border-4 border-slate-700 relative overflow-hidden">
          {/* Dynamic Island / Notch */}
          <div className="w-24 h-4 bg-black rounded-full mx-auto mb-3 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-slate-800 mr-2"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-blue-900/60"></div>
          </div>

          {/* Child app header */}
          <div className="flex items-center justify-between px-1 mb-3">
            <div>
              <span className="text-[10px] text-slate-400 block">Hey Luca! ☀️</span>
              <span className="text-xs font-bold text-white">Heritage Youth</span>
            </div>
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-[10px] flex items-center justify-center">
              LB
            </div>
          </div>

          {/* Simulated Widgets based on state */}
          <div className="space-y-2 max-h-[340px] overflow-y-auto no-scrollbar pr-0.5">
            {config.balance ? (
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/10 animate-in fade-in">
                <span className="text-[9px] uppercase tracking-wider text-slate-300 block">
                  Available Balance
                </span>
                <span className="text-xl font-bold font-mono text-[#6ffbbe]">€142.50</span>
                {config.request && (
                  <div className="mt-2 pt-1 border-t border-white/10 flex justify-end">
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#fc6959] text-white">
                      Request €
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-2.5 rounded-xl border border-dashed border-white/20 text-center text-[10px] text-slate-400">
                Balance hidden by parent
              </div>
            )}

            {config.card && (
              <div className="bg-gradient-to-r from-blue-900 to-indigo-900 p-2.5 rounded-xl border border-blue-400/20 text-white text-[10px] flex items-center justify-between">
                <span>Youth Mastercard •• 4829</span>
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 text-[8px] font-bold">
                  Active
                </span>
              </div>
            )}

            {config.goals && (
              <div className="bg-white/10 p-2.5 rounded-xl text-[10px] space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Gaming Console</span>
                  <span className="text-[#6ffbbe]">51%</span>
                </div>
                <div className="w-full bg-black/40 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#6ffbbe] h-full w-[51%]"></div>
                </div>
              </div>
            )}

            {config.tasks && (
              <div className="bg-white/10 p-2.5 rounded-xl text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="font-bold">Chores to Complete</span>
                  <span className="text-[#ffdad5]">2 waiting</span>
                </div>
                <div className="text-[9px] text-slate-300">Clean Bedroom (+€3.00)</div>
              </div>
            )}

            {config.history && (
              <div className="bg-white/5 p-2 rounded-xl text-[9px] text-slate-400 space-y-1">
                <span className="font-bold uppercase tracking-wider block text-[8px]">Recent</span>
                <div className="flex justify-between">
                  <span className="text-white">Waterstones</span>
                  <span>-€12.40</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Feature Toggles List */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3">
        <h3 className="text-xs font-bold text-[#0b2a4a] uppercase tracking-wider">
          Permission Toggles
        </h3>

        {[
          { key: 'balance', label: 'Account Balance Display', desc: 'Allow child to view real-time card balance' },
          { key: 'history', label: 'Transaction History', desc: 'Display categorized merchant purchases' },
          { key: 'request', label: 'Request Money Feature', desc: 'Permit child to submit urgent top-up notes' },
          { key: 'goals', label: 'Savings Goals Tracker', desc: 'Show visual progress toward savings targets' },
          { key: 'tasks', label: 'Tasks & Chores Bounty Hub', desc: 'Allow viewing tasks and uploading photo proof' },
          { key: 'card', label: 'Digital Card Visualizer', desc: 'Display card details and virtual contactless card' },
          { key: 'payfriends', label: 'Peer Transfers (Pay Friends)', desc: 'Instant transfers to verified classmates' },
          { key: 'online', label: 'In-App Online Purchases', desc: 'Enable App Store & approved educational stores' },
        ].map((item) => {
          const isEnabled = config[item.key as keyof ChildAppFeatures];
          return (
            <div
              key={item.key}
              className="flex items-center justify-between py-2 border-b border-slate-100 last:border-b-0"
            >
              <div className="min-w-0 pr-3">
                <h4 className="text-xs font-bold text-[#0b2a4a]">{item.label}</h4>
                <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
              </div>
              <button
                type="button"
                onClick={() => handleToggle(item.key as keyof ChildAppFeatures)}
                className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center shrink-0 ${
                  isEnabled ? 'bg-[#00a472]' : 'bg-slate-300'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                    isEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* Save Button */}
      <button
        type="button"
        onClick={() => {
          onShowToast("Luca's app configuration pushed and refreshed immediately!", 'cloud_done');
          onNavigate('child_luca');
        }}
        className="w-full h-14 rounded-2xl bg-[#0b2a4a] text-white font-bold text-base flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all hover:bg-[#00152d]"
      >
        <span className="material-symbols-outlined text-[20px]">save</span>
        <span>Save App Experience</span>
      </button>
    </div>
  );
};
