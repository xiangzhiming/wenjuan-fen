import {FC} from "react";
import QuestionTitleConf, {QuestionTitlePropsType} from "./QuestionTitle/index";
import QuestionInputConf, {QuestionInputPropsType} from "./QuestionInput";
import QuestionParagraphConf, {QuestionParagraphPropsType} from "./QuestionParagraph";
import QuestionInfoConf, {QuestionInfoPropsType} from "./QuestionInfo";
import QuestionTextareaConf, {QuestionTextareaPropsType} from "./QuestionTextarea";



// 各个组件的 prop type
export type ComponentPropsType = QuestionInputPropsType & QuestionTitlePropsType & QuestionParagraphPropsType &
    QuestionInfoPropsType & QuestionTextareaPropsType;

// 统一，组件的配置
export type ComponentConfType = {
    title: string;
    type: string;
    Component: FC<ComponentPropsType>;
    PropComponent: FC<ComponentPropsType>;
    defaultProps: ComponentPropsType;
}

// 全部组件配置的列表
const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf,QuestionParagraphConf,
    QuestionInfoConf,QuestionTextareaConf];
// 组件分组
export const componentConfGroup  = [
    {
        groupId: "textGroup",
        groupName: "文本显示",
        components: [QuestionTitleConf,QuestionParagraphConf,QuestionInfoConf]
    },
    {
        groupId: "inputGroup",
        groupName: "用户输入",
        components: [QuestionInputConf,QuestionTextareaConf]
    }
]

export function getComponetConfByType(type: string) {
    return componentConfList.find(c => c.type === type);
}
