import moment from "moment"
import lodash from "lodash"

class Logger {
    static consoleLevelMap = {
        "debug": "log",
        "info": "info",
        "warning": "warn",
        "error": "error"
    };

    constructor({
        moduleName="global",
        scopeName=""
    }={}) {
        this.moduleName = moduleName
        this.scopeName = scopeName
        this.level = (process.env.ENV === "development" ? "debug" : "info")
    }

    _getLevelColor(level) {
        switch(level) {
            case "debug": return "grey"
            case "info": return "blue"
            case "warning": return "orange"
            case "error": return "red"
        }
    }

    // Private function.
    // @WARNING : This should not be used directly. 
    // Use the specific logging methods bellow.
    _log(level, message, rest=[]) {
        let timestamp = moment().toISOString()
        let consoleLevel = Logger.consoleLevelMap[level]

        let dataStr = rest.length > 0 ?
            ": "+JSON.stringify(lodash.merge({}, ...rest)) :
            ""

        console[consoleLevel](
            `${timestamp} - %c${level}: %c[${this.moduleName}] ${this.scopeName} : ${message} %c${dataStr}`,
            `color: ${this._getLevelColor(level)}`,
            "color: black",
            "color: grey"
        )
    }

    // Specific level log
    debug(message, ...rest) {this._log("debug", message, rest)}
    info(message, ...rest) {this._log("info", message, rest)}
    warning(message, ...rest) {this._log("warning", message, rest)}
    error(message, ...rest) {this._log("error", message, rest)}
}

// Logger factory
export default class LoggerFactory {
    constructor(moduleName) {
        this.moduleName = moduleName
    }

    create(scopeName) {
        return new Logger({
            moduleName: this.moduleName, 
            scopeName
        })
    }
}