import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { FridgeContextProvider } from './components/FridgeContext';

import NavbarTabs from './components/NavbarTabs';

export default function App() {
  return (
    <FridgeContextProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <NavbarTabs />
        </NavigationContainer>
      </NativeBaseProvider>
    </FridgeContextProvider>
  );
}
