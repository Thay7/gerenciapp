import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const ButtonApp = ({
    title,
    onPress,
    marginTop,
    backgroundColor,
    color
}) => {

    const buttonStyles = {
        ...styles.button,
        marginTop: marginTop,
        backgroundColor: backgroundColor
    }

    const textStyles = {
        ...styles.text,
        color: color
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={buttonStyles}
                onPress={onPress}
            >
                <Text
                    style={textStyles}>
                    {title}
                </Text>
            </TouchableOpacity>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    text: {
        color: "#FFF",
        alignSelf: 'center'

    },
    button: {
        borderRadius: 8,
        padding: 10,
        width: 300

    }
})
