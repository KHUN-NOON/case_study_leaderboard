import React, { useState } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { StyleSheet, View, TextInput } from "react-native"

type Type = {
    leftIcon?: React.ReactNode,
    rightIcon?: React.ReactNode,
    placeholder?: string,
    fieldName: string
}

const CustomTextInput = (props: Type) => {

    const { leftIcon, rightIcon, placeholder, fieldName } = props

    const [ focus, setFocus ] = useState(false)

    const styles = styling()

    const { control } = useFormContext()

    function handleFocus() {
        setFocus(true)
    }

    return (
        <Controller
            control={control}
            name={fieldName}
            render={({ field: { onChange, onBlur, value } }) => (
                <View style={[styles.inputContainer, { borderColor: focus ? 'blue' : 'grey' }]}>
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

const styling = () => (
    StyleSheet.create({
        inputContainer: {
            display: 'flex',
            justifyContent: 'center',
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'grey',
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
            color: '#424242',
            width: '100%'
        }
    })
)

export default CustomTextInput