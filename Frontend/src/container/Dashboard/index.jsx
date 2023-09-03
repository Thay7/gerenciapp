import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { PieChart } from 'react-native-svg-charts'

export const Dashboard = () => {
    class PieChartExample extends React.PureComponent {
        render() {
            const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

            const randomColor = () => ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

            const pieData = data
                .filter((value) => value > 0)
                .map((value, index) => ({
                    value,
                    svg: {
                        fill: randomColor(),
                        onPress: () => console.log('press', index),
                    },
                    key: `pie-${index}`,
                }))

            return <PieChart style={{ height: 200 }} data={pieData} />
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Dashboard</Text>
                </View>
                <View style={{ marginBottom: 16 }}>
                    <PieChartExample />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        marginTop: 50,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});

