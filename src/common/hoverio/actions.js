import {createActions} from "redux-actions"
import LoggerFactory from "utils/logger"
import Api from "utils/api"

let Logger = new LoggerFactory("common.hoverio.actions")

export default createActions({
    async doSomethingAsync() {
        var logger = Logger.create("doSomethingAsync")
        logger.info("enter")

        let response = await Api.shared.hello()

        logger.debug("api hello success", response)

        return response.result
    }
})
