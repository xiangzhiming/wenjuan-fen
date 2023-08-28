import {useParams} from "react-router-dom";
import {getQuestionService} from "../services/question";
import {useRequest} from "ahooks";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {resetComponents} from "../store/componentsReducer";

function useLoadQuestionData() {
    const {id = ""} = useParams(); // useParams()可以自动解析出动态路由中传递的参数的值。前提是参数名要写成一样
    const dispatch = useDispatch();
    const {data,error,loading,run} = useRequest(
        async (id: string) => {
            if (!id) throw new Error("没有问卷 id");
            return await getQuestionService(id);
        },{
            manual: true,
        }
    )
    useEffect(() => {
        if (!data) return;
        const {title = "", componentList = []} = data;
        dispatch(resetComponents({componentList}));
    }, [data]);

    useEffect(() => {
        run(id);
    }, [id]);
    return {loading, error}
}

export default useLoadQuestionData;
