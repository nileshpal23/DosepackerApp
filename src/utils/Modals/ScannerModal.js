import React, { useEffect, useState } from 'react';
import { View, Modal, Button, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import QRScanner from '../../app/Scanner/Scanner'
import { scanType } from '../../constants/constants';

const windowHeight = Dimensions.get('window').height;

// TODO: handle unnecessary renders issue
export default function ScannerModal({isVisible, onClose, setData}) {

    const [scannedData, setScannedData] = useState();


    useEffect(() => {

    }, [])
    function handleDataFromScanner(data) {
        console.log('received data from QRScanner', data, data.data.drug_scan_type);
        onClose();
        setData(data);
        // setData(data.data.drug_scan_type == scanType.BARCODE? data.data.ndc_list[0]
        //         :data.data.drug_scan_type == scanType.CANISTER_SCAN? data.data.canister_id
        //         :'');

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
                   <QRScanner exit={handleDataFromScanner}></QRScanner>
                   <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>close</Text>
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
        // padding: 20,
        height: windowHeight, // Set the height to half of the window height
    },
    closeButton: {
        alignItems: 'center',
        marginTop: 10,
    },
    closeButtonText: {
        color: 'blue',
    },

});
