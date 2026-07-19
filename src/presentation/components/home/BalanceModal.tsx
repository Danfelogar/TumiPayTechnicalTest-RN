import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { JSX } from 'react';
import { Button, Text } from 'react-native-paper';

import { userInformationStorage } from '../../../infrastructure/storage/mmkv';
import {
  colors,
  formatAmount,
  heightFullScreen,
  Modal,
  widthFullScreen,
} from '../../../shared';
import { HOME_STRINGS } from '../../screens';

type LoadState = 'loading' | 'success' | 'error' | 'idle';

interface BalanceModalProps {
  visibility: boolean;
  handleDismiss: () => void;
}

export const BalanceModal = ({
  visibility,
  handleDismiss,
}: BalanceModalProps): JSX.Element => {
  const [loadState, setLoadState] = useState<LoadState>('idle');
  const availableBalance = userInformationStorage(
    state => state.userDetails.available_balance,
  );

  useEffect(() => {
    if (visibility) {
      if (typeof availableBalance === 'number' && !isNaN(availableBalance)) {
        setLoadState('success');
      } else {
        setLoadState('error');
      }
    } else {
      setLoadState('loading');
    }
  }, [visibility, availableBalance]);

  return (
    <Modal visibility={visibility} handleDismiss={handleDismiss} dismissable>
      <View style={styles.blurWrapper}>
        <View style={styles.content}>
          {loadState === 'loading' && (
            <View style={styles.stateContainer}>
              <ActivityIndicator size={48} color={colors.primary} />
              <Text variant="titleMedium" style={styles.loadingTitle}>
                {HOME_STRINGS.balanceModalLoading}
              </Text>
            </View>
          )}

          {loadState === 'success' && (
            <View style={styles.stateContainer}>
              <Text variant="titleMedium" style={styles.balanceLabel}>
                {HOME_STRINGS.availableBalance}
              </Text>
              <Text variant="displaySmall" style={styles.balanceValue}>
                {formatAmount(availableBalance, '+').replace(/^\+/, '')}
              </Text>
              <Button
                mode="contained"
                onPress={handleDismiss}
                style={styles.closeButton}
                labelStyle={styles.closeButtonLabel}
              >
                {HOME_STRINGS.balanceModalClose}
              </Button>
            </View>
          )}

          {loadState === 'error' && (
            <View style={styles.stateContainer}>
              <Text variant="bodyLarge" style={styles.errorTitle}>
                {HOME_STRINGS.balanceModalError}
              </Text>
              <Button
                mode="outlined"
                onPress={handleDismiss}
                style={styles.closeButton}
              >
                {HOME_STRINGS.balanceModalClose}
              </Button>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  blurWrapper: {
    position: 'absolute',
    top: heightFullScreen * 0.25,
    left: widthFullScreen * 0.07,
    borderRadius: 20,
    overflow: 'hidden',
    width: '100%',
  },
  content: {
    padding: 32,
    backgroundColor: 'rgba(255,255,255,0.97)',
  },
  stateContainer: {
    alignItems: 'center',
    gap: 16,
  },
  loadingTitle: {
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  balanceLabel: {
    color: colors.onSurfaceVariant,
    textAlign: 'center',
  },
  balanceValue: {
    fontWeight: '700',
    color: colors.onSurface,
    textAlign: 'center',
    marginVertical: 8,
  },
  errorTitle: {
    color: colors.error,
    textAlign: 'center',
  },
  closeButton: {
    width: '100%',
    borderRadius: 50,
    marginTop: 8,
  },
  closeButtonLabel: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});
