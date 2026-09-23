import React, { useState } from 'react';
import { ScreenId, TaskItem } from '../types';

interface TasksViewProps {
  tasks: TaskItem[];
  onNavigate: (screen: ScreenId) => void;
  onShowToast: (msg: string, icon?: string) => void;
  onApproveTask: (taskId: string) => void;
  onRejectTask: (taskId: string) => void;
  onAddTask: (newTask: Omit<TaskItem, 'id'>) => void;
}

export const TasksView: React.FC<TasksViewProps> = ({
  tasks,
  onNavigate,
  onShowToast,
  onApproveTask,
  onRejectTask,
  onAddTask,
}) => {
  const [filterChild, setFilterChild] = useState<'all' | 'luca' | 'sofia'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending_review' | 'in_progress' | 'completed'>('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Form State for new task
  const [newTitle, setNewTitle] = useState('');
  const [newChild, setNewChild] = useState<'luca' | 'sofia'>('luca');
  const [newReward, setNewReward] = useState('2.50');
  const [newCategory, setNewCategory] = useState('Household');
  const [requirePhoto, setRequirePhoto] = useState(true);

  const pendingReviewCount = tasks.filter((t) => t.status === 'pending_review').length;
  const inProgressCount = tasks.filter((t) => t.status === 'in_progress').length;
  const completedCount = tasks.filter((t) => t.status === 'completed').length;

  const filteredTasks = tasks.filter((t) => {
    if (filterChild !== 'all' && t.childId !== filterChild) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      childId: newChild,
      childName: newChild === 'luca' ? 'Luca' : 'Sofia',
      title: newTitle.trim(),
      rewardText: `+€${parseFloat(newReward || '2.00').toFixed(2)}`,
      rewardValue: parseFloat(newReward || '2.00'),
      rewardType: 'money',
      status: 'in_progress',
      dueDate: 'Due Today',
      category: newCategory,
      hasPhotoProof: requirePhoto,
    });

    setNewTitle('');
    setShowCreateModal(false);
    onShowToast(`New chore assigned to ${newChild === 'luca' ? 'Luca' : 'Sofia'}!`, 'add_task');
  };

  return (
    <div className="flex flex-col w-full px-4 space-y-5 pb-24">
      {/* Title & Context */}
      <div className="pt-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Family Chores Manager
          </span>
          <h1 className="text-2xl font-bold text-[#0b2a4a]">Tasks &amp; Chores</h1>
        </div>
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0b2a4a] text-white text-xs font-bold shadow-xs hover:bg-[#00152d] active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">add</span>
          <span>New Chore</span>
        </button>
      </div>

      {/* Bento Metric Cards */}
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => setFilterStatus(filterStatus === 'in_progress' ? 'all' : 'in_progress')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterStatus === 'in_progress'
              ? 'bg-[#eff4ff] border-blue-300 ring-2 ring-blue-400/20'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
            Active
          </span>
          <span className="text-2xl font-bold text-[#0b2a4a] leading-tight block mt-0.5">
            {inProgressCount}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">In progress</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus(filterStatus === 'pending_review' ? 'all' : 'pending_review')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterStatus === 'pending_review'
              ? 'bg-[#ffdad5]/60 border-rose-300 ring-2 ring-rose-400/20'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ae3026] truncate">
              Review
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#fc6959] animate-pulse"></span>
          </div>
          <span className="text-2xl font-bold text-[#ae3026] leading-tight block mt-0.5">
            {pendingReviewCount}
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">Needs sign-off</span>
        </button>

        <button
          type="button"
          onClick={() => setFilterStatus(filterStatus === 'completed' ? 'all' : 'completed')}
          className={`p-3 rounded-2xl border text-left transition-all ${
            filterStatus === 'completed'
              ? 'bg-emerald-50 border-emerald-300 ring-2 ring-emerald-400/20'
              : 'bg-white border-slate-200/80 shadow-xs'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block truncate">
            Done (Mo)
          </span>
          <span className="text-2xl font-bold text-[#00a472] leading-tight block mt-0.5">
            18
          </span>
          <span className="text-[10px] text-slate-500 mt-1 block">€42.00 earned</span>
        </button>
      </div>

      {/* Child Filter Tabs */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 bg-[#eff4ff] p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFilterChild('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterChild === 'all'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            All Family
          </button>
          <button
            type="button"
            onClick={() => setFilterChild('luca')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              filterChild === 'luca'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <span>Luca</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px]">3</span>
          </button>
          <button
            type="button"
            onClick={() => setFilterChild('sofia')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
              filterChild === 'sofia'
                ? 'bg-white text-[#0b2a4a] shadow-xs'
                : 'text-slate-600 hover:text-[#0b2a4a]'
            }`}
          >
            <span>Sofia</span>
            <span className="px-1.5 py-0.2 rounded-full bg-slate-100 text-[10px]">2</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => onNavigate('approvals')}
          className="text-xs font-bold text-[#fc6959] hover:opacity-80 transition-opacity flex items-center gap-0.5 whitespace-nowrap pl-1"
        >
          <span>Approvals Queue</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>

      {/* Awaiting Review Section (High Attention) */}
      {(filterStatus === 'all' || filterStatus === 'pending_review') && pendingReviewCount > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#ae3026] text-[20px]">pending_actions</span>
            <h2 className="text-sm font-bold text-[#0b2a4a]">Awaiting Parent Inspection</h2>
          </div>

          {filteredTasks
            .filter((t) => t.status === 'pending_review')
            .map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200/80 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                      {task.childName === 'Luca' ? 'LB' : 'SB'}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-[#0b2a4a]">{task.childName}</span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[11px] text-slate-500">{task.category}</span>
                      </div>
                      <h3 className="text-sm font-bold text-[#0b2a4a]">{task.title}</h3>
                    </div>
                  </div>
                  <span className="text-sm font-bold text-[#00a472] font-mono">{task.rewardText}</span>
                </div>

                {/* Attached Photo Proof */}
                {task.photoUrl && (
                  <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group">
                    <img
                      src={task.photoUrl}
                      alt="Verification Proof"
                      className="w-full h-36 object-cover cursor-pointer hover:scale-102 transition-transform duration-300"
                      onClick={() => setSelectedPhoto(task.photoUrl || null)}
                    />
                    <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1.5 rounded-lg bg-black/60 backdrop-blur-xs text-white text-[11px] flex items-center justify-between">
                      <span className="truncate">{task.proofNote}</span>
                      <button
                        type="button"
                        onClick={() => setSelectedPhoto(task.photoUrl || null)}
                        className="underline text-[10px] font-bold text-sky-300 shrink-0 ml-2"
                      >
                        Enlarge
                      </button>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onRejectTask(task.id);
                      onShowToast(`Chore sent back to ${task.childName} with revision note!`, 'replay');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    Redo / Revision
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onApproveTask(task.id);
                      onShowToast(`Task Approved! €${task.rewardValue.toFixed(2)} sent to ${task.childName}!`, 'check_circle');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0b2a4a] hover:bg-[#00152d] text-white text-xs font-bold shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[16px]">check</span>
                    <span>Approve &amp; Pay {task.rewardText}</span>
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* In-Progress Chores */}
      {(filterStatus === 'all' || filterStatus === 'in_progress') && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0b2a4a]">In-Progress Bounties</h2>
            <span className="text-xs text-slate-400">{inProgressCount} active</span>
          </div>

          <div className="space-y-2">
            {filteredTasks
              .filter((t) => t.status === 'in_progress')
              .map((task) => (
                <div
                  key={task.id}
                  className="p-3.5 bg-white rounded-2xl shadow-xs border border-slate-200/80 flex items-center justify-between hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-[#eff4ff] text-[#0b2a4a] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[20px]">
                        {task.category === 'Household'
                          ? 'cleaning_services'
                          : task.category === 'Study'
                          ? 'menu_book'
                          : task.category === 'Pet Care'
                          ? 'pets'
                          : 'assignment'}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          {task.childName}
                        </span>
                        <span className="text-slate-300">•</span>
                        <span className="text-[10px] text-slate-500">{task.dueDate}</span>
                      </div>
                      <h4 className="text-xs font-bold text-[#0b2a4a] truncate">{task.title}</h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 pl-2">
                    {task.timerProgress && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-50 text-blue-700">
                        {task.timerProgress}
                      </span>
                    )}
                    <span className="text-xs font-bold text-[#00a472] font-mono">{task.rewardText}</span>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Completed Chores */}
      {(filterStatus === 'all' || filterStatus === 'completed') && completedCount > 0 && (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-[#0b2a4a]">Recently Completed</h2>
            <span className="text-xs text-emerald-600 font-semibold">Verified</span>
          </div>

          {filteredTasks
            .filter((t) => t.status === 'completed')
            .map((task) => (
              <div
                key={task.id}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/60 flex items-center justify-between opacity-85"
              >
                <div className="flex items-center gap-2.5">
                  <span className="material-symbols-outlined text-[18px] text-emerald-600">check_circle</span>
                  <div>
                    <span className="text-xs font-semibold text-slate-800 line-through">
                      {task.title}
                    </span>
                    <p className="text-[10px] text-slate-400">{task.childName} • Paid</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-500 font-mono">{task.rewardText}</span>
              </div>
            ))}
        </div>
      )}

      {/* Floating Action Button (New Task) */}
      <div className="fixed bottom-20 right-4 z-30">
        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#fc6959] text-white font-bold text-xs shadow-lg hover:shadow-xl hover:opacity-95 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">add</span>
          <span>Create Task</span>
        </button>
      </div>

      {/* Create New Task Modal Drawer */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-[#00152d]/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-5 flex flex-col gap-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#fc6959]">add_task</span>
                <h3 className="text-base font-bold text-[#0b2a4a]">Assign New Chore</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              {/* Select Child */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1.5">Assign To</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewChild('luca')}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                      newChild === 'luca'
                        ? 'border-[#0b2a4a] bg-[#eff4ff] ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#0b2a4a] text-white flex items-center justify-center font-bold text-[10px]">
                      LB
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#0b2a4a] block">Luca Borg</span>
                      <span className="text-[10px] text-slate-500">12 yrs</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setNewChild('sofia')}
                    className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                      newChild === 'sofia'
                        ? 'border-[#0b2a4a] bg-[#eff4ff] ring-2 ring-blue-500/20'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-full bg-[#ae3026] text-white flex items-center justify-center font-bold text-[10px]">
                      SB
                    </div>
                    <div className="text-left">
                      <span className="text-xs font-bold text-[#0b2a4a] block">Sofia Borg</span>
                      <span className="text-[10px] text-slate-500">9 yrs</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Chore Title */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Chore Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tidy garage & fold laundry"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs text-[#0b2a4a] focus:outline-none focus:ring-2 focus:ring-[#0b2a4a]"
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Category</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {['Household', 'Study', 'Pet Care', 'Kitchen', 'Yard'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-colors ${
                        newCategory === cat
                          ? 'bg-[#0b2a4a] text-white'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reward Amount */}
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Bounty Reward (€)</label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-2.5 text-xs font-bold text-slate-400">€</span>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      required
                      value={newReward}
                      onChange={(e) => setNewReward(e.target.value)}
                      className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-[#0b2a4a] focus:outline-none focus:ring-2 focus:ring-[#0b2a4a]"
                    />
                  </div>
                  {['1.50', '2.00', '3.00', '5.00'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setNewReward(preset)}
                      className="px-2.5 py-2 rounded-lg bg-slate-100 text-xs font-bold text-slate-700 hover:bg-slate-200"
                    >
                      €{preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Require Photo Verification */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#eff4ff]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px] text-[#0b2a4a]">photo_camera</span>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#0b2a4a] block">Require Photo Proof</span>
                    <span className="text-[10px] text-slate-500">Child must snap a photo before completion</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setRequirePhoto(!requirePhoto)}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors relative flex items-center ${
                    requirePhoto ? 'bg-[#00a472]' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transform transition-transform ${
                      requirePhoto ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#0b2a4a] text-white font-bold text-xs shadow-md active:scale-95 transition-all"
              >
                Assign Chore &amp; Notify {newChild === 'luca' ? 'Luca' : 'Sofia'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="relative max-w-lg w-full bg-white rounded-2xl overflow-hidden shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center z-10"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
            <img src={selectedPhoto} alt="Proof Full Screen" className="w-full max-h-[70vh] object-contain" />
            <div className="p-3 bg-white text-center">
              <span className="text-xs font-bold text-[#0b2a4a]">Inspection Lightbox</span>
              <p className="text-[11px] text-slate-500">Clean desk photo with verified metadata</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
