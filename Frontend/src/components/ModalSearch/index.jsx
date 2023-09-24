import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet } from 'react-native';

//import components
import { InputApp } from '../InputApp';
import { ButtonApp } from '../Buttons/ButtonApp';
import { ButtonClose } from '../Buttons/ButtonClose';

export const ModalSearch = ({ title, openModal, fnCloseModal, handleFilterProducts, handleFilterSales, produtos, vendas }) => {
  //states para modal do tipo produtos
  const [searchName, setSearchName] = useState('');
  const [searchReference, setSearchReference] = useState('');

  //states para modal do tipo vendas
  const [searchNumeroVenda, setSearchNumeroVenda] = useState('');
  const [searchValor, setSearchValor] = useState(0);
  const [searchDataHora, setSearchDataHora] = useState(null);

  const handleSearch = () => {
    if (produtos) {
      //Função filtrar de produtos
      handleFilterProducts(searchName, searchReference);
    }
    if (vendas) {
      //Função filtrar de produtos
      handleFilterSales(searchNumeroVenda, searchValor, searchDataHora);
    }
    fnCloseModal();
  };

  if (!openModal) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={openModal}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.headerContent}>
            <Text style={styles.title}>{title}</Text>
            <ButtonClose
              onPress={fnCloseModal}
            />
          </View>
          {produtos &&
            (
              <>
                <InputApp
                  title="Nome:"
                  value={searchName}
                  onChangeText={(text) => setSearchName(text)}
                  marginBottom={true}
                  borderRadius={10}
                />
                <InputApp
                  title="Referência:"
                  value={searchReference}
                  onChangeText={(text) => setSearchReference(text)}
                  marginBottom={true}
                  borderRadius={10}
                />
              </>
            )
          }
          {vendas &&
            (
              <>
                <>
                  <InputApp
                    title="Número Venda:"
                    value={searchNumeroVenda}
                    keyboardType="numeric"
                    onChangeText={(text) => setSearchNumeroVenda(text)}
                    marginBottom={true}
                    borderRadius={10}
                  />
                  <InputApp
                    title="Valor:"
                    value={searchValor}
                    keyboardType="numeric"
                    onChangeText={(text) => setSearchValor(text)}
                    marginBottom={true}
                    borderRadius={10}
                  />
                  <InputApp
                    title="Data/Hora:"
                    value={searchDataHora}
                    keyboardType="numeric"
                    onChangeText={(text) => setSearchDataHora(text)}
                    marginBottom={true}
                    borderRadius={10}
                  />
                </>
              </>
            )
          }
          <View>
            <ButtonApp
              title="Pesquisar"
              backgroundColor="#4040ff"
              color="#fff"
              onPress={handleSearch}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

