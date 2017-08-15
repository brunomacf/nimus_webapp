//import lodash from "lodash"
import Http from "utils/http"
import LoggerFactory from "utils/logger"

let Logger = new LoggerFactory("api")

function defaultErrorHandler(error : object) {
    let logger = Logger.create("defaultErrorHandler")
    logger.error("enter", error)

    /*let data = lodash.get(error, "response.data")

    if(data && data.name) {
        let name = lodash.toUpper(lodash.snakeCase(data.name))
        let code = data.code

        // Let's show error message.
        Redux.dispatch(
            Toaster.actions.push("danger", `_${name}_${code}_`, {
                untranslatedDefault: "_ERROR_UNKNOWN_"
            })
        )
    }*/
}

export default class Api {
    constructor({
        http=new Http(),
        errorHandler=defaultErrorHandler,
        shared=false
    }={}) {
        let logger = Logger.create("constructor")
        logger.info("enter", {shared})

        if(shared){Api.shared = this}

        this._baseUrl = "//localhost:3000"
        this._http = http
        this._errorHandler = errorHandler
    }

    /**
     * This is a general request method used by all api methods bellow.
     */
    async request(method: string, path: string, data: string, opts: object = {}) {
        let response, logger = Logger.create("request")
        logger.info("enter", {method, path, data, opts})

        let url = `${this._baseUrl}/${path}`

        try {
            response = await this._http.request(method,url,data)
            logger.info("api request success", response)
        }
        catch(error) {
            logger.error("api request error", error)

            if(!opts.preventErrorHandling) {
                this._errorHandler(error, {method,url,path,data})
            }
        }

        return response
    }

    /****************************************************************
    * Api methods
    ****************************************************************/
    hello(query: object, opts: object) {
        return this.request("GET", "hello", query, opts)
    }
}