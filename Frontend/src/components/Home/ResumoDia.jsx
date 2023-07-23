import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

export const ResumoDia = ({ labelsAndValues }) => {
    const [labelsAndValuesBox, setLabelsAndValuesBox] = useState([]);

    useEffect(() => {
        setLabelsAndValuesBox(labelsAndValues);
    }, [])

    return (
        <View style={styles.box}>
            {labelsAndValuesBox.map((item, i) => (
                <View style={styles.contentBox} key={i}>
                    <Text style={styles.label}>{item.label}</Text>
                    <Text style={styles.value}>{item.value}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    box: {
        backgroundColor: '#fffafa',
        borderRadius: 8,
        marginBottom: 10,
        marginRight: 5,
        elevation: 5,
        padding: 10
    },
    contentBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    value: {
        fontSize: 18,
        color: '#4040ff'
    }
})