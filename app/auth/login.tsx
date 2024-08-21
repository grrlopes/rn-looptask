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
import { useSpring, animated } from '@react-spring/native';

interface InputState {
  value: string;
  error: string;
}

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
    },
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
      surname: 'whale',
    };
    const log = await mutateAsync(auth);
    if (log.message) {
      storeUserToken(log.message.token);
    }
    logIn(log);
  };

  const emailSpring = useSpring({
    to: { scale: email.value ? 1.1 : 1 },
    config: { tension: 170, friction: 12 },
  });

  const slideDownAnimation = useSpring({
    from: { opacity: 0, translateY: -200 },
    to: { opacity: 1, translateY: 0 },
    config: { tension: 40, friction: 8, duration: 2500 },
  });

  const passwordSpring = useSpring({
    to: { scale: password.value ? 1.1 : 1 },
    config: { tension: 170, friction: 12 },
  });

  return (
    <>
      <View style={styles.TopBar} />
      <View style={styles.container}>
        <animated.View style={[slideDownAnimation, styles.animatedContainer]}>
          <animated.View style={{ transform: [{ scale: emailSpring.scale }] }}>
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
          </animated.View>
          <animated.View style={{ transform: [{ scale: passwordSpring.scale }] }}>
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
          </animated.View>
          <Button mode="contained" onPress={onLoginPressed} style={{ backgroundColor: "grey" }}>
            Login
          </Button>
        </animated.View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
  },
  input: {
    width: 310,
    marginBottom: 10,
  },
  TopBar: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    height: 60,
    backgroundColor: '#757575',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    borderTopWidth: 0.1,
    borderTopColor: '#ccc',
    paddingBottom: 4,
  },
  animatedContainer: {
    alignItems: 'center',
  },
});

export default Login;
