import React, { useState, useEffect } from 'react';
import { ScreenId, ChildAccount, TaskItem, MoneyRequestItem, TransactionItem } from './types';
import {
  INITIAL_CHILDREN,
  INITIAL_TASKS,
  INITIAL_MONEY_REQUESTS,
  INITIAL_TRANSACTIONS,
  PARENT_PROFILE,
} from './data/mockData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { Toast } from './components/Toast';

// Views
import { HomeView } from './views/HomeView';
import { FamilyView } from './views/FamilyView';
import { ChildDetailView } from './views/ChildDetailView';
import { TasksView } from './views/TasksView';
import { ApprovalsView } from './views/ApprovalsView';
import { PaymentsView } from './views/PaymentsView';
import { InsightsView } from './views/InsightsView';
import { SpendingLimitsView } from './views/SpendingLimitsView';
import { ConfigureAppView } from './views/ConfigureAppView';

// Onboarding Views
import { WelcomeView } from './views/onboarding/WelcomeView';
import { EnrolmentView } from './views/onboarding/EnrolmentView';
import { LinkProfileView } from './views/onboarding/LinkProfileView';
import { ConsentView } from './views/onboarding/ConsentView';
import { InviteChildView } from './views/onboarding/InviteChildView';
import { VerifyDeviceView } from './views/onboarding/VerifyDeviceView';
import { BindDeviceView } from './views/onboarding/BindDeviceView';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [childrenAccounts, setChildrenAccounts] = useState<ChildAccount[]>(INITIAL_CHILDREN);
  const [tasks, setTasks] = useState<TaskItem[]>(INITIAL_TASKS);
  const [moneyRequests, setMoneyRequests] = useState<MoneyRequestItem[]>(INITIAL_MONEY_REQUESTS);
  const [transactions, setTransactions] = useState<TransactionItem[]>(INITIAL_TRANSACTIONS);

  // Toast System
  const [toast, setToast] = useState<{ visible: boolean; message: string; icon?: string }>({
    visible: false,
    message: '',
    icon: 'check_circle',
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ visible: true, message, icon });
  };

  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  // Scroll to top on screen navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [currentScreen]);

  // Child update handler
  const handleUpdateChild = (childId: string, updates: Partial<ChildAccount>) => {
    setChildrenAccounts((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, ...updates } : c))
    );
  };

  // Task approve handler
  const handleApproveTask = (taskId: string) => {
    const target = tasks.find((t) => t.id === taskId);
    if (!target) return;

    // Mark task completed
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'completed' as const } : t))
    );

    // Deposit reward to child
    setChildrenAccounts((prev) =>
      prev.map((c) =>
        c.id === target.childId ? { ...c, balance: c.balance + target.rewardValue } : c
      )
    );

    // Add transaction
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        childName: target.childName,
        merchant: `Chore Bounty: ${target.title}`,
        category: 'Chore Reward Paid',
        timestamp: 'Just now',
        amount: target.rewardValue,
        paymentMethod: 'Instant Bonus',
        icon: 'task_alt',
      },
      ...prev,
    ]);
  };

  // Task reject / redo handler
  const handleRejectTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'in_progress' as const } : t))
    );
  };

  // Add new chore
  const handleAddTask = (newTask: Omit<TaskItem, 'id'>) => {
    const item: TaskItem = {
      ...newTask,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [item, ...prev]);
  };

  // Money request approve
  const handleApproveMoney = (reqId: string) => {
    const req = moneyRequests.find((r) => r.id === reqId);
    if (!req) return;

    setMoneyRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'approved' as const } : r))
    );

    setChildrenAccounts((prev) =>
      prev.map((c) => (c.id === req.childId ? { ...c, balance: c.balance + req.amount } : c))
    );

    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        childName: req.childName,
        merchant: `Requested: ${req.category}`,
        category: 'Emergency Top-Up',
        timestamp: 'Just now',
        amount: req.amount,
        paymentMethod: 'Parent Direct',
        icon: 'volunteer_activism',
      },
      ...prev,
    ]);
  };

  // Money request decline
  const handleDeclineMoney = (reqId: string) => {
    setMoneyRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'declined' as const } : r))
    );
  };

  // Send Money / Allowance
  const handleSendMoney = (
    childId: string,
    amount: number,
    note: string,
    isRecurring: boolean
  ) => {
    const child = childrenAccounts.find((c) => c.id === childId);
    if (!child) return;

    // Deduct from Parent Checking
    PARENT_PROFILE.primaryAccount.balance = Math.max(0, PARENT_PROFILE.primaryAccount.balance - amount);

    // Add to child
    setChildrenAccounts((prev) =>
      prev.map((c) => (c.id === childId ? { ...c, balance: c.balance + amount } : c))
    );

    // Add transaction record
    setTransactions((prev) => [
      {
        id: `tx-${Date.now()}`,
        childName: child.name.split(' ')[0],
        merchant: isRecurring ? 'Weekly Allowance' : note || 'Direct Parental Transfer',
        category: isRecurring ? 'Scheduled Allowance' : 'Parent Transfer',
        timestamp: 'Just now',
        amount: amount,
        paymentMethod: 'Instant Deposit',
        icon: isRecurring ? 'autorenew' : 'send_money',
      },
      ...prev,
    ]);
  };

  // Fast approve from Home chore review banner
  const handleApproveChoreFast = () => {
    const bedroomTask = tasks.find((t) => t.id === 'task-1');
    if (bedroomTask) {
      handleApproveTask(bedroomTask.id);
    }
  };

  const pendingApprovalsCount =
    tasks.filter((t) => t.status === 'pending_review').length +
    moneyRequests.filter((r) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans selection:bg-[#0b2a4a] selection:text-white">
      {/* Toast Notification */}
      <Toast visible={toast.visible} message={toast.message} icon={toast.icon} />

      {/* Persistent Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        pendingApprovalsCount={pendingApprovalsCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto pt-18 pb-20">
        {currentScreen === 'home' && (
          <HomeView
            childrenAccounts={childrenAccounts}
            transactions={transactions}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onUpdateChild={handleUpdateChild}
            onApproveChoreFast={handleApproveChoreFast}
          />
        )}

        {currentScreen === 'family' && (
          <FamilyView
            childrenAccounts={childrenAccounts}
            transactions={transactions}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'child_luca' && (
          <ChildDetailView
            child={childrenAccounts[0]}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onUpdateChild={handleUpdateChild}
          />
        )}

        {currentScreen === 'tasks' && (
          <TasksView
            tasks={tasks}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onApproveTask={handleApproveTask}
            onRejectTask={handleRejectTask}
            onAddTask={handleAddTask}
          />
        )}

        {currentScreen === 'approvals' && (
          <ApprovalsView
            tasks={tasks}
            moneyRequests={moneyRequests}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onApproveTask={handleApproveTask}
            onRejectTask={handleRejectTask}
            onApproveMoney={handleApproveMoney}
            onDeclineMoney={handleDeclineMoney}
          />
        )}

        {currentScreen === 'payments' && (
          <PaymentsView
            childrenAccounts={childrenAccounts}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
            onSendMoney={handleSendMoney}
          />
        )}

        {currentScreen === 'insights' && (
          <InsightsView
            childrenAccounts={childrenAccounts}
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'spending_limits' && (
          <SpendingLimitsView
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        )}

        {currentScreen === 'configure_app' && (
          <ConfigureAppView
            onNavigate={setCurrentScreen}
            onShowToast={showToast}
          />
        )}

        {/* Onboarding Flow */}
        {currentScreen === 'onboarding_welcome' && (
          <WelcomeView onNavigate={setCurrentScreen} />
        )}

        {currentScreen === 'onboarding_enrolment' && (
          <EnrolmentView onNavigate={setCurrentScreen} onShowToast={showToast} />
        )}

        {currentScreen === 'onboarding_link_profile' && (
          <LinkProfileView onNavigate={setCurrentScreen} onShowToast={showToast} />
        )}

        {currentScreen === 'onboarding_consent' && (
          <ConsentView onNavigate={setCurrentScreen} onShowToast={showToast} />
        )}

        {currentScreen === 'onboarding_invite' && (
          <InviteChildView onNavigate={setCurrentScreen} onShowToast={showToast} />
        )}

        {currentScreen === 'onboarding_verify_device' && (
          <VerifyDeviceView onNavigate={setCurrentScreen} onShowToast={showToast} />
        )}

        {currentScreen === 'onboarding_bind_device' && (
          <BindDeviceView onNavigate={setCurrentScreen} onShowToast={showToast} />
        )}
      </main>

      {/* Bottom Navigation */}
      <BottomNav
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        tasksBadgeCount={tasks.filter((t) => t.status === 'pending_review').length}
      />
    </div>
  );
}
