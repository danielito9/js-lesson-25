import axios from "axios";
import { create } from "zustand";


export const useCounter = create((set) => (
    {
        count:0,
        plus: () => set((state) => ({count: state.count + 1})),
        minus: () => set((state) => ({count: state.count - 1}))
    }))

export const useFetch = create ((set, get) => ({
    todos:[],
    url:"https://dummyjson.com/todos",
    loating:true,
    error:null,

    zapros: async () => {
        set({loating:true, error:null})
        try{
            const { data } = await axios.get(get().url)
            set({todos:data.todos ?? data, loating:false})
        }
        catch(e){
            set({error:e.message, loating:false})
        }
    }
}))