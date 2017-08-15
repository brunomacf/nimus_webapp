import qs from "qs"
import axios from "axios"
import LoggerFactory from "utils/logger"

let Logger = new LoggerFactory("http")

export default class Http {
    constructor({
        baseUrl=null,
        shared=false,
        headers={}
    }={}) {
        let logger = Logger.create("constructor")
        logger.info("enter", {baseUrl,shared,headers})

        if(shared){Http.shared = this}

        this._baseUrl = baseUrl?baseUrl.replace(/^(.+)\/$/, "$1"):null
        this._headers = headers
    }

    /**
     * This function set a header key value
     */
    setHeader(key, value) {
        this._headers[key] = value
    }

    /**
     * This is the main function of the http module
     */
    request(method="GET", url, data, {
        headers={}
    }={}) {
        let logger = Logger.create("request")
        logger.info("enter", {method,url,data,headers})

        let reqOpts = {
            url: this._baseUrl ? `${ this._baseUrl }/${ url.replace(/^\/(.+)$/, "$1") }` : url,
            headers: Object.assign({}, this._headers, headers),
            method: method.toUpperCase(),
            paramsSerializer: function(params) {
                return qs.stringify(params)
            }
        }

        if(data) {
            if(reqOpts.method == "GET"){ reqOpts.params = data }
            else { reqOpts.data = data }
        }

        // Send request through axios
        return axios(reqOpts)
            .then((response) => {
                logger.debug("response", response)
                return response.data
            })
    }
}