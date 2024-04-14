import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';

export const HomeItem = ({ menus }) => {
    const navigation = useNavigation()
    const [menusOptions, setMenusOptions] = useState([]);

    useEffect(() => {
        setMenusOptions(menus);
    }, [])

    const handleNavigate = (page) => {
        navigation.navigate(page)
    };

    return (
        <View style={styles.container}>
            <View style={styles.column}>
                {menusOptions.slice(0, 3).map((item, i) => (
                    <TouchableOpacity
                        style={styles.box}
                        onPress={() => handleNavigate(item.page)}
                        key={i}
                    >
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <View style={styles.column}>
                {menusOptions.slice(3, 6).map((item, i) => (
                    <TouchableOpacity
                        style={styles.box}
                        onPress={() => handleNavigate(item.page)}
                        key={i}
                    >
                        <Image source={item.icon} style={styles.icon} />
                        <Text style={styles.text}>{item.name}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10,
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },
    column: {
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 5
    },
    box: {
        backgroundColor: '#fffafa',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        height: 137,
        marginBottom: 10,
        marginRight: 5,
        elevation: 5
    },
    icon: {
        width: 60,
        height: 60
    },
    text: {
        fontSize: 16,
        marginTop: 15
    }
})

