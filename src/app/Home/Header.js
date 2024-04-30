import React from "react";
import { View, Image, StyleSheet } from "react-native";


export default function Header() {
    <View style={styles.container}>
        <Image
            source={require('../../assets/logo.png')} // Replace this with your company logo
            style={styles.logo}
        />
    </View>
}

const styles= StyleSheet.create({
    logo:{
        height:100,
        width:100
    },
    container:{
        height:100,
        backgroundColor:'red'
    }
})