import React from "react";
import { Text } from "react-native";
import { globalStyles } from "./globalStyles";


export default function ErrorMsg({text}){
    return (
        <Text style={globalStyles.errorText}>{text}</Text>
    )

}