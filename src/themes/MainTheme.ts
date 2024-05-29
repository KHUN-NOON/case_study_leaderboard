import { DefaultTheme, Theme } from "@react-navigation/native"

export enum Colors {
    white = '#FFFFFF',
    grey = '#A8A196',
    black = '#000',
    blueBell = '#7071E8',
    lavender = '#C683D7',
    lightBlue = '#9b9cef',
    deepBlue = '#2B3499',
    mediumDarkGrey = '#636363',
    charcoal = '#1E222B',
    jetBlack = '#212121',
    green = '#66bb6a',
    yellow = '#ffa726',
    red = '#f44336',
    darkGrey = '#333333',
    lightGrey = '#d3d3d3',
    backdropColor = "rgba(0, 0, 0, 0.3)"
}

export type ColorNames = keyof Theme['colors']

export type ThemeType = Theme & {
    colors: {
        secondary: Colors,
        success: Colors,
        warning: Colors,
        error: Colors,
        button: {
            background: Colors,
            textColor: Colors
        }
    }
}

const MainTheme: ThemeType = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: Colors.blueBell,
        secondary: Colors.lavender,
        success: Colors.green,
        warning: Colors.yellow,
        error: Colors.red,
        button: {
            background: Colors.blueBell,
            textColor: Colors.white
        }
    }
}

export default MainTheme