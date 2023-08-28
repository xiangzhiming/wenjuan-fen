import {Input} from 'antd'
import {ChangeEvent, FC, useEffect, useState} from "react";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {LIST_SEARCH_PARAM_KEY} from "../constant";



const {Search} = Input
const ListSearch: FC = () => {
    const {pathname} = useLocation();   //  获取的路由地址
    const [value,setValue] = useState('')
    const [searchParams] = useSearchParams();
    const nav = useNavigate();
    useEffect(() => {
        const carVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || '';
        setValue(carVal);
    },[searchParams])

    function handleSearch() {
        nav(`${pathname}?${LIST_SEARCH_PARAM_KEY}=${value}`)
        /*nav({
            pathname,
            search: `${LIST_SEARCH_PARAM_KEY}=${value}`

        })*/
    }
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        setValue(event.target.value);
    }


    return (
        <div>
            <Search placeholder={"请输入搜索关键字"} onSearch={handleSearch} style={{width: "260px"}}
            size={"large"} value={value} allowClear  onChange={handleChange} />
        </div>
    )
}

export default ListSearch
