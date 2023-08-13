import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { InputApp } from '../InputApp';
import { ButtonApp } from '../Buttons/ButtonApp';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ButtonClose } from '../Buttons/ButtonClose';

export const ModalSearch = ({ title, openModal, fnCloseModal, handleFilter }) => {
  const [searchName, setSearchName] = useState('');
  const [searchReference, setSearchReference] = useState('');

  const handleSearch = () => {
    handleFilter(searchName, searchReference);
    fnCloseModal();
  };

  if (!openModal) {
    return null;
  }

  return (
    <Modal
      animationType="slide"
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
          <InputApp
            title="Nome:"
            onChangeText={(text) => setSearchName(text)}
          />
          <InputApp
            title="Referência:"
            onChangeText={(text) => setSearchReference(text)}
          />
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
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: 'bold'
  }
});

