import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/button/Button';
import { emailValidator } from '@/helper/emailValidator';
import { passwordValidator } from '@/helper/passwordValidator';

type InputState = {
  value: string;
  error: string;
};

const Login: React.FC = () => {
  const [email, setEmail] = useState<InputState>({ value: '', error: '' });
  const [password, setPassword] = useState<InputState>({ value: '', error: '' });

  const onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={(text) => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoComplete="email"
          textContentType="emailAddress"
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={(text) => setPassword({ value: text, error: '' })}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={onLoginPressed} style={{ backgroundColor: "grey" }}>
          Login
        </Button>
      </View >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center"
  },
  input: {
    width: 310
  }
});

export default Login;
