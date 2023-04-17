import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'

export const ButtonApp = ({
    title,
    onPress,
    marginTop,
    marginBottom,
    backgroundColor,
    color,
    width
}) => {

    const buttonStyles = {
        ...styles.button,
        marginTop: marginTop,
        marginBottom: marginBottom,
        backgroundColor: backgroundColor,
        width: width
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
        // width: 300

    }
})
