import React from "react"
import {Switch, Route, Link} from "react-router-dom"
import LoggerFactory from "utils/logger"

import Test1 from "./test1"
import Test2 from "./test2"

let Logger = new LoggerFactory("app.page")

class App extends React.Component {
    async componentDidMount() {
        let logger = Logger.create("componentDidMount")
        logger.info("enter")
    }
    
    render() {
        return (
            <div>
                <h1>Colé App</h1>

                <div>
                    <Link to="/">home</Link>
                </div>

                <div>
                    <a onClick={() => {
                        this.props.history.push({
                            pathname: "/test2"
                        })
                    }}>test2</a>
                </div>

                <Switch>
                    <Route path="/test2" component={Test2} />
                    <Route path="/" component={Test1} />
                </Switch>
            </div>
        )
    }
}

export default (props) => {
    return <App {...props} />
}