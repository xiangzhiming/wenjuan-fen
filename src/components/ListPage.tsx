import {FC, useEffect, useState} from "react";
import {Pagination} from "antd";
import {LIST_PAGE_PARAM_KEY, LIST_PAGE_SIZE, LIST_PAGE_SIZE_PARAM_KEY} from "../constant";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

type PropsType = {
    total: number
}

const ListPage: FC<PropsType> = (props) => {
    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(LIST_PAGE_SIZE);
    const {total} = props
    const [searchParams] = useSearchParams();
    useEffect(() => {
        setCurrent(parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1)
        setPageSize(parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE);
    }, [searchParams])

    // 当page pageSize改变时，跳转页面（改变url参数）
    const nav = useNavigate();
    const {pathname} = useLocation();
    function handlePageChange(page: number, pageSize: number) {
        searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
        searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
        nav({
            pathname,
            search: searchParams.toString(),
        })
    }

    return (
        <Pagination current={current} pageSize={pageSize} total={total} onChange={handlePageChange}/>
    );
};

export default ListPage;
