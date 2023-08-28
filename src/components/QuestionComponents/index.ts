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

export function getComponetConfByType(type: string) {
    return componentConfList.find(c => c.type === type);
}
