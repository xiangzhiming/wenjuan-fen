import { Component } from "./Component";
import {QuestionRadioDefaultProps} from "./interface";
import {PropComponent} from "./PropComponent";

export * from "./interface";

export default {
    title: "单选",
    // title: "耶耶耶",
    type: "questionRadio",
    Component,
    PropComponent,
    defaultProps: QuestionRadioDefaultProps
}
