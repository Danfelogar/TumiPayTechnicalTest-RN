
const mockStore = { available_balance: 99.5 };

jest.mock('../../../../infrastructure/storage/mmkv', () => ({
  userInformationStorage: (selector: (state: any) => any) =>
    selector({ userDetails: { available_balance: mockStore.available_balance } }),
}));

jest.mock('react-native-paper', () => {
  const React = require('react');
  const { Text, TouchableOpacity } = require('react-native');
  return {
    Button: ({ children, onPress, ...props }: any) =>
      React.createElement(
        TouchableOpacity,
        { onPress, ...props },
        React.createElement(Text, {}, children) // Texto dentro del botón
      ),
    Text: ({ children, ...props }: any) =>
      React.createElement(Text, { ...props }, children),
  };
});

jest.mock('../../../../shared', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    __esModule: true,
    colors: {
      surface: '#fff',
      onSurfaceVariant: '#666',
      primaryContainer: '#E8DEF8',
      primary: '#6200ee',
      onSurface: '#000',
      onPrimary: '#fff',
      error: '#B00020',
    },
    formatAmount: jest.fn((amount: number, status: string) =>
      `${status === 'FAILED' ? '-' : ''}$${amount.toFixed(2)}`
    ),
    heightFullScreen: 800,
    widthFullScreen: 375,
    Modal: ({ children, visibility, handleDismiss, ...props }: any) =>
      visibility ? React.createElement(View, { ...props }, children) : null,
  };
});

jest.mock('../../../screens', () => ({
  HOME_STRINGS: {
    availableBalance: 'Available Balance',
    balanceModalLoading: 'Loading balance...',
    balanceModalClose: 'Close',
    balanceModalError: 'Could not load your balance. Please try again.',
  },
}));

import { render, fireEvent } from '@testing-library/react-native';
import React from 'react';
import { BalanceModal } from '../BalanceModal';

describe('BalanceModal', () => {
  beforeEach(() => {
    mockStore.available_balance = 99.5;
  });

  it('renders balance when data is available', () => {
    const { getByText } = render(
      <BalanceModal visibility={true} handleDismiss={jest.fn()} />,
    );

    expect(getByText('Available Balance')).toBeTruthy();
    expect(getByText('$99.50')).toBeTruthy();
  });

  it('renders close button that calls handleDismiss', () => {
    const handleDismiss = jest.fn();
    const { getByText } = render(
      <BalanceModal visibility={true} handleDismiss={handleDismiss} />,
    );

    fireEvent.press(getByText('Close'));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('renders error state when balance is not available', () => {
    mockStore.available_balance = undefined;

    const { getByText } = render(
      <BalanceModal visibility={true} handleDismiss={jest.fn()} />,
    );

    expect(
      getByText('Could not load your balance. Please try again.'),
    ).toBeTruthy();
  });

  it('does not render modal content when visibility is false', () => {
    const { queryByText } = render(
      <BalanceModal visibility={false} handleDismiss={jest.fn()} />,
    );

    expect(queryByText('Available Balance')).toBeNull();
    expect(queryByText('Close')).toBeNull();
  });
});
