import {
  Text,
  View,
  StyleSheet,
  Button,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default function Auth({onAuthenticate}) {
  return (
    <View style={styles.container}>
      <Text>Please authenticate first</Text>

      <Button
        title="Login"
        onPress={onAuthenticate}
      />
    </View>
  );
}