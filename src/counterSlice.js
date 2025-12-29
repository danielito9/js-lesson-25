import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchTodos = createAsyncThunk(  
    "counter/fetchTodos",
    async(_, { getState, rejectWithValue }) => {
        try{
            const url = getState().counter.url
            const {data} = await axios.get(url)
            return data.todos ?? data
        }catch(e){
            return rejectWithValue(e.response?.data ?? e.message);
        }
    }
) 

const counterSlice = createSlice({
    name:"counter",
    initialState:{
        value:0,
        users:[],
        url:"https://dummyjson.com/todos",
        loading:false,
        error:null
    },
    reducers:{
        increment: (state) => {
            state.value += 1
        },
        decrement: (state) => {
            state.value -=1
        },
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchTodos.pending, (state) => {
            state.loading = true,
            state.error = null
        })
        .addCase(fetchTodos.fulfilled, (state, action) => {
            state.loading = false,
            state.users = action.payload
        })
        .addCase(fetchTodos.rejected, (state, action) => {
            state.loading = false,
            state.error = action.payload ?? "Ошибка запроса"
        })
    }

})
export const { increment, decrement,} = counterSlice.actions
export default counterSlice.reducer 