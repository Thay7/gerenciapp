import React, { useState } from 'react';
import { View, Modal, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

//import components
import { ButtonClose } from '../Buttons/ButtonClose';
import { formatterbrl } from '../../utils/formatterbrl';

export const ModalReaproveitarPedidoCompra = ({ title, openModal, fnCloseModal, pedidosCompraList, handleSelectedItem }) => {
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
          <ScrollView style={{ maxHeight: 300 }}>
            {pedidosCompraList.map((item, index) => (
              <TouchableOpacity style={styles.itemContainer} key={index} onPress={() => handleSelectedItem(item)}>
                <View style={styles.rowBetween}>
                  <Text style={styles.itemNome}>Nº Pedido:</Text>
                  <Text style={styles.itemNome}>{item.numero_pedido_compra}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text>Data e Hora:</Text>
                  <Text>{item.data_hora}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text>Total:</Text>
                  <Text>{formatterbrl(item.valor_total)}</Text>
                </View>
                <View style={[styles.rowBetween, { marginTop: 8 }]}>
                  <Text style={styles.itemNome}>Status:</Text>
                  <Text style={[styles.itemNome, { color: item.recebido == false ? '#4040ff' : 'green' }]}>{item.recebido == false ? "Efetuado" : "Recebido"}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal >
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
    marginBottom: 20
  },
  title: {
    fontSize: 28,
    alignSelf: 'center',
    fontWeight: 'bold'
  },
  itemContainer: {
    padding: 8,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 1,
    borderRadius: 8,
    marginVertical: 4
  },
  rowBetween: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

