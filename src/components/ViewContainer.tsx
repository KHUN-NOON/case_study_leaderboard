import { FC, ReactNode } from "react"
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"

type ViewContainerType = {
    styles?: StyleProp<ViewStyle>,
    children: ReactNode
}

const ViewContainer: FC<ViewContainerType>  = (props) => {
    const insets = useSafeAreaInsets()

    const styles = styling(insets)

    return (
        <View
            style={[styles.container, props.styles]}
        >
            {props.children}
        </View>
    )
}

const styling = (insets: EdgeInsets) => (
    StyleSheet.create({
        container: {
            flex: 1,
            paddingBottom: insets.bottom,
            paddingLeft: insets.left + 8,
            paddingRight: insets.right + 8,
            zIndex: 10
        }
    })
)

export default ViewContainer