import React, { useEffect, useState } from "react";
import { View, Image, StyleSheet, Text, TextInput, ScrollView, Button, TouchableOpacity } from "react-native";
import { globalStyles } from "../../utils/globalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getData, postData } from "../../utils/apis";
import { backendUrl } from "../../config/config";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import ScannerModal from "../../utils/Modals/ScannerModal";
import { canister_exp_status_style, company_id, errorMsg, scanType, system_id, user_id } from "../../constants/constants";
import { handleUnlock, resetToZero } from "../../utils/commonActions";
import SkipModal from "../../utils/Modals/SkipModal";
import DiscardModal from "../../utils/Modals/DiscardModal";
import DrugData from "../../utils/drugData";
import ErrorMsg from "../../utils/errorMsg";



export default function ReplenishCanister() {
    const navigator = useNavigation();
    const route = useRoute();
    const [canister, setCanister] = useState(route.params);
    const data = route.params.data;
    const [ndc, setNdc] = useState(canister?.dataFromScanner?.drug?.ndc_list[0] || '');
    const [lotNo, setLotNo] = useState(canister?.dataFromScanner?.drug?.lot_number || '');
    const [date, setDate] = useState(new Date());
    const [canisterId, setCanisterId] = useState('');
    const [dateToSend, setDateToSend] = useState('');
    const [displayMonth, setDisplayMonth] = useState(0);
    const [displayYear, setDisplayYear] = useState(0);
    const [isScannerModalVisible, setIsScannerModalVisible] = useState(false);
    const [scannerLoc, setScannerLoc] = useState('');
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const [fillQty, setFillQty] = useState(0)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDiscardVisible, setIsDiscardVisible] = useState(false);

    // console.log('params value in replenish', route.params)

    console.log('replenish rendered',canister);

    useEffect(()=>{
        console.log('rendered use effect',canister.available_quantity);
    },[]);

    const toggleModal = (canister = {}) => {
        setIsModalVisible(prev => { return !prev });
    };

    function canisterInfo(canister){
        console.log('here');
        getData(`${backendUrl}/v2/api/getcanisterinfo?company_id=${company_id}&system_id=${system_id}&filters={"canister_id":${canister?.canister_id}}&sort_fields=[["canister_active",-1],["display_quantity",1],["drawer_initial",-1],["drawer_number",-1]]&paginate={"page_number":1,"number_of_rows":10}`)
        .then(data =>{
            console.log(data);
            setCanister(Object.assign({},data?.data?.canister_list[0]));
        })
        .error(error =>{
            console.log('canister info api error', error)
        })
    }


    const toggleDiscarModal = (canister = {}) => {
        setIsDiscardVisible(prev => { return !prev });
    };

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(canister?.dataFromScanner?.drug?.expiration_date || '');

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setSelectedDate(date.getMonth() + '-' + date.getFullYear());
        setDateToSend(date.getMonth() + '-' + date.getFullYear())
        console.log('date to send', dateToSend, displayMonth, displayYear);
        hideDatePicker();

    };







    function toggleScannerModal() {
        setIsScannerModalVisible(prev => { return !prev })
    }
    const handleDateChange = async (event, selectedDate) => {
        const currentDate = selectedDate || date;
        console.log('set date', currentDate);
        // setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
        await setDisplayMonth(date.getMonth());
        await setDisplayYear(date.getFullYear());
        setDateToSend(date.getMonth() + '-' + date.getFullYear())
        console.log('date to send', dateToSend, displayMonth, displayYear);
        toggleDatePicker();

    };
    const toggleDatePicker = () => {
        setShowDatePicker(prev => { return !prev });
    };

     function handleSave() {
         postData(`${backendUrl}/canisterreplenish`,
            { args: JSON.stringify({ "canister_id": canisterId, "available_quantity": canister.available_quantity, "filled_quantity": fillQty, "scanned_ndc": ndc, "lot_number": lotNo, "expiration_date": dateToSend, "user_id": user_id, "device_id": canister.device_id, "drug_scan_type": 77, "max_canister_capacity": 169, "replenishment_mode": 81, "company_id": company_id, "module_id": 30 }) })
            .then( data => {
                console.log('canister replenish data', data);
                if (data?.status == 'success') {
                    console.log('before canister avail', canister.available_quantity);
                    // await setCanister({});
                    setCanister({...canister,...Object.assign(canister, { available_quantity: Number(canister.available_quantity) + Number(fillQty) })});
                    console.log('before canister avail', canister.available_quantity);
                }
            })
            .catch(error => {
                setCanister({...canister,...Object.assign(canister, { available_quantity: Number(canister.available_quantity) + Number(fillQty) })});
                console.log('error in canister replenish api', error)
            })
    }

    function handleResetAll() {
        setCanisterId('');
        setNdc('');
        setLotNo('');
        setDate()
        setSelectedDate(null);
        setFillQty(0);
    }

    function setValues(dataToset, data){
        setNdc(dataToset); 
        setLotNo(data?.data?.lot_number);
        setSelectedDate(data?.data.expiration_date);
    }

    function handleUpdatedData(data) {
        // setData(data.data.drug_scan_type == scanType.BARCODE? data.data.ndc_list[0]
        //         :data.data.drug_scan_type == scanType.CANISTER_SCAN? data.data.canister_id
        //         :'');
        console.log('data to handle at field scanner', data, data.data.drug_scan_type)
        const dataToset = data.data.drug_scan_type == scanType.DATA_MATRIX ? data.data.ndc_list[0]
            : data.data.drug_scan_type == scanType.CANISTER_SCAN ? data.data.canister_id
                : ''
        console.log('data being set after scan', dataToset, scannerLoc);
        scannerLoc == '2' ? setValues(dataToset,data) : setCanisterId(dataToset);
        console.log('canister id', canisterId);
    }
    return (
        <View style={styles.container}>
            <SkipModal isVisible={isModalVisible} onClose={toggleModal} drug={data[0]} canister={canister} />
            <DiscardModal isVisible={isDiscardVisible} onClose={toggleDiscarModal} drug={data[0]} canister={canister} />
            <ScannerModal isVisible={isScannerModalVisible} onClose={toggleScannerModal} setData={handleUpdatedData}></ScannerModal>
            <View style={{ ...globalStyles.card, ...globalStyles.row }}>
                <View style={{ ...canister_exp_status_style[canister.expiry_status].idBox, ...{ alignSelf: 'center' } }}>
                    <Text style={canister_exp_status_style[canister.expiry_status].idText} >{canister.canister_id}</Text>
                </View>

                <TouchableOpacity style={styles.zero} onPress={async () => { 
                    resetToZero(canister).then(data=>{
                        console.log('data returned from rest to 0',data);
                        data?.status == 'success' ? canisterInfo(canister):''
                    });
                    }}>
                    <Text>0</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.unlock,...{display:canister.display_location?'':'none'}}} onPress={() => { handleUnlock(canister) }}>
                    <Icon name="unlock" size={20} color="grey" />
                </TouchableOpacity>

                <TouchableOpacity style={{...styles.discardButton,...{display: (canister?.device_name)?.includes('DD') || canister.expiry_status == 0 ? '':'none'}}} onPress={canister.expiry_status == 0 ? () => { toggleDiscarModal(canister) } : () => { toggleModal(canister) }}>
                    <Text>{canister.expiry_status == 0 ? 'Discard' : 'Skip'}</Text>
                </TouchableOpacity>
            </View>
            {/* TODO: passing same argument in drug as well as canister need to segregate for batter understanding */}
            <DrugData
                drug={canister}
                showInvQty={false}
                showCanisterId={false}
                canister={canister}
                showStockStatus={true}
                showLocAndQty={true}
                showLastSeen={true}
            >
            </DrugData>
            <ErrorMsg text={canister_exp_status_style[canister.expiry_status].errorMsg}></ErrorMsg>
            {!canister_exp_status_style[canister.expiry_status].errorMsg && <ScrollView>
                <View style={globalStyles.row}>
                    <TextInput
                        style={{...globalStyles.input,...{}}}
                        placeholder="Scan Canister"
                        value={canisterId.toString()}
                        onChangeText={setCanisterId}
                        keyboardType="numeric"
                    />
                    <Icon name="qrcode" size={30} onPress={() => {
                        toggleScannerModal();
                        setScannerLoc('1');
                    }} />
                </View>
                <View style={globalStyles.row}>
                    <TextInput
                        style={globalStyles.input}
                        placeholder="Scan Drug Bottle/NDC"
                        value={ndc.toString()}
                        onChangeText={setNdc}
                        keyboardType="numeric"
                    />
                    <Icon name="qrcode" size={30} onPress={() => {
                        toggleScannerModal();
                        setScannerLoc('2');
                    }} />
                </View>
                <TextInput
                    style={globalStyles.input}
                    placeholder="Lot No"
                    value={lotNo}
                    onChangeText={setLotNo}
                />
                <View>


                    <TouchableOpacity style={styles.button} onPress={showDatePicker}>
                        <Text style={styles.buttonText}>{selectedDate ? selectedDate : 'Select Month & Year'}</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        display="spinner"
                        datePickerModeAndroid="spinner"
                        onCancel={hideDatePicker}
                        onConfirm={handleConfirm}
                    />
                </View>

                <TextInput
                    style={globalStyles.input}
                    placeholder="Fill Qty"
                    value={fillQty}
                    onChangeText={setFillQty}
                    keyboardType="numeric"
                />
                <View style={{ ...globalStyles.row, ...{ justifyContent: 'space-evenly' } }}>
                    <View style={styles.resetAll}>
                        <Button title="Reset All" onPress={handleResetAll}></Button>
                    </View>
                    <View style={styles.save}>
                        <Button title="Save" onPress={handleSave}></Button>
                    </View>
                </View>
            </ScrollView>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 5,
    },

    unlock: {
        flexDirection: 'row',
        height: '200%',
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 145,
        alignSelf: 'center',
    },

    discardButton: {
        flexDirection: 'row',
        height: '200%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 10,
        alignSelf: 'center',
    },

    zero: {
        flexDirection: 'row',
        position: 'absolute',
        height: '200%',
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 200,
        alignSelf: 'center',
    },
    save: {
        // flex:3
        width: '40%'
    },
    resetAll: {
        // flex:1
        width: '40%',
        // color:'black'
    },

    resetAllText: {
        color: 'black'
    }
})