import React, { useEffect } from 'react';
import { View, Modal, Button, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import { globalStyles } from '../globalStyles';
import { useState } from 'react';
import DrugData from '../drugData';
import { Picker } from '@react-native-picker/picker';
import { company_id, drugSkipReasons, system_id, user_id } from '../../constants/constants';
import { postData } from '../apis';
import { backendUrl } from '../../config/config';
import Toast from 'react-native-toast-message';

const windowHeight = Dimensions.get('window').height;

// TODO: handle unnecessary renders issue
export default function DiscardModal({ isVisible, onClose, drug, canister }) {
    useEffect(() => {
    }, [])
    // console.log('drug data', drug);
    function handleSubmit() {
        postData(backendUrl + '/discardexpiredcanisterdrug', { args: JSON.stringify({ "user_id": user_id, "canister_id": canister.canister_id, "quantity": canister?.available_quantity, "company_id": company_id, "robot_utility_call": true, "device_id": canister?.device_id, "system_id": system_id }) })

            .then(data => {
                console.log('Discard api', data);
                Toast.show({
                    type: 'success',
                    text1: 'Discarded',
                    text2: 'success'
                })
                if (data?.status == 'success'){
                    onClose();
                }
            }
            )
            .catch(error => {
                console.log('error in discard', error);
            })

    }
    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >

            <View style={styles.container}>
                <View style={styles.modalContent}>
                    <Text style={globalStyles.modalTitleText}>Discard Confirmation</Text>
                    <Text style={globalStyles.modalInfoMsg}>Are you sure you want to discard the following drug?</Text>
                    <DrugData drug={drug} showInvQty={false} showCanisterId={true} canister={canister} showStockStatus={true}></DrugData>

                    <Button title='Mark As Discarded' onPress={handleSubmit}></Button>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Not Now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
    },
    modalContent: {
        backgroundColor: 'white',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 20,
        // height: windowHeight / 2, // Set the height to half of the window height
    },
    closeButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        marginBottom: 10,
    },
    radioButtonText: {
        marginLeft: 10,
        fontSize: 16,
    },
    radioButtonSelected: {
        backgroundColor: 'lightblue',
    },
    selectedOptionText: {
        marginTop: 20,
        fontSize: 16,
    },

});
