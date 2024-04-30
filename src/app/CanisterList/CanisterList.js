import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'; // Assuming you're using FontAwesome icons
import { getData } from "../../utils/apis";
import { backendUrl, robotUrl } from "../../config/config";
import { canister_exp_status_style, company_id } from "../../constants/constants";
import { useNavigation, useRoute } from "@react-navigation/native";
import SkipModal from "../../utils/Modals/SkipModal";
import DiscardModal from "../../utils/Modals/DiscardModal";
import { handleUnlock } from "../../utils/commonActions";
import { globalStyles } from "../../utils/globalStyles";

export default function CanisterList() {
    const route = useRoute();
    const dataFromScanner = route.params;
    const navigation = useNavigation();
    const [scannedNdc, setScannedNdc] = useState(dataFromScanner.scannedNdc);
    const [drugName, setDrugName] = useState('');
    const [ndc, setNdc] = useState('');
    const [invQty, setInvQty] = useState(dataFromScanner.invQty);
    const [data, setData] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isDiscardVisible, setIsDiscardVisible] = useState(false);
    const [currentCanister, setCurrentCanister] = useState({});

    useEffect(() => {
        console.log('loading scanned');
        loadScannedNdc();
    }, [currentCanister]);
    console.log('open render',dataFromScanner);

    const toggleModal = (canister = {}) => {
        setIsModalVisible(!isModalVisible);
        setCurrentCanister(canister)
    };


    const toggleDiscarModal = (canister = {}) => {
        setIsDiscardVisible(prev => { return !prev });
        setCurrentCanister(Object.assign({},canister))
    };

    async function loadScannedNdc() {

        console.log('scanned ndc1', scannedNdc);

        getData(backendUrl + `/getcanisterinfobydrug?company_id=${company_id}&filters={"ndc": "${scannedNdc}"}&paginate={"page_number": 1, "number_of_rows":10}`)
            .then(
                data => {
                    // console.log('canister list data', data.data)
                    // console.log('retrived data of canister list', data.data[0].is_in_stock);
                    setData(data.data);

                })
            .catch(
                error => {

                    console.log('error in getcanisterinfobydrug', error);
                }
            )
    }

    function openReplenish(canister) {
        console.log('data before nav',data)
        navigation.navigate('ReplenishCanister', { ...canister, ...{ invQty: invQty }, ...{ data: data } , ...{dataFromScanner}});
    }
    return (
        <View style={styles.container}>
            <SkipModal isVisible={isModalVisible} onClose={toggleModal} drug={data[0]} canister={currentCanister} />
            <DiscardModal isVisible={isDiscardVisible} onClose={toggleDiscarModal} drug={data[0]} canister={currentCanister} />
            <View style={styles.card}>
                <View style={styles.row}>
                    <Image
                        source={require('../../../assets/Iconpill.png')} // Replace this with your company logo
                    />
                    <View style={styles.drugData}>
                        <Text style={data[0]?.is_in_stock ? styles.inStock : styles.outStock}>{data[0]?.is_in_stock ? 'In Stock' : 'Out of Stock'}</Text>
                        <Text>{data[0]?.drug_name}</Text>
                        <Text>{data[0]?.ndc}</Text>
                        <Text>Inventory Qty:{invQty}</Text>
                    </View>
                </View>
                {/* <View style={styles.row}>
                    <Text style={styles.drawerLoc}>Drawer ID(Loc): B2(2)</Text>
                    <Text style={styles.qtyData}>Avail./Req. Qty: 100/160</Text>
                </View> */}

            </View>

            <Text style={styles.listTitle}>List Of Canisters</Text>
            <ScrollView>
                {data.map((canister, index) =>
                (
                    // Todo : current canister development

                    <View
                        key={index}
                        style={styles.card}
                    >

                        <View style={styles.row}>
                            <View style={canister_exp_status_style[canister.expiry_status].idBox}>
                                <Text style={canister_exp_status_style[canister.expiry_status].idText} >{canister.canister_id}</Text>
                            </View>
                            <View style={canister_exp_status_style[canister.expiry_status].expBox}>
                                <Text style={canister_exp_status_style[canister.expiry_status].expText} >{canister_exp_status_style[canister.expiry_status].text}</Text>
                            </View>

                            <TouchableOpacity style={{...styles.unlock,...{display:canister.display_location?'':'none'}}} onPress={() => { handleUnlock(canister) }}>
                                <Icon name="unlock" size={20} color="grey" />
                            </TouchableOpacity>

                            <TouchableOpacity style={{...styles.discardButton,...{display: (canister?.device_name)?.includes('DD')|| canister.expiry_status == 0? '':'none'}}} onPress={canister.expiry_status == 0 ? () => { toggleDiscarModal(canister) } : () => { toggleModal(canister) }}>
                                <Text>{canister.expiry_status == 0 ? 'Discard' : 'Skip'}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.row}>
                            <View style={styles.locAvContainer}>
                                <Text style={styles.drawerLoc}>Drawer ID(Loc): {canister.display_location ? canister.display_location : 'Shelf'}</Text>
                                <Text style={styles.qtyData}>Avail. Qty: {canister.available_quantity}</Text>
                            </View>
                        </View> */}
                        <View style={globalStyles.row}>
                            <View style={globalStyles.locAvContainer}>
                                <Text style={globalStyles.drawerLoc}>Drawer ID(Loc): {canister.display_location ? canister.display_location : 'Shelf'}</Text>
                                <Text style={globalStyles.qtyData}>Avail./Req. Qty: {`${canister.available_quantity}/${canister.batch_required_quantity}`}</Text>
                            </View>
                        </View>

                        <View style={styles.row}>
                            <TouchableOpacity style={styles.replenishButton} onPress={() => openReplenish(canister)}>
                                <Text>(00h:09m)</Text>
                                <Icon style={styles.caretButton} name="caret-right" size={30} color="grey" />
                            </TouchableOpacity>
                        </View>
                    </View>))}
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },

    row: {
        flexDirection: 'row',
        marginBottom: 10,
    },

    card: {
        // flex:1,
        // flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 10,
    },
    drugData: {
        marginLeft: 7
    },
    inStock: {
        backgroundColor: 'rgba(0, 128, 0, 0.15)',
        width: '50%',
        color: 'green',
        fontWeight: 'bold'
    },
    outStock: {
        backgroundColor: 'rgba(128, 0, 0, 0.15)',
        width: '35%',
        color: 'red',
        fontWeight: 'bold'
    },
    drawerLoc: {
        backgroundColor: 'rgba(238, 238, 238, 1)',
        width: '50%',
    },

    qtyData: {
        backgroundColor: 'rgba(238, 238, 238, 1)',
        width: '50%',
    },

    listTitle: {
        marginTop: 20,
        fontSize: 25,
        color: 'grey',
    },

    idBox: {
        backgroundColor: 'rgba(236, 0, 0, 1)',
        color: 'white',
        height: '200%',
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginRight: 10,
    },

    idText: {
        color: 'white',
    },

    expiryBox: {
        backgroundColor: 'rgba(236, 0, 0, 0.15)',
        height: '200%',
        width: '20%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
    },

    expiryText: {
        color: 'red',
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
    },
    locAvContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },

    replenishButton: {
        marginBottom: -10,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        // height: '200%',
        // width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // marginLeft: 10,
    },

    caretButton: {
        marginLeft: 250
    }


})