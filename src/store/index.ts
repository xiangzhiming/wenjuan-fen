import {configureStore} from "@reduxjs/toolkit";
import userReducer, {UserStateType} from "./userReducer";
import componentsReducer, {ComponentsStateType} from "./componentsReducer";
import pageInfoReducer, {PageInfoType} from "./pageInfoReducer";

export type StateType = {
    user: UserStateType;
    components: ComponentsStateType;
    pageInfo: PageInfoType;

}

export default configureStore({
    reducer: {
        // 用户状态
        user: userReducer,

        // 组件库状态
        components: componentsReducer,

        //  页面设置状态
        pageInfo: pageInfoReducer,
    }
})
