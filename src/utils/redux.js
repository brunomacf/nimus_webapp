import promiseMiddleware from "redux-promise-middleware"
import {createStore,combineReducers,applyMiddleware} from "redux"
import lodash from "lodash"

export default class Redux {

    static dispatch(action) {
        if(!Redux.shared) {throw "no shared instance available"}
        
        return Redux.shared.store.dispatch(action)
    }

    static getState() {
        if(!Redux.shared) {throw "no shared instance available"}
        return Redux.shared.store.getState()
    }

    constructor(reducers = {}, opts = {}) {
        opts = lodash.merge({
            shared: false,
            promiseTypeSuffixes: ["PENDING", "COMPLETED", "FAILED"]
        }, opts)

        // Set shared instance
        if(opts.shared) { Redux.shared = this }

        this.store = createStore(
            combineReducers(reducers),
            applyMiddleware(
                promiseMiddleware({
                    promiseTypeSuffixes: opts.promiseTypeSuffixes
                })
            )
        )
    }
}
