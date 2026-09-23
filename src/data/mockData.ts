import { ChildAccount, TaskItem, MoneyRequestItem, TransactionItem, SpendingLimitsConfig, ChildAppFeatures } from '../types';

export const PARENT_PROFILE = {
  name: 'Maria Borg',
  email: 'maria.borg@heritage-client.com',
  phone: '+356 99•• ••21',
  cif: '•••••••• 8492',
  avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxoLX5St_XFlgZkq93tO8_dvSF8s5gbWvehIhsL28a77MPhKVpQ34-U5GKYJUurH2bYBjv7qLEmnfibIblo0lqjHzUxtkE206fL4nqbzNrJf-_jg1pBxCzBCOL4aPF2YVwS2Y7HJr2M4fVE6J0_KAn-upb0a1CyHkYxOXaGwggLjAUCZo4bZm6-WLb1Ngv6ZNph9nQZV5b-QvByZQquweQQuv0zDp9jlGgS7ThgTMUahNXJ-NGx9r9ew',
  primaryAccount: {
    name: "Maria's Everyday Checking",
    iban: 'MT88 HERI 0100 0048 2901 8492',
    last4: '1904',
    balance: 4820.50,
  }
};

export const INITIAL_CHILDREN: ChildAccount[] = [
  {
    id: 'luca',
    name: 'Luca Borg',
    age: 12,
    initials: 'LB',
    tier: 'Junior',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_bQ9OLZc4Eve5Msr7qn0C3RVOdzJUSKl2H-VoWFQ9QjlzS5pfQ9bORxtqYg5iZb0SpxOm-MfmDZQM0cSySeEf-02U1BO9rvo9gwhwkup7aiJm-ZIwmKPnbxoq2nw8vE84Sa5T1BZzIoKKhy1zv8HiVjgNEZUqAUTK74cJ-TK3_Fyot2Zgq95WGwWgVD9O6aDbicDnNIGfMPDjCWphnb88cvcTUYz2Ox7MXRRCtxPfZNF9M_gFdomUlA',
    cardLast4: '4829',
    balance: 142.50,
    scheduledAllowance: 15.00,
    isCardActive: true,
    onlinePaymentsEnabled: true,
    contactlessEnabled: true,
    atmEnabled: false,
    weeklySpendLimit: 50.00,
    weeklySpent: 35.00,
    allowanceSchedule: '€15.00 every Friday',
    device: 'iPhone 13 • iOS 17.4',
    cif: '0094-LU-88',
    iban: 'MT88 •••• 4819',
  },
  {
    id: 'sofia',
    name: 'Sofia Borg',
    age: 9,
    initials: 'SB',
    tier: 'Saver',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPUfNVlnL9FE_YnXbmkx1LOqGl7jUxTUjttZGqxB7Ywt9nJuNGjj-i23y1Ta1tDkFSe_V07P7ODQnbTbmr81dhgKYgPJ9EJ7pOhjrErp51NeOZDsDgWrIQe8r6OG295cZ1kswwmyHvsY_NnBcSj85XdsLu-zLLjQbBWCfdp_WfNy7pKt3dwrt18SbkGxxrK2NM7w0rffgp8FfP5puCdABp897jk4YuAtBCYTGEekNZAsI5jYXi4P0IbQ',
    cardLast4: '7104',
    balance: 85.00,
    scheduledAllowance: 10.00,
    isCardActive: true,
    onlinePaymentsEnabled: true,
    contactlessEnabled: true,
    atmEnabled: false,
    weeklySpendLimit: 30.00,
    weeklySpent: 12.00,
    allowanceSchedule: '€10.00 every Friday',
    device: "Sofia's iPad Mini",
    cif: '0094-SO-12',
    iban: 'MT88 •••• 9231',
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    childId: 'luca',
    childName: 'Luca',
    title: 'Clean Bedroom & Organize Desk',
    rewardText: '+€3.00',
    rewardValue: 3.00,
    rewardType: 'money',
    status: 'pending_review',
    dueDate: 'Today, 11:30 AM',
    category: 'Household',
    hasPhotoProof: true,
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBF9yLBANWdS5RQY0-FhDqLCpLIqaZ1eM2hWMuKVb0A66JDZTXaJSchr2fhyDnkh1NDPBY19j4PPxrlk-9Bo4yLqG-ny4SoA8UK9XbchQorALhMnrUSojnZNYcrjxqUocA39WjProWRcVj3L5gOyQc6uBFhaWZBZWTq0R0_8l1UyLXYrMDWvU82BZgPo8GdndcJDSRCeg1gJ2gdkggc4GNiNcC6Vg6IU-y6lG0-ONiZAOeXex4o4wmqFg',
    proofNote: '“Cleaned shelves and vacuumed carpet!” Verified EXIF',
  },
  {
    id: 'task-2',
    childId: 'sofia',
    childName: 'Sofia',
    title: 'Help Empty the Dishwasher',
    rewardText: '+€1.50',
    rewardValue: 1.50,
    rewardType: 'money',
    status: 'pending_review',
    dueDate: 'Today, 1:15 PM',
    category: 'Kitchen',
    hasPhotoProof: false,
    proofNote: "Self-marked completed on Sofia's tablet",
  },
  {
    id: 'task-3',
    childId: 'luca',
    childName: 'Luca',
    title: 'Finish 45 mins Math Practice',
    rewardText: '€2.00',
    rewardValue: 2.00,
    rewardType: 'money',
    status: 'in_progress',
    dueDate: 'Due Tomorrow',
    category: 'Study',
    hasPhotoProof: true,
    photoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFGXFC3zuRQwWYgoRnnwYVkpGY0H029FH1K4Ukw7UVv1LFvA-045795Ek9mZFK5mjXEYdmTT5FznVmdfkF3ef96lzHkKAahC1unL4LF174Tkilv9JmbZfhqweRK93rbHK6Mf7-Pm-38OBHNqWnnb_QKKAjOCWcwGyWwyqB54FybSuRoJ8du6-5yjC-mQq4jlkEGpFYfhvck2BgQ0EjcgWfCovzVBBpxjA2VUTVMh9NcSNLvxNa84qUQg',
    timerProgress: '25 / 45m',
  },
  {
    id: 'task-4',
    childId: 'sofia',
    childName: 'Sofia',
    title: 'Walk Max the Dog (afternoon)',
    rewardText: '€2.00',
    rewardValue: 2.00,
    rewardType: 'money',
    status: 'in_progress',
    dueDate: 'Due Today, 5:00 PM',
    category: 'Pet Care',
    hasPhotoProof: false,
    proofNote: 'Leash + Treats Ready',
  },
  {
    id: 'task-5',
    childId: 'luca',
    childName: 'Luca',
    title: 'Read 3 Chapters of History Book',
    rewardText: '€2.50',
    rewardValue: 2.50,
    rewardType: 'money',
    status: 'in_progress',
    dueDate: 'Due Sunday',
    category: 'Reading',
    hasPhotoProof: false,
    timerProgress: 'Ch. 4 – 6',
  }
];

export const INITIAL_MONEY_REQUESTS: MoneyRequestItem[] = [
  {
    id: 'req-1',
    childId: 'luca',
    childName: 'Luca Borg',
    amount: 8.00,
    category: 'Stationery',
    reason: 'Need to buy a geometry set and sketchbook at the school bookstore today.',
    timestamp: 'Today at 08:14',
    status: 'pending'
  }
];

export const INITIAL_TRANSACTIONS: TransactionItem[] = [
  {
    id: 'tx-1',
    childName: 'Luca',
    merchant: 'Waterstones Books',
    category: 'Education & Reading',
    timestamp: 'Today, 14:20',
    amount: -12.40,
    paymentMethod: 'Physical Card',
    icon: 'menu_book'
  },
  {
    id: 'tx-2',
    childName: 'Sofia',
    merchant: 'Gusto Gelato Parlour',
    category: 'Treats & Snacks',
    timestamp: 'Yesterday, 16:45',
    amount: -4.50,
    paymentMethod: 'Contactless',
    icon: 'icecream'
  },
  {
    id: 'tx-3',
    childName: 'Luca',
    merchant: 'Weekly Allowance Deposit',
    category: 'Automatic Transfer',
    timestamp: 'Oct 18, 08:00',
    amount: 15.00,
    paymentMethod: 'Standing Order',
    icon: 'autorenew'
  },
  {
    id: 'tx-4',
    childName: 'Luca',
    merchant: 'Completed "Math Practice"',
    category: 'Chore Reward Paid',
    timestamp: 'Oct 17, 18:30',
    amount: 2.00,
    paymentMethod: 'Instant Bonus',
    icon: 'school'
  }
];

export const INITIAL_SPENDING_LIMITS: SpendingLimitsConfig = {
  dailySpend: 30.00,
  singleTx: 15.00,
  monthlyCap: 150.00,
  onlinePurchase: 20.00,
  requireApprovalAbove: true,
  approvalCeiling: 10.00,
  atmWithdrawals: false,
  internationalTx: false
};

export const INITIAL_APP_CONFIG: ChildAppFeatures = {
  balance: true,
  history: true,
  request: true,
  goals: true,
  tasks: true,
  card: true,
  payfriends: false,
  online: false
};
