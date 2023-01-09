import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { firebaseAppAuth } from '../../../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

//@ts-ignore
const LoginForm = ({ navigation }) => {
  const loginFormSchema = Yup.object().shape({
    email: Yup.string().email().required('An email is required'),
    password: Yup.string()
      .required()
      .min(6, 'Your password has to have at least ${min} characters'),
  });

  const onLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(firebaseAppAuth, email, password);
      console.log('firebase login successful', email, password);
    } catch (error: any) {
      console.log(error);
      Alert.alert(`My Lord...`, `Email not found or password is incorrect`, [
        {
          text: 'OK',
          onPress: () => console.log('OK'),
          style: 'cancel',
        },
        {
          text: 'Sign Up',
          onPress: () => navigation.push('SignupScreen'),
        },
      ]);
    }
  };

  return (
    <View style={styles.wrapper}>
      <Formik
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          onLogin(values.email, values.password);
        }}
        validationSchema={loginFormSchema}
        validateOnMount={true}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          isValid,
          errors,
        }) => (
          <>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.email.length < 1 || !errors.email ? '#ccc' : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor='#444'
                placeholder='Phone number, username or email'
                autoCapitalize='none'
                keyboardType='email-address'
                textContentType='emailAddress'
                autoFocus={true}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            <View
              style={[
                styles.inputField,
                {
                  borderColor:
                    values.password.length < 1 || !errors.password
                      ? '#ccc'
                      : 'red',
                },
              ]}
            >
              <TextInput
                placeholderTextColor='#444'
                placeholder='Password'
                autoCapitalize='none'
                autoCorrect={false}
                secureTextEntry={true}
                textContentType='password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
            </View>
            <View style={{ alignItems: 'flex-end', marginBottom: 30 }}>
              <Text style={{ color: '#6BB0F5' }}>Forgot password?</Text>
            </View>

            <Pressable
              //@ts-ignore
              style={styles.button(isValid)}
              onPress={() => handleSubmit()}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </Pressable>

            <View style={styles.signupContainer}>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.push('SignupScreen')}>
                <Text style={{ color: '#6BB0F5' }}> Sign Up</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 80,
  },
  inputField: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#FAFAFA',
    marginBottom: 10,
    borderWidth: 1,
  },
  //@ts-ignore
  button: (isValid: any) => ({
    backgroundColor: isValid ? '#0096F6' : '#9ACAF7',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 42,
    borderRadius: 4,
  }),

  buttonText: {
    fontWeight: '600',
    color: '#fff',
    fontSize: 20,
  },
  signupContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'center',
    marginTop: 50,
  },
});

export default LoginForm;
