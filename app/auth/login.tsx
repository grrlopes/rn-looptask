import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextInput as TxtInput } from 'react-native-paper';
import TextInput from '@/components/input/TextInput';
import Button from '@/components/button/Button';
import { emailValidator } from '@/helper/emailValidator';
import { passwordValidator } from '@/helper/passwordValidator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { doLogin } from '@/api/label';
import { storeUserToken } from '@/store/persistor';
import { Authentication, LogIn } from '@/interfaces/auth';

interface InputState {
  value: string;
  error: string;
};

interface Props {
  logIn(log: LogIn): void;
}

const Login: React.FC<Props> = ({ logIn }) => {
  const [email, setEmail] = useState<InputState>({ value: '', error: '' });
  const [password, setPassword] = useState<InputState>({ value: '', error: '' });
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const client = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: (auth: Authentication) => doLogin(auth),
    onSuccess: () => {
      client.invalidateQueries();
    }
  });

  const onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    const auth: Authentication = {
      email: email.value,
      password: password.value,
      name: 'baleia',
      surname: 'whale'
    }
    const log = await mutateAsync(auth);
    if (log.message) {
      storeUserToken(log.message.token)
    }
    logIn(log)
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
          secureTextEntry={!passwordVisible}
          right={
            <TxtInput.Icon
              icon={passwordVisible ? 'eye-off' : 'eye'}
              onPress={togglePasswordVisibility}
            />
          }
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
