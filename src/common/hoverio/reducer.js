import lodash from "lodash"
import {handleActions} from "redux-actions"
import LoggerFactory from "utils/logger"

let Logger = new LoggerFactory("common.hoverio.reducer")

let initialState = {
    data: {}
}

export default handleActions({
    doSomethingAsync_COMPLETED(state, action) {
        let logger = Logger.create("doSomethingAsync_COMPLETED")
        logger.info("enter", {action})

        // Add data product.
        return Object.assign({}, state, {
            data: Object.assign({}, state.data, action.payload)
        })
    }
}, initialState)
