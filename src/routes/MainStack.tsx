import { createStackNavigator } from "@react-navigation/stack"
import Home from "../screens/Home"
import SearchResult from "../screens/SearchResult"
import { MainStackParamList } from "./types"

const Stack = createStackNavigator<MainStackParamList>()

const MainStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home}/>
            <Stack.Screen name="Search Result" component={SearchResult}
                options={{
                    title: 'Leaderboard'
                }}
            />
        </Stack.Navigator>
    )
}

export default MainStack