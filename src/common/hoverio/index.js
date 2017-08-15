import React from "react"
import LoggerFactory from "utils/logger"
import Redux from "utils/redux"
import actions from "./actions"
import styles from "./styles.styl"

let Logger = new LoggerFactory("common.hoverio")

export default class Component extends React.Component {
    
    // Static properties
    static actions = require("./actions");
    static reducer = require("./reducer");

    // Instance properties
    state = {};

    async componentDidMount() {
        let logger = Logger.create("componentDidMount")
        logger.info("enter")
    }
    
    onMouseEnter() {
        this.setState({class: styles.hover})
    }

    onMouseLeave() {
        this.setState({class: styles.normal})
    }

    onClick() {
        Redux.dispatch(actions.doSomethingAsync())
    }

    render() {
        return (
            <a className={this.state.class}
                onClick={this.onClick}
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}>
                {this.props.children}
            </a>
        )
    }
}