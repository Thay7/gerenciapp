import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, useAnimatedValue, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ButtonAdd } from '../../components/Buttons/ButtonAdd';
import { ButtonEdit } from '../../components/Buttons/ButtonEdit';
import { ButtonApp } from '../../components/Buttons/ButtonApp';
import { InputApp } from '../../components/InputApp'
import { useNavigation } from '@react-navigation/native';
import { useApi } from '../../Api/useApi';
import { formatterbrl } from '../../utils/formatterbrl';
import ic_sucesso from '../../icons/ic_sucesso.png'

export const Produtos = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [modalProductIsOpen, setModalProductIsOpen] = useState(false)
    const [selectedProductIndex, setSelectedProductIndex] = useState(null)
    const [messageEdit, setMessageEdit] = useState('')
    const [modalMessageIsOpen, setModalMessageIsOpen] = useState(false)
    const [editing, setEditing] = useState(false)
    const [produtos, setProdutos] = useState([
        {
            produto_id: 0,
            produto_nome: '',
            produto_descricao: '',
            produto_marca: '',
            produto_valorCompra: 0,
            produto_valorVenda: 0
        }
    ])

    useEffect(() => {
        buscarProdutos()
    }, [])

    const buscarProdutos = async () => {
        setLoading(true)
        let json = await useApi.listarProdutos()
        setProdutos(json)
        setLoading(false)
    }

    const handleInputChage = (fieldName, value) => {
        const updatedProducts = [...produtos];
        updatedProducts[selectedProductIndex][fieldName] = value;
        setProdutos(updatedProducts);
    }

    const editarProdutos = async () => {
        let response = await useApi.editarProdutos(produtos[selectedProductIndex])
        switch (response) {
            case 200:
                setMessageEdit('Produto alterado com sucesso!')
                break;
            case 400:
                setMessageEdit('Erro ao alterar os dados do produto. Tente novamente!')
        }
        setModalProductIsOpen(false)
        setModalMessageIsOpen(true)
        setTimeout(() => {
            setModalMessageIsOpen(false);
        }, 3000);
    }

    const handleNewProduct = () => {
        navigation.navigate('CadastroDeProdutos')
    }

    return (
        <ScrollView >
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.titulo}>Produtos</Text>
                    <ButtonAdd
                        onPress={handleNewProduct}
                    />
                </View>
                {loading == true ?
                    (
                        <View>
                            <Text>Carregando...</Text>
                        </View>
                    )
                    :
                    (
                        <View style={{ marginBottom: 16 }}>
                            {produtos.map((item, index) => (
                                <>
                                    <TouchableOpacity
                                        style={styles.itemContainer}
                                        onPress={() => {
                                            setModalProductIsOpen(true);
                                            setSelectedProductIndex(index);
                                        }}
                                        key={index}
                                    >
                                        <Text style={styles.itemNome}>{item.produto_nome}</Text>
                                        {item.produto_descricao &&
                                            <Text style={styles.itemSub}>{item.produto_descricao}</Text>
                                        }
                                        <Text style={styles.itemSub}>Valor: {formatterbrl(item.produto_valorVenda)}</Text>
                                    </TouchableOpacity>
                                    <Modal
                                        animationType="slide"
                                        transparent={true}
                                        visible={modalProductIsOpen}
                                    >
                                        <View style={styles.modalContainer}>
                                            <View style={styles.modalContent}>
                                                <View style={styles.modalHeader}>
                                                    <Text style={styles.tituloModal}>{!editing ? 'Detalhes Produto' : 'Editar Produto'}</Text>
                                                    <ButtonEdit
                                                        onPress={() => setEditing(true)}
                                                    />
                                                </View>
                                                {selectedProductIndex !== null &&
                                                    <View>
                                                        {editing === false
                                                            ?
                                                            (
                                                                <>
                                                                    <View style={styles.itemModalContainer}>
                                                                        <Text style={styles.modalLabel}>Nome:</Text>
                                                                        <Text style={styles.modalValue}>{produtos[selectedProductIndex].produto_nome}</Text>
                                                                    </View>
                                                                    <View style={styles.itemModalContainer}>
                                                                        <Text style={styles.modalLabel}>Descrição:</Text>
                                                                        <Text style={styles.modalValue}>{produtos[selectedProductIndex].produto_descricao}</Text>
                                                                    </View>
                                                                    <View style={styles.itemModalContainer}>
                                                                        <Text style={styles.modalLabel}>Marca:</Text>
                                                                        <Text style={styles.modalValue}>{produtos[selectedProductIndex].produto_marca}</Text>
                                                                    </View>
                                                                    <View style={styles.itemModalContainer}>
                                                                        <Text style={styles.modalLabel}>Valor de compra:</Text>
                                                                        <Text style={styles.modalValue}>{formatterbrl(produtos[selectedProductIndex].produto_valorCompra)}</Text>
                                                                    </View>
                                                                    <View style={styles.itemModalContainer}>
                                                                        <Text style={styles.modalLabel}>Valor de venda:</Text>
                                                                        <Text style={styles.modalValue}>{formatterbrl(produtos[selectedProductIndex].produto_valorVenda)}</Text>
                                                                    </View>
                                                                    <View>
                                                                        <ButtonApp
                                                                            title="Fechar"
                                                                            marginTop={10}
                                                                            color="#4040ff"
                                                                            onPress={() => setModalProductIsOpen(false)}
                                                                        />
                                                                    </View>
                                                                </>
                                                            )
                                                            :
                                                            (
                                                                <>
                                                                    <View >
                                                                        <InputApp
                                                                            title="Nome"
                                                                            value={produtos[selectedProductIndex].produto_nome}
                                                                            onChangeText={(value) => handleInputChage('produto_nome', value)}
                                                                            style={styles.modalValue}
                                                                        />
                                                                    </View>
                                                                    <View >
                                                                        <InputApp
                                                                            title="Descrição"
                                                                            value={produtos[selectedProductIndex].produto_descricao}
                                                                            onChangeText={(value) => handleInputChage('produto_descricao', value)}
                                                                            style={styles.modalValue}
                                                                        />
                                                                    </View>
                                                                    <View >
                                                                        <InputApp
                                                                            title="Marca"
                                                                            value={produtos[selectedProductIndex].produto_marca}
                                                                            onChangeText={(value) => handleInputChage('produto_marca', value)}
                                                                            style={styles.modalValue}
                                                                        />
                                                                    </View>
                                                                    <View >
                                                                        <InputApp
                                                                            title="Valor de compra"
                                                                            onChangeText={(value) => handleInputChage('produto_valorCompra', value)}
                                                                            value={produtos[selectedProductIndex].produto_valorCompra}
                                                                            style={styles.modalValue}
                                                                        />
                                                                    </View>
                                                                    <View >
                                                                        <InputApp
                                                                            title="Valor de venda"
                                                                            value={produtos[selectedProductIndex].produto_valorVenda}
                                                                            onChangeText={(value) => handleInputChage('produto_valorVenda', value)}
                                                                            style={styles.modalValue}
                                                                        />
                                                                    </View>
                                                                    <View>
                                                                        <ButtonApp
                                                                            title="Salvar"
                                                                            marginTop={10}
                                                                            color="#FFF"
                                                                            backgroundColor="#4040ff"
                                                                            onPress={editarProdutos}
                                                                        />
                                                                        <ButtonApp
                                                                            title="Fechar"
                                                                            marginTop={10}
                                                                            color="#4040ff"
                                                                            onPress={() => {
                                                                                setModalProductIsOpen(false)
                                                                                setEditing(false)
                                                                            }}
                                                                        />
                                                                    </View>
                                                                </>
                                                            )}
                                                    </View>
                                                }
                                            </View>

                                        </View>
                                    </Modal>
                                </>
                            ))}

                        </View>
                    )
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalMessageIsOpen}
                >
                    <View style={styles.modalMessageContainer}>
                        <View style={styles.modalMessageContent}>
                            <View style={{alignItems: 'center'}}>
                                <Image
                                    source={ic_sucesso}
                                    alt="Minha Imagem"
                                    style={{ width: 150, height: 150, marginBottom: 10 }}
                                />
                                <Text
                                style={{fontSize: 24}}
                                >{messageEdit}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        </ScrollView >
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
    itemContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
    },
    itemNome: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemSub: {
        fontSize: 16,
        color: '#666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 16,
        // paddingVertical: 16,
        // paddingHorizontal: 30,
        // width: 300
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    tituloModal: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    itemModalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: '#fff',
        borderRadius: 8,
        marginVertical: 4,
    },
    modalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalValue: {
        fontSize: 16,
        color: '#666',
        marginLeft: 10
    },
    closeButton: {
        color: 'blue',
        fontSize: 16,
        textAlign: 'center',
    },
    modalMessageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalMessageContent: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 40,
        // paddingVertical: 16,
        // paddingHorizontal: 30,
        // width: 300
    },
});

