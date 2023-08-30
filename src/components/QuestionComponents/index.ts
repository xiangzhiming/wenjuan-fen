import QuestionTitleConf, {QuestionTitlePropsType} from "./QuestionTitle/index";
import QuestionInputConf, {QuestionInputPropsType} from "./QuestionInput";

import {FC} from "react";
import Component from "./QuestionTitle/Component";


// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType;

// 统一，组件的配置
export type ComponentConfType = {
    title: string;
    type: string;
    Component: FC<ComponentPropsType>;
    defaultProps: ComponentPropsType;
}

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf];
// 组件分组
export const componentConfGroup  = [
    {
        groupId: "textGroup",
        groupName: "文本显示",
        components: [QuestionTitleConf]
    },
    {
        groupId: "inputGroup",
        groupName: "用户输入",
        components: [QuestionInputConf]
    }
]

export function getComponetConfByType(type: string) {
    return componentConfList.find(c => c.type === type);
}
