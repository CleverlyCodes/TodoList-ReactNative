import React, { useEffect, useState } from 'react';
import {
  Alert,
} from 'react-native';

import Auth from './screens/AuthScreen';
import Task from './screens/TaskScreen';

import * as LocalAuthentication from 'expo-local-authentication';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
  });

  function onAuthenticate () {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate first...",
      fallbackLabel: "Enter Password",
    });

    auth.then(result => {
      setIsAuthenticated(result.success);

      if (result.error) {
        Alert.alert("Login Failed!");
      } 
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
