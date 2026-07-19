## Why

Currently the wallet icon inside BalanceCard on the Home screen is purely decorative — it looks tappable but does nothing. Users have no way to confirm their balance in a focused view without navigating away from Home. Adding a modal triggered by this icon closes the gap between visual affordance and behavior, following the same modal pattern already established by PayInResultModal.

## What Changes

- Make the wallet icon in BalanceCard tappable (add onIconPress prop)
- Create a new BalanceModal component that wraps the existing shared Modal
- Wire modal visibility state in HomeScreen
- Add local loading/error UI states to the modal (defensive — the underlying store is synchronous but the ACs require these states)
- Add unit tests for the new component/hook

## Capabilities

### New Capabilities
- balance-modal: Modal that displays the user's current available balance, triggered from the BalanceCard icon on Home

### Modified Capabilities

None — no existing spec changes.

## Non-goals

- No new Zustand stores, repositories, or infrastructure changes
- No changes to Portal / PortalProvider / the shared Modal component
- No changes to BalanceCard layout, balance formatting, or its existing data source
- No navigation changes
- No backend changes

## Impact

- src/presentation/components/home/BalanceCard.tsx — add onIconPress prop and TouchableOpacity wrapper around the wallet icon
- src/presentation/components/home/ — new file BalanceModal.tsx
- src/presentation/screens/home/HomeScreen.tsx — wire modal visibility state and render BalanceModal
- src/presentation/components/home/index.ts — update exports
