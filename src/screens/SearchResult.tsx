import ViewContainer from "../components/ViewContainer"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { useEffect } from "react"
import { getLeaderboard, getLowestRankThunk } from "../redux/thunks/leaderboardThunk"
import ListCard from "../components/ListCard"
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native"
import { MainStackParamList } from "../routes/types"
import { StackScreenProps } from "@react-navigation/stack"
import CustomSearchFilter from "../components/CustomSearchFilter"
import CustomBottomSheet from "../components/CustomBottomSheet"
import { filterType, sortNameType } from "../redux/reducers/leaderboardReducer"
import { leaderSortByNameAsc, leaderSortByNameDsc } from "../redux/actions/leaderboardActions"
import { bottomSheetToggleThunk } from "../redux/thunks/bottomSheetThunk"

type SearchResultScreenProps = StackScreenProps<MainStackParamList, 'Search Result'>

interface Props extends SearchResultScreenProps {}

const SearchResult = (props: Props) => {
    const leaderboard = useAppSelector(state => state.leaderboard)

    const { route } = props

    const dispatch = useAppDispatch()

    const styles = styling()

    useEffect(() => {
        if ( route.params ) {
            dispatch(getLeaderboard(route.params))
        }
    }, [getLeaderboard, route.params, dispatch])

    function handleFilterChange(filter: filterType) {
        if ( filter === filterType.TOP_TEN && route.params ) {
            dispatch(getLeaderboard(route?.params))
        } else {
            dispatch(getLowestRankThunk())
        }

        dispatch(bottomSheetToggleThunk())
    }

    function handleSortByNameChange(sortByName: sortNameType) {
        if ( sortNameType.ASCENDING === sortByName ) {
            dispatch(leaderSortByNameAsc())
        } else {
            dispatch(leaderSortByNameDsc())
        }

        dispatch(bottomSheetToggleThunk())
    }

    return (
        <>
            <ViewContainer>
                <CustomSearchFilter/>
                <FlatList
                    style={{ marginVertical: 8 }}
                    data={leaderboard.data ?? []}
                    renderItem={(props) => <ListCard key={props.index} {...props}/>}
                    keyExtractor={(item) => item.uid}
                />
            </ViewContainer>
            <CustomBottomSheet>
                <View
                    style={[styles.filterContainer]}
                >
                    <View
                        style={[styles.filterComponent]}
                    >
                        <Text style={[styles.title]}>
                            Filter By
                        </Text>
                        <View style={[styles.filterBtnContainer]}>
                            <>
                                {
                                    Object.values(filterType).map((value, key) => (
                                        <Pressable key={key} style={[styles.pressableBtn, { borderColor: leaderboard.filter === value ? 'green' : 'grey' }]}
                                            onPress={() => handleFilterChange(value)}
                                        >
                                            <Text
                                                style={{ color: leaderboard.filter === value ? 'green' : 'grey' }}
                                            >
                                                {value}
                                            </Text>
                                        </Pressable>         
                                    ))
                                }
                            </>
                        </View>
                    </View>
                    <View
                        style={[styles.filterComponent]}
                    >
                        <Text style={[styles.title]}>
                            Sort By Name
                        </Text>
                        <View style={[styles.filterBtnContainer]}>
                            <>
                                {
                                    Object.values(sortNameType).map((value, key) => (
                                        <Pressable key={key} style={[styles.pressableBtn, { borderColor: leaderboard.sortByName === value ? 'green' : 'grey' }]}
                                            onPress={() => handleSortByNameChange(value)}
                                        >
                                            <Text
                                                style={{ color: leaderboard.sortByName === value ? 'green' : 'grey' }}
                                            >
                                                {value}
                                            </Text>
                                        </Pressable>         
                                    ))
                                }
                            </>
                        </View>
                    </View>
                </View>
            </CustomBottomSheet>
        </>
    )
}

const styling = () => (
    StyleSheet.create({
        filterContainer: {
            marginTop: 8
        },
        filterComponent: {
            display: 'flex',
            marginBottom: 10
        },
        filterBtnContainer: {
            display: 'flex',
            flexDirection: 'row',
            columnGap: 15,
            marginVertical: 10
        },
        title: {
            fontSize: 16, 
            fontWeight: 'bold'
        },
        pressableBtn: {
            padding: 8,
            borderWidth: 1,
            borderRadius: 20
        }
    })
)

export default SearchResult