## ADDED Requirements

### Requirement: User can view balance from Home screen icon
The system SHALL display a modal showing the user's current available balance when they tap the wallet icon on the BalanceCard. The modal SHALL reuse the existing shared Modal component and the same data source (userInformationStorage) as BalanceCard.

#### Scenario: Open modal from icon tap
- **WHEN** user taps the wallet icon on BalanceCard in Home screen
- **THEN** a modal opens displaying the user's current available balance

#### Scenario: Close modal
- **WHEN** user taps outside the modal content or taps a close button
- **THEN** the modal closes and user returns to Home screen without full page reload

#### Scenario: Loading state while balance is not ready
- **WHEN** the modal opens but balance data is not yet available
- **THEN** the modal shows a loading indicator instead of blank or undefined content

#### Scenario: Error state when balance fails to load
- **WHEN** the modal opens and balance retrieval fails
- **THEN** the modal shows a readable error message instead of crashing or showing empty content

#### Scenario: Updated balance on re-open
- **WHEN** user closes the modal and taps the icon again
- **THEN** the modal displays the most up-to-date balance
