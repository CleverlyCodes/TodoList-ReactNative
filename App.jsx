import React, { useEffect, useState } from 'react';
import {
  Alert,
} from 'react-native';

import { 
  setIsBiometricSupported,
  hasHardwareAsync,
  authenticateAsync
} from 'expo-local-authentication';

import Auth from './screens/AuthScreen';
import Task from './screens/TaskScreen';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // always checks if device supports biometrics
    (async () => {
      try {
        const compatible = await hasHardwareAsync();
        await setIsBiometricSupported(compatible);
      }
      catch(error) {
        // fail silently
        console.log(`Authentication: ${error}`);
      }
    })();
  });

  /**
  * Handles authentication using expo-local-authentication
  */
  function onAuthenticate() {
    const auth = authenticateAsync({
      promptMessage: 'Authenticate first...',
      fallbackLabel: 'Enter Password',
    });

    auth.then((result) => {
      setIsAuthenticated(result.success);

      if (result.error) {
        Alert.alert(`Login failed: ${result.error}`);
      }
    }).catch((error) => {
      console.error(`Authentication Failed: ${error}`);
    });
  }

  return (
    <>
      { 
        isAuthenticated ? <Task /> : <Auth onAuthenticate={onAuthenticate} /> 
      }
    </>
  );
}
