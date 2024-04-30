import React, { useEffect } from 'react';
import { View, Modal, Button, StyleSheet, Text, TouchableOpacity, Dimensions, TextInput, ScrollView } from 'react-native';
import { globalStyles } from '../globalStyles';
import { useState } from 'react';
import DrugData from '../drugData';
import { Picker } from '@react-native-picker/picker';
import { company_id, drugSkipReasons, system_id, user_id } from '../../constants/constants';
import { postData } from '../apis';
import { backendUrl } from '../../config/config';

const windowHeight = Dimensions.get('window').height;

// TODO: handle unnecessary renders issue
export default function SkipModal({ isVisible, onClose, drug, canister }) {
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedReason, setSelectedReason] = useState(null);
    const [packsToSkip, setPacksToSKip] = useState(0);
    const [otherReason, setOtherReason] = useState('');
    const handleSelectOption = (option) => {
        setSelectedOption(option);
    };

    useEffect(() => {

    }, [])
    // console.log('drug data',drug);
    function handleSubmit() {
        postData(backendUrl + '/replenishalternates', {
            args: JSON.stringify(selectedOption === 'batch'
                ? { "skip_reason": selectedReason == "Other"? otherReason: selectedReason, "module_id": 30, "company_id": company_id, "user_id": user_id, "device_id": drug?.device_id, "canister_list": [12113], "action": "skip_for_batch", "current_pack_id": 297981, "system_id": system_id, "robot_utility_call": true }
                : { "skip_reason": selectedReason == "Other"? otherReason: selectedReason, "module_id": 30, "company_id": company_id, "user_id": user_id, "device_id": drug?.device_id, "canister_list": [12113], "action": "skip_for_packs", "packs_to_skip": Number(packsToSkip), "current_pack_id": 297981, "system_id": system_id, "robot_utility_call": true })
        })

            .then(data => {
                console.log('skip for the batch ', data);
            }
            )
            .catch(error => {
                console.log('error in replanishalternates', error);
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
                    <Text style={globalStyles.modalTitleText}>Skip Drug</Text>
                    <Text style={globalStyles.modalInfoMsg}>Please take necessary action for:</Text>
                    <DrugData drug={drug} showInvQty={false} showCanisterId={true} canister={canister} showStockStatus={true}></DrugData>

                    <Text style={styles.label}>Select an option:</Text>
                    <TouchableOpacity
                        style={[styles.radioButton, selectedOption === 'batch' && styles.radioButtonSelected]}
                        onPress={() => handleSelectOption('batch')}
                    >
                        <Text style={styles.radioButtonText}>Skip for entire batch</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.radioButton, selectedOption === 'day' && styles.radioButtonSelected]}
                        onPress={() => handleSelectOption('day')}
                    >
                        <Text style={styles.radioButtonText}>Skip for the day</Text>
                    </TouchableOpacity>

                    {selectedOption === 'day' &&
                        <View style={globalStyles.row}>
                            <Text>Select number of packs to skip:</Text>
                            <TextInput
                                style={globalStyles.input}
                                placeholder=""
                                value={packsToSkip}
                                onChangeText={setPacksToSKip}
                                keyboardType="numeric"
                            />
                        </View>
                    }

                    <Picker
                        selectedValue={selectedReason}
                        onValueChange={(itemValue, itemIndex) => setSelectedReason(itemValue)}
                        style={styles.dropdown}
                    >
                        <Picker.Item label="Select reason for skipping" value={null} />
                        <Picker.Item label="Not enough drug quantity" value='Not enough drug quantity' />
                        <Picker.Item label="Not compatible with canister" value='Not compatible with canister' />
                        <Picker.Item label="Broken canister" value='Broken canister' />
                        <Picker.Item label="Issue with canister EEPROM" value='Issue with canister EEPROM' />
                        <Picker.Item label="Other" value='Other' />


                        {/* ToDO: Fix issue in this approach */}
                        {/* {drugSkipReasons.map((reason, index)=>{
                            <Picker.Item label={`${reason.toString()}`} value={`${index.toString()}`} />
                        })} */}

                    </Picker>
                    {selectedReason == "Other" &&
                        <TextInput
                            style={globalStyles.row}
                            multiline={true}
                            numberOfLines={4} // You can adjust the number of visible lines
                            placeholder="Mention Other Reason"
                            onChangeText={setOtherReason}
                            value={otherReason}
                        />}
                    <Button title='Submit' onPress={handleSubmit}></Button>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
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
