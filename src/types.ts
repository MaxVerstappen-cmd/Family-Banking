export type ScreenId =
  | 'home'
  | 'family'
  | 'child_luca'
  | 'tasks'
  | 'approvals'
  | 'payments'
  | 'transfer_review'
  | 'transfer_success'
  | 'insights'
  | 'goals'
  | 'alerts'
  | 'alert_settings'
  | 'spending_limits'
  | 'configure_app'
  | 'onboarding_welcome'
  | 'onboarding_enrolment'
  | 'onboarding_link_profile'
  | 'onboarding_consent'
  | 'onboarding_invite'
  | 'onboarding_verify_device'
  | 'onboarding_bind_device';

export interface ChildAccount {
  id: string;
  name: string;
  age: number;
  initials: string;
  tier: string;
  avatarUrl: string;
  cardLast4: string;
  balance: number;
  scheduledAllowance: number;
  isCardActive: boolean;
  onlinePaymentsEnabled: boolean;
  contactlessEnabled: boolean;
  atmEnabled: boolean;
  weeklySpendLimit: number;
  weeklySpent: number;
  allowanceSchedule: string;
  device: string;
  cif: string;
  iban: string;
}

export interface TaskItem {
  id: string;
  childId: string;
  childName: string;
  title: string;
  rewardText: string;
  rewardValue: number;
  rewardType: 'money' | 'points' | 'custom';
  status: 'pending_review' | 'in_progress' | 'completed';
  dueDate: string;
  category: string;
  hasPhotoProof: boolean;
  photoUrl?: string;
  proofNote?: string;
  timerProgress?: string;
}

export interface MoneyRequestItem {
  id: string;
  childId: string;
  childName: string;
  amount: number;
  category: string;
  reason: string;
  timestamp: string;
  status: 'pending' | 'approved' | 'declined';
}

export interface TransactionItem {
  id: string;
  childName: string;
  merchant: string;
  category: string;
  timestamp: string;
  amount: number; // positive for credit, negative for debit
  isPending?: boolean;
  paymentMethod: string;
  icon: string;
}

export interface SpendingLimitsConfig {
  dailySpend: number;
  singleTx: number;
  monthlyCap: number;
  onlinePurchase: number;
  requireApprovalAbove: boolean;
  approvalCeiling: number;
  atmWithdrawals: boolean;
  internationalTx: boolean;
}

export interface ChildAppFeatures {
  balance: boolean;
  history: boolean;
  request: boolean;
  goals: boolean;
  tasks: boolean;
  card: boolean;
  payfriends: boolean;
  online: boolean;
}

export interface GoalItem {
  id: string;
  childId: string;
  title: string;
  category: string;
  icon: string;
  currentAmount: number;
  targetAmount: number;
  targetDate: string;
  weeksRemaining?: number;
  status: 'on_track' | 'needs_attention' | 'completed';
  statusLabel?: string;
  weeklyNeeded?: number;
  allowanceDeductionPercent?: number;
  allowanceDeductionAmount?: number;
  parentMatchEnabled: boolean;
  parentMatchPercent: number; // e.g. 50
  parentMatchMax: number; // e.g. 50
  totalMatchedSoFar: number;
  isArchived?: boolean;
}

export interface FamilyNotificationItem {
  id: string;
  type:
    | 'limit_warning'
    | 'money_request'
    | 'card_declined'
    | 'goal_milestone'
    | 'task_completed'
    | 'card_purchase';
  childName: string;
  childAge: number;
  childId: string;
  title: string;
  time: string;
  day: 'today' | 'yesterday';
  description: string;
  amount?: number;
  isRead: boolean;
  metadata?: Record<string, any>;
}
