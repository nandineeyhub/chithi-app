import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
    name:"profile",
    initialState:{
        profileOpen : false
    },
    reducers:{
       handleProfileOpen : (state) => {
           state.profileOpen = !state.profileOpen;
       }
    }
})

export const { handleProfileOpen } = profileSlice.actions

export default profileSlice.reducer;