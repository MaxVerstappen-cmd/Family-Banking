import React, { useState } from 'react';
import { ScreenId, FamilyNotificationItem } from '../types';

interface AlertsViewProps {
  notifications: FamilyNotificationItem[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onApproveMoneyRequest?: (id: string, amount: number) => void;
}

export const AlertsView: React.FC<AlertsViewProps> = ({
  notifications,
  onNavigate,
  onShowToast,
  onApproveMoneyRequest,
}) => {
  const [filter, setFilter] = useState<'all' | 'alerts' | 'requests'>('all');
  const [readIds, setReadIds] = useState<string[]>(['notif-4', 'notif-5', 'notif-6']);
  const [approvedRequests, setApprovedRequests] = useState<string[]>([]);

  const handleMarkAllRead = () => {
    setReadIds(notifications.map((n) => n.id));
    onShowToast('All family notifications marked as read', 'done_all');
  };

  const handleApprove = (notifId: string, amount: number) => {
    setApprovedRequests((prev) => [...prev, notifId]);
    if (onApproveMoneyRequest) {
      onApproveMoneyRequest(notifId, amount);
    }
    onShowToast(`Approved & sent €${amount.toFixed(2)} to Luca!`, 'check_circle');
  };

  const handleDecline = (notifId: string) => {
    setApprovedRequests((prev) => [...prev, notifId]);
    onShowToast('Money request politely declined with parent note.', 'cancel');
  };

  const filteredNotifs = notifications.filter((n) => {
    if (filter === 'alerts') return n.type === 'limit_warning' || n.type === 'card_declined';
    if (filter === 'requests') return n.type === 'money_request';
    return true;
  });

  const todayNotifs = filteredNotifs.filter((n) => n.day === 'today');
  const yesterdayNotifs = filteredNotifs.filter((n) => n.day === 'yesterday');

  const unreadCount = notifications.filter((n) => !readIds.includes(n.id)).length;

  return (
    <div className="flex flex-col w-full px-4 gap-4 pb-28">
      {/* Top Header & Mark All Read (Exact Image 4) */}
      <div className="pt-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-extrabold text-[#0b1c30]">Family Notifications</h1>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#fc6959] text-white text-[11px] font-bold">
              {unreadCount} New
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={handleMarkAllRead}
          className="text-xs font-bold text-[#0b2a4a] hover:underline flex items-center gap-1"
        >
          <span className="material-symbols-outlined text-[16px]">done_all</span>
          <span>Mark all read</span>
        </button>
      </div>

      {/* Filter Pills (Exact Image 4) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 ${
            filter === 'all'
              ? 'bg-[#0b2a4a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          All (6)
        </button>

        <button
          type="button"
          onClick={() => setFilter('alerts')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            filter === 'alerts'
              ? 'bg-[#0b2a4a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
          <span>Alerts &amp; Limits (2)</span>
        </button>

        <button
          type="button"
          onClick={() => setFilter('requests')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shrink-0 flex items-center gap-1 ${
            filter === 'requests'
              ? 'bg-[#0b2a4a] text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          <span>Requests (2)</span>
        </button>
      </div>

      {/* TODAY SECTION (Exact Image 4) */}
      {todayNotifs.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Today</span>
            <span className="font-normal lowercase">{todayNotifs.length} events</span>
          </div>

          {/* Event 1: Limit Warning: Luca approaching daily cap */}
          <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3 relative">
            {!readIds.includes('notif-1') && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500"></span>
            )}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">warning</span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-[#0b2a4a] truncate">
                    Limit Warning: Luca approaching daily cap
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">14:28</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Luca spent €12.50 at City Books &amp; Stationers. Remaining daily allowance is now €5.50 of €30.00.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Luca (Age 12)
                  </span>
                  <span>•</span>
                  <span className="text-rose-600 font-bold">Card Limit at 82%</span>
                </div>
              </div>
            </div>

            {/* Red progress bar */}
            <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '82%' }}></div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => onNavigate('spending_limits')}
                className="px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#0b2a4a] text-xs font-bold flex items-center gap-1 hover:bg-blue-100 transition-colors"
              >
                <span className="material-symbols-outlined text-[14px]">tune</span>
                <span>Adjust Cap</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('spending_limits')}
                className="px-3.5 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-colors"
              >
                View Limits
              </button>
            </div>
          </article>

          {/* Event 2: Money Request from Luca: €8.50 */}
          <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3 relative">
            {!readIds.includes('notif-2') && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500"></span>
            )}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#0b2a4a] text-white flex items-center justify-center shrink-0 shadow-2xs">
                <span className="material-symbols-outlined text-[20px]">account_balance_wallet</span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-[#0b2a4a]">
                    Money Request from Luca: €8.50
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">12:15</span>
                </div>

                {/* Note from Luca */}
                <div className="my-2 p-2.5 rounded-2xl bg-blue-50/70 border border-blue-200/60 text-xs">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                    Note from Luca
                  </span>
                  <p className="text-slate-700 font-medium italic mt-0.5">
                    "Art project sketch pad and drawing pencils 🎨"
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Luca (Age 12)
                  </span>
                  <span>•</span>
                  <span>Direct Transfer</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-2 pt-1">
              {!approvedRequests.includes('notif-2') ? (
                <>
                  <button
                    type="button"
                    onClick={() => handleApprove('notif-2', 8.5)}
                    className="px-4 py-2 rounded-xl bg-[#fc6959] hover:bg-[#e05445] text-white text-xs font-bold flex items-center gap-1 shadow-xs active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[15px]">check</span>
                    <span>Approve &amp; Send €8.50</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDecline('notif-2')}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 text-[#0b2a4a] text-xs font-semibold hover:bg-blue-100 transition-colors"
                  >
                    Decline
                  </button>
                </>
              ) : (
                <span className="text-xs font-bold text-[#00a472] flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span>Handled</span>
                </span>
              )}
            </div>
          </article>

          {/* Event 3: Card Declined: Luca at Online Gaming */}
          <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3 relative">
            {!readIds.includes('notif-3') && (
              <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-rose-500"></span>
            )}
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">block</span>
              </div>
              <div className="flex-1 min-w-0 pr-4">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-[#0b2a4a]">
                    Card Declined: Luca at Online Gaming
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">10:04</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Transaction of <strong>€19.99</strong> declined. Reason: Online gaming category is currently restricted in Luca's family controls.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-2">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                    Luca (Age 12)
                  </span>
                  <span>•</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200/60">
                    Security Rule Triggered
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('child_luca')}
              className="w-full py-2.5 rounded-2xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[16px]">shield</span>
              <span>Review Card Controls</span>
            </button>
          </article>
        </section>
      )}

      {/* YESTERDAY SECTION (Exact Image 4) */}
      {yesterdayNotifs.length > 0 && (
        <section className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
            <span>Yesterday</span>
            <span className="font-normal lowercase">{yesterdayNotifs.length} events</span>
          </div>

          {/* Event 4: Goal Milestone! 70% Funded */}
          <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#00a472] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">emoji_events</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-xs font-bold text-[#0b2a4a]">Goal Milestone! 70% Funded</h3>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800">
                      Saved
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">18:30</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Luca's <strong>'New Mountain Bike'</strong> vault reached €175.00! Parent match added +€12.50.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1.5">
                  <span className="text-slate-700 font-medium">Luca (Age 12)</span>
                  <span>•</span>
                  <span className="text-[#00a472] font-semibold">Target: €250.00</span>
                </div>
              </div>
            </div>

            {/* Mini Goal Card Thumbnail */}
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0b2a4a]">
                <span className="material-symbols-outlined text-[20px]">directions_bike</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0b2a4a] truncate">Mountain Bike Goal</span>
                  <span className="font-mono text-slate-600">€175.00 / €250</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-200 mt-1.5 overflow-hidden">
                  <div className="h-full bg-[#00a472] rounded-full" style={{ width: '70%' }}></div>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onShowToast("Congratulations sent to Luca's device!", "favorite")}
              className="w-full py-2 rounded-xl bg-blue-50 text-[#0b2a4a] text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-blue-100 transition-colors"
            >
              <span className="material-symbols-outlined text-[15px] text-rose-500">favorite</span>
              <span>Send Congrats &amp; Message</span>
            </button>
          </article>

          {/* Event 5: Task Completed: Clean Bedroom & Desk */}
          <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">task_alt</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between">
                  <h3 className="text-xs font-bold text-[#0b2a4a]">
                    Task Completed: Clean Bedroom &amp; Desk
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">16:45</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Sofia completed her weekly chore. Photo verification submitted. Reward: <strong>€4.00</strong>.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1.5">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    Sofia (Age 9)
                  </span>
                  <span>•</span>
                  <span>Weekly Habit</span>
                </div>
              </div>
            </div>

            {/* Photo Thumbnail */}
            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-100 flex items-center gap-3">
              <div className="w-12 h-10 rounded-xl bg-slate-200 relative overflow-hidden flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-400 text-[18px]">photo_camera</span>
              </div>
              <div>
                <span className="text-xs font-bold text-[#0b2a4a] block font-mono">
                  bedroom_tidy_proof.jpg
                </span>
                <span className="text-[10px] text-slate-400">Verified by camera at 16:42</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                onShowToast("Chore approved! €4.00 transferred into Sofia's Junior Pocket.", "check_circle");
              }}
              className="w-full py-2.5 rounded-2xl bg-[#0b2a4a] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs hover:bg-[#00152d]"
            >
              <span className="material-symbols-outlined text-[16px]">payments</span>
              <span>Review &amp; Pay €4.00</span>
            </button>
          </article>

          {/* Event 6: Card Purchase: €3.20 */}
          <article className="bg-white rounded-3xl p-4 shadow-2xs border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">storefront</span>
              </div>
              <div>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-xs font-bold text-[#0b2a4a]">Card Purchase: €3.20</h3>
                  <span className="text-[10px] text-slate-400 font-mono">13:10</span>
                </div>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Sofia tapped card at School Cafeteria. Account balance is €45.10.
                </p>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1">
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                    Sofia (Age 9)
                  </span>
                  <span>•</span>
                  <span>Contactless Debit</span>
                </div>
              </div>
            </div>
          </article>
        </section>
      )}

      {/* Bottom Preferences Banner (Exact Image 4) */}
      <button
        type="button"
        onClick={() => onNavigate('alert_settings')}
        className="w-full p-4 rounded-3xl bg-blue-50/80 border border-blue-200/80 flex items-center justify-between text-left hover:bg-blue-100/80 transition-all active:scale-[0.99] shadow-2xs"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white text-[#0b2a4a] flex items-center justify-center shrink-0 shadow-2xs">
            <span className="material-symbols-outlined text-[20px]">tune</span>
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#0b2a4a]">Notification Preferences &amp; Limits</h4>
            <p className="text-[11px] text-slate-500 mt-0.5">Customize push triggers for Luca &amp; Sofia</p>
          </div>
        </div>
        <span className="material-symbols-outlined text-slate-400 text-[18px]">arrow_forward</span>
      </button>
    </div>
  );
};
