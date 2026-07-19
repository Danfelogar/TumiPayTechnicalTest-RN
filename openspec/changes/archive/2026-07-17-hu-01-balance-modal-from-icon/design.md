## Context

The Home screen shows a BalanceCard with the user's available balance and a wallet icon (emoji). Currently that icon is purely decorative — not tappable. The project already has a portal-based Modal system (Modal + Portal + PortalProvider) used by PayInResultModal for showing PayIn results. The user's balance data lives in a Zustand store (userInformationStorage) persisted to MMKV, always available synchronously with no loading/error states.

## Goals / Non-Goals

**Goals:**
- Make the wallet icon in BalanceCard tappable to open a balance modal
- Create a BalanceModal component following the same pattern as PayInResultModal
- Add loading and error UI states to the modal (defensive — store is synchronous today)
- Ensure balance updates on re-open (reactivity from Zustand)
- Add unit tests for new logic

**Non-Goals:**
- No changes to the shared Modal, Portal, or PortalProvider
- No new stores, repositories, or infrastructure
- No changes to BalanceCard layout, formatAmount, or data fetching
- No navigation changes
- No backend changes

## Existing Components Reused

| Component | File | Props Used |
|---|---|---|
| Modal | src/shared/components/modal/Modal.tsx | visibility, handleDismiss, children, dismissable |
| BalanceCard | src/presentation/components/home/BalanceCard.tsx | onTopUp (existing), onSend (existing), onIconPress (new) |
| userInformationStorage | src/infrastructure/storage/mmkv/manager/userInformationStorage.ts | selector: state.userDetails.available_balance |
| formatAmount | src/shared/utils/formatAmount.ts | Same call as BalanceCard (value, '+').replace(/^\+/, '') |

## Decisions

### D1: Visibility state lives in HomeScreen
HomeScreen already orchestrates components and passes callbacks (onSend navigates to PayIn). Adding isBalanceModalOpen state here keeps BalanceCard presentational and follows existing patterns. A dedicated hook is not justified for a single boolean.

### D2: BalanceModal is a new component wrapping Modal
Follows the same pattern as PayInResultModal. The modal receives visibility/handleDismiss props and renders inside HomeScreen alongside BalanceCard. This keeps the modal self-contained, testable, and aligned with existing codebase conventions.

### D3: Loading and error states are implemented as local UI state
userInformationStorage has no loading/error flags — it is a synchronous MMKV-backed store. However, the ACs explicitly require these states. The design adds a local LoadState (idle | loading | success | error) inside BalanceModal that:

- Initializes as 'loading' on mount
- Transitions to 'success' once the store read resolves (immediately, since store is sync)
- Transitions to 'error' if reading fails (in practice unreachable)

This is a defensive pattern: the states exist in the component's contract so that if the store becomes async in the future (e.g., fetching from backend), the modal handles it correctly without changes. The justification is that shipping a component that accepts loading/error states but renders them unreachable is safer than shipping one that crashes when those states become possible.

### D4: Icon becomes tappable via onIconPress prop
A TouchableOpacity wraps the wallet icon View in BalanceCard. The new onIconPress prop propagates up to HomeScreen, which sets isBalanceModalOpen = true. This is consistent with how onSend and onTopUp already work.

## Data Flow

`
User taps icon
  -> BalanceCard.onIconPress()
    -> HomeScreen sets isBalanceModalOpen = true
      -> BalanceModal receives visibility = true
        -> Modal (shared) renders overlay + content
        -> BalanceModal reads userInformationStorage on mount
          -> If store responds: shows formatted balance
          -> Else (defensive): shows loading/error state
User taps outside or close
  -> Modal.handleDismiss()
    -> HomeScreen sets isBalanceModalOpen = false
      -> BalanceModal receives visibility = false
`

## Risks / Trade-offs

- [Low] Loading/error states are dead code today — they never trigger with the sync store. However, they fulfill the AC contract and future-proof the component. The cost is minimal (a few lines of conditional render + a LoadState type).
- [None] No migration risk — no existing behavior changes. BalanceCard gains a new optional prop (backward compatible).
- [None] No performance concern — Zustand selectors are reactive; re-opening the modal re-renders with current store value.

## Open Questions

None resolved.
