import React from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Assuming you're using Expo for vector icons
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import ScannerModal from '../../utils/Modals/ScannerModal';
import { company_id, scanType, system_id } from '../../constants/constants';
import { backendUrl } from '../../config/config';
import { getData } from '../../utils/apis';

export default function ScannerButton({ data }) {
  const navigation = useNavigation();
  const [isScannerModalVisible, setIsScannerModalVisible] = useState(false);
  const [canister, setCanister] = useState();
  const handlePress = () => {
    toggleScannerModal();
  };
  function toggleScannerModal() {
    setIsScannerModalVisible(prev => { return !prev })
  }
  // async function loadScannedNdc(scannedNdc) {

  //   console.log('scanned ndc1', scannedNdc);

  //   await getData(backendUrl + `/getcanisterinfobydrug?company_id=${company_id}&filters={"ndc": "${scannedNdc}"}&paginate={"page_number": 1, "number_of_rows":10}`)
  //     .then(
  //       async data => {
  //         console.log('drug data', data.data)
  //         // console.log('retrived data of canister list', data.data[0].is_in_stock);
  //         await setDrugInfo(data?.data);
  //         console.log('drug info',data)
  //         console.log('sending in replenish',{...data,...data?.data})
  //         navigation.navigate('ReplenishCanister', {...data,...data?.data})
  //         return  data.data;
  //       })
  //     .catch(
  //       error => {

  //         console.log('error in getcanisterinfobydrug', error);
  //         return null
  //       }
  //     )
  // }

  function canisterInfo(scanData){
    console.log('here',scanData);
    getData(`${backendUrl}/v2/api/getcanisterinfo?company_id=${company_id}&system_id=${system_id}&filters={"canister_id":${scanData.data?.canister_id}}&sort_fields=[["canister_active",-1],["display_quantity",1],["drawer_initial",-1],["drawer_number",-1]]&paginate={"page_number":1,"number_of_rows":10}`)
    .then(data =>{
        console.log(data);
        console.log('canister info',data?.data?.canister_list[0])
          console.log('sending in replenish',{...scanData,...data?.data?.canister_list[0]})
          navigation.navigate('ReplenishCanister', {...scanData,...data?.data?.canister_list[0]})
    })
    .error(error =>{
        console.log('canister info api error', error)
    })
}
  async function handleUpdatedData(data) {
    // await AsyncStorage.setItem('scannedNdc',data.data.ndc_list[0]);
    // await AsyncStorage.setItem('invQty', '0')
    console.log('handling data', data);
    if (data?.data?.drug_scan_type == scanType.CANISTER_SCAN) {
      await canisterInfo(data)
    }
    else {
      navigation.navigate('List of Canisters', { scannedNdc: data.data.ndc_list[0], invQty: data.data.inventory_quantity, drug: data?.data })
    }
    // console.log('data being set after scan', data, scannerLoc);
    // scannerLoc == '2' ? setNdc(data) : setCanisterId(data);
    // console.log('canister id', canisterId);


  }
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <ScannerModal isVisible={isScannerModalVisible} onClose={toggleScannerModal} setData={handleUpdatedData}></ScannerModal>
      <AntDesign name="scan1" size={24} color="white" />
      <Text style={styles.text}>Scan QR</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#007bff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // for Android shadow
  },
  text: {
    color: 'white',
    marginTop: 5,
  },
});
