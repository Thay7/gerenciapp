import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet } from 'react-native';
import { InputApp } from '../InputApp';
import { ButtonApp } from '../Buttons/ButtonApp';

export const ModalSearch = ({ title, openModal, fnCloseModal, handleFilter }) => {
  const [searchName, setSearchName] = useState('');
  const [searchReference, setSearchReference] = useState('');

  const handleSearch = () => {
    handleFilter(searchName, searchReference);
    fnCloseModal(); // Fechar o modal após a pesquisa
  };

  if (!openModal) {
    return null; // Não renderizar nada se o modal não estiver aberto
  }

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>{title}</Text>
        <InputApp
          title="Nome:"
          onChangeText={(text) => setSearchName(text)}
        />
        <InputApp
          title="Referência:"
          onChangeText={(text) => setSearchQuantity(text)}
        />
        <View style={styles.containerButtons}>
          <ButtonApp
            title="Pesquisar"
            backgroundColor="#4040ff"
            color="#fff"
            width={100}
            onPress={handleSearch}
          />
          <ButtonApp
            title="Fechar"
            color="#ff0000"
            width={100}
            onPress={fnCloseModal}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo preto transparente
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    width: '80%', // Largura0 do modal (80% da largura da tela)
  },
  title: {
    fontSize: 25,
    marginBottom: 30,
  },
  containerButtons: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});


