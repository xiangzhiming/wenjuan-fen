import {Component, FC, useEffect, useState} from "react";
import {Tabs} from "antd";
import {FileTextOutlined, SettingOutlined} from "@ant-design/icons";
import {ComponentProp} from "./ComponentProp";
import {PageSetting} from "./PageSetting";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";

enum TAB_KEYS {
    PROP_KEY = "prop",
    SETTING_KEY = "setting"
}

export const RightPanel:FC = () => {
    const [action,setAcation] = useState(TAB_KEYS.PROP_KEY);
    const {selectId} = useGetComponentInfo();
    useEffect(() => {
        if (selectId) setAcation(TAB_KEYS.PROP_KEY)
        else setAcation(TAB_KEYS.SETTING_KEY);
    },[selectId])

    const tabsItems = [
        {
            key: TAB_KEYS.PROP_KEY,
            label: (
                <span>
                    <FileTextOutlined/>
                    属性
                </span>
            ),
            children: <ComponentProp/>
        },
        {
            key: TAB_KEYS.SETTING_KEY,
            label: (
                <span>
                    <SettingOutlined/>
                    页面设置
                </span>
            ),
            children: <div><PageSetting/></div>
        }
    ]
    return (<Tabs activeKey = {action} items={tabsItems}>
    </Tabs>)
}
