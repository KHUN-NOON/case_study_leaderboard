import { FC, useEffect } from "react"
import Animated, { FadeIn, FadeOut, SlideInDown, SlideOutDown, runOnJS, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { Gesture, GestureDetector } from "react-native-gesture-handler"
import { BackHandler, Dimensions, Pressable, StyleSheet, View } from "react-native"
import { useTheme } from "@react-navigation/native"
import { Colors } from "../themes/MainTheme"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppDispatch, useAppSelector } from "../redux/store"
import { bottomSheetToggleThunk, bottomSheetCloseThunk } from "../redux/thunks/bottomSheetThunk"

type Props = {
    children?: React.ReactElement
}

const OVERDRAG = 20
const HEIGHT = 300

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const CustomBottomSheet: FC<Props> = ({ children }) => {
    const state = useAppSelector(state => state.bottomsheet)

    const offset = useSharedValue(0)

    const translateY = useAnimatedStyle(() => ({
        transform: [
            { translateY: offset.value }
        ]
    }))

    const dispatch = useAppDispatch()

    const insets = useSafeAreaInsets()

    function toggleOpen() {
        dispatch(bottomSheetToggleThunk())
        offset.value = 0
    }

    const pan = Gesture.Pan()
    .onChange(e => {
        const offsetDelta = e.changeY + offset.value

        const clamp = Math.max(-OVERDRAG, offsetDelta)

        offset.value = offsetDelta > 0 ? offsetDelta : withSpring(clamp)
    })
    .onFinalize(() => {
        if ( offset.value < HEIGHT/3 ) {
            offset.value = withSpring(0)
        } else {
            offset.value = withTiming(HEIGHT, {}, () => {
                runOnJS(toggleOpen)()
            })
        }
    })

    const styles = styling(insets)

    const handleHardwareBackPress = () => {
        if (state.open) {
            dispatch(bottomSheetCloseThunk())

            return true
        } else {
            return false
        }
    }

    useEffect(() => {
        // BackHandler only works on Android 
        const backPress = BackHandler.addEventListener('hardwareBackPress', handleHardwareBackPress)

        return () => {
            backPress.remove()
        }
    }, [handleHardwareBackPress])

    return (
        <>
            {
                state.open && 
                <>
                    <AnimatedPressable
                        style={styles.backdrop}
                        entering={FadeIn}
                        exiting={FadeOut}
                        onPress={toggleOpen}
                    />
                    <GestureDetector gesture={pan}>
                        <Animated.View 
                            style={[styles.sheet, translateY]}
                            entering={SlideInDown.springify().damping(18)}
                            exiting={SlideOutDown}
                        >
                            <View style={styles.notch}></View>
                            {children}
                        </Animated.View>
                    </GestureDetector>
                </>
            }
        </>
    )
}

const styling = (insets: EdgeInsets) => (
    StyleSheet.create({
        backdrop: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: Colors.backdropColor,
            zIndex: 10,
            top: -(insets.top + 70)
        },
        sheet: {
            padding: 16,
            width: Dimensions.get('window').width,
            height: 'auto',
            backgroundColor: 'white',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            zIndex: 10,
            position: 'absolute',
            bottom: 0,
            minHeight: 200
        },
        notch: {
            width: 30,
            height: 3,
            backgroundColor: Colors.lightGrey,
            alignSelf: 'center',
            borderRadius: 10
        }
    })
)

export default CustomBottomSheet