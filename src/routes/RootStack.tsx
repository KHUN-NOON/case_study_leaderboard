import MainStack from "./MainStack"
import { NavigationContainer } from "@react-navigation/native"
import CustomStatusBar from "../components/CustomStatusBar"

const RootStack = () => {
    return (
        <NavigationContainer>
            <CustomStatusBar/>
            <MainStack/>
        </NavigationContainer>
    )
}

export default RootStack