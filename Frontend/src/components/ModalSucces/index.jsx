import React, { useState } from 'react';
import { View, Button, Modal, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ic_close from '../../icons/ic_close.png'

export const ModalSucces = ({ title, message, openModal, fnCloseModal }) => {
    if (!openModal) {
        return null;
    }

    return (
        <Modal
            animationType="none"
            transparent={true}
            visible={openModal}

        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.headerContent}>
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <Text style={styles.message}>{message}</Text>
                    {/* <TouchableOpacity style={styles.closeButton} onPress={fnCloseModal}>
                        <Image source={ic_close} style={styles.icon} />
                    </TouchableOpacity> */}
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
        color: 'green'
    },
    message: {
        fontSize: 20,
        alignSelf: 'center',
        marginBottom: 20
    },
    closeButton: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: 'green',
        width: 30,
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: 10,
        height: 10
    }
});

