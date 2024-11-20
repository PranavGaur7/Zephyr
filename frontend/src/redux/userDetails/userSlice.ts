import { createSlice } from "@reduxjs/toolkit";
export interface state{
    isLoading: boolean,
    userDetails: any | null,
    logged:boolean
}
const initialState:state = {
    isLoading: false,
    userDetails: null,
    logged:false
};

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setLogin:(state,action)=>{
            const {logged,userDetails} = action.payload;
            state.logged = logged;
            state.userDetails = userDetails;
        },
        setLogout:(state,action)=>{
            state.logged = false;
            state.userDetails = null;
        }
    }
})

export const {setLogin,setLogout} = userSlice.actions
export default userSlice.reducer