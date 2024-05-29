import { Provider as ReduxProvider } from "react-redux"
import store from "./src/redux/store"
import RootStack from "./src/routes/RootStack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GestureHandlerRootView } from 'react-native-gesture-handler'

function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <RootStack/>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ReduxProvider>
  )
}

export default App