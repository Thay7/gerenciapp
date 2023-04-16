import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export const HomeItem = ({ data }) => {
    return (
        <View style={styles.container}>
            {data.map((item, index) => (
                <TouchableOpacity style={styles.box} key={index}>
                    <Image
                        source={item.image}
                        style={styles.icon}
                    />
                    <Text
                        style={styles.text}>
                        {item.title}
                    </Text>
                </TouchableOpacity>
            ))}

        </View>
    )
}

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fffafa',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 137,
        marginBottom: 5
    },
    icon: {
        width: 60,
        height: 60
    },
    text: {
        fontSize: 18,
        marginTop: 10
    }
})

