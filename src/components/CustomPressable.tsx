import { useTheme } from "@react-navigation/native"
import { Pressable, StyleSheet, Text } from "react-native"
import { ThemeType } from "../themes/MainTheme"

type Type = {
    text: string,
    onPress?: () => void
}

const CustomPressable = (props: Type) => {
    const { text, onPress } = props

    const theme = useTheme()

    const styles = styling(theme)

    return (
        <Pressable
            style={styles.button}
            android_ripple={{ color: '' }}
            onPress={onPress}
        >
            <Text
                style={styles.text}
            >
                {text}
            </Text>
        </Pressable>
    )
}

const styling = (theme: ThemeType) => (
    StyleSheet.create({
        button: {
            backgroundColor: theme.colors.button.background,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            borderRadius: 10,
            height: 'auto',
            minWidth: 70
        },
        text: {
            color: theme.colors.button.textColor
        }
    })
)

export default CustomPressable