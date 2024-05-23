import { FC } from "react"
import { StatusBar } from "react-native"

type StatusBarType = {
    translucent?: boolean
}

const CustomStatusBar: FC<StatusBarType> = (props) => {
    const { translucent = true } = props

    return (
        <StatusBar barStyle='dark-content' backgroundColor={'transparent'} translucent={translucent}/>
    )
}

export default CustomStatusBar