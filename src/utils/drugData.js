import React, { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { globalStyles } from "./globalStyles";


export default function DrugData({ drug, showCanisterId, canister, showInvQty, showStockStatus, showLocAndQty, showLastSeen }) {
    // console.log('drug data render',canister.available_quantity);
    return (
        <View style={globalStyles.card}>
            <View style={globalStyles.row}>
                <Image
                    source={require('../../assets/Iconpill.png')} // Replace this with your company logo
                />
                <View style={globalStyles.drugData}>
                    {showStockStatus && <Text style={drug?.is_in_stock ? globalStyles.inStock : globalStyles.outStock}>{drug?.is_in_stock ? 'In Stock' : 'Out of Stock'}</Text>}
                    {showCanisterId && <Text>Canister ID: <Text style={globalStyles.bold}>{canister.canister_id}</Text></Text>}
                    <Text>{drug?.drug_name}</Text>
                    <Text style={globalStyles.bold}>{drug?.ndc}</Text>
                    {showInvQty && <Text>Inventory Qty:{drug?.inventory_quantity}</Text>}
                </View>
            </View>
            {showLocAndQty && <View style={globalStyles.row}>
                <View style={globalStyles.locAvContainer}>
                    <Text style={globalStyles.drawerLoc}>Drawer ID(Loc): {canister.display_location ? canister.display_location : 'Shelf'}</Text>
                    <Text style={globalStyles.qtyData}>Avail./Req. Qty: {`${canister.available_quantity}/${canister.batch_required_quantity}`}</Text>
                </View>
            </View>}
            {showLastSeen && <View style={globalStyles.row}>
                <Text> Last Seen With : {canister.last_seen_with}</Text>
            </View>}
        </View>
    )
}