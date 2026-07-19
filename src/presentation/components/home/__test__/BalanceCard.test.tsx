import { render, fireEvent } from '@testing-library/react-native';

const mockUserInformationStorage = jest.fn(
  (selector: (state: any) => any) =>
    selector({
      userDetails: { available_balance: 99.5 },
    }),
);

jest.mock('../../../../infrastructure/storage/mmkv', () => ({
  userInformationStorage: (selector: (state: any) => any) =>
    mockUserInformationStorage(selector),
}));

jest.mock('../../../../shared', () => {
  const React = require('react');
  return {
    BodyText: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    LabelText: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    TitleText: ({ children }: { children: React.ReactNode }) =>
      React.createElement(React.Fragment, null, children),
    formatAmount: (amount: number, status: string) =>
      `${status === 'FAILED' ? '-' : '+'}$${amount.toFixed(2)}`,
    useAppTheme: () => ({
      colors: {
        surface: '#fff',
        onSurfaceVariant: '#666',
        primaryContainer: '#E8DEF8',
        primary: '#6200ee',
        onSurface: '#000',
        onPrimary: '#fff',
      },
    }),
    widthFullScreen: 375,
  };
});

jest.mock('../../../screens', () => ({
  HOME_STRINGS: {
    availableBalance: 'Available Balance',
    topUp: 'Top Up',
    send: 'Send',
  },
}));

import { BalanceCard } from '../BalanceCard';

describe('BalanceCard', () => {
  it('calls onIconPress when the wallet icon button is pressed', () => {
    const onIconPress = jest.fn();
    const { getByTestId } = render(
      <BalanceCard onIconPress={onIconPress} />,
    );

    fireEvent.press(getByTestId('wallet-icon-button'));
    expect(onIconPress).toHaveBeenCalledTimes(1);
  });

  it('does not crash when onIconPress is not provided', () => {
    const { getByTestId } = render(<BalanceCard />);

    expect(() =>
      fireEvent.press(getByTestId('wallet-icon-button')),
    ).not.toThrow();
  });
});
