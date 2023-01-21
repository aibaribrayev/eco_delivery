import { createSlice } from "@reduxjs/toolkit";

let initialState = {
    address: [],
};

const addressSlice = createSlice({
    name: "address",
    initialState: initialState,
    reducers: {
        setAddress(state, address) {
            state.address.push(address.payload);
        },
    },
});

export const addressActions = addressSlice.actions;
export const addressReducer = addressSlice.reducer;
