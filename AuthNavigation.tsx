import { View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SignedInStack, SignedOutStack } from './navigation';
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAppAuth } from './firebase';

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const userHandler = (user: User | null) =>
    user ? setCurrentUser(user) : setCurrentUser(null);

  useEffect(
    () => onAuthStateChanged(firebaseAppAuth, (user) => userHandler(user)),
    []
  );

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
