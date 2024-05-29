import { View, Pressable, StyleSheet } from "react-native"
import IonIcons from 'react-native-vector-icons/Ionicons'
import { useAppDispatch, useAppSelector } from "../redux/store"
import { bottomSheetToggleThunk } from "../redux/thunks/bottomSheetThunk"

const CustomSearchFilter = () => {
    const bottomSheet = useAppSelector(state => state.bottomsheet)
    const dispatch = useAppDispatch()

    const styles = styling()

    function handleFilter() {
        dispatch(bottomSheetToggleThunk())
    }

    return (
        <View style={styles.filterContainer}>
            <Pressable
                onPress={handleFilter}
            >
                <IonIcons name="filter-sharp" size={25}/>
            </Pressable>
            {/* <Pressable
                style={styles.filterbtn}
                onPress={handleFilter}
            >
                <Text style={styles.filtertext}>Top 10</Text>
            </Pressable>
            <Pressable
                style={styles.filterbtn}
            >
                <Text style={styles.filtertext}>Name Asc</Text>
            </Pressable> */}
        </View>
    )
}

const styling = () => (
    StyleSheet.create({
        filterContainer: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 8,
            marginLeft: 5,
            columnGap: 10
        },
        filterbtn: {
            borderWidth: 1,
            borderRadius: 20,
            paddingVertical: 5,
            paddingHorizontal: 8
        },
        filtertext: {
            fontWeight: 'bold'
        }
    })
)

export default CustomSearchFilter