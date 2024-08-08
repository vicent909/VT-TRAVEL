import { createSlice, configureStore } from '@reduxjs/toolkit';
import { api } from '../utils/api';
import Swal from 'sweetalert2';

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        categories: ""
    },
    reducers: {
        addCategories(state, action){
            state.categories = action.payload
        }
    }
})

export const actions = categoriesSlice.actions;
const reducer = categoriesSlice.reducer;

export const store = configureStore({
    reducer: reducer
})

export const fetchCategories = () => {
    return async (dispatch) => {
        try {
            const { data } = await api({
                url: '/travels/categories',
                headers: {}
            })

            dispatch(actions.addCategories(data))
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.response?.data?.message
            })
        }
    }
}