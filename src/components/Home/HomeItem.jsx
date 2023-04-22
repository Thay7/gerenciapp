import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import ic_estoque from '../../icons/Home/ic_estoque.png';
import ic_produtos from '../../icons/Home/ic_produtos.png';
import ic_pedido_de_compra from '../../icons/Home/ic_pedido_de_compra.png';
import ic_dashboard from '../../icons/Home/ic_dashboard.png';

export const HomeItem = () => {
    const navigation = useNavigation()

    const handleEstoque = () => {
        navigation.navigate('Estoque')
    }

    const handleCadastrodeProdutos = () => {
        navigation.navigate('Produtos')
    }

    const handlePedidoDeCompra = () => {
        navigation.navigate('PedidoDeCompra')
    }

    const handleDashboard = () => {
        navigation.navigate('Dashboard')
    }

    return (
        <View style={styles.container}>
            <Text
                style={styles.headerEstoque}
            >
                Gerencie Seu Estoque
            </Text>
            <View
                style={{ flexDirection: 'row' }}
            >
                <TouchableOpacity
                    style={styles.box}
                    onPress={handleEstoque}
                >
                    <Image
                        source={ic_estoque}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Estoque
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.box}
                    onPress={handleCadastrodeProdutos}
                >
                    <Image
                        source={ic_produtos}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Produtos
                    </Text>
                </TouchableOpacity>
            </View >
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.box}
                    onPress={handlePedidoDeCompra}
                >
                    <Image
                        source={ic_pedido_de_compra}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Pedido de Compra
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.box}
                    onPress={handleDashboard}
                >
                    <Image
                        source={ic_dashboard}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Dashboard
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    box: {
        backgroundColor: '#fffafa',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: '50%',
        height: 137,
        marginBottom: 10,
        marginRight: 5,
        elevation: 5
    },
    headerEstoque: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333333',
        marginTop: 10,
        marginBottom: 20,
        alignSelf: 'center'
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

