import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'
import { HomeItem } from '../../components/Home/HomeItem';
import ic_estoque from '../../icons/ic_estoque.png';
import ic_cadastro_de_produto from '../../icons/ic_cadastro_de_produto.png';
import ic_pedido_de_compra from '../../icons/ic_pedido_de_compra.png';
import ic_dashboard from '../../icons/ic_dashboard.png';


export const HomeScreen = () => {
    const data = [
        { title: 'Estoque', image: ic_estoque },
        { title: 'Cadastro de Produto', image: ic_cadastro_de_produto },
        { title: 'Pedido de Compra', image: ic_pedido_de_compra },
        { title: 'Dashboard', image: ic_dashboard }
    ]

    return (
        <View style={styles.container}>

            <View>
                <HomeItem
                    data={data}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})
