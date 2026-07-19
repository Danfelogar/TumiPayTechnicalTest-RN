export const HOME_STRINGS = {
  // Balance Card
  availableBalance: 'Available Balance',
  topUp: 'Top Up',
  send: 'Send',
  // Summary Cards
  monthIncome: 'Month Income',
  spent: 'Spent',
  // Active Goals Card
  activeGoals: 'Active Goals',
  savingsCount: (count: number) => `${count} Savings`,
  // Recent Activity
  recentActivity: 'Recent Activity',
  seeAll: 'See All',
  // Balance Modal
  balanceModalLoading: 'Loading balance...',
  balanceModalClose: 'Close',
  balanceModalError: 'Could not load your balance. Please try again.',
  // Snackbar
  payInSubmittedSuccess: '✓ PayIn submitted successfully.',
  tapToView: 'Tap to view.',
  view: 'VIEW',
} as const;
