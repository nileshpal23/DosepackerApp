import { backendUrl, robotUrl } from "../config/config";
import { company_id, user_id } from "../constants/constants";
import { getData, postData } from "./apis";
import React from "react";

export function handleUnlock(canister) {
    console.log('canister for unlock', canister);
    const drawerData = canister.display_location.split('-');
    const drawer_number = drawerData[0];
    const location = drawerData[1];

    console.log('drawer ', drawerData);

    getData(`${robotUrl}/api/unlock_and_blink_canister_drawer?unlock_status=1&location_dict=${`{"${drawer_number}":["${location}"]}`}&location_color_value=YELLOW_BLINK&location_glow_status=1&blink_front_panel=0`)
        .then(data => {
            console.log('unlock data', data);
        })
        .catch(error => {
            console.log('error data in unlock', error);
        })
}

export async function resetToZero(canister) {
    let response;
    await postData(`${backendUrl}/adjustcanisterquantity`, { args: JSON.stringify({ "canister_id": canister.canister_id, "user_id": user_id, "company_id": company_id, "actual_quantity": 0 }) })
        .then(data => {
            console.log('data of reset to zero', data);
            response=data;

        })
        .catch(error => {
            console.log('error reset to zero', error);
            response=error;
        })
    console.log('response reset', response);
    return response;
}