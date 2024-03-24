import { View, StyleSheet, Text, TextInput } from 'react-native'

export const InputApp = ({
    title,
    placeholder,
    value,
    onChangeText,
    onPress,
    secureTextEntry,
    width,
    height,
    keyboardType,
    editable,
    fullWidth,
    multiline,
    textAlignVertical,
    borderRadius,
    marginBottom,
    marginTopText,
    alignSelf
}) => {

    !secureTextEntry ? false : true

    if (!fullWidth) {
        width = width
    }

    if (!height) {
        height = 40
    }

    if (!marginBottom) {
        marginBottom = 0
    }
    else {
        marginBottom = 20
    }

    const inputStyles = {
        ...styles.input,
        width,
        height,
    }

    return (
        <View style={styles.container}>
            {title &&
                <View>
                    <Text style={styles.text} >
                        {title}
                    </Text>
                </View>
            }
            <TextInput
                style={inputStyles} // use a variável 'inputStyles' para definir o estilo do TextInput
                title={title}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                onPress={onPress}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                editable={editable}
                multiline={multiline}
                textAlignVertical={textAlignVertical}
                marginTopText={20}
                marginBottom={marginBottom}
                borderRadius={borderRadius}
                alignSelf={alignSelf}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    text: {
        marginBottom: 5
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        paddingLeft: 10,
        paddingRight: 10,
    }
})
