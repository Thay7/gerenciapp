import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InputApp } from '../InputApp';
import { ButtonApp } from '../Buttons/ButtonApp';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonClose } from '../Buttons/ButtonClose';

export const ModalSearch = ({ title, openModal, fnCloseModal, handleFilter, produtos }) => {
  const [searchName, setSearchName] = useState('');
  const [searchReference, setSearchReference] = useState('');
  const [searchClientName, setSearchClientName] = useState('');
  const [searchClientCPF, setSearchClientCPF] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    handleFilter(searchName, searchReference);
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
          {produtos ?
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

            ) :
            (
              <>
                <InputApp
                  title="Cliente"
                  value={searchClientName}
                  onChangeText={(text) => setSearchClientName(text)}
                  borderRadius={10}
                />
                <InputApp
                  title="CPF"
                  value={searchClientCPF}
                  onChangeText={(text) => setSearchClientCPF(text)}
                  borderRadius={10}
                />
                <InputApp
                  title="Data"
                  value={searchDate}
                  onChangeText={(text) => setSearchDate(text)}
                  borderRadius={10}
                />
                <InputApp
                  title="Valor"
                  value={searchValue}
                  onChangeText={(text) => setSearchValue(text)}
                  borderRadius={10}
                />
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

