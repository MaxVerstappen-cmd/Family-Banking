import React, { useState } from 'react';
import { ScreenId } from '../types';
import { PARENT_PROFILE } from '../data/mockData';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId) => void;
  pendingApprovalsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  pendingApprovalsCount = 2,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScreenSwitcher, setShowScreenSwitcher] = useState(false);

  const isSubScreen = [
    'child_luca',
    'approvals',
    'spending_limits',
    'configure_app',
    'onboarding_welcome',
    'onboarding_enrolment',
    'onboarding_link_profile',
    'onboarding_consent',
    'onboarding_invite',
    'onboarding_verify_device',
    'onboarding_bind_device',
  ].includes(currentScreen);

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Home';
      case 'family':
        return 'Family';
      case 'child_luca':
        return 'Luca Borg';
      case 'tasks':
        return 'Tasks';
      case 'approvals':
        return 'Approvals';
      case 'payments':
        return 'Payments';
      case 'insights':
        return 'Insights';
      case 'spending_limits':
        return 'Spending Limits';
      case 'configure_app':
        return "Configure Child App";
      case 'onboarding_welcome':
        return 'Welcome';
      case 'onboarding_enrolment':
        return 'Enrolment Confirmation';
      case 'onboarding_link_profile':
        return 'Link Child Profile';
      case 'onboarding_consent':
        return 'Parental Consent';
      case 'onboarding_invite':
        return 'Invite Child';
      case 'onboarding_verify_device':
        return 'Child Verification';
      case 'onboarding_bind_device':
        return 'Authenticate Device';
      default:
        return 'Family Banking';
    }
  };

  const handleBack = () => {
    if (
      currentScreen === 'child_luca' ||
      currentScreen === 'spending_limits' ||
      currentScreen === 'configure_app'
    ) {
      onNavigate('family');
    } else if (currentScreen === 'approvals') {
      onNavigate('tasks');
    } else if (currentScreen.startsWith('onboarding_')) {
      onNavigate('home');
    } else {
      onNavigate('home');
    }
  };

  const allScreens: { id: ScreenId; label: string; group: string; badge?: string }[] = [
    { id: 'home', label: 'Home - Family Hub', group: 'Primary App' },
    { id: 'family', label: 'My Family & Children', group: 'Primary App' },
    { id: 'child_luca', label: "Luca's Card & Controls", group: 'Primary App', badge: 'Active Card' },
    { id: 'tasks', label: 'Tasks & Chores Manager', group: 'Primary App' },
    { id: 'approvals', label: 'Approvals & Requests Queue', group: 'Primary App', badge: '2 Pending' },
    { id: 'payments', label: 'Send Money & Allowance', group: 'Primary App' },
    { id: 'insights', label: 'Insights & Savings Goals', group: 'Primary App' },
    { id: 'spending_limits', label: "Luca's Spending Limits", group: 'Controls & Security' },
    { id: 'configure_app', label: "Configure Luca's App (Live Simulator)", group: 'Controls & Security', badge: 'Interactive' },
    { id: 'onboarding_welcome', label: '1. Welcome & Habits Overview', group: 'Onboarding Flow' },
    { id: 'onboarding_enrolment', label: '2. Enrolment Confirmation', group: 'Onboarding Flow' },
    { id: 'onboarding_link_profile', label: "3. Link Child Profile (Luca)", group: 'Onboarding Flow' },
    { id: 'onboarding_consent', label: '4. Parental Consent & Legal', group: 'Onboarding Flow' },
    { id: 'onboarding_invite', label: '5. Invite Child (QR Code & Link)', group: 'Onboarding Flow' },
    { id: 'onboarding_verify_device', label: '6. Verify Child Linking (OTP PIN)', group: 'Onboarding Flow' },
    { id: 'onboarding_bind_device', label: '7. Authenticate & Bind Device (Face ID)', group: 'Onboarding Flow' },
  ];

  return (
    <>
      <header className="fixed top-0 w-full z-40 bg-[#f8f9ff]/90 backdrop-blur-xl border-b border-[#e2e8f0]/80 shadow-[0_1px_12px_rgba(11,42,74,0.04)]">
        <div className="h-16 px-4 max-w-2xl mx-auto flex items-center justify-between gap-2">
          {/* Left: Back button or Logo + Title */}
          <div className="flex items-center gap-2 min-w-0">
            {isSubScreen ? (
              <button
                type="button"
                onClick={handleBack}
                aria-label="Back"
                className="w-10 h-10 -ml-2 rounded-full flex items-center justify-center text-[#0b1c30] hover:bg-[#e5eeff] transition-colors active:scale-95 shrink-0"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back</span>
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => setShowScreenSwitcher(true)}
              className="flex items-center gap-2.5 text-left group hover:opacity-85 transition-opacity"
              title="Click to jump to any screen"
            >
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1WhHOmCz8NT4YOkQuCwYJZvF6Jilb5xoA5WEH3UpfjuzSNVFRzA2xDY96NF5u0we6lMNpSa953p0_MpSJJK20HFze2WIR-YQQrIf13PMOBrsGHwftVd6EiuW-I5OhJmcL1emXY_q2t_WuHTCfzp8RWtTYJPN2mj5SH24132MKPR-LGcTn1iKi1IrzL4HmdTC4mWemdEBan4DxJs3WflENn0DHKMVh_3tP4-9HzDxlM-uUJQGQdUR8Hcefo0"
                alt="Heritage Family Logo"
                className="h-8 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#74777f] leading-tight">
                  Heritage Bank
                </span>
                <div className="flex items-center gap-1">
                  <span className="text-[16px] font-bold text-[#0b2a4a] truncate leading-tight">
                    {getScreenTitle()}
                  </span>
                  <span className="material-symbols-outlined text-[16px] text-slate-400 group-hover:text-[#0b2a4a] transition-colors">
                    expand_more
                  </span>
                </div>
              </div>
            </button>
          </div>

          {/* Right: Screen Menu + Notifications + Profile */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Screen switcher pill button */}
            <button
              type="button"
              onClick={() => setShowScreenSwitcher(true)}
              className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-[#0b2a4a] bg-[#eff4ff] hover:bg-[#dce9ff] px-2.5 py-1 rounded-full transition-colors"
            >
              <span className="material-symbols-outlined text-[14px]">view_carousel</span>
              <span>All Screens</span>
            </button>

            {/* Notification bell */}
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-[#43474e] hover:bg-[#e5eeff] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {pendingApprovalsCount > 0 && (
                <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#fc6959] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#fc6959]"></span>
                </span>
              )}
            </button>

            {/* Maria's profile */}
            <button
              type="button"
              onClick={() => setShowScreenSwitcher(true)}
              className="flex items-center pl-1 focus:outline-none"
              title="Maria Borg Profile"
            >
              <img
                src={PARENT_PROFILE.avatarUrl}
                alt="Maria Borg"
                className="w-8 h-8 rounded-full object-cover ring-2 ring-white shadow-xs"
              />
            </button>
          </div>
        </div>
      </header>

      {/* Notifications Drawer Modal */}
      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/40 backdrop-blur-xs flex items-start justify-center p-4 pt-18 animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 flex flex-col gap-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fc6959] text-[20px]">notifications_active</span>
                <span className="text-sm font-bold text-[#0b2a4a]">Family Notifications</span>
              </div>
              <button
                type="button"
                onClick={() => setShowNotifications(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              <div
                onClick={() => {
                  setShowNotifications(false);
                  onNavigate('approvals');
                }}
                className="p-3 rounded-xl bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors cursor-pointer flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-[#00a472] text-[18px] shrink-0 mt-0.5">task_alt</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b2a4a]">Luca finished "Clean Bedroom"</span>
                  <span className="text-[11px] text-slate-600">Photo proof submitted. Reward waiting: €3.00</span>
                  <span className="text-[10px] text-slate-400 mt-1">15 mins ago</span>
                </div>
              </div>

              <div
                onClick={() => {
                  setShowNotifications(false);
                  onNavigate('approvals');
                }}
                className="p-3 rounded-xl bg-[#ffdad5]/40 hover:bg-[#ffdad5]/70 transition-colors cursor-pointer flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-[#ae3026] text-[18px] shrink-0 mt-0.5">sports_esports</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b2a4a]">Sofia requests Roblox game pass</span>
                  <span className="text-[11px] text-slate-600">Requires 1-time parent spending unlock for €4.99</span>
                  <span className="text-[10px] text-slate-400 mt-1">45 mins ago</span>
                </div>
              </div>

              <div
                onClick={() => {
                  setShowNotifications(false);
                  onNavigate('payments');
                }}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex items-start gap-2.5"
              >
                <span className="material-symbols-outlined text-[#0b2a4a] text-[18px] shrink-0 mt-0.5">event_repeat</span>
                <div className="flex flex-col min-w-0">
                  <span className="text-xs font-bold text-[#0b2a4a]">Upcoming Friday Allowance</span>
                  <span className="text-[11px] text-slate-600">€25.00 scheduled across Luca & Sofia</span>
                  <span className="text-[10px] text-slate-400 mt-1">In 2 days</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowNotifications(false);
                onNavigate('approvals');
              }}
              className="w-full py-2 bg-[#0b2a4a] text-white text-xs font-semibold rounded-xl text-center hover:bg-[#00152d]"
            >
              Go to Approvals Queue
            </button>
          </div>
        </div>
      )}

      {/* Screen Navigator Modal: lets user inspect and switch to any of the 16 exact screens */}
      {showScreenSwitcher && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 max-h-[85vh] overflow-y-auto flex flex-col gap-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#0b2a4a] text-white flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">apps</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#0b2a4a]">Heritage Screen Navigator</h3>
                  <p className="text-xs text-slate-500">Select any view to preview full UI &amp; interactions</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowScreenSwitcher(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            {['Primary App', 'Controls & Security', 'Onboarding Flow'].map((group) => (
              <div key={group} className="flex flex-col gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                  {group}
                </span>
                <div className="grid grid-cols-1 gap-1.5">
                  {allScreens
                    .filter((s) => s.group === group)
                    .map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => {
                          onNavigate(s.id);
                          setShowScreenSwitcher(false);
                        }}
                        className={`flex items-center justify-between p-3 rounded-xl text-left text-xs font-medium transition-all ${
                          currentScreen === s.id
                            ? 'bg-[#0b2a4a] text-white font-semibold shadow-xs'
                            : 'bg-slate-50 text-slate-800 hover:bg-[#e5eeff] hover:text-[#0b2a4a]'
                        }`}
                      >
                        <span className="truncate">{s.label}</span>
                        {s.badge && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase shrink-0 ${
                              currentScreen === s.id
                                ? 'bg-white/20 text-white'
                                : 'bg-[#dce9ff] text-[#0b2a4a]'
                            }`}
                          >
                            {s.badge}
                          </span>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
