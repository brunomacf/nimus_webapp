import React from "react"
import lodash from "lodash"
import LoggerFactory from "utils/logger"
import {connect} from "react-redux"
import {Hoverio} from "common"

let Logger = new LoggerFactory("test2.page")

/**
 * Redux map state to props function.
 *
 * @param {object} state
 * @param {object} ownProps
 */
function mapStateToProps(state : object) {
    return {
        hoverioData: state.hoverio.data
    }
}

/**
 * Redux dispatch to props map.
 */
let mapDispatchToProps = {

}

class Component extends React.Component {
    async componentDidMount() {
        let logger = Logger.create("componentDidMount")
        logger.info("enter")
    }
    
    render() {
        let hello = lodash.get(this.props, "hoverioData.hello")

        return (
            <div>
                <h4>Teste 2 OW</h4>

                <Hoverio>Hello man : {hello}!</Hoverio>
            </div>
        )
    }
}

let ReduxComponent = connect(
    mapStateToProps,
    mapDispatchToProps
)(Component)

export default (props) => {
    return <ReduxComponent {...props} />
}