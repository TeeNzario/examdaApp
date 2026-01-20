import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { api } from './api';

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Request notification permissions
 */
export async function requestNotificationPermissions(): Promise<boolean> {
  try {
    // Check if device is physical (not simulator)
    if (!Device.isDevice) {
      console.warn('Notifications only work on physical devices');
      return false;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.warn('Failed to get notification permissions:', finalStatus);
      return false;
    }

    console.log('Notification permissions granted');
    return true;
  } catch (error) {
    console.error('Error requesting notification permissions:', error);
    return false;
  }
}

/**
 * Get device push token
 */
export async function getDevicePushToken(): Promise<string | null> {
  try {
    const token = await Notifications.getExpoPushTokenAsync();
    console.log('Got push token:', token.data);
    return token.data;
  } catch (error) {
    console.error('Failed to get push token:', error);
    return null;
  }
}

/**
 * Register device push token with server
 */
export async function registerPushToken(examId: number): Promise<void> {
  try {
    // First request permissions
    const hasPermission = await requestNotificationPermissions();
    if (!hasPermission) {
      console.warn('Cannot register push token without permissions');
      return;
    }

    const token = await getDevicePushToken();
    if (!token) {
      console.warn('No push token available');
      return;
    }

    const deviceId = Device.getDeviceId?.() || 'unknown';
    console.log('Registering push token for exam:', examId, 'token:', token);

    const response = await api('/push-tokens', {
      method: 'POST',
      body: JSON.stringify({
        examId,
        pushToken: token,
        deviceId,
      }),
    });

    console.log('Push token registered successfully:', response);
  } catch (error) {
    console.error('Failed to register push token:', error);
  }
}

/**
 * Setup notification listeners
 */
export function setupNotificationListeners() {
  console.log('Setting up notification listeners...');

  // Listen for notifications when app is in foreground
  const foregroundSubscription = Notifications.addNotificationReceivedListener(
    (notification) => {
      console.log('📱 Notification received in foreground:', notification);
    }
  );

  // Listen for notification taps
  const responseSubscription =
    Notifications.addNotificationResponseReceivedListener((response) => {
      console.log('👆 Notification tapped:', response);
      const examId = response.notification.request.content.data.examId;
      if (examId) {
        console.log('Navigate to exam:', examId);
      }
    });

  console.log('Notification listeners setup complete');

  return () => {
    foregroundSubscription.remove();
    responseSubscription.remove();
  };
}

