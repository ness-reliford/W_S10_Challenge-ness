import { createSlice } from "@reduxjs/toolkit";

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState: {
        filter: {size: "All"}
    },
    reducers: {
        filterPizzaSizes: state => {
            state.filter = state.size
        }
    }
})

export const {
    filterPizzaSizes,
} = pizzaSlice.actions

export default pizzaSlice.reducer