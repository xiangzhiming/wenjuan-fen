import {useSelector} from "react-redux";
import {StateType} from "../store";
import {PageInfoType} from "../store/pageInfoReducer";

/**
 * 获取页面设置组件的属性信息
 */
export default function useGetPageInfo() {
    const pageInfo = useSelector<StateType>(state => state.pageInfo) as PageInfoType;
    return pageInfo;
}
