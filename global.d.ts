import { ThemeType } from "./src/themes/MainTheme"

declare module "@react-navigation/native" {
    export function useTheme(): ThemeType
}