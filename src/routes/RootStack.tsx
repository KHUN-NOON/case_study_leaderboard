import MainStack from "./MainStack"
import { NavigationContainer } from "@react-navigation/native"
import CustomStatusBar from "../components/CustomStatusBar"
import MainTheme from "../themes/MainTheme"

const RootStack = () => {
    return (
        <NavigationContainer theme={MainTheme}>
            <CustomStatusBar/>
            <MainStack/>
        </NavigationContainer>
    )
}

export default RootStack