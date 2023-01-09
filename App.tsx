import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthNavigation from './AuthNavigation';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { SignedInStack } from './navigation';
// import Navigation from './navigation';

export default function App() {
  //   const isLoadingComplete = useCachedResources();
  //   const colorScheme = useColorScheme();

  //   if (!isLoadingComplete) {
  //     return null;
  //   } else {
  return <AuthNavigation />;
  //   }
}
