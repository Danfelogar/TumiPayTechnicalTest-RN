## 1. BalanceCard — add onIconPress prop

- [ ] 1.1 Add optional onIconPress prop to BalanceCardProps interface
- [ ] 1.2 Wrap the wallet icon View in a TouchableOpacity that calls onIconPress on press
- [ ] 1.3 Export updated BalanceCard from presentation/components/home/index.ts

## 2. BalanceModal — create new component

- [ ] 2.1 Create BalanceModal.tsx in src/presentation/components/home/
- [ ] 2.2 Implement component wrapping shared Modal with visibility/handleDismiss props
- [ ] 2.3 Add LoadState type (idle | loading | success | error) as local state
- [ ] 2.4 On mount: set loading -> read available_balance from userInformationStorage -> set success (or error defensively)
- [ ] 2.5 Render loading state (ActivityIndicator), success state (formatted balance via formatAmount), and error state (readable message)
- [ ] 2.6 Export BalanceModal from presentation/components/home/index.ts

## 3. HomeScreen — wire modal visibility

- [ ] 3.1 Add isBalanceModalOpen useState (boolean, default false) to HomeScreen
- [ ] 3.2 Pass onIconPress to BalanceCard that sets isBalanceModalOpen = true
- [ ] 3.3 Render BalanceModal inside HomeScreen with visibility={isBalanceModalOpen} and handleDismiss that sets it back to false

## 4. Unit tests

- [ ] 4.1 Write tests for BalanceModal: renders loading state on mount, renders balance on success, renders error on failure, calls handleDismiss on close
- [ ] 4.2 Write tests for BalanceCard: onIconPress is called when icon is tapped

## 5. Documentation

- [ ] 5.1 Update Home screen section in README with new modal behavior
