import {FC, useEffect, useRef, useState} from "react";
import styles from "./common.module.scss"
import QuestionCard from "../../components/QuestionCard";
import {useSearchParams} from "react-router-dom";
import {useDebounceFn, useRequest, useTitle} from "ahooks";
import {Empty, Spin, Typography} from "antd";
import ListSearch from "../../components/ListSearch";
import {getQuestionListService} from '../../services/question';
import {LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY} from "../../constant";




const { Title } = Typography

// 我的问卷
const List:FC = () => {
    useTitle("法制调查 - 我的问卷")

    const [list, setList] = useState([]);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [started, setStarted] = useState(false); // 是否已经开始加载了（防抖，有延迟时间）
    const haveMoreData = total > list.length  // 有没有更多的，未加载完成的数据

    const [searchParams] = useSearchParams();

    const containerRef = useRef<HTMLDivElement>(null);
    const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

    useEffect(() => {
        setStarted(false);
        setPage(1);
        setTotal(0);
        setList([]);
    },[keyword])

    // 真正加载
    const {run: load,loading} = useRequest(async () => {
        const data = await getQuestionListService({
            page,
            pageSize: LIST_PAGE_SIZE,
            keyword,
        })
        return data;
    },{
        onSuccess(result){
            const {list: l = [],total = 0} = result;
            setList(list.concat(l));
            setTotal(total);
            setPage(page + 1);
        }
    })

    // 尝试去触发加载  --  防抖
    const {run: tryLoadMore} = useDebounceFn(() => {
        const elem = containerRef.current;
        if (elem == null) return;
        // 该方法 Element.getBoundingClientRect() 返回一个 DOMRect 对象，提供有关元素大小及其相对于 视区 的位置的信息。
        const domRect = elem.getBoundingClientRect();
        if (domRect == null) return;
        // 解构出bottom(底)的数值
        const {bottom} = domRect;
        if (bottom <= document.body.clientHeight) {
            load();
            setStarted(true);

        }
    },{
        wait: 1000
    });

    // 当页面加载，或者 url 参数（keyword）变化时，触发加载
    useEffect(() =>{
        tryLoadMore();
    },[searchParams])

    // 当页面滚动时，要尝试触发加载
    useEffect(() =>{
        if (haveMoreData) {
            window.addEventListener("scroll", tryLoadMore);  // 考虑防抖
        }
        return () => {
            window.removeEventListener("scroll", tryLoadMore);   // 解绑时间，重要
        }
    },[searchParams,haveMoreData])

     const LoadMoreContentElem = () =>{
        if (!started || loading) return <Spin/>;
        if (total === 0) return <Empty description={"暂无数据"}/>;
        if (!haveMoreData) return <span>没有更多数据了</span>;
        return <span>开始加载下一页</span>;
    }

    return (<>
        <div className={styles.header}>
            <div className={styles.left}>
                <Title level={3}>
                    我的问卷
                </Title>
            </div>
            <div className={styles.right}>
                <ListSearch/>
            </div>
        </div>
        <div className={styles.content}>
            {list.length > 0 && list.map((items: any) => {
                const {_id} = items
                return <QuestionCard key={_id} {...items}/>
            })}
        </div>
        <div className={styles.footer}>
            <div ref={containerRef}>
                {LoadMoreContentElem()}
            </div>
        </div>
    </>);
}
export default List;
