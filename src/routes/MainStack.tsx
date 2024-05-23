import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Home"
import SearchResult from "../screens/SearchResult"

const Stack = createStackNavigator()

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Search Result" component={SearchResult}/>
        </Stack.Navigator>
    )
}

export default MainStack