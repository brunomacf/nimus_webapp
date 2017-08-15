import React from "react"
import LoggerFactory from "utils/logger"

let Logger = new LoggerFactory("test1.page")

class Component extends React.Component {
    async componentDidMount() {
        let logger = Logger.create("componentDidMount")
        logger.info("enter")
    }
    
    render() {
        return (
            <h4>Teste 1</h4>
        )
    }
}

export default (props) => {
    return <Component {...props} />
}