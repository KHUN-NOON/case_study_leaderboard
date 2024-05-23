import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import ViewContainer from "../components/ViewContainer"
import { useNavigation } from "@react-navigation/native"
import CustomTextInput from "../components/CustomTextInput"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { FormProvider, useForm } from "react-hook-form"

const Home = () => {
    const nav = useNavigation()

    const method = useForm()

    const styles = styling()

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
                    <Pressable
                        style={{
                            backgroundColor: 'purple',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: 12,
                            borderRadius: 10,
                            height: 'auto',
                            minWidth: 70
                        }}
                        android_ripple={{ color: ''}}
                    >
                        <Text
                            style={{
                                color: 'white'
                            }}
                        >
                            Go
                        </Text>
                    </Pressable>
                </View>
            </FormProvider>
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
        }
    })
)

export default Home