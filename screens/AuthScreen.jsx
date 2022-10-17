import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';
import { theme } from '../constants/Theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Auth({onAuthenticate}) {
  return (
    <View style={styles.container}>
      <Text>
        Please authenticate first
      </Text>

      <Button
        title="Login"
        onPress={onAuthenticate}
      />
    </View>
  );
}