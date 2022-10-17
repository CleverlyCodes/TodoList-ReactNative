import {
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {
  Button,
} from 'react-native-elements';
import { theme } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  appTitle: {
    fontSize: 20,
  },
  loginButtonStyle: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
});

export default function Auth({onAuthenticate}) {
  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>
        HomeMaker - Grocery v0.1
      </Text>

      <Button
        title="Login"
        buttonStyle={styles.loginButtonStyle}
        onPress={onAuthenticate}
      />
    </View>
  );
}