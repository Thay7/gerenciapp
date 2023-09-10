import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import ic_close from '../../../icons/Buttons/ic_close.png'

export const ButtonClose = ({ onPress }) => {
    return (
        <TouchableOpacity
            style={styles.containerIcon}
            onPress={onPress}
        >
            <Image source={ic_close} style={styles.icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    containerIcon: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 5,
        backgroundColor: "#fff",
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 1
    },
    icon: {
        width: 15,
        height: 15,
    },
})
