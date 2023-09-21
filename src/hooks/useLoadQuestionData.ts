import {useParams} from "react-router-dom";
import {getQuestionService} from "../services/question";
import {useRequest} from "ahooks";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";
import pageInfoReducer, {resetPageInfo} from "../store/pageInfoReducer";

/**
 * 组件state网络加载
 */
function useLoadQuestionData() {
    const {id = ""} = useParams(); // useParams()可以自动解析出动态路由中传递的参数的值。前提是参数名要写成一样
    const dispatch = useDispatch();
    const {data, error, loading, run} = useRequest(
        async (id: string) => {
            if (!id) throw new Error("没有问卷 id");
            return await getQuestionService(id);
        }, {
            manual: true,
        }
    )

    // 根据获取的data 设置 redux store
    useEffect(() => {
        if (!data) return;

        // 获取默认的selectId
        const {title = "", desc = "", js = "", css = "", componentList = []} = data;
        let selectId = "";
        if (componentList.length > 0) {
            selectId = componentList[0].fe_id;  // 默认选中第一个组件
        }

        // 把pageInfo 储存的redux store
        dispatch(resetPageInfo({title, desc, js, css}))

        // 把componentList储存到Redux store 中
        dispatch(resetComponents({componentList, selectId, copiedComponent: null}));
    }, [data]);

    // 判断id变化，执行ajax加载问卷数据
    useEffect(() => {
        run(id);
    }, [id]);
    return {loading, error}
}

export default useLoadQuestionData;
