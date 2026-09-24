import React, { useState, useEffect } from 'react';
import { ScreenId, TaskItem, MoneyRequestItem } from '../types';

interface ApprovalsViewProps {
  tasks: TaskItem[];
  moneyRequests: MoneyRequestItem[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onApproveTask: (taskId: string) => void;
  onRejectTask: (taskId: string) => void;
  onApproveMoney: (reqId: string) => void;
  onDeclineMoney: (reqId: string) => void;
}

interface PendingCheckout {
  id: string;
  childName: string;
  childAge: number;
  childInitials: string;
  avatarBg: string;
  cardLabel: string;
  remainingSeconds: number;
  merchantName: string;
  merchantCategory: string;
  merchantIcon: string;
  amount: number;
  requestedAgo: string;
  triggerType: 'threshold' | 'safety';
  triggerTitle: string;
  triggerDesc: string;
}

const INITIAL_CHECKOUTS: PendingCheckout[] = [
  {
    id: 'chk-1',
    childName: 'Luca Borg',
    childAge: 12,
    childInitials: 'LB',
    avatarBg: 'bg-[#0091ff]',
    cardLabel: 'Mastercard •••• 4819',
    remainingSeconds: 762, // 12:42
    merchantName: 'PlayStation Store EU',
    merchantCategory: 'Digital Gaming • Sony Network',
    merchantIcon: 'sports_esports',
    amount: 34.99,
    requestedAgo: 'Requested 2m ago',
    triggerType: 'threshold',
    triggerTitle: 'Threshold Trigger: Transaction exceeds €10.00 allowance limit',
    triggerDesc:
      "Daily limit headroom is currently €17.60. Completing this purchase will exceed Luca's configured daily cap by €17.39.",
  },
  {
    id: 'chk-2',
    childName: 'Sofia Borg',
    childAge: 9,
    childInitials: 'SB',
    avatarBg: 'bg-[#ff7b1a]',
    cardLabel: 'Virtual Card •••• 1042',
    remainingSeconds: 509, // 08:29
    merchantName: 'Waterstones Books',
    merchantCategory: 'Books & Stationery • Web Checkout',
    merchantIcon: 'menu_book',
    amount: 22.50,
    requestedAgo: 'Requested 6m ago',
    triggerType: 'safety',
    triggerTitle: 'Safety Notice: Web purchase above €15.00 ceiling',
    triggerDesc:
      'Online e-commerce control enforced. Merchant verified via 3D Secure v2. Child balance remains sufficient (€48.30).',
  },
];

export const ApprovalsView: React.FC<ApprovalsViewProps> = ({
  tasks,
  moneyRequests,
  onNavigate,
  onShowToast,
  onApproveTask,
  onRejectTask,
  onApproveMoney,
  onDeclineMoney,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
  const [checkouts, setCheckouts] = useState<PendingCheckout[]>(INITIAL_CHECKOUTS);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const [approvingItem, setApprovingItem] = useState<PendingCheckout | null>(null);
  const [subview, setSubview] = useState<'merchants' | 'chores'>('merchants');

  // Countdown timer simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setCheckouts((prev) =>
        prev.map((item) => ({
          ...item,
          remainingSeconds: Math.max(0, item.remainingSeconds - 1),
        }))
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleApproveWithFaceId = (item: PendingCheckout) => {
    setApprovingItem(item);
    setShowBiometricModal(true);

    setTimeout(() => {
      setShowBiometricModal(false);
      setCheckouts((prev) => prev.filter((c) => c.id !== item.id));
      onShowToast(
        `Authorized with Face ID! 3DS Cryptogram released for €${item.amount.toFixed(2)} to ${item.merchantName}`,
        'fingerprint'
      );
    }, 1100);
  };

  const handleDecline = (item: PendingCheckout) => {
    setCheckouts((prev) => prev.filter((c) => c.id !== item.id));
    onShowToast(`Declined €${item.amount.toFixed(2)} transaction at ${item.merchantName}. Card locked for this merchant.`, 'cancel');
  };

  const pendingTasks = tasks.filter((t) => t.status === 'pending_review');

  return (
    <div className="flex flex-col w-full px-4 space-y-4 pb-24">
      {/* Header breadcrumb & Title (Matching Image 2) */}
      <div className="pt-2">
        <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-400">
          <span>Parental Controls</span>
          <span className="text-slate-300">•</span>
          <span className="text-[#ae3026]">Transaction Authorization</span>
        </div>

        <div className="flex items-center justify-between mt-1">
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Approvals</h1>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/60">
            <span className="w-2 h-2 rounded-full bg-[#ae3026] animate-pulse"></span>
            <span className="text-[11px] font-bold tracking-wider uppercase text-[#ae3026]">
              {checkouts.length} ACTION REQUIRED
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
          Real-time payment attempts paused at merchant checkout requiring Maria Borg's authorization within 15 minutes.
        </p>
      </div>

      {/* Primary Mode Selector: 3DS Checkout Approvals vs Family Chores */}
      <div className="flex items-center justify-between gap-2 pt-1">
        <div className="flex-1 bg-[#eff4ff] p-1 rounded-2xl flex items-center shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <span>Pending</span>
            <span className="px-1.5 py-0.2 rounded-full bg-[#0b2a4a] text-white text-[10px] font-bold">
              {checkouts.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <span>History</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold">
              14
            </span>
          </button>
        </div>

        {/* Option to also view chores */}
        <button
          type="button"
          onClick={() => setSubview(subview === 'merchants' ? 'chores' : 'merchants')}
          className="px-3 py-2 rounded-2xl border border-slate-200 bg-white text-xs font-bold text-[#0b2a4a] hover:bg-slate-50 shrink-0 shadow-2xs flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">
            {subview === 'merchants' ? 'task_alt' : 'credit_card'}
          </span>
          <span>{subview === 'merchants' ? `Chores (${pendingTasks.length})` : 'Cards (2)'}</span>
        </button>
      </div>

      {/* If user toggled Chores queue view */}
      {subview === 'chores' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0b2a4a]">Chores Verification Queue</h3>
            <span className="text-xs text-slate-400">{pendingTasks.length} waiting</span>
          </div>

          {pendingTasks.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200">
              <span className="material-symbols-outlined text-[32px] text-emerald-600">task_alt</span>
              <p className="text-xs text-slate-500 mt-2">All family chores approved!</p>
            </div>
          ) : (
            pendingTasks.map((task) => (
              <div key={task.id} className="p-4 bg-white rounded-2xl shadow-2xs border border-slate-200/80 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-[#0b2a4a] text-white flex items-center justify-center text-xs font-bold">
                      {task.childName === 'Luca' ? 'LB' : 'SB'}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0b2a4a]">{task.title}</h4>
                      <p className="text-[11px] text-slate-400">{task.childName} • {task.category}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#00a472] font-mono">{task.rewardText}</span>
                </div>

                {task.photoUrl && (
                  <img
                    src={task.photoUrl}
                    alt={task.title}
                    className="w-full h-32 rounded-xl object-cover border border-slate-100"
                  />
                )}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onRejectTask(task.id);
                      onShowToast(`Sent revision request to ${task.childName}`, 'replay');
                    }}
                    className="flex-1 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                  >
                    Needs Fix
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApproveTask(task.id);
                      onShowToast(`Approved €${task.rewardValue.toFixed(2)} for ${task.childName}!`, 'check_circle');
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold"
                  >
                    Accept &amp; Pay
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : activeTab === 'pending' ? (
        /* PENDING 3DS CARDS (Exact Image 2) */
        <div className="space-y-4">
          {checkouts.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <span className="material-symbols-outlined text-[30px]">check_circle</span>
              </div>
              <h3 className="text-sm font-bold text-[#0b2a4a]">No Pending 3DS Authorizations</h3>
              <p className="text-xs text-slate-500">
                Luca and Sofia do not have any active checkout prompts waiting.
              </p>
            </div>
          ) : (
            checkouts.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/90 space-y-3.5"
              >
                {/* Child Header Row & Countdown Timer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-full ${item.avatarBg} text-white flex items-center justify-center font-bold text-xs shadow-2xs`}
                    >
                      {item.childInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#0b2a4a]">{item.childName}</span>
                        <span className="text-[11px] text-slate-400">(Age {item.childAge})</span>
                      </div>
                      <div className="flex items-center gap-1 text-[11px] text-slate-500">
                        <span className="material-symbols-outlined text-[14px]">credit_card</span>
                        <span>{item.cardLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Red/Amber Hourglass Timer Badge */}
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-50 border border-rose-200/70 text-[#ae3026]">
                    <span className="material-symbols-outlined text-[14px] animate-pulse">hourglass_top</span>
                    <span className="text-xs font-mono font-bold tracking-wider">
                      {formatTimer(item.remainingSeconds)}
                    </span>
                  </div>
                </div>

                {/* Merchant Box */}
                <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-blue-100/70 flex items-center justify-between">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-2xs">
                      <span className="material-symbols-outlined text-[22px]">{item.merchantIcon}</span>
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#0b2a4a] truncate">{item.merchantName}</h4>
                      <p className="text-[11px] text-slate-500 truncate">{item.merchantCategory}</p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xl font-extrabold text-[#0b2a4a] font-mono tracking-tight block">
                      €{item.amount.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{item.requestedAgo}</span>
                  </div>
                </div>

                {/* Warning Callout Box */}
                {item.triggerType === 'threshold' ? (
                  <div className="p-3.5 rounded-2xl bg-[#ffdad5]/40 border border-rose-200/60 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-[#ae3026] shrink-0 mt-0.5">
                      warning
                    </span>
                    <div className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold text-[#ae3026] block">{item.triggerTitle}</span>
                      <p className="mt-0.5 text-slate-600 leading-relaxed">{item.triggerDesc}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-2xl bg-[#eff4ff] border border-blue-200/60 flex items-start gap-2.5">
                    <span className="material-symbols-outlined text-[18px] text-blue-600 shrink-0 mt-0.5">
                      security
                    </span>
                    <div className="text-xs text-slate-700 leading-snug">
                      <span className="font-bold text-[#0b2a4a] block">{item.triggerTitle}</span>
                      <p className="mt-0.5 text-slate-600 leading-relaxed">{item.triggerDesc}</p>
                    </div>
                  </div>
                )}

                {/* Action Buttons: Decline & Approve with Face ID */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleDecline(item)}
                    className="h-12 rounded-2xl bg-white border border-slate-200/90 text-slate-700 hover:bg-slate-50 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-[0.98] shadow-2xs"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                    <span>Decline</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleApproveWithFaceId(item)}
                    className="h-12 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98] shadow-md"
                  >
                    <span className="material-symbols-outlined text-[18px]">fingerprint</span>
                    <span>Approve with Face ID</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        /* HISTORY TAB (14 items summary) */
        <div className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-[#0b2a4a]">All 14 Authorizations</span>
            <span className="text-[11px] text-slate-400">Export CSV</span>
          </div>
          <p className="text-xs text-slate-500">
            Full 3DS biometric authorization records stored on file for compliance.
          </p>
        </div>
      )}

      {/* Recent Decided Transactions Section (Exact Image 2) */}
      <section className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0b2a4a] text-[18px]">history</span>
            <h3 className="text-sm font-bold text-[#0b2a4a]">Recent Decided Transactions</h3>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">Last 7 days</span>
        </div>

        <div className="space-y-2.5 divide-y divide-slate-100">
          {/* Row 1: Decathlon */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">fitness_center</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#0b2a4a] truncate">Decathlon Sports • Luca</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                    Approved
                  </span>
                  <span className="text-[10px] text-slate-400">Today, 14:15</span>
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-[#0b2a4a] font-mono">€18.00</span>
          </div>

          {/* Row 2: Steam Games */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">sports_esports</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#0b2a4a] truncate">Steam Games EU • Luca</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-rose-700 bg-rose-50 px-1.5 py-0.2 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">close</span>
                    Declined
                  </span>
                  <span className="text-[10px] text-slate-400">Yesterday, 19:40</span>
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-[#0b2a4a] font-mono">€49.99</span>
          </div>

          {/* Row 3: LEGO Store */}
          <div className="pt-2 flex items-center justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-[#0b2a4a] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">extension</span>
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-[#0b2a4a] truncate">LEGO Store Online • Sofia</h4>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">check</span>
                    Approved
                  </span>
                  <span className="text-[10px] text-slate-400">28 May</span>
                </div>
              </div>
            </div>
            <span className="text-sm font-bold text-[#0b2a4a] font-mono">€29.90</span>
          </div>
        </div>
      </section>

      {/* Instant Biometric Authorization Info Card (Exact Image 2) */}
      <section className="p-4 rounded-3xl bg-[#eff4ff] border border-blue-200/60 flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-white text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-2xs">
          <span className="material-symbols-outlined text-[20px]">verified_user</span>
        </div>
        <div className="text-xs leading-relaxed">
          <span className="font-bold text-[#0b2a4a] block">Instant Biometric Authorization</span>
          <p className="text-slate-600 mt-0.5 text-[11px] leading-relaxed">
            Approvals issue instant 3DS authentication cryptograms directly to merchant acquirers. Requests not reviewed within 15 minutes are automatically dropped for safety.
          </p>
        </div>
      </section>

      {/* Face ID Biometric Confirmation Modal */}
      {showBiometricModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 max-w-xs w-full text-center space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center mx-auto">
              <span className="material-symbols-outlined text-[36px] animate-pulse">fingerprint</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#0b2a4a]">Face ID Authorization</h3>
              <p className="text-xs text-slate-500 mt-1">
                Authenticating Maria Borg for {approvingItem?.merchantName}...
              </p>
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="h-full bg-[#00a472] w-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
