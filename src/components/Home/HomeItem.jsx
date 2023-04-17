import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import ic_estoque from '../../icons/Home/ic_estoque.png';
import ic_cadastro_de_produto from '../../icons/Home/ic_cadastro_de_produto.png';
import ic_pedido_de_compra from '../../icons/Home/ic_pedido_de_compra.png';
import ic_dashboard from '../../icons/Home/ic_dashboard.png';

export const HomeItem = () => {
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
                <TouchableOpacity style={styles.box}>
                    <Image
                        source={ic_estoque}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Estoque
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box}>
                    <Image
                        source={ic_cadastro_de_produto}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Cadastro de Produtos
                    </Text>
                </TouchableOpacity>

            </View >
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity style={styles.box}>
                    <Image
                        source={ic_pedido_de_compra}
                        style={styles.icon}
                    />
                    <Text style={styles.text}>
                        Pedido de Compra
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.box}>
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

