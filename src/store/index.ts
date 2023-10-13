import {configureStore} from "@reduxjs/toolkit";
import undoable, {excludeAction, StateWithHistory} from 'redux-undo';
import userReducer, {UserStateType} from "./userReducer";
import componentsReducer, {ComponentsStateType} from "./componentsReducer";
import pageInfoReducer, {PageInfoType} from "./pageInfoReducer";

export type StateType = {
    user: UserStateType;
    components: StateWithHistory<ComponentsStateType>;  // 增加redux-undo
    pageInfo: PageInfoType;

}

export default configureStore({
    reducer: {
        // 用户状态
        user: userReducer,

        // 没用redux-undo时
        // 组件库状态
        // components: componentsReducer,

        // 使用redux-undo时
        components: undoable(componentsReducer,{
            limit: 20, // 只能有20步历史记录
            filter: excludeAction([  // 那些action不用撤销、重做
                'components/resetComponents',
                'components/changeSelectId',
                'components/selectPrevComponent',
                'components/selectNextComponent',
            ])
        }),

        //  页面设置状态
        pageInfo: pageInfoReducer,
    }
})
