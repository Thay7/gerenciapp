import { StyleSheet, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native';

import ic_voltar from '../../../icons/ic_voltar.png'

export const ButtonBack = ({ navigate }) => {
    const navigation = useNavigation();
    const fnNavigate = () => {
        navigation.navigate(navigate)
    };

    return (
        <TouchableOpacity
            onPress={fnNavigate}
        >
            <Image source={ic_voltar} style={styles.icon} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
})
