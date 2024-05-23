import { Provider as ReduxProvider } from "react-redux"
import store from "./src/redux/store"
import RootStack from "./src/routes/RootStack"
import { SafeAreaProvider } from "react-native-safe-area-context"

function App() {
  return (
    <ReduxProvider store={store}>
      <SafeAreaProvider>
        <RootStack/>
      </SafeAreaProvider>
    </ReduxProvider>
  )
}

export default App