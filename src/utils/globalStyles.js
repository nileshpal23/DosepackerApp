import { StyleSheet } from "react-native";


export const globalStyles = StyleSheet.create({
    card: {
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
    row: {
        flexDirection: 'row',
        marginBottom: 10,
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
    drugData: {
        marginLeft: 7
    },
    locAvContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    drawerLoc: {
        backgroundColor: 'rgba(238, 238, 238, 1)',
        width: '50%',
    },

    qtyData: {
        backgroundColor: 'rgba(238, 238, 238, 1)',
        width: '50%',
    },
    input: {
        // width: 400,
        height: 40,
        borderBottomColor: 'gray',
        borderBottomWidth: 1,
        borderRadius: 5,
        marginBottom: 30,
        paddingHorizontal: 10,
    },

    modalTitleText: {
        fontWeight: 'bold',
        fontSize: 25,
    },

    modalInfoMsg: {
        color: 'grey',
        fontSize: 15,
        marginBottom: 15,
    },

    bold: {
        fontWeight: 'bold'
    },

    errorText: {
        color: 'red',
        marginBottom: 10,
    },

})