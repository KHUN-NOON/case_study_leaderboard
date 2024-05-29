import { ListRenderItemInfo, StyleSheet, Text, View } from "react-native"
import { ThemeType } from "../themes/MainTheme"
import { useTheme } from '@react-navigation/native'
import { User } from "../redux/thunks/leaderboardThunk"
import { FC } from "react"

type Type = ListRenderItemInfo<User>

const ListCard: FC<Type> = (props) => {
    const theme = useTheme()

    const { item: { name, rank, bananas, searched, uid } } = props

    const styles = styling(theme, searched)

    return (
        <View style={[styles.container]}
            key={uid}
        >
            <Text style={styles.name}>
                {name}
            </Text>
            <View style={styles.metaContainer}>
                <Text>Rank: {rank}</Text>
                <Text>Bananas: {bananas}</Text>
            </View>
        </View>
    )
}

const styling = (theme: ThemeType, searched?: boolean) => (
    StyleSheet.create({
        container: {
            display: 'flex',
            borderRadius: 10,
            backgroundColor: theme.colors.card,
            minHeight: 70,
            width: '100%',
            height: 'auto',
            padding: 10,
            justifyContent: 'center',
            rowGap: 5,
            shadowOffset: {
                width: 20,
                height: 20
            },
            shadowOpacity: 0.5,
            shadowRadius: 10,
            shadowColor: theme.colors.text,
            elevation: 2,
            borderColor: searched ? theme.colors.success : '',
            borderWidth: searched ? 3 : 0,
            marginVertical: 5
        },
        name: {
            fontWeight: 'bold',
            fontSize: 16,
            color: theme.colors.text
        },
        metaContainer: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    })
)

export default ListCard
