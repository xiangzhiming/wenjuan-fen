import {FC} from "react";
import {AppstoreOutlined, BarsOutlined} from "@ant-design/icons";
import {Tabs} from "antd";
import ComponentLib from "./ComponentLib";

const LeftPanel:FC = ()=> {
    const tabsItems = [
        {
            key: "componentLib",
            label: (
                <span>
                    <AppstoreOutlined/>
                    组件库
                </span>
            ),
            children: <div><ComponentLib/></div>
        },
        {
            key: "layers",
            label: (
                <span>
                    <AppstoreOutlined/>
                    图层
                </span>
            ),
            children:<div>图层1</div>
        }
    ]
    return (<div>
        <Tabs defaultActiveKey= "componentLib" items={tabsItems}></Tabs>
    </div>)

}

export default LeftPanel;
