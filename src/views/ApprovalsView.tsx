import React, { useState } from 'react';
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
  const [filterType, setFilterType] = useState<'all' | 'tasks' | 'money'>('all');
  const [inspectPhoto, setInspectPhoto] = useState<{ url: string; title: string; meta: string } | null>(null);
  const [revisionTask, setRevisionTask] = useState<TaskItem | null>(null);
  const [revisionFeedback, setRevisionFeedback] = useState('');

  const pendingTasks = tasks.filter((t) => t.status === 'pending_review');
  const pendingMoney = moneyRequests.filter((r) => r.status === 'pending');
  const totalCount = pendingTasks.length + pendingMoney.length;

  const handleSendRevision = () => {
    if (!revisionTask) return;
    onRejectTask(revisionTask.id);
    onShowToast(`Revision note sent to ${revisionTask.childName}: "${revisionFeedback || 'Please retidy and resubmit photo'}"`, 'edit_note');
    setRevisionTask(null);
    setRevisionFeedback('');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-20">
      {/* Title & Live Status Indicator */}
      <div className="pt-2 flex flex-col space-y-1">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#00a472] animate-pulse"></span>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Live Approval Queue
          </span>
        </div>
        <h1 className="text-2xl font-bold text-[#0b2a4a]">Approvals &amp; Requests</h1>
        <p className="text-xs text-slate-500">
          {totalCount > 0
            ? `${totalCount} item${totalCount > 1 ? 's' : ''} awaiting your sign-off`
            : 'All caught up! No pending approvals.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-[#eff4ff] p-1 rounded-xl">
        <button
          type="button"
          onClick={() => setFilterType('all')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterType === 'all'
              ? 'bg-white text-[#0b2a4a] shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          All ({totalCount})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('tasks')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterType === 'tasks'
              ? 'bg-white text-[#0b2a4a] shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          Tasks ({pendingTasks.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterType('money')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
            filterType === 'money'
              ? 'bg-white text-[#0b2a4a] shadow-xs'
              : 'text-slate-600 hover:text-[#0b2a4a]'
          }`}
        >
          Money ({pendingMoney.length})
        </button>
      </div>

      {totalCount === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <span className="material-symbols-outlined text-[32px]">task_alt</span>
          </div>
          <h3 className="text-base font-bold text-[#0b2a4a]">Queue is empty!</h3>
          <p className="text-xs text-slate-500">All chores rewarded and top-ups reviewed.</p>
        </div>
      ) : null}

      {/* Pending Tasks Section */}
      {(filterType === 'all' || filterType === 'tasks') &&
        pendingTasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 space-y-3"
          >
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                  {task.childName === 'Luca' ? 'LB' : 'SB'}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b2a4a]">{task.childName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] uppercase font-bold text-[#00a472]">{task.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0b2a4a] truncate">{task.title}</h3>
                </div>
              </div>
              <span className="text-sm font-bold text-[#00a472] font-mono">{task.rewardText}</span>
            </div>

            {/* Photo verification attachment */}
            {task.photoUrl && (
              <div
                onClick={() =>
                  setInspectPhoto({
                    url: task.photoUrl || '',
                    title: task.title,
                    meta: `${task.childName} • Verified EXIF Metadata • Today 11:32 AM`,
                  })
                }
                className="relative rounded-xl overflow-hidden border border-slate-200 cursor-pointer group"
              >
                <img
                  src={task.photoUrl}
                  alt={task.title}
                  className="w-full h-40 object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-3">
                  <div className="flex items-center justify-between w-full text-white text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-emerald-400">
                        verified
                      </span>
                      <span className="truncate text-[11px]">{task.proofNote || 'Photo proof attached'}</span>
                    </div>
                    <span className="text-[10px] font-bold underline text-sky-200">Inspect</span>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => setRevisionTask(task)}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
              >
                Needs Fix / Revision
              </button>
              <button
                type="button"
                onClick={() => {
                  onApproveTask(task.id);
                  onShowToast(`Approved! €${task.rewardValue.toFixed(2)} sent to ${task.childName}!`, 'check_circle');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">check</span>
                <span>Accept {task.rewardText}</span>
              </button>
            </div>
          </div>
        ))}

      {/* Pending Money Requests Section */}
      {(filterType === 'all' || filterType === 'money') &&
        pendingMoney.map((req) => (
          <div
            key={req.id}
            className="p-4 bg-white rounded-2xl shadow-sm border border-slate-200/80 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#ffdad5]/60 text-[#ae3026] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px]">wallet</span>
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#0b2a4a]">{req.childName}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] uppercase font-bold text-slate-500">{req.category}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#0b2a4a]">Top-up Requested: €{req.amount.toFixed(2)}</h3>
                </div>
              </div>
              <span className="text-sm font-bold text-[#0b2a4a] font-mono">€{req.amount.toFixed(2)}</span>
            </div>

            <div className="p-3 bg-[#eff4ff] rounded-xl space-y-2">
              <p className="text-xs text-slate-700 italic">"{req.reason}"</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-blue-100">
                <span>Card Balance: €14.50</span>
                <span className="text-emerald-700 font-semibold">Remaining daily headroom: €17.60 (Safe)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  onDeclineMoney(req.id);
                  onShowToast(`Request declined. ${req.childName} notified.`, 'cancel');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-red-50 text-[#ba1a1a] text-xs font-bold transition-colors"
              >
                Decline
              </button>
              <button
                type="button"
                onClick={() => {
                  onApproveMoney(req.id);
                  onShowToast(`€${req.amount.toFixed(2)} transferred to ${req.childName}'s card!`, 'send_money');
                }}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#00a472] hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">send_money</span>
                <span>Pay €{req.amount.toFixed(2)}</span>
              </button>
            </div>
          </div>
        ))}

      {/* Inspection Lightbox Modal */}
      {inspectPhoto && (
        <div
          onClick={() => setInspectPhoto(null)}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl space-y-3"
          >
            <div className="p-3 flex items-center justify-between border-b border-slate-100">
              <span className="text-xs font-bold text-[#0b2a4a] truncate">{inspectPhoto.title}</span>
              <button
                type="button"
                onClick={() => setInspectPhoto(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <img
              src={inspectPhoto.url}
              alt={inspectPhoto.title}
              className="w-full max-h-[60vh] object-contain bg-slate-900"
            />

            <div className="p-3 bg-slate-50 flex items-center justify-between text-xs text-slate-600">
              <span>{inspectPhoto.meta}</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                Tamper-Free
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Revision Modal Sheet */}
      {revisionTask && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-1 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0b2a4a]">Request Revision</h3>
              <button
                type="button"
                onClick={() => setRevisionTask(null)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Provide feedback for <span className="font-bold">{revisionTask.childName}</span> on why
              "{revisionTask.title}" needs additional effort.
            </p>

            <div className="flex flex-wrap gap-1.5">
              {[
                'Needs tidier vacuuming',
                'Photo is blurry, please retake',
                'Forgot under the bed',
                'Almost there, empty the trash bin too',
              ].map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setRevisionFeedback(pill)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 text-[11px] font-medium text-slate-700"
                >
                  {pill}
                </button>
              ))}
            </div>

            <textarea
              rows={3}
              value={revisionFeedback}
              onChange={(e) => setRevisionFeedback(e.target.value)}
              placeholder="Type note to child..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-[#0b2a4a] focus:outline-none"
            />

            <button
              type="button"
              onClick={handleSendRevision}
              className="w-full py-3 rounded-xl bg-[#0b2a4a] text-white font-bold text-xs shadow-md active:scale-95"
            >
              Send Revision Notice to {revisionTask.childName}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
