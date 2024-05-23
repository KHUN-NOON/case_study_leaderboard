import { Pressable, StyleSheet, Text } from "react-native"

type Type = {
    text: string,
    
}

const CustomPressable = (props: Type) => {
    const { text } = props

    return (
        <Pressable>
            <Text>{text}</Text>
        </Pressable>
    )
}

const styling = () => (
    StyleSheet.create({
        button: {
            backgroundColor: 'purple',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
            borderRadius: 10,
            height: 'auto',
            minWidth: 70
        }
    })
)