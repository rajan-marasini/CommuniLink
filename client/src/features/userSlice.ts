import { RootState } from "@/app/store";
import { UserType } from "@/interfaces/types";
import { createSlice } from "@reduxjs/toolkit";

interface UserState {
    user: UserType | null;
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
        followaPerson: (state, action) => {
            const { _id } = action.payload;

            const index = state.user?.following.indexOf(_id);

            if (index === -1) {
                state.user?.following.push(_id);
            } else {
                state.user?.following.splice(index!, 1);
            }
        },
    },
});

export const { login, logout, followaPerson, setUser } = userSlice.actions;
export const userSelector = (state: RootState) => state.user.user;
export default userSlice.reducer;
