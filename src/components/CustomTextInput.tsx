import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { StyleSheet, View, TextInput } from "react-native"
import { ThemeType } from "../themes/MainTheme"
import { useTheme } from "@react-navigation/native"

type Type = {
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    placeholder?: string,
    fieldName: string
}

const CustomTextInput = (props: Type) => {

    const { leftIcon, rightIcon, placeholder, fieldName } = props

    const [ focus, setFocus ] = useState(false)

    const theme = useTheme()

    const styles = styling(theme)

    const { colors } = theme

    const { control } = useFormContext()

    function handleFocus() {
        setFocus(true)
    }

    return (
        <Controller
            control={control}
            name={fieldName}
            render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputContainer, { borderColor: focus ? colors.primary : colors.text }]}>
                    {leftIcon}
                    <TextInput
                        style={styles.textInput}
                        placeholder={placeholder}
                        onBlur={onBlur}
                        onFocus={handleFocus}
                        keyboardType="default"
                        value={value}
                        onChangeText={onChange}
                    />
                    {rightIcon}
                </View>
            )}
        />
    )
}

const styling = (theme: ThemeType) => (
    StyleSheet.create({
        inputContainer: {
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: theme.colors.text,
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 4,
            columnGap: 4
        },
        textInput: {
            height: 40,
            flex: 1,
            paddingVertical: 10,
            paddingRight: 10,
            paddingLeft: 0,
            color: theme.colors.text,
            width: '100%'
        }
    })
)

export default CustomTextInput