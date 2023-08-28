import {FC} from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {MANAGE_INDEX_PATHNAME} from "../router";


// 404页面
const NotFound:FC = () => {
    let navigateFunction = useNavigate();
    return (
        <Result status={404} title={404} subTitle={"抱歉，您访问的页面不存在"} extra={<Button type={"primary"}
            onClick={() => navigateFunction(MANAGE_INDEX_PATHNAME)}>
            返回首页
        </Button>}>

        </Result>
    )
}

export default NotFound
