import { useCallback, useEffect, useState } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import ViewContainer from "../components/ViewContainer"
import { useNavigation } from "@react-navigation/native"
import CustomTextInput from "../components/CustomTextInput"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { FormProvider, useForm } from "react-hook-form"
import CustomPressable from "../components/CustomPressable"
import { fuzzySearch, getFuzzySearchRanks, searchByName, User } from "../redux/thunks/leaderboardThunk"
import leaderboard from '../data/leaderboard.json'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

const Home = () => {
    const [ fuzzySearchs, setFuzzySearchs ] = useState<User[]>([])    

    const nav = useNavigation()

    const method = useForm({
        defaultValues: {
            query: ''
        }
    })

    const styles = styling()

    function handleFuzzySearch(value: string) {
        const results = fuzzySearch(leaderboard, value)

        const modResults = getFuzzySearchRanks(leaderboard, results)

        setFuzzySearchs(modResults)
    }

    function handleGo() {
        const value = method.getValues('query')

        const search = searchByName(leaderboard, value)
        
        if ( search ) {
            nav.navigate('Search Result', search)
        } else {
            showAlert()
        }
    }

    function showAlert() {
        return (
            Alert.alert(
                'Alert!',
                'This user name does not exist! Please specify an existing user name!'
            )
        )
    }

    const typeValue = method.watch('query')

    const handleSearch = useCallback((value: string) => {
        method.setValue('query', value)
    }, [method])

    useEffect(() => {
        if (typeValue.length > 1) {
            handleFuzzySearch(typeValue)
        } else {
            setFuzzySearchs([])
        }
    }, [typeValue])

    const SearchPreview = () => {
        return (
            <ScrollView
                style={styles.fuzzySearchContainer}
            >
                <>
                    {
                        fuzzySearchs.map(val => (
                            <Pressable key={val.uid}
                                style={{
                                    paddingHorizontal: 5,
                                    paddingVertical: 8,
                                    marginVertical: 5,
                                }}
                                android_ripple={{ color: '' }}
                                onPress={() => handleSearch(val.name)}
                            >
                                <Text>{val.name}</Text>
                            </Pressable>
                        ))
                    }
                </>
            </ScrollView>
        )
    }

    return (
        <ViewContainer
            styles={{ justifyContent: 'center', alignItems: 'center' }}
        >
            <FormProvider {...method}>
                <View
                    style={styles.searchContainer}
                >
                    <CustomTextInput
                        leftIcon={<EvilIcons name="search" size={25}/>}
                        fieldName="query"
                        placeholder="Search By Name"
                    />
                    <CustomPressable
                        text="Go"
                        onPress={handleGo}
                    />
                </View>
            </FormProvider>
            {
                fuzzySearchs.length > 0 && <SearchPreview/>
            }
        </ViewContainer>
    )
}

const styling = () => (
    StyleSheet.create({
        searchContainer: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            columnGap: 6
        },
        fuzzySearchContainer: {
            width: '100%',
            minHeight: 60,
            maxHeight: 120,
            backgroundColor: 'white',
            marginTop: 8,
            borderRadius: 10,
            padding: 8,
            elevation: 3
        }
    })
)

export default Home