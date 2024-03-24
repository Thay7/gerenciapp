import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ic_close from '../../icons/ic_close.png'
import { ButtonApp } from '../Buttons/ButtonApp';

export const ModalConfirm = ({ title, message, openModal, fnCloseModal, fnConfirm }) => {
    if (!openModal) {
        return null;
    };

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
                    </View>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.rowBetween}>
                        <ButtonApp
                            title="Sim"
                            color="#fff"
                            backgroundColor="red"
                            width={100}
                            onPress={fnConfirm}
                        />
                        <ButtonApp
                            title="Não"
                            color="#fff"
                            backgroundColor="#4040ff"
                            width={100}
                            onPress={fnCloseModal}
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
        alignSelf: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        justifyContent: 'center',
        fontWeight: 'bold',
        color: 'red'
    },
    message: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 20,
        textAlign: 'center'
    },
    rowBetween: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

