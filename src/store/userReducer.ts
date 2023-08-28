import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type UserStateType = {
    username: string,
    nickname: string
}
const INIT_STATE: UserStateType = {username: "", nickname: ""}

export const userSlice = createSlice({
    name: "user",
    initialState: INIT_STATE,
    reducers: {
        loginReducer: (state: UserStateType, action: PayloadAction<UserStateType>) => {
            return action.payload;   // 设置 username  nickname 到redux的store中
        },
        logOutReducer: () => INIT_STATE,   //  退出登录  情况用户的信息
    }
})

export const {loginReducer,logOutReducer} = userSlice.actions
export default userSlice.reducer;
