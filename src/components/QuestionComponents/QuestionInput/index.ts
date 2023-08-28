
import Component from "./Component"
import {QuestionInputDefaultProps} from "./interface"

export * from "./interface";

// Input 组件的配置
export default {
    title: "输入框",
    type: "questionInput",   // 要和后端统一好
    Component,
    defaultProps: QuestionInputDefaultProps
}
